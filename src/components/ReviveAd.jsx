import {
  useEffect,
  useRef,
  useState,
} from "react";

export default function ReviveAd({
  zoneId,

  width = 728,
  height = 90,

  mobileZoneId = null,
  mobileWidth = 300,
  mobileHeight = 100,

  mobileBreakpoint = 700,

  className = "",
  bare = false,
}) {
  const mountRef = useRef(null);

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(
      `(max-width: ${mobileBreakpoint}px)`
    ).matches;
  });

  const [suspended, setSuspended] = useState(() => {
    if (typeof document === "undefined") {
      return false;
    }

    return (
      document.documentElement.dataset.adsSuspended === "true"
    );
  });

  /* =========================================================
     LISTEN FOR GLOBAL AD SUSPENSION
     ========================================================= */

  useEffect(() => {
    function handleSuspended(event) {
      setSuspended(
        !!event?.detail?.suspended
      );
    }

    window.addEventListener(
      "dyop:ads-suspended",
      handleSuspended
    );

    return () => {
      window.removeEventListener(
        "dyop:ads-suspended",
        handleSuspended
      );
    };
  }, []);

  /* =========================================================
     MOBILE BREAKPOINT
     ========================================================= */

  useEffect(() => {
    const mediaQuery =
      window.matchMedia(
        `(max-width: ${mobileBreakpoint}px)`
      );

    function handleChange(event) {
      setIsMobile(
        event.matches
      );
    }

    setIsMobile(
      mediaQuery.matches
    );

    mediaQuery.addEventListener(
      "change",
      handleChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
    };
  }, [
    mobileBreakpoint,
  ]);

  /* =========================================================
     ACTIVE ZONE / SIZE
     ========================================================= */

  const useMobileAd =
    isMobile &&
    mobileZoneId != null;

  const activeZoneId =
    useMobileAd
      ? mobileZoneId
      : zoneId;

  const activeWidth =
    useMobileAd
      ? mobileWidth
      : width;

  const activeHeight =
    useMobileAd
      ? mobileHeight
      : height;

  /* =========================================================
     CREATE REVIVE IFRAME
     ========================================================= */

  useEffect(() => {
    const mount =
      mountRef.current;

    if (!mount) {
      return;
    }

    mount.replaceChildren();

    if (
      suspended ||
      !activeZoneId
    ) {
      return;
    }

    const cacheBuster =
      `${Date.now()}${Math.floor(
        Math.random() * 1000000
      )}`;

    const src =
      `https://servedby.revive-adserver.net/afr.php` +
      `?zoneid=${encodeURIComponent(activeZoneId)}` +
      `&cb=${cacheBuster}`;

    const iframe =
      document.createElement(
        "iframe"
      );

    iframe.src =
      src;

    iframe.width =
      String(activeWidth);

    iframe.height =
      String(activeHeight);

    iframe.frameBorder =
      "0";

    iframe.scrolling =
      "no";

    iframe.allow =
      "autoplay";

    iframe.title =
      "Advertisement";

    iframe.setAttribute(
      "aria-label",
      "Advertisement"
    );

    iframe.style.display =
      "block";

    iframe.style.border =
      "0";

    iframe.style.width =
      `${activeWidth}px`;

    iframe.style.height =
      `${activeHeight}px`;

    iframe.style.maxWidth =
      "100%";

    iframe.style.pointerEvents =
      "auto";

    mount.appendChild(
      iframe
    );

    return () => {
      if (
        iframe.parentNode === mount
      ) {
        mount.removeChild(
          iframe
        );
      }
    };
  }, [
    suspended,
    activeZoneId,
    activeWidth,
    activeHeight,
  ]);

  /* =========================================================
     SUSPENDED
     ========================================================= */

  if (suspended) {
    return null;
  }

  /* =========================================================
     BARE MODE
     ========================================================= */

  if (bare) {
    return (
      <div
        className={`reviveAdBare ${className}`}
        style={{
          width:
            `${activeWidth}px`,
          maxWidth:
            "100%",
        }}
        aria-label="Advertisement"
      >
        <div
          ref={mountRef}
          className="reviveAdMount"
        />
      </div>
    );
  }

  /* =========================================================
     STANDARD MODULE
     ========================================================= */

  return (
    <section
      className={`reviveAdModule ${className}`}
      aria-label="Advertisement"
    >
      <div className="reviveAdHeader">
        <span>
          Sponsored
        </span>
      </div>

      <div
        className="reviveAdFrame"
        style={{
          maxWidth:
            "100%",
        }}
      >
        <div
          ref={mountRef}
          className="reviveAdMount"
        />
      </div>
    </section>
  );
}