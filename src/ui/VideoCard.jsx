import "./VideoCard.css";
import { useNavigate, NavLink, useSearchParams } from "react-router-dom";
import { thumbUrl, streamUrl } from "../api.js";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  addToWatchLater,
  removeFromWatchLater,
  getWatchLaterStatus,
  reportVideo,
} from "../api.js";


function formatViews(n) {
  if (n == null) return null;
  const num = Number(n);
  if (!Number.isFinite(num)) return null;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M views`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K views`;
  return `${num} views`;
}

function formatAvg(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return "0.00";
  return num.toFixed(2);
}

function lc(s) {
  return String(s || "").toLowerCase().trim();
}

const REPORT_OPTIONS = [
  "This video features a minor",
  "This video features a real person",
  "Copyright Infringement",
  "Celebrity Impersonation",
  "Unsafe Content",
  "Misleading",
  "Harrassment or Hate",
  "Stolen Content",
  "Spam",
  "Other",
];

export default function VideoCard({
  video,
  locked = false,
  onRequireLogin,
  onRequestDelete = null,
  user = null,
  me = null,
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const src = thumbUrl(video) || null;

  const previewSrc = useMemo(() => {
    try {
      return streamUrl?.(video) || null;
    } catch {
      return null;
    }
  }, [video]);

  const views = formatViews(video.views);
  const duration =
    video.durationText && video.durationText !== "0:00" ? video.durationText : null;

  const ratingAvg = formatAvg(video.ratingAvg);
  const ratingCount = Number(video.ratingCount || 0);
  const hasRatings = ratingCount > 0;

  const ownerUsername =
    video.channelUsername || video.creatorUsername || video.creator_username || null;

  const ownerDisplay =
    video.channelDisplayName ||
    video.creatorDisplayName ||
    video.creator_display_name ||
    ownerUsername;

  const currentUser = me || user;
  const ownerUserId = video.userId ?? video.user_id ?? video.ownerId ?? null;

  const isOwner =
    (!!currentUser?.username &&
      !!ownerUsername &&
      lc(currentUser.username) === lc(ownerUsername)) ||
    (!!currentUser?.id &&
      ownerUserId != null &&
      Number(currentUser.id) === Number(ownerUserId));

  const canManage = true;
  const canDelete = isOwner && typeof onRequestDelete === "function";

  const [inWatchLater, setInWatchLater] = useState(false);
  const [watchLaterBusy, setWatchLaterBusy] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [manageMenuOpen, setManageMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });

  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportOther, setReportOther] = useState("");
  const [reportComments, setReportComments] = useState("");
  const [reportBusy, setReportBusy] = useState(false);
  const [reportError, setReportError] = useState("");
  const [reportSuccess, setReportSuccess] = useState(false);

  const videoRef = useRef(null);
  const hoverTimerRef = useRef(null);
  const manageMenuRef = useRef(null);
  const manageButtonRef = useRef(null);

  const progressSeconds = Number(video.progressSeconds || 0);
  const durationSeconds = Number(video.durationSeconds || 0);

  const showProgressBar =
    progressSeconds > 0 &&
    durationSeconds > 0 &&
    progressSeconds < durationSeconds;

  const progressPct = showProgressBar
    ? Math.max(0, Math.min(100, (progressSeconds / durationSeconds) * 100))
    : 0;

  const previewEnabled = !locked && !!previewSrc;

  function handleClick() {
    if (locked) return onRequireLogin?.();
    navigate(`/watch/${video.id}`);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  }

  async function handleWatchLaterClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser?.id) {
      setManageMenuOpen(false);
      onRequireLogin?.(`/watch/${video.id}`);
      return;
    }

    try {
      setWatchLaterBusy(true);

      const isWatchLaterPage = searchParams.get("filter") === "watch-later";

      if (inWatchLater) {
        await removeFromWatchLater(video.id);
        setInWatchLater(false);

        if (isWatchLaterPage) {
          const sp = new URLSearchParams(searchParams);
          sp.set("_refresh", Date.now().toString());
          setSearchParams(sp, { replace: true });
        }
      } else {
        await addToWatchLater(video.id);
        setInWatchLater(true);
      }

      setManageMenuOpen(false);
    } catch (err) {
      console.error("Watch Later toggle failed:", err);
    } finally {
      setWatchLaterBusy(false);
    }
  }

  function handleReportClick(e) {
    e.preventDefault();
    e.stopPropagation();
    setManageMenuOpen(false);

    if (!currentUser?.id) {
      onRequireLogin?.(`/watch/${video.id}`);
      return;
    }

    setReportError("");
    setReportSuccess(false);
    setReportReason("");
    setReportOther("");
    setReportComments("");
    setReportOpen(true);
  }

  async function handleSubmitReport(e) {
    e.preventDefault();

    const offense =
      reportReason === "Other" ? reportOther.trim() || "Other" : reportReason.trim();

    if (!offense) {
      setReportError("Please select a reason.");
      return;
    }

    try {
      setReportBusy(true);
      setReportError("");

      await reportVideo(video.id, {
        offense,
        comments: reportComments.trim(),
      });

      setReportSuccess(true);
      setReportReason("");
      setReportOther("");
      setReportComments("");
    } catch (err) {
      setReportError(err?.message || "Failed to submit report");
    } finally {
      setReportBusy(false);
    }
  }

  function closeReportModal() {
    if (reportBusy) return;
    setReportOpen(false);
    setReportError("");
    setReportSuccess(false);
  }

  function handleDeleteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    setManageMenuOpen(false);
    onRequestDelete?.(video);
  }

  function handlePlaceholderAction(e) {
    e.preventDefault();
    e.stopPropagation();
    setManageMenuOpen(false);
  }

  function updateMenuPosition() {
    const btn = manageButtonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();

    setMenuPos({
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right,
    });
  }

  function startPreviewSoon() {
    if (!previewEnabled) return;

    clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setShowPreview(true);
    }, 250);
  }

  function stopPreview() {
    setShowPreview(false);
    clearTimeout(hoverTimerRef.current);

    const el = videoRef.current;
    if (el) {
      try {
        el.pause();
        el.currentTime = 0;
      } catch {}
    }
  }

  useEffect(() => {
    let alive = true;

    (async () => {
      if (!currentUser?.id || !video?.id) {
        if (alive) setInWatchLater(false);
        return;
      }

      try {
        const data = await getWatchLaterStatus(video.id);
        if (alive) setInWatchLater(!!data?.saved);
      } catch {
        if (alive) setInWatchLater(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [currentUser?.id, video?.id]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !showPreview) return;

    el.muted = true;
    el.playsInline = true;

    const play = async () => {
      try {
        await el.play();
      } catch {}
    };

    play();
  }, [showPreview]);

  useLayoutEffect(() => {
    if (!manageMenuOpen) return;

    updateMenuPosition();

    function handleReposition() {
      updateMenuPosition();
    }

    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [manageMenuOpen]);

  useEffect(() => {
    return () => {
      clearTimeout(hoverTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!manageMenuOpen) return;

    function handlePointerDown(e) {
      const panel = manageMenuRef.current;
      const button = manageButtonRef.current;
      const target = e.target;

      if (panel?.contains(target) || button?.contains(target)) return;
      setManageMenuOpen(false);
    }

    function handleEscape(e) {
      if (e.key === "Escape") setManageMenuOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [manageMenuOpen]);

  useEffect(() => {
    if (!reportOpen) return;

    function handleEscape(e) {
      if (e.key === "Escape") closeReportModal();
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [reportOpen, reportBusy]);

  const menuPortal = manageMenuOpen
    ? createPortal(
        <div
          ref={manageMenuRef}
          className="vManageMenu vManageMenuPortal"
          role="menu"
          aria-label="Video options"
          style={{
            position: "fixed",
            top: `${menuPos.top}px`,
            right: `${menuPos.right}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="vManageItem"
            role="menuitem"
            onClick={handleWatchLaterClick}
            disabled={watchLaterBusy}
          >
            {watchLaterBusy
              ? "Working..."
              : inWatchLater
              ? "Remove from Watch Later"
              : "Watch Later"}
          </button>

          <button
            type="button"
            className="vManageItem"
            role="menuitem"
            onClick={handleReportClick}
          >
            Report Video
          </button>

          {isOwner && (
            <>
              <button
                type="button"
                className="vManageItem"
                role="menuitem"
                onClick={handlePlaceholderAction}
              >
                Rename Title
              </button>

              <button
                type="button"
                className="vManageItem"
                role="menuitem"
                onClick={handlePlaceholderAction}
              >
                Change Visibility
              </button>
            </>
          )}

          {canDelete && (
            <button
              type="button"
              className="vManageItem danger"
              role="menuitem"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          )}
        </div>,
        document.body
      )
    : null;

  const reportModal = reportOpen
    ? createPortal(
        <div className="modalOverlay" onMouseDown={closeReportModal}>
          <div className="modalCard" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modalTitle">Report video</div>

            {reportSuccess ? (
              <>
                <div className="modalBody">
                  Thanks. Your report has been submitted.
                </div>

                <div className="modalActions">
                  <button
                    type="button"
                    className="modalBtn"
                    onClick={closeReportModal}
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmitReport}>
                <div className="modalBody">
                  <div style={{ marginBottom: 12, fontWeight: 700 }}>
                    Why are you reporting this video?
                  </div>

                  <div style={{ display: "grid", gap: 8 }}>
                    {REPORT_OPTIONS.map((option) => (
                      <label key={option} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input
                          type="radio"
                          name={`report-${video.id}`}
                          value={option}
                          checked={reportReason === option}
                          onChange={(e) => setReportReason(e.target.value)}
                          disabled={reportBusy}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>

                  {reportReason === "Other" && (
                    <div style={{ marginTop: 12 }}>
                      <input
                        type="text"
                        className="verifyInput"
                        placeholder="Other reason"
                        value={reportOther}
                        onChange={(e) => setReportOther(e.target.value)}
                        disabled={reportBusy}
                      />
                    </div>
                  )}

                  <div style={{ marginTop: 12 }}>
                    <textarea
                      className="verifyInput"
                      rows={4}
                      placeholder="Additional comments (optional)"
                      value={reportComments}
                      onChange={(e) => setReportComments(e.target.value)}
                      disabled={reportBusy}
                    />
                  </div>

                  {reportError ? <div className="modalError">{reportError}</div> : null}
                </div>

                <div className="modalActions">
                  <button
                    type="button"
                    className="modalBtn"
                    onClick={closeReportModal}
                    disabled={reportBusy}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="modalBtnDanger"
                    disabled={reportBusy}
                  >
                    {reportBusy ? "Submitting…" : "Submit report"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <div
        className={`video-card ${locked ? "locked" : ""} ${
          manageMenuOpen ? "menuOpen" : ""
        }`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        onMouseEnter={startPreviewSoon}
        onMouseLeave={stopPreview}
        onFocus={startPreviewSoon}
        onBlur={stopPreview}
      >
        {canManage && (
          <div
            className={`vManageWrap ${manageMenuOpen ? "isOpen" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={manageButtonRef}
              type="button"
              className="vManageButton"
              aria-label="Open video options"
              aria-expanded={manageMenuOpen}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setManageMenuOpen((v) => !v);
              }}
            >
              ⋯
            </button>
          </div>
        )}

        <div className="thumb-wrapper">
          {src ? (
            <img
              className={`thumbImg ${showPreview ? "isHidden" : ""}`}
              src={src}
              alt={video.title}
              loading="lazy"
            />
          ) : null}

          {previewEnabled ? (
            <video
              ref={videoRef}
              className={`thumbPreview ${showPreview ? "isVisible" : ""}`}
              src={previewSrc}
              preload="metadata"
              muted
              playsInline
              loop
            />
          ) : null}

          {duration && <div className="durationBadge">{duration}</div>}

          {showProgressBar && (
            <div className="videoProgressBar" aria-hidden="true">
              <div
                className="videoProgressFill"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          )}

          {locked && (
            <div className="lockOverlay">
              <div className="lockPill">
                <span className="lockIcon">🔒</span>
                <span>Log in to watch</span>
              </div>
            </div>
          )}
        </div>

        <div className="video-meta">
          <div className="vTitleRow">
            <h4 className="video-title">{video.title}</h4>

            <div className="vTitleRight">
              <div className="vRating">
                {hasRatings ? (
                  <>
                    <span className="vStar">★</span>
                    <span className="vAvg">{ratingAvg}</span>
                    <span className="vCount">({ratingCount})</span>
                  </>
                ) : (
                  <span className="vNoRating">Not yet rated</span>
                )}
              </div>
            </div>
          </div>

          {(ownerUsername || views) && (
            <div className="video-sub">
              {ownerUsername && (
                <NavLink
                  to={`/u/${ownerUsername}`}
                  className="video-creator"
                  onClick={(e) => e.stopPropagation()}
                >
                  {ownerDisplay}
                </NavLink>
              )}

              {ownerUsername && views && <span className="dot">•</span>}
              {views && <span className="video-views">{views}</span>}
            </div>
          )}
        </div>
      </div>

      {menuPortal}
      {reportModal}
    </>
  );
}