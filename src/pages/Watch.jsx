import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import {
  getVideo,
  getVideos,
  streamUrl,
  rateVideo,
  getMyRating,
  recordView,
  recordHistory,
  removeHistoryItem,
  updateVideo,
} from "../api.js";
import StarRating from "../ui/StarRating.jsx";
import CommentsSection from "../ui/CommentsSection.jsx";
import "./Watch.css";

const INCLUDE_TEST_DATA =
  String(import.meta.env.VITE_INCLUDE_TEST_DATA || "0") === "1";

function timeAgo(iso) {
  const t = new Date(iso).getTime();
  if (!Number.isFinite(t)) return "";
  const diff = Date.now() - t;

  const sec = Math.floor(diff / 1000);
  if (sec < 5) return "just now";
  if (sec < 60) return `${sec}s ago`;

  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;

  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;

  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d ago`;

  const week = Math.floor(day / 7);
  if (week < 5) return `${week}w ago`;

  const month = Math.floor(day / 30);
  if (month < 12) return `${month}mo ago`;

  const year = Math.floor(day / 365);
  return `${year}y ago`;
}

function formatInt(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return "0";
  return num.toLocaleString("en-AU");
}

export default function Watch({ user, onRequireLogin }) {
  const { id } = useParams();
  const nav = useNavigate();
  const videoRef = useRef(null);

  const [video, setVideo] = useState(null);
  const [suggested, setSuggested] = useState([]);
  const [viewRecordedFor, setViewRecordedFor] = useState(null);

  const [myRating, setMyRating] = useState(null);
  const [myRatingLoaded, setMyRatingLoaded] = useState(false);
  const [ratingBusy, setRatingBusy] = useState(false);

  const [editingTitle, setEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [titleBusy, setTitleBusy] = useState(false);
  const [titleError, setTitleError] = useState("");

  const [editingDescription, setEditingDescription] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState("");
  const [descriptionBusy, setDescriptionBusy] = useState(false);
  const [descriptionError, setDescriptionError] = useState("");

  const [editingTags, setEditingTags] = useState(false);
  const [tagsInput, setTagsInput] = useState("");
  const [tagsBusy, setTagsBusy] = useState(false);
  const [tagsError, setTagsError] = useState("");

  const isLoggedIn = !!user?.id;

  const tier = String(user?.tier || "Free").trim().toLowerCase();

  const hasPaidTier =
    isLoggedIn &&
    tier !== "free" &&
    tier !== "";

  const restoreAttemptedRef = useRef(false);
  const pendingResumeRef = useRef(0);

  const myUsername = user?.username ? String(user.username).toLowerCase() : null;

  const isOwner = (item) => {
    const ownerUsername =
      item?.channelUsername || item?.username || item?.channel_username || null;
    const normalizedOwner = ownerUsername
      ? String(ownerUsername).toLowerCase()
      : null;
    return !!myUsername && !!normalizedOwner && myUsername === normalizedOwner;
  };

  function handleTagClick(tag) {
    const q = String(tag || "").trim();
    if (!q) return;
    nav(`/watch?q=${encodeURIComponent(q)}`);
  }

  function startTitleEdit() {
    if (!isLoggedIn) return onRequireLogin?.();
    if (!isOwner(video)) return;

    setTitleError("");
    setTitleInput(video?.title || "");
    setEditingTitle(true);
  }

  function cancelTitleEdit() {
    setEditingTitle(false);
    setTitleError("");
    setTitleInput(video?.title || "");
  }

  async function saveTitleEdit() {
    if (!isLoggedIn) return onRequireLogin?.();
    if (!isOwner(video)) return;

    const title = titleInput.trim();
    if (!title) {
      setTitleError("Title is required.");
      return;
    }

    try {
      setTitleBusy(true);
      setTitleError("");

      const updated = await updateVideo(video.id, {
        title,
        description: video.description || "",
        tags: Array.isArray(video.tags) ? video.tags : [],
      });

      setVideo((prev) =>
        prev
          ? {
              ...prev,
              title: updated?.title ?? title,
            }
          : prev
      );

      setEditingTitle(false);
    } catch (e) {
      console.error(e);
      setTitleError(e?.message || "Failed to update title.");
    } finally {
      setTitleBusy(false);
    }
  }

  function startDescriptionEdit() {
    if (!isLoggedIn) return onRequireLogin?.();
    if (!isOwner(video)) return;

    setDescriptionError("");
    setDescriptionInput(video?.description || "");
    setEditingDescription(true);
  }

  function cancelDescriptionEdit() {
    setEditingDescription(false);
    setDescriptionError("");
    setDescriptionInput(video?.description || "");
  }

  async function saveDescriptionEdit() {
    if (!isLoggedIn) return onRequireLogin?.();
    if (!isOwner(video)) return;

    const description = descriptionInput;

    try {
      setDescriptionBusy(true);
      setDescriptionError("");

      const updated = await updateVideo(video.id, {
        title: video.title || "",
        description,
        tags: Array.isArray(video.tags) ? video.tags : [],
      });

      setVideo((prev) =>
        prev
          ? {
              ...prev,
              description: updated?.description ?? description,
            }
          : prev
      );

      setEditingDescription(false);
    } catch (e) {
      console.error(e);
      setDescriptionError(e?.message || "Failed to update description.");
    } finally {
      setDescriptionBusy(false);
    }
  }

  function startTagsEdit() {
    if (!isLoggedIn) return onRequireLogin?.();
    if (!isOwner(video)) return;

    setTagsError("");
    setTagsInput(Array.isArray(video?.tags) ? video.tags.join(", ") : "");
    setEditingTags(true);
  }

  function cancelTagsEdit() {
    setEditingTags(false);
    setTagsError("");
    setTagsInput(Array.isArray(video?.tags) ? video.tags.join(", ") : "");
  }

  async function saveTagsEdit() {
    if (!isLoggedIn) return onRequireLogin?.();
    if (!isOwner(video)) return;

    const tags = Array.from(
      new Set(
        String(tagsInput || "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      )
    );

    try {
      setTagsBusy(true);
      setTagsError("");

      const updated = await updateVideo(video.id, {
        title: video.title || "",
        description: video.description || "",
        tags,
      });

      setVideo((prev) =>
        prev
          ? {
              ...prev,
              tags: Array.isArray(updated?.tags) ? updated.tags : tags,
            }
          : prev
      );

      setEditingTags(false);
    } catch (e) {
      console.error(e);
      setTagsError(e?.message || "Failed to update tags.");
    } finally {
      setTagsBusy(false);
    }
  }

  useEffect(() => {
    restoreAttemptedRef.current = false;
    pendingResumeRef.current = 0;

    if (!user?.id || !video?.id) return;

    const saved = Number(video.progressSeconds || 0);
    if (!Number.isFinite(saved) || saved <= 5) return;
    pendingResumeRef.current = saved;
  }, [id, user?.id, video?.id, video?.progressSeconds]);

  useEffect(() => {
    if (!user?.id || !video?.id) return;

    let sent = false;
    let finished = false;
    const el = videoRef.current;
    if (!el) return;

    async function markFinished() {
      if (finished) return;
      finished = true;
      try {
        await removeHistoryItem(video.id);
      } catch (e) {
        console.error("removeHistoryItem failed:", e);
      }
    }

    function maybeRecord() {
      if (!el.duration || !Number.isFinite(el.duration)) {
        if (!sent && el.currentTime >= 5) {
          sent = true;
          recordHistory(video.id, el.currentTime).catch((e) => {
            console.error("recordHistory failed:", e);
          });
        }
        return;
      }

      const progress = el.currentTime / el.duration;

      if (progress >= 0.98) {
        markFinished();
        return;
      }

      if (!sent && el.currentTime >= 5) {
        sent = true;
        recordHistory(video.id, el.currentTime).catch((e) => {
          console.error("recordHistory failed:", e);
        });
      }
    }

    const onTimeUpdate = () => maybeRecord();

    const onPause = () => {
      if (finished) return;

      if (el.duration && Number.isFinite(el.duration)) {
        const progress = el.currentTime / el.duration;
        if (progress >= 0.98) {
          markFinished();
          return;
        }
      }

      if (el.currentTime > 0) {
        recordHistory(video.id, el.currentTime).catch((e) => {
          console.error("recordHistory failed:", e);
        });
      }
    };

    const onEnded = () => markFinished();

    el.addEventListener("timeupdate", onTimeUpdate);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);

    return () => {
      el.removeEventListener("timeupdate", onTimeUpdate);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);

      if (!finished && el.currentTime > 0) {
        if (el.duration && Number.isFinite(el.duration)) {
          const progress = el.currentTime / el.duration;
          if (progress >= 0.98) return;
        }
        recordHistory(video.id, el.currentTime).catch(() => {});
      }
    };
  }, [user?.id, video?.id]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setVideo(null);
      setSuggested([]);

      setMyRating(null);
      setMyRatingLoaded(false);

      setEditingTitle(false);
      setTitleBusy(false);
      setTitleError("");
      setTitleInput("");

      setEditingDescription(false);
      setDescriptionBusy(false);
      setDescriptionError("");
      setDescriptionInput("");

      setEditingTags(false);
      setTagsBusy(false);
      setTagsError("");
      setTagsInput("");

      try {
        const v = await getVideo(id);
        if (cancelled) return;

        setVideo(v);
        setTitleInput(v.title || "");
        setDescriptionInput(v.description || "");
        setTagsInput(Array.isArray(v.tags) ? v.tags.join(", ") : "");

        if (isLoggedIn && viewRecordedFor !== id) {
          try {
            const resp = await recordView(id);
            if (!cancelled && resp?.views != null) {
              setVideo((prev) => (prev ? { ...prev, views: resp.views } : prev));
              setViewRecordedFor(id);
            }
          } catch (e) {
            console.warn("recordView failed:", e?.message || e);
          }
        }

        const all = await getVideos({ category: v.category });
        if (cancelled) return;

        setSuggested(
          all
            .filter((x) => String(x.id) !== String(id))
            .filter((x) => INCLUDE_TEST_DATA || !x?.isTestData)
            .map((x) => ({
              ...x,
              requiresPlan:
                x.requiresPlan ||
                !isLoggedIn ||
                !hasPaidTier,
            }))
            .slice(0, 12)
        );

        if (isLoggedIn) {
          try {
            const mine = await getMyRating(id);
            if (!cancelled) {
              setMyRating(mine?.rating ?? null);
              setMyRatingLoaded(true);
            }
          } catch {
            if (!cancelled) {
              setMyRating(null);
              setMyRatingLoaded(false);
            }
          }
        } else {
          setMyRating(null);
          setMyRatingLoaded(false);
        }
      } catch (e) {
        console.error(e);

        if (e?.code === "PLAN_REQUIRED" || e?.message?.includes("Upgrade required")) {
          nav("/plans", { replace: true });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, isLoggedIn, viewRecordedFor]);

  async function handleRate(n) {
    if (!isLoggedIn) return onRequireLogin?.();

    setMyRating(n);

    try {
      setRatingBusy(true);
      await rateVideo(id, n);

      const [freshVideo, mine] = await Promise.allSettled([
        getVideo(id),
        getMyRating(id),
      ]);

      if (freshVideo.status === "fulfilled") {
        setVideo(freshVideo.value);
      }

      if (mine.status === "fulfilled") {
        setMyRating(mine.value?.rating ?? n);
        setMyRatingLoaded(true);
      } else {
        setMyRatingLoaded(false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setRatingBusy(false);
    }
  }

  function tryRestorePlaybackPosition() {
    const el = videoRef.current;
    if (!el) return;
    if (restoreAttemptedRef.current) return;

    const saved = Number(pendingResumeRef.current || 0);
    if (!Number.isFinite(saved) || saved <= 5) return;

    try {
      if (Number.isFinite(el.duration) && el.duration > 0) {
        if (saved >= el.duration - 3) {
          restoreAttemptedRef.current = true;
          return;
        }
      }

      el.currentTime = saved;

      if (Math.abs(el.currentTime - saved) < 2 || el.currentTime > 0) {
        restoreAttemptedRef.current = true;
      }
    } catch (e) {
      console.warn("Resume seek failed:", e);
    }
  }

  if (!video) return <div className="shell">Loading…</div>;

  const channelUsername = video.channelUsername;
  const channelDisplay = video.channelDisplayName || channelUsername;
  const channelAvatarUrl = video.channelAvatarUrl || "";

  return (
    <div className="shell">
      <main className="watchPageLayout">
        <section className="watchPageMain">
          <video
            key={video.id}
            ref={videoRef}
            className="watchPagePlayer"
            controls
            src={streamUrl(video)}
            onLoadedMetadata={tryRestorePlaybackPosition}
            onCanPlay={tryRestorePlaybackPosition}
          />

          <div className={`watchPageTitleRow ${isOwner(video) ? "isOwner" : ""}`}>
            {editingTitle ? (
              <div className="watchPageTitleEditor">
                <input
                  className="watchPageTitleInput"
                  type="text"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  maxLength={120}
                  autoFocus
                  disabled={titleBusy}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      saveTitleEdit();
                    }
                    if (e.key === "Escape") {
                      e.preventDefault();
                      cancelTitleEdit();
                    }
                  }}
                />

                <div className="watchPageTitleEditorActions">
                  <button
                    type="button"
                    className="watchPageTitleIconBtn save"
                    onClick={saveTitleEdit}
                    disabled={titleBusy}
                    aria-label="Save title"
                    title="Save"
                  >
                    ✓
                  </button>

                  <button
                    type="button"
                    className="watchPageTitleIconBtn"
                    onClick={cancelTitleEdit}
                    disabled={titleBusy}
                    aria-label="Cancel title edit"
                    title="Cancel"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="watchPageTitle">{video.title}</h1>

                {isOwner(video) ? (
                  <button
                    type="button"
                    className="watchPageTitleEditBtn"
                    onClick={startTitleEdit}
                    aria-label="Edit title"
                    title="Edit title"
                  >
                    ✎
                  </button>
                ) : null}
              </>
            )}
          </div>

          {editingTitle && titleError ? (
            <div className="watchPageInlineError">{titleError}</div>
          ) : null}

          <div className="watchPageChannelRow">
            <div className="watchPageChannelLeft">
              <NavLink
                to={channelUsername ? `/u/${channelUsername}` : "#"}
                className="watchPageChannelAvatarLink"
                onClick={(e) => {
                  if (!channelUsername) e.preventDefault();
                }}
              >
                <div
                  className="watchPageChannelAvatar"
                  style={
                    channelAvatarUrl
                      ? { backgroundImage: `url(${channelAvatarUrl})` }
                      : undefined
                  }
                  aria-label="Channel avatar"
                >
                  {!channelAvatarUrl ? (channelDisplay?.[0]?.toUpperCase() || "?") : null}
                </div>
              </NavLink>

              <div className="watchPageChannelMeta">
                <NavLink
                  to={channelUsername ? `/u/${channelUsername}` : "#"}
                  className="watchPageChannelNameLink"
                  onClick={(e) => {
                    if (!channelUsername) e.preventDefault();
                  }}
                >
                  <div className="watchPageChannelName">{channelDisplay}</div>
                </NavLink>

                <div className="watchPageChannelSub">
                  <span>{formatInt(video.views)} views</span>
                  {video.createdAt ? (
                    <>
                      <span className="dot">•</span>
                      <span>Uploaded {timeAgo(video.createdAt)}</span>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {(video.description || editingDescription) && (
            <div className="watchPageDescriptionBlock">
              <div className={`watchPageDescriptionArea ${isOwner(video) ? "isOwner" : ""}`}>
                <div className="watchPageDescriptionHeader">
                  <div className="watchPageSectionLabel">Description:</div>

                  {isOwner(video) && !editingDescription ? (
                    <button
                      type="button"
                      className="watchPageDescriptionEditBtn"
                      onClick={startDescriptionEdit}
                      title="Edit description"
                      aria-label="Edit description"
                    >
                      ✎
                    </button>
                  ) : null}
                </div>

                {editingDescription ? (
                  <div className="watchPageDescriptionEditor">
                    <textarea
                      className="watchPageDescriptionTextarea"
                      value={descriptionInput}
                      onChange={(e) => setDescriptionInput(e.target.value)}
                      rows={5}
                      autoFocus
                      disabled={descriptionBusy}
                      onKeyDown={(e) => {
                        if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                          e.preventDefault();
                          saveDescriptionEdit();
                        }
                        if (e.key === "Escape") {
                          e.preventDefault();
                          cancelDescriptionEdit();
                        }
                      }}
                    />

                    <div className="watchPageDescriptionActions">
                      <button
                        className="watchPageTitleIconBtn save"
                        type="button"
                        onClick={saveDescriptionEdit}
                        disabled={descriptionBusy}
                      >
                        ✓
                      </button>

                      <button
                        className="watchPageTitleIconBtn"
                        type="button"
                        onClick={cancelDescriptionEdit}
                        disabled={descriptionBusy}
                      >
                        ✕
                      </button>
                    </div>

                    {descriptionError ? (
                      <div className="watchPageInlineError">{descriptionError}</div>
                    ) : null}
                  </div>
                ) : (
                  <div className="watchPageDescription">
                    {video.description || (
                      <span className="watchPageMuted">No description yet.</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="watchPageRatingBlock">
            <StarRating
              value={myRating}
              avg={video.ratingAvg ?? null}
              count={video.ratingCount ?? 0}
              disabled={ratingBusy}
              onRate={handleRate}
            />

            <div className="watchPageRatingMeta">
              {myRating ? (
                <div className="watchPageYourRating">
                  Your rating: <span className="watchPageYourRatingValue">{myRating}</span>
                </div>
              ) : (
                <div className="watchPageYourRating watchPageMuted">Your rating: —</div>
              )}

              <div className="watchPageCommunityRating watchPageMuted">
                Community: {(Number(video.ratingAvg) || 0).toFixed(2)} •{" "}
                {video.ratingCount ?? 0} rating
                {(video.ratingCount ?? 0) === 1 ? "" : "s"}
              </div>
            </div>
          </div>

          {((Array.isArray(video.tags) && video.tags.length > 0) || editingTags) && (
            <div className={`watchPageTagsBlock ${isOwner(video) ? "isOwner" : ""}`}>
              <div className="watchPageTagsHeader">
                {isOwner(video) && !editingTags ? (
                  <button
                    type="button"
                    className="watchPageTagsEditBtn"
                    onClick={startTagsEdit}
                    aria-label="Edit tags"
                    title="Edit tags"
                  >
                    ✎
                  </button>
                ) : null}
              </div>

              {editingTags ? (
                <div className="watchPageTagsEditor">
                  <input
                    className="watchPageTagsInput"
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="action, funny, tutorial"
                    autoFocus
                    disabled={tagsBusy}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        saveTagsEdit();
                      }
                      if (e.key === "Escape") {
                        e.preventDefault();
                        cancelTagsEdit();
                      }
                    }}
                  />

                  <div className="watchPageTagsActions">
                    <button
                      type="button"
                      className="watchPageTitleIconBtn save"
                      onClick={saveTagsEdit}
                      disabled={tagsBusy}
                      aria-label="Save tags"
                      title="Save"
                    >
                      ✓
                    </button>

                    <button
                      type="button"
                      className="watchPageTitleIconBtn"
                      onClick={cancelTagsEdit}
                      disabled={tagsBusy}
                      aria-label="Cancel tag edit"
                      title="Cancel"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="watchPageTagsHint">Separate tags with commas.</div>

                  {tagsError ? (
                    <div className="watchPageInlineError">{tagsError}</div>
                  ) : null}
                </div>
              ) : Array.isArray(video.tags) && video.tags.length > 0 ? (
                <div className="watchPageTags" aria-label="Video tags">
                  {video.tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className="watchPageTag"
                      onClick={() => handleTagClick(tag)}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="watchPageMuted">No tags yet.</div>
              )}
            </div>
          )}

          <CommentsSection
            videoId={id}
            user={user}
            onRequireLogin={onRequireLogin}
          />
        </section>
      </main>
    </div>
  );
}