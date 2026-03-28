import { useEffect, useMemo, useState } from "react";
import { useOutletContext, useSearchParams, Link } from "react-router-dom";
import { getVideos, getHomeRows } from "../api.js";
import { VideoShelf } from "../ui/VideoShelf.jsx";
import VideoCard from "../ui/VideoCard.jsx";




function normTag(t) {
  return String(t || "").trim().toLowerCase();
}

function titleTag(t) {
  const s = String(t || "").trim();
  if (!s) return "Other";
  return s
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

function buildRowsByTags(videos, { maxRows = 8, minCount = 2 } = {}) {
  const counts = new Map();

  for (const v of videos) {
    const tags = Array.isArray(v.tags) ? v.tags : [];
    for (const raw of tags) {
      const t = normTag(raw);
      if (!t) continue;
      counts.set(t, (counts.get(t) || 0) + 1);
    }
  }

  const topTags = [...counts.entries()]
    .filter(([, c]) => c >= minCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxRows)
    .map(([t]) => t);

  const rows = topTags.map((tag) => ({
    title: titleTag(tag),
    key: `tag:${tag}`,
    videos: videos.filter((v) =>
      (Array.isArray(v.tags) ? v.tags : []).some((x) => normTag(x) === tag)
    ),
  }));

  const other = videos.filter((v) => {
    const tags = Array.isArray(v.tags) ? v.tags : [];
    if (!tags.length) return true;
    return !tags.some((x) => topTags.includes(normTag(x)));
  });

  if (other.length) {
    rows.push({ title: "Other", key: "tag:other", videos: other });
  }

  return rows;
}

function getVideoCreatedAtMs(video) {
  const raw =
    video.createdAt ||
    video.created_at ||
    video.publishedAt ||
    video.published_at ||
    null;

  if (!raw) return null;

  const ms = new Date(raw).getTime();
  return Number.isFinite(ms) ? ms : null;
}

function applyTimeFilter(videos, timeFilter) {
  if (!Array.isArray(videos)) return [];

  const now = Date.now();

  const cutoffByFilter = {
    "24h": now - 24 * 60 * 60 * 1000,
    week: now - 7 * 24 * 60 * 60 * 1000,
    month: now - 30 * 24 * 60 * 60 * 1000,
    year: now - 365 * 24 * 60 * 60 * 1000,
  };

  const cutoff = cutoffByFilter[timeFilter];
  if (!cutoff) return videos;

  return videos.filter((video) => {
    const createdMs = getVideoCreatedAtMs(video);
    if (!createdMs) return false;
    return createdMs >= cutoff;
  });
}

export default function Home({ user, onRequireLogin }) {
  const outlet = useOutletContext?.() || {};
  const setQ = outlet.setQ || (() => {});

  const [params, setSearchParams] = useSearchParams();

  function setParam(next) {
    const sp = new URLSearchParams(params);
    for (const [k, v] of Object.entries(next)) {
      const val = String(v ?? "").trim();
      if (!val) sp.delete(k);
      else sp.set(k, val);
    }
    setSearchParams(sp, { replace: true });
  }

  const urlQ = (params.get("q") || "").trim();
  const filter = (params.get("filter") || "").trim().toLowerCase();
  const sort = (params.get("sort") || "").trim().toLowerCase();
  const time = (params.get("time") || "all").trim().toLowerCase();
  const refreshKey = (params.get("_refresh") || "").trim();
  

  const [videos, setVideos] = useState([]);
  const [homeRows, setHomeRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const isLoggedIn = !!user?.id;
  const isRatedMode = filter === "rated";
  const isHistoryMode = filter === "history";
  const isWatchLaterMode = filter === "watch-later";
  const isSearching =
    urlQ.length > 0 || isRatedMode || isHistoryMode || isWatchLaterMode;

  useEffect(() => {
    setQ(urlQ);
  }, [urlQ, setQ]);

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);

      try {
        if (isSearching) {
          let vids = [];

          if (isRatedMode) {
            vids = await getVideos({
              filter: "rated",
              sort: sort || "recent-rating",
            });
          } else if (isHistoryMode) {
            vids = await getVideos({
              filter: "history",
              sort: sort || "recent-history",
            });
          } else if (isWatchLaterMode) {
            vids = await getVideos({
              filter: "watch-later",
              sort: sort || "recent-watch-later",
            });
          } else {
            vids = await getVideos({
              q: urlQ,
              sort: sort || "newest",
            });
          }

          if (!alive) return;

          const filteredVids = applyTimeFilter(
            Array.isArray(vids) ? vids : [],
            time
          );

          setVideos(filteredVids);
          setHomeRows([]);
          return;
        }

        if (isLoggedIn) {
          const rows = await getHomeRows();
          if (!alive) return;
          setHomeRows(Array.isArray(rows) ? rows : []);
          setVideos([]);
          return;
        }

        const vids = await getVideos({});
        if (!alive) return;

        const filteredVids = applyTimeFilter(
          Array.isArray(vids) ? vids : [],
          time
        );

        setVideos(filteredVids);
        setHomeRows([]);
      } catch (e) {
        console.error("Home fetch failed:", e);
        if (!alive) return;
        setVideos([]);
        setHomeRows([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [
    urlQ,
    filter,
    sort,
    time,
    refreshKey,
    isRatedMode,
    isHistoryMode,
    isWatchLaterMode,
    isSearching,
    isLoggedIn,
  ]);

  const tagRows = useMemo(() => {
    if (isSearching || isLoggedIn) return [];
    return buildRowsByTags(videos, { maxRows: 8, minCount: 2 });
  }, [isSearching, isLoggedIn, videos]);

  if (isSearching) {
    const headerLabel = isRatedMode
      ? "Recently Rated"
      : isHistoryMode
      ? "Watch History"
      : isWatchLaterMode
      ? "Watch Later"
      : `Results for “${urlQ}”`;

    return (
      <div className="page page--home">
        <div className="resultsHeader">
          <div className="resultsHeaderBar">
            <div className="resultsHeaderInner">
              {loading ? (
                <span>
                  {isRatedMode
                    ? "Loading recently rated…"
                    : isHistoryMode
                    ? "Loading history…"
                    : isWatchLaterMode
                    ? "Loading Watch Later…"
                    : "Searching…"}
                </span>
              ) : (
                <span>
                  {headerLabel} <span className="resultsCount">({videos.length})</span>
                </span>
              )}
            </div>

            <div className="resultsControls">
              <div className="resultsSort">
                <span className="resultsSortLabel">Sort:</span>
                <select
                  className="resultsSortSelect"
                  value={
                    isRatedMode
                      ? sort || "recent-rating"
                      : isHistoryMode
                      ? sort || "recent-history"
                      : isWatchLaterMode
                      ? sort || "recent-watch-later"
                      : sort || "newest"
                  }
                  onChange={(e) => setParam({ sort: e.target.value })}
                >
                  {isRatedMode ? (
                    <>
                      <option value="recent-rating">Recently rated</option>
                      <option value="highest">Highest rated</option>
                      <option value="views">Most views</option>
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                    </>
                  ) : isHistoryMode ? (
                    <>
                      <option value="recent-history">Recently watched</option>
                      <option value="highest">Highest rated</option>
                      <option value="views">Most views</option>
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                    </>
                  ) : isWatchLaterMode ? (
                    <>
                      <option value="recent-watch-later">Recently added</option>
                      <option value="highest">Highest rated</option>
                      <option value="views">Most views</option>
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                    </>
                  ) : (
                    <>
                      <option value="newest">Newest</option>
                      <option value="highest">Highest rated</option>
                      <option value="views">Most views</option>
                      <option value="oldest">Oldest</option>
                    </>
                  )}
                </select>
              </div>

              <div className="resultsSort">
                <span className="resultsSortLabel">Time:</span>
                <select
                  className="resultsSortSelect"
                  value={time || "all"}
                  onChange={(e) => setParam({ time: e.target.value })}
                >
                  <option value="24h">Past 24 hours</option>
                  <option value="week">Past week</option>
                  <option value="month">Past month</option>
                  <option value="year">Past year</option>
                  <option value="all">All time</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {!loading && videos.length === 0 ? (
          <div className="emptyState">
            <div className="emptyStateInner">
              <div className="emptyTitle">
                {isRatedMode
                  ? "No rated videos yet"
                  : isHistoryMode
                  ? "No watch history yet"
                  : isWatchLaterMode
                  ? "No Watch Later videos yet"
                  : "No results"}
              </div>

              <div className="emptySub">
                {isRatedMode ? (
                  "Videos you rate will appear here."
                ) : isHistoryMode ? (
                  "Videos you watch will appear here."
                ) : isWatchLaterMode ? (
                  "Videos you save for later will appear here."
                ) : (
                  <>
                    Would you like to{" "}
                    {user ? (
                      <Link to="/create" className="createLink">
                        create it?
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="plainBtn"
                        onClick={() => onRequireLogin?.("/create")}
                      >
                        create it?
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="resultsGrid">
            {videos.map((video, idx) => (
              <VideoCard
                key={video.id}
                video={video}
                locked={!isLoggedIn && idx >= 2}
                onRequireLogin={onRequireLogin}
                user={user}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  let cursor = 0;

  return (
    <div className="page page--home">
      {loading ? (
        <div className="loading loadingPanel">Loading…</div>
      ) : (
        <div className="feedInner">
          {isLoggedIn
            ? homeRows.map((row) => {
                const startIndex = cursor;
                cursor += (row.videos || []).length;

                return (
                  <VideoShelf
                    key={row.key}
                    title={row.title}
                    videos={row.videos || []}
                    user={user}
                    onRequireLogin={onRequireLogin}
                    startIndex={startIndex}
                    lockAfter={2}
                  />
                );
              })
            : tagRows.map((row) => {
                const startIndex = cursor;
                cursor += row.videos.length;

                return (
                  <VideoShelf
                    key={row.key}
                    title={row.title}
                    videos={row.videos}
                    user={user}
                    onRequireLogin={onRequireLogin}
                    startIndex={startIndex}
                    lockAfter={2}
                  />
                );
              })}
        </div>
      )}
    </div>
  );
}