import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getModerationVideos,
  updateModerationVideoVisibility,
} from "../../api.js";
import "./ModerationVideos.css";

const PAGE_SIZE = 50;

const FILTER_OPTIONS = [
  { value: "all", label: "All fields" },
  { value: "id", label: "ID" },
  { value: "title", label: "Title" },
  { value: "username", label: "Username" },
  { value: "visibility", label: "Visibility" },
];

const VISIBILITY_OPTIONS = ["public", "private", "unlisted", "shadow"];

function formatDuration(seconds) {
  const total = Math.max(0, Math.floor(Number(seconds || 0)));
  const mins = Math.floor(total / 60);
  const secs = total % 60;

  return `${mins}:${String(secs).padStart(2, "0")}`;
}

export default function ModerationVideos() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);

  const [q, setQ] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  useEffect(() => {
    let alive = true;

    async function loadVideos() {
      try {
        setLoading(true);
        setError("");

        const data = await getModerationVideos({
          q,
          filterBy,
          limit: PAGE_SIZE,
          offset,
        });

        if (!alive) return;

        setRows(Array.isArray(data) ? data : data?.videos || []);
      } catch (err) {
        if (!alive) return;

        setRows([]);
        setError(err?.message || "Failed to load videos");
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadVideos();

    return () => {
      alive = false;
    };
  }, [q, filterBy, offset]);

  function submitSearch(e) {
    e.preventDefault();
    setOffset(0);
    setQ(searchValue.trim());
  }

  async function changeVisibility(videoId, visibility) {
    const previousRows = rows;

    setRows((current) =>
      current.map((row) =>
        row.id === videoId ? { ...row, visibility } : row
      )
    );

    try {
      setSavingId(videoId);
      setError("");
      await updateModerationVideoVisibility(videoId, visibility);
    } catch (err) {
      setRows(previousRows);
      setError(err?.message || "Failed to update visibility");
    } finally {
      setSavingId(null);
    }
  }

  const canGoPrev = offset > 0;
  const canGoNext = rows.length === PAGE_SIZE;

  return (
    <div className="page page--moderationVideos">
      <div className="moderationVideosHeader">
        <div className="moderationVideosHeaderText">
          <div className="moderationVideosEyebrow">Moderation</div>
          <h1 className="moderationVideosTitle">Manage Videos</h1>
          <p className="moderationVideosSub">
            Search uploads, review video metrics, and update visibility status.
          </p>
        </div>

        <div className="moderationVideosHeaderActions">
          <Link to="/moderation" className="moderationVideosBackBtn">
            ← Back to Moderation
          </Link>
        </div>
      </div>

      <div className="moderationVideosPanel">
        <div className="moderationVideosPanelTop">
          <div className="moderationVideosPanelTitle">Video Directory</div>
          <div className="moderationVideosPageInfo">Showing up to 50 videos</div>
        </div>

        <div className="moderationVideosToolbar">
          <form className="moderationVideosSearch" onSubmit={submitSearch}>
            <select
              className="moderationVideosFilterSelect"
              value={filterBy}
              onChange={(e) => {
                setFilterBy(e.target.value);
                setOffset(0);
              }}
            >
              {FILTER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <input
              type="text"
              className="moderationVideosSearchInput"
              placeholder="Search videos..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />

            <button type="submit" className="moderationVideosSearchBtn">
              Search
            </button>
          </form>
        </div>

        {error ? <div className="moderationVideosError">{error}</div> : null}

        {loading ? (
          <div className="moderationVideosEmpty">Loading videos…</div>
        ) : rows.length === 0 ? (
          <div className="moderationVideosEmpty">No videos found.</div>
        ) : (
          <>
            <div className="moderationVideosTableWrap">
              <table className="moderationVideosTable">
                <thead>
                  <tr>
                    <th>Video</th>
                    <th>ID</th>
                    <th>Creator</th>
                    <th>Views</th>
                    <th>Rating</th>
                    <th>Ratings</th>
                    <th>Comments</th>
                    <th>Duration</th>
                    <th>Visibility</th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row) => {
                    const title = row.title || `Video #${row.id}`;
                    const visibility = row.visibility || "public";

                    return (
                      <tr key={row.id}>
                        <td>
                          <Link
                            to={`/moderation/videos/${row.id}`}
                            className="moderationVideosLink"
                          >
                            {title}
                          </Link>

                          <div className="moderationVideosMeta">
                            {row.createdAt
                              ? new Date(row.createdAt).toLocaleString()
                              : "No date"}
                          </div>
                        </td>

                        <td>{row.id}</td>

                        <td>
                          {row.userId ? (
                            <Link
                              to={`/moderation/users/${row.userId}`}
                              className="moderationVideosLink"
                            >
                              @{row.username || "unknown"}
                            </Link>
                          ) : (
                            "—"
                          )}
                        </td>

                        <td>{Number(row.views ?? 0).toLocaleString()}</td>

                        <td>
                          {row.ratingAvg != null
                            ? Number(row.ratingAvg).toFixed(2)
                            : "—"}
                        </td>

                        <td>{Number(row.ratingCount ?? 0).toLocaleString()}</td>
                        <td>{Number(row.commentCount ?? 0).toLocaleString()}</td>

                        <td>
                          {row.durationText || formatDuration(row.duration)}
                        </td>

                        <td>
                          <select
                            className={`moderationVideosVisibilitySelect ${visibility}`}
                            value={visibility}
                            disabled={savingId === row.id}
                            onChange={(e) =>
                              changeVisibility(row.id, e.target.value)
                            }
                          >
                            {VISIBILITY_OPTIONS.map((status) => (
                              <option key={status} value={status}>
                                {status[0].toUpperCase() + status.slice(1)}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="moderationVideosPagination">
              <button
                type="button"
                className="moderationVideosPageBtn"
                disabled={!canGoPrev}
                onClick={() =>
                  setOffset((prev) => Math.max(0, prev - PAGE_SIZE))
                }
              >
                Previous 50
              </button>

              <div className="moderationVideosPageCount">Offset: {offset}</div>

              <button
                type="button"
                className="moderationVideosPageBtn"
                disabled={!canGoNext}
                onClick={() => setOffset((prev) => prev + PAGE_SIZE)}
              >
                Next 50
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}