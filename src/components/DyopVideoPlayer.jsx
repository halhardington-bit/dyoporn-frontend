import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import "./DyopVideoPlayer.css";

function formatTime(seconds) {
  const value = Number(seconds);

  if (!Number.isFinite(value) || value < 0) {
    return "0:00";
  }

  const total = Math.floor(value);
  const mins = Math.floor(total / 60);
  const secs = total % 60;

  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function fireTrackingUrl(url) {
  const clean = String(url || "").trim();

  if (!clean) return;

  try {
    const img = new Image();
    img.src = clean;
  } catch {
    // Tracking failure should never break playback.
  }
}

function fireTrackingUrls(urls) {
  for (const url of urls || []) {
    fireTrackingUrl(url);
  }
}

function getNodeText(node) {
  return String(node?.textContent || "").trim();
}

function parseVast(xmlText) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "application/xml");

  if (xml.querySelector("parsererror")) {
    throw new Error("Invalid VAST XML.");
  }

  const mediaFiles = Array.from(
    xml.querySelectorAll("MediaFile")
  );

  const preferredMedia =
    mediaFiles.find((node) => {
      const type = String(
        node.getAttribute("type") || ""
      ).toLowerCase();

      return type.includes("mp4");
    }) || mediaFiles[0];

  if (!preferredMedia) {
    return null;
  }

  const mediaUrl = getNodeText(preferredMedia);

  if (!mediaUrl) {
    return null;
  }

  const impressions = Array.from(
    xml.querySelectorAll("Impression")
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
    const event = node.getAttribute("event");
    const url = getNodeText(node);

    if (
      url &&
      event &&
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

const DyopVideoPlayer = forwardRef(function DyopVideoPlayer(
  {
    contentSrc,
    vastUrl,

    className = "",

    onContentLoadedMetadata,
    onContentCanPlay,
    onContentPlay,
    onContentPause,
    onContentTimeUpdate,
    onContentEnded,
  },
  forwardedRef
) {
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);

  const [ad, setAd] = useState(null);
  const [loadingAd, setLoadingAd] = useState(true);
  const [mode, setMode] = useState("loading");

  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [mediaReady, setMediaReady] = useState(false);
  const [finished, setFinished] =
    useState(false);

  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);

  const [controlsVisible, setControlsVisible] =
    useState(true);

  const [mouseInside, setMouseInside] =
    useState(false);

  const [autoplayBlocked, setAutoplayBlocked] =
    useState(false);

  const hideControlsTimerRef = useRef(null);

  const adMaxTimeRef = useRef(0);
  const adStartedRef = useRef(false);

  const firedRef = useRef({
    impression: false,
    start: false,
    firstQuartile: false,
    midpoint: false,
    thirdQuartile: false,
    complete: false,
  });

  useImperativeHandle(
    forwardedRef,
    () => videoRef.current
  );

  const isAd = mode === "ad";
  const isContent = mode === "content";

  const AD_SKIP_AFTER = 5;

const adCanSkip =
  isAd &&
  currentTime >= AD_SKIP_AFTER;

const adSkipRemaining =
  isAd
    ? Math.max(
        0,
        Math.ceil(
          AD_SKIP_AFTER - currentTime
        )
      )
    : 0;

  function resetAdTracking() {
    firedRef.current = {
      impression: false,
      start: false,
      firstQuartile: false,
      midpoint: false,
      thirdQuartile: false,
      complete: false,
    };

    adMaxTimeRef.current = 0;
    adStartedRef.current = false;
  }

  function clearHideTimer() {
    if (hideControlsTimerRef.current) {
      window.clearTimeout(
        hideControlsTimerRef.current
      );

      hideControlsTimerRef.current = null;
    }
  }

  function scheduleControlsHide() {
    clearHideTimer();

    if (!playing || !mouseInside) {
      return;
    }

    hideControlsTimerRef.current =
      window.setTimeout(() => {
        setControlsVisible(false);
      }, 3000);
  }

  function showControls() {
    setControlsVisible(true);
    scheduleControlsHide();
  }

  function handleMouseEnter() {
    setMouseInside(true);
    setControlsVisible(true);
  }

  function handleMouseMove() {
    setMouseInside(true);
    setControlsVisible(true);

    clearHideTimer();

    if (playing) {
      hideControlsTimerRef.current =
        window.setTimeout(() => {
          setControlsVisible(false);
        }, 3000);
    }
  }

  function handleMouseLeave() {
    setMouseInside(false);
    clearHideTimer();

    if (playing) {
      setControlsVisible(false);
    }
  }

  async function tryPlay() {
    const el = videoRef.current;

    if (!el) return;

    try {
      await el.play();
      setAutoplayBlocked(false);
    } catch {
      setAutoplayBlocked(true);
      setPlaying(false);
      setControlsVisible(true);
    }
  }

  function switchToContent() {
    resetAdTracking();

    setMode("content");
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setMediaReady(false);
    setAutoplayBlocked(false);
    setControlsVisible(true);
    }

  useEffect(() => {
    let cancelled = false;

    setAd(null);
    setLoadingAd(true);
    setMode("loading");
    setAutoplayBlocked(false);
    setMediaReady(false);

    resetAdTracking();

    async function loadAd() {
      if (!vastUrl) {
        if (!cancelled) {
          setMode("content");
          setLoadingAd(false);
        }

        return;
      }

      try {
        const separator =
          vastUrl.includes("?") ? "&" : "?";

        const response = await fetch(
          `${vastUrl}${separator}cb=${Date.now()}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `VAST request failed (${response.status})`
          );
        }

        const xmlText = await response.text();
        const parsed = parseVast(xmlText);

        if (cancelled) return;

        if (!parsed?.mediaUrl) {
          setMode("content");
          return;
        }

        setAd(parsed);
        setMode("ad");
      } catch (err) {
        console.warn(
          "DYOP pre-roll failed:",
          err
        );

        if (!cancelled) {
          setMode("content");
        }
      } finally {
        if (!cancelled) {
          setLoadingAd(false);
        }
      }
    }

    loadAd();

    return () => {
      cancelled = true;
    };
  }, [vastUrl, contentSrc]);

  useEffect(() => {
    const el = videoRef.current;

    if (!el) return;

    el.volume = volume;
    el.muted = muted;
  }, [volume, muted]);

  useEffect(() => {
    const el = videoRef.current;

    if (!el) return;

    // Advertisement is ready:
    // load it and immediately attempt autoplay.
    if (mode === "ad" && ad?.mediaUrl) {
        setMediaReady(false);

        el.load();

        tryPlay();

        return;
    }

    // Main DYOP content:
    // autoplay both when there was no ad
    // and immediately after the pre-roll finishes.
    if (mode === "content" && contentSrc) {
        setMediaReady(false);

        el.load();

        tryPlay();
    }
    }, [
    mode,
    ad?.mediaUrl,
    contentSrc,
    ]);

  useEffect(() => {
    return () => {
      clearHideTimer();
    };
  }, []);

  function handleLoadedMetadata(e) {
    const el = e.currentTarget;

    const nextDuration =
      Number.isFinite(el.duration) &&
      el.duration > 0
        ? el.duration
        : 0;

    setDuration(nextDuration);
    setCurrentTime(el.currentTime || 0);

    setMediaReady(
      nextDuration > 0
    );

    if (isContent) {
      onContentLoadedMetadata?.(el);
    }
  }

  function handleCanPlay(e) {
    const el = e.currentTarget;

    if (
      Number.isFinite(el.duration) &&
      el.duration > 0
    ) {
      setDuration(el.duration);
      setMediaReady(true);
    }

    if (isContent) {
      onContentCanPlay?.(el);
    }
  }

  function handlePlay(e) {
    setPlaying(true);

    if (mouseInside) {
      setControlsVisible(true);
      scheduleControlsHide();
    } else {
      setControlsVisible(false);
    }

    if (isAd) {
      if (!adStartedRef.current) {
        adStartedRef.current = true;

        if (!firedRef.current.impression) {
          firedRef.current.impression = true;
          fireTrackingUrls(ad?.impressions);
        }

        if (!firedRef.current.start) {
          firedRef.current.start = true;
          fireTrackingUrls(
            ad?.tracking?.start
          );
        }
      }

      return;
    }

    onContentPlay?.(e.currentTarget);
  }

  function handlePause(e) {
    setPlaying(false);
    setControlsVisible(true);
    clearHideTimer();

    if (isContent) {
      onContentPause?.(e.currentTarget);
    }
  }

  function handleTimeUpdate(e) {
    const el = e.currentTarget;

    const time =
      Number(el.currentTime) || 0;

    const dur =
      Number(el.duration) || 0;

    setCurrentTime(time);

    if (
      !mediaReady &&
      Number.isFinite(dur) &&
      dur > 0
    ) {
      setDuration(dur);
      setMediaReady(true);
    }

    if (isAd) {
      if (time > adMaxTimeRef.current) {
        adMaxTimeRef.current = time;
      }

      if (dur > 0) {
        const progress = time / dur;

        if (
          progress >= 0.25 &&
          !firedRef.current.firstQuartile
        ) {
          firedRef.current.firstQuartile = true;

          fireTrackingUrls(
            ad?.tracking?.firstQuartile
          );
        }

        if (
          progress >= 0.5 &&
          !firedRef.current.midpoint
        ) {
          firedRef.current.midpoint = true;

          fireTrackingUrls(
            ad?.tracking?.midpoint
          );
        }

        if (
          progress >= 0.75 &&
          !firedRef.current.thirdQuartile
        ) {
          firedRef.current.thirdQuartile = true;

          fireTrackingUrls(
            ad?.tracking?.thirdQuartile
          );
        }
      }

      return;
    }

    onContentTimeUpdate?.(el);
  }

  function handleSeeking(e) {
    if (!isAd) return;

    const el = e.currentTarget;

    const allowed =
      adMaxTimeRef.current + 0.75;

    if (el.currentTime > allowed) {
      el.currentTime =
        adMaxTimeRef.current;
    }
  }

  function handleEnded() {
    if (isAd) {
      if (
        ad &&
        !firedRef.current.complete
      ) {
        firedRef.current.complete = true;

        fireTrackingUrls(
          ad.tracking?.complete
        );
      }

      switchToContent();
      return;
    }

    setFinished(true);

    onContentEnded?.(
      videoRef.current
    );
  }

  function togglePlay() {
    const el = videoRef.current;

    if (!el) return;

    if (el.paused) {
      tryPlay();
    } else {
      el.pause();
    }
  }

  function handlePlayerClick(e) {
    const target = e.target;

    if (
      target.closest(
        ".dyopPlayerControls, .dyopPlayerBigPlay, .dyopPlayerAdClickArea"
      )
    ) {
      return;
    }

    togglePlay();
  }

  function handleSeek(e) {
    if (!isContent) return;

    const el = videoRef.current;

    if (!el) return;

    const next =
      Number(e.target.value);

    if (!Number.isFinite(next)) return;

    el.currentTime = next;
    setCurrentTime(next);
  }

  function toggleMute() {
    const next = !muted;

    setMuted(next);

    if (
      !next &&
      volume === 0
    ) {
      setVolume(0.5);
    }
  }

  function handleVolume(e) {
    const next =
      Number(e.target.value);

    setVolume(next);

    if (next > 0) {
      setMuted(false);
    }
  }

  async function toggleFullscreen() {
    const wrapper = wrapperRef.current;

    if (!wrapper) return;

    try {
      if (!document.fullscreenElement) {
        await wrapper.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn(
        "Fullscreen failed:",
        err
      );
    }
  }

  function handleAdClick() {
    if (
      !isAd ||
      !ad?.clickThrough
    ) {
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

  function handleSkipAd(e) {
  e?.preventDefault();
  e?.stopPropagation();

  if (
    !isAd ||
    !adCanSkip
  ) {
    return;
  }

  const el =
    videoRef.current;

  if (el) {
    el.pause();
  }

  switchToContent();
}

  function handleKeyDown(e) {
    const tag =
      e.target?.tagName?.toLowerCase();

    if (
      tag === "input" ||
      tag === "textarea" ||
      tag === "select"
    ) {
      return;
    }

    if (e.code === "Space") {
      e.preventDefault();
      togglePlay();
      return;
    }

    if (
      e.key.toLowerCase() === "m"
    ) {
      toggleMute();
      return;
    }

    if (
      e.key.toLowerCase() === "f"
    ) {
      toggleFullscreen();
      return;
    }

    if (!isContent) return;

    const el = videoRef.current;

    if (!el) return;

    if (e.key === "ArrowRight") {
      e.preventDefault();

      el.currentTime = Math.min(
        el.duration || Infinity,
        el.currentTime + 5
      );
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();

      el.currentTime = Math.max(
        0,
        el.currentTime - 5
      );
    }
  }

  const source =
    isAd && ad?.mediaUrl
      ? ad.mediaUrl
      : contentSrc;

  const progressPercent =
    duration > 0
      ? Math.min(
          100,
          Math.max(
            0,
            (currentTime / duration) * 100
          )
        )
      : 0;

  const remaining =
    mediaReady && duration > 0
      ? Math.max(
          0,
          Math.ceil(
            duration - currentTime
          )
        )
      : null;

  return (
    <div
      ref={wrapperRef}
      className={`dyopPlayer ${
        controlsVisible || !playing
          ? "dyopPlayer--controlsVisible"
          : ""
      } ${className}`}
      tabIndex={0}

      onKeyDown={handleKeyDown}

      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}

      onTouchStart={showControls}

      onClick={handlePlayerClick}
    >
      <video
        ref={videoRef}
        className="dyopPlayerVideo"
        src={source}

        playsInline
        preload="metadata"
        controls={false}

        onLoadedMetadata={
          handleLoadedMetadata
        }

        onCanPlay={handleCanPlay}

        onPlay={handlePlay}
        onPause={handlePause}

        onTimeUpdate={
          handleTimeUpdate
        }

        onSeeking={handleSeeking}

        onEnded={handleEnded}
      />

      {loadingAd ||
      mode === "loading" ? (
        <div className="dyopPlayerLoading">
          Loading…
        </div>
      ) : null}

      {autoplayBlocked && !playing ? (
        <button
          type="button"
          className="dyopPlayerBigPlay"

          onClick={togglePlay}

          aria-label={
            isAd
              ? "Play advertisement"
              : "Play video"
          }
        >
          ▶
        </button>
      ) : null}

      {isAd ? (
        <>
          <div className="dyopPlayerAdBadge">
            Advertisement
          </div>

          {ad?.clickThrough ? (
            <button
              type="button"
              className="dyopPlayerAdClickArea"
              onClick={handleAdClick}
              aria-label="Visit advertiser"
            />
          ) : null}

          <button
            type="button"
            className={`dyopPlayerSkipAd ${
              adCanSkip
                ? "dyopPlayerSkipAd--ready"
                : ""
            }`}
            onClick={handleSkipAd}
            disabled={!adCanSkip}
          >
            {adCanSkip ? (
              <>
                <span>Skip Ad</span>
                <span className="dyopPlayerSkipAdIcon">
                  ▶
                </span>
              </>
            ) : (
              <span>
                Skip in {adSkipRemaining}
              </span>
            )}
          </button>
        </>
      ) : null}

      <div
        className={`dyopPlayerControls ${
          controlsVisible || !playing
            ? "visible"
            : ""
        }`}
      >
        {isContent ? (
          <div className="dyopPlayerTimeline">
            <input
              type="range"

              min="0"
              max={duration || 0}
              step="0.01"

              value={currentTime}

              onChange={handleSeek}

              className="dyopPlayerSeek"

              style={{
                "--dyop-progress":
                  `${progressPercent}%`,
              }}

              aria-label="Video progress"
            />
          </div>
        ) : (
          <div className="dyopPlayerAdProgressWrap">
            <div className="dyopPlayerAdProgressTrack">

              {mediaReady ? (
                <div
                  className="dyopPlayerAdProgressFill"

                  style={{
                    width:
                      `${progressPercent}%`,
                  }}
                />
              ) : (
                <div className="dyopPlayerAdProgressLoading" />
              )}

            </div>
          </div>
        )}

        <div className="dyopPlayerControlRow">

          <div className="dyopPlayerControlLeft">

            <button
              type="button"
              className="dyopPlayerControlButton"

              onClick={togglePlay}

              aria-label={
                playing
                  ? "Pause"
                  : "Play"
              }
            >
              {playing ? "❚❚" : "▶"}
            </button>

            <button
              type="button"
              className="dyopPlayerControlButton"

              onClick={toggleMute}

              aria-label={
                muted
                  ? "Unmute"
                  : "Mute"
              }
            >
              {muted ||
              volume === 0
                ? "🔇"
                : "🔊"}
            </button>

            <input
              type="range"

              className="dyopPlayerVolume"

              min="0"
              max="1"
              step="0.05"

              value={
                muted ? 0 : volume
              }

              onChange={handleVolume}

              aria-label="Volume"
            />

            {isContent ? (
              <span className="dyopPlayerTime">

                {formatTime(
                  currentTime
                )}

                {" / "}

                {formatTime(
                  duration
                )}

              </span>
            ) : (
              <span className="dyopPlayerAdTime">

                {mediaReady &&
                remaining !== null
                  ? `Ad · ${remaining}s remaining`
                  : "Ad Loading"}

              </span>
            )}

          </div>

          <div className="dyopPlayerControlRight">

            <button
              type="button"
              className="dyopPlayerControlButton"

              onClick={toggleFullscreen}

              aria-label="Fullscreen"
            >
              ⛶
            </button>

          </div>

        </div>

      </div>

    </div>
  );
});

export default DyopVideoPlayer;