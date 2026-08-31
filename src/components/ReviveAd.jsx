import {
  useEffect,
  useState,
} from "react";

const REVIVE_ID =
  "727bec5e09208690b050ccfc6a45d384";

const REVIVE_SCRIPT =
  "https://servedby.revive-adserver.net/asyncjs.php";

let reviveLoadScheduled = false;

function scheduleReviveLoad() {
  if (reviveLoadScheduled) {
    return;
  }

  reviveLoadScheduled = true;

  window.setTimeout(() => {
    reviveLoadScheduled = false;

    /*
     * Remove the previous loader script so running it again
     * causes Revive to scan newly-rendered <ins> elements.
     */
    document
      .querySelectorAll(
        'script[data-dyop-revive-loader="true"]'
      )
      .forEach((script) => {
        script.remove();
      });

    const script =
      document.createElement(
        "script"
      );

    script.async = true;

    script.src =
      `${REVIVE_SCRIPT}?cb=${Date.now()}`;

    script.setAttribute(
      "data-dyop-revive-loader",
      "true"
    );

    document.body.appendChild(
      script
    );
  }, 0);
}

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
  const [isMobile, setIsMobile] =
    useState(() => {
      if (
        typeof window === "undefined"
      ) {
        return false;
      }

      return window.matchMedia(
        `(max-width: ${mobileBreakpoint}px)`
      ).matches;
    });

  const [suspended, setSuspended] =
    useState(() => {
      if (
        typeof document === "undefined"
      ) {
        return false;
      }

      return (
        document.documentElement
          .dataset.adsSuspended ===
        "true"
      );
    });

  /* =========================================================
     GLOBAL AD SUSPENSION
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
     ACTIVE ZONE
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
     TELL REVIVE TO SCAN AFTER REACT RENDER
     ========================================================= */

  useEffect(() => {
    if (
      suspended ||
      !activeZoneId
    ) {
      return;
    }

    scheduleReviveLoad();
  }, [
    suspended,
    activeZoneId,
    activeWidth,
    activeHeight,
  ]);

  if (
    suspended ||
    !activeZoneId
  ) {
    return null;
  }

  /* =========================================================
     REVIVE SLOT
     ========================================================= */

  const slot = (
    <ins
      key={String(activeZoneId)}
      data-revive-zoneid={
        String(activeZoneId)
      }
      data-revive-id={
        REVIVE_ID
      }
      style={{
        display: "inline-block",
        width: `${activeWidth}px`,
        height: `${activeHeight}px`,
        maxWidth: "100%",
      }}
    />
  );

  /* =========================================================
     BARE
     ========================================================= */

  if (bare) {
    return (
      <div
        className={`reviveAdBare ${className}`}
        style={{
          width:
            `${activeWidth}px`,
          minHeight:
            `${activeHeight}px`,
          maxWidth:
            "100%",
        }}
        aria-label="Advertisement"
      >
        {slot}
      </div>
    );
  }

  /* =========================================================
     STANDARD
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
          maxWidth: "100%",
        }}
      >
        {slot}
      </div>
    </section>
  );
}