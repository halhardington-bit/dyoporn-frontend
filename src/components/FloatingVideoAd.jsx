import {
  useEffect,
  useRef,
  useState,
} from "react";

import "./FloatingVideoAd.css";

const DISMISSED_KEY =
  "dyop_floating_video_ad_dismissed";

function getNodeText(node) {
  return String(
    node?.textContent || ""
  ).trim();
}

function fireTrackingUrl(url) {
  const clean = String(
    url || ""
  ).trim();

  if (!clean) return;

  try {
    const img = new Image();
    img.src = clean;
  } catch {
    // Tracking must never break the page.
  }
}

function fireTrackingUrls(urls) {
  for (const url of urls || []) {
    fireTrackingUrl(url);
  }
}

function parseVast(xmlText) {
  const parser = new DOMParser();

  const xml = parser.parseFromString(
    xmlText,
    "application/xml"
  );

  if (xml.querySelector("parsererror")) {
    throw new Error(
      "Invalid VAST XML."
    );
  }

  const mediaFiles = Array.from(
    xml.querySelectorAll("MediaFile")
  );

  const media =
    mediaFiles.find((node) => {
      const type = String(
        node.getAttribute("type") || ""
      ).toLowerCase();

      return type.includes("mp4");
    }) || mediaFiles[0];

  if (!media) {
    return null;
  }

  const mediaUrl =
    getNodeText(media);

  if (!mediaUrl) {
    return null;
  }

  const impressions = Array.from(
    xml.querySelectorAll(
      "Impression"
    )
  )
    .map(getNodeText)
    .filter(Boolean);

  const clickThrough =
    getNodeText(
      xml.querySelector(
        "VideoClicks ClickThrough, ClickThrough"
      )
    ) || null;

  const clickTracking = Array.from(
    xml.querySelectorAll(
      "VideoClicks ClickTracking, ClickTracking"
    )
  )
    .map(getNodeText)
    .filter(Boolean);

  const tracking = {
    start: [],
    firstQuartile: [],
    midpoint: [],
    thirdQuartile: [],
    complete: [],
  };

  for (const node of Array.from(
    xml.querySelectorAll("Tracking")
  )) {
    const event =
      node.getAttribute("event");

    const url =
      getNodeText(node);

    if (
      event &&
      url &&
      Object.prototype.hasOwnProperty.call(
        tracking,
        event
      )
    ) {
      tracking[event].push(url);
    }
  }

  return {
    mediaUrl,
    impressions,
    clickThrough,
    clickTracking,
    tracking,
  };
}

export default function FloatingVideoAd({
  vastUrl,
}) {
  const videoRef = useRef(null);

  const [ad, setAd] =
    useState(null);

  const [closed, setClosed] =
    useState(() => {
      try {
        return (
          sessionStorage.getItem(
            DISMISSED_KEY
          ) === "1"
        );
      } catch {
        return false;
      }
    });

  const [ready, setReady] =
    useState(false);

  const [muted, setMuted] =
    useState(true);

    const [progress, setProgress] =
        useState(0);

  const [finished, setFinished] =
    useState(false);

  const firedRef = useRef({
    impression: false,
    start: false,
    firstQuartile: false,
    midpoint: false,
    thirdQuartile: false,
    complete: false,
  });

  useEffect(() => {
    if (
      closed ||
      !vastUrl
    ) {
      return;
    }

    let cancelled = false;

    async function loadAd() {
      try {
        const separator =
          vastUrl.includes("?")
            ? "&"
            : "?";

        const response =
          await fetch(
            `${vastUrl}${separator}cb=${Date.now()}`,
            {
              method: "GET",
              cache: "no-store",
            }
          );

        if (!response.ok) {
          throw new Error(
            `Floating VAST request failed (${response.status})`
          );
        }

        const xml =
          await response.text();

        const parsed =
          parseVast(xml);

        if (
          cancelled ||
          !parsed?.mediaUrl
        ) {
          return;
        }

        setFinished(false);
        setReady(false);
        setMuted(true);

        firedRef.current = {
          impression: false,
          start: false,
          firstQuartile: false,
          midpoint: false,
          thirdQuartile: false,
          complete: false,
        };

        setAd(parsed);
      } catch (err) {
        console.warn(
          "Floating video ad unavailable:",
          err
        );
      }
    }

    loadAd();

    return () => {
      cancelled = true;
    };
  }, [
    vastUrl,
    closed,
  ]);

  useEffect(() => {
    if (
      !ad?.mediaUrl ||
      closed
    ) {
      return;
    }

    const video =
      videoRef.current;

    if (!video) return;

    video.muted = true;
    video.volume = 1;

    setMuted(true);

    video
      .play()
      .catch(() => {
        // Muted autoplay should normally work.
      });
  }, [
    ad?.mediaUrl,
    closed,
  ]);

  function handleClose(event) {
    event.preventDefault();
    event.stopPropagation();

    try {
      sessionStorage.setItem(
        DISMISSED_KEY,
        "1"
      );
    } catch {
      // Fine if storage is unavailable.
    }

    const video =
      videoRef.current;

    if (video) {
      video.pause();
    }

    setClosed(true);
  }

  function handleToggleMute(event) {
    event.preventDefault();
    event.stopPropagation();

    const video =
      videoRef.current;

    if (!video) return;

    const nextMuted =
      !video.muted;

    video.muted =
      nextMuted;

    if (!nextMuted) {
      video.volume = 1;
    }

    setMuted(
      nextMuted
    );
  }

  function handleLoadedData() {
    setReady(true);
  }

  function handlePlay() {
    if (!ad) return;

    if (
      !firedRef.current.impression
    ) {
      firedRef.current.impression =
        true;

      fireTrackingUrls(
        ad.impressions
      );
    }

    if (
      !firedRef.current.start
    ) {
      firedRef.current.start =
        true;

      fireTrackingUrls(
        ad.tracking?.start
      );
    }
  }

  function handleTimeUpdate(event) {
    if (!ad) return;

    const video =
      event.currentTarget;

    const duration =
      Number(video.duration);

    const current =
      Number(video.currentTime);

    if (
      !Number.isFinite(duration) ||
      duration <= 0
    ) {
      return;
    }

    const playbackProgress =
        current / duration;

        setProgress(
        Math.min(
            100,
            Math.max(0, playbackProgress * 100)
        )
        );

    if (
      playbackProgress >= 0.25 &&
      !firedRef.current.firstQuartile
    ) {
      firedRef.current.firstQuartile =
        true;

      fireTrackingUrls(
        ad.tracking?.firstQuartile
      );
    }

    if (
      playbackProgress >= 0.5 &&
      !firedRef.current.midpoint
    ) {
      firedRef.current.midpoint =
        true;

      fireTrackingUrls(
        ad.tracking?.midpoint
      );
    }

    if (
      playbackProgress >= 0.75 &&
      !firedRef.current.thirdQuartile
    ) {
      firedRef.current.thirdQuartile =
        true;

      fireTrackingUrls(
        ad.tracking?.thirdQuartile
      );
    }
  }

  function handleEnded() {
    if (
      ad &&
      !firedRef.current.complete
    ) {
      firedRef.current.complete =
        true;

      fireTrackingUrls(
        ad.tracking?.complete
      );
    }

    const video =
      videoRef.current;

    setFinished(true);

    if (!video) {
      return;
    }

    setProgress(100);

    const duration =
      Number(video.duration);

    if (
      Number.isFinite(duration) &&
      duration > 0
    ) {
      try {
        video.currentTime =
          Math.max(
            0,
            duration - 0.05
          );
      } catch {
        // Browser should retain its final rendered frame.
      }
    }
  }

  function handleAdClick() {
    if (!ad?.clickThrough) {
      return;
    }

    fireTrackingUrls(
      ad.clickTracking
    );

    window.open(
      ad.clickThrough,
      "_blank",
      "noopener,noreferrer"
    );
  }

  if (
    closed ||
    !ad?.mediaUrl
  ) {
    return null;
  }

  return (
    <aside
      className={`floatingVideoAd ${
        ready
          ? "floatingVideoAd--ready"
          : ""
      }`}
      aria-label="Sponsored video"
    >
      <div className="floatingVideoAdShell">

        <button
          type="button"
          className="floatingVideoAdMedia"
          onClick={handleAdClick}
          aria-label={
            ad.clickThrough
              ? "Visit advertiser"
              : "Advertisement"
          }
        >
          <video
            ref={videoRef}
            className="floatingVideoAdVideo"
            src={ad.mediaUrl}
            autoPlay
            muted
            playsInline
            preload="auto"
            controls={false}
            onLoadedData={
              handleLoadedData
            }
            onPlay={
              handlePlay
            }
            onTimeUpdate={
              handleTimeUpdate
            }
            onEnded={
              handleEnded
            }
          />

          <div className="floatingVideoAdShade" />
            <div className="floatingVideoAdProgress">
                <div
                    className="floatingVideoAdProgressFill"
                    style={{
                    width: `${progress}%`,
                    }}
                />
                </div>
        </button>

        <div className="floatingVideoAdTopControls">
          <button
            type="button"
            className="floatingVideoAdAudioButton"
            onClick={handleToggleMute}
            aria-label={
              muted
                ? "Unmute advertisement"
                : "Mute advertisement"
            }
            title={
              muted
                ? "Unmute"
                : "Mute"
            }
          >
            {muted ? "🔇" : "🔊"}
          </button>

          <button
            type="button"
            className="floatingVideoAdClose"
            onClick={handleClose}
            aria-label="Close advertisement"
            title="Close"
          >
            ✕
          </button>
        </div>

        <div className="floatingVideoAdLabel">
          <span>
            Sponsored
          </span>

          {finished ? (
            <span className="floatingVideoAdFinished">
              Advertisement
            </span>
          ) : null}
        </div>

      </div>
    </aside>
  );
}