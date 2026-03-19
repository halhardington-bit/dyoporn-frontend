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

export default function Home({ user, onRequireLogin }) {
  const outlet = useOutletContext?.() || {};
  const setQ = outlet.setQ || (() => {});

  const [params] = useSearchParams();

  const urlQ = (params.get("q") || "").trim();
  const filter = (params.get("filter") || "").trim().toLowerCase();
  const sort = (params.get("sort") || "").trim().toLowerCase();

  const [videos, setVideos] = useState([]);
  const [homeRows, setHomeRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const isLoggedIn = !!user?.id;
  const isRatedMode = filter === "rated";
  const isHistoryMode = filter === "history";
  const isSearching = urlQ.length > 0 || isRatedMode || isHistoryMode;

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
          } else {
            vids = await getVideos({ q: urlQ });
          }

          if (!alive) return;
          setVideos(Array.isArray(vids) ? vids : []);
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
        setVideos(Array.isArray(vids) ? vids : []);
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
  }, [urlQ, filter, sort, isRatedMode, isHistoryMode, isSearching, isLoggedIn]);

  const tagRows = useMemo(() => {
    if (isSearching || isLoggedIn) return [];
    return buildRowsByTags(videos, { maxRows: 8, minCount: 2 });
  }, [isSearching, isLoggedIn, videos]);

  if (isSearching) {
    const headerLabel = isRatedMode
      ? "Recently Rated"
      : isHistoryMode
      ? "Watch History"
      : `Results for “${urlQ}”`;

    return (
      <div className="page">
        <div className="resultsHeader">
          {loading ? (
            <span>
              {isRatedMode
                ? "Loading recently rated…"
                : isHistoryMode
                ? "Loading history…"
                : "Searching…"}
            </span>
          ) : (
            <span>
              {headerLabel} ({videos.length})
            </span>
          )}
        </div>

        {!loading && videos.length === 0 ? (
          <div className="emptyState">
            <div className="emptyTitle">
              {isRatedMode
                ? "No rated videos yet"
                : isHistoryMode
                ? "No watch history yet"
                : "No results"}
            </div>

            <div className="emptySub">
              {isRatedMode ? (
                "Videos you rate will appear here."
              ) : isHistoryMode ? (
                "Videos you watch will appear here."
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
        ) : (
          <div className="resultsGrid">
            {videos.map((video, idx) => (
              <VideoCard
                key={video.id}
                video={video}
                locked={!isLoggedIn && idx >= 2}
                onRequireLogin={onRequireLogin}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  let cursor = 0;

  return (
    <div className="page">
      {loading ? (
        <div className="loading">Loading…</div>
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