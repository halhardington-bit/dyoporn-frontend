import {
  useEffect,
  useState,
} from "react";

const REVIVE_ID =
  "727bec5e09208690b050ccfc6a45d384";

const REVIVE_SCRIPT =
  "https://servedby.revive-adserver.net/asyncjs.php";

let reviveScriptPromise = null;

function ensureReviveScript() {
  if (reviveScriptPromise) {
    return reviveScriptPromise;
  }

  reviveScriptPromise = new Promise((resolve, reject) => {
    const existing =
      document.querySelector(
        `script[src^="${REVIVE_SCRIPT}"]`
      );

    if (existing) {
      if (
        window.reviveAsync?.[
          REVIVE_ID
        ]
      ) {
        resolve();
        return;
      }

      existing.addEventListener(
        "load",
        resolve,
        { once: true }
      );

      existing.addEventListener(
        "error",
        reject,
        { once: true }
      );

      return;
    }

    const script =
      document.createElement("script");

    script.async = true;
    script.src = REVIVE_SCRIPT;

    script.onload = resolve;
    script.onerror = reject;

    document.body.appendChild(
      script
    );
  });

  return reviveScriptPromise;
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

  useEffect(() => {
    if (
      suspended ||
      !activeZoneId
    ) {
      return;
    }

    let cancelled = false;

    ensureReviveScript()
      .then(() => {
        if (cancelled) {
          return;
        }

        /*
         * Give React one frame to make sure the
         * <ins> is committed to the DOM.
         */
        requestAnimationFrame(() => {
          if (cancelled) {
            return;
          }

          try {
            const revive =
              window.reviveAsync?.[
                REVIVE_ID
              ];

            if (
              revive &&
              typeof revive.refresh ===
                "function"
            ) {
              revive.refresh();
            }
          } catch (err) {
            console.warn(
              "Revive refresh failed:",
              err
            );
          }
        });
      })
      .catch((err) => {
        console.warn(
          "Revive script failed:",
          err
        );
      });

    return () => {
      cancelled = true;
    };
  }, [
    suspended,
    activeZoneId,
  ]);

  if (
    suspended ||
    !activeZoneId
  ) {
    return null;
  }

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
        width:
          `${activeWidth}px`,
        height:
          `${activeHeight}px`,
        maxWidth:
          "100%",
      }}
    />
  );

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