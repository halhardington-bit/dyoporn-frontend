import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getModerationUsers } from "../../api.js";
import "./ModerationUsers.css";

const PAGE_SIZE = 50;

const FILTER_OPTIONS = [
  { value: "all", label: "All fields" },
  { value: "id", label: "ID" },
  { value: "username", label: "Username" },
  { value: "email", label: "Email" },
  { value: "displayName", label: "Display name" },
];

export default function ModerationUsers() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);

  const [q, setQ] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getModerationUsers({
          q,
          filterBy,
          limit: PAGE_SIZE,
          offset,
        });

        if (!alive) return;
        setRows(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!alive) return;
        setRows([]);
        setError(err?.message || "Failed to load users");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [q, filterBy, offset]);

  function submitSearch(e) {
    e.preventDefault();
    setOffset(0);
    setQ(searchValue.trim());
  }

  const canGoPrev = offset > 0;
  const canGoNext = rows.length === PAGE_SIZE;

  return (
    <div className="page page--moderationUsers">
      <div className="moderationUsersHeader">
        <div className="moderationUsersHeaderText">
          <div className="moderationUsersEyebrow">Moderation</div>
          <h1 className="moderationUsersTitle">Manage Users</h1>
          <p className="moderationUsersSub">
            Search accounts, inspect user metrics, and manage permissions or restrictions.
          </p>
        </div>

        <div className="moderationUsersHeaderActions">
          <Link to="/moderation" className="moderationUsersBackBtn">
            ← Back to Moderation
          </Link>
        </div>
      </div>

      <div className="moderationUsersPanel">
        <div className="moderationUsersPanelTop">
          <div className="moderationUsersPanelTitle">User Directory</div>
          <div className="moderationUsersPageInfo">Showing up to 50 users</div>
        </div>

        <div className="moderationUsersToolbar">
          <form className="moderationUsersSearch" onSubmit={submitSearch}>
            <select
              className="moderationUsersFilterSelect"
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
              className="moderationUsersSearchInput"
              placeholder="Search users..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />

            <button type="submit" className="moderationUsersSearchBtn">
              Search
            </button>
          </form>
        </div>

        {error ? <div className="moderationUsersError">{error}</div> : null}

        {loading ? (
          <div className="moderationUsersEmpty">Loading users…</div>
        ) : rows.length === 0 ? (
          <div className="moderationUsersEmpty">No users found.</div>
        ) : (
          <>
            <div className="moderationUsersTableWrap">
              <table className="moderationUsersTable">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Tokens</th>
                    <th>Rating</th>
                    <th>Reviews</th>
                    <th>Moderator</th>
                    <th>Plan</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row) => {
                    const label =
                        row.displayName || row.username || `User #${row.id}`;

                    return (
                      <tr key={row.id}>
                        <td>
                          <Link
                            to={`/moderation/users/${row.id}`}
                            className="moderationUsersLink"
                          >
                            {label}
                          </Link>

                          <div className="moderationUsersMeta">
                            @{row.username || "unknown"}
                          </div>
                        </td>

                        <td>{row.id}</td>
                        <td>{row.email || "—"}</td>
                        <td>{Number(row.tokens ?? 0).toLocaleString()}</td>
                        <td>{row.ratingAvg != null ? Number(row.ratingAvg).toFixed(2) : "—"}</td>
                        <td>{row.reviewCount ?? 0}</td>
                        <td>
                          <span
                            className={`moderationUsersBadge ${
                              row.isModerator ? "isModerator" : "notModerator"
                            }`}
                          >
                            {row.isModerator ? "Moderator" : "User"}
                          </span>
                        </td>
                        <td>{row.tier || "Free"}</td>
                        <td>
                          <div className="moderationUsersStatusStack">
                            {row.isBanned ? (
                              <span className="moderationUsersBadge banned">Banned</span>
                            ) : null}

                            {row.isCommentShadowbanned ? (
                              <span className="moderationUsersBadge shadow">
                                Shadow banned
                              </span>
                            ) : null}

                            {!row.isBanned && !row.isCommentShadowbanned ? (
                              <span className="moderationUsersBadge normal">Normal</span>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="moderationUsersPagination">
              <button
                type="button"
                className="moderationUsersPageBtn"
                disabled={!canGoPrev}
                onClick={() => setOffset((prev) => Math.max(0, prev - PAGE_SIZE))}
              >
                Previous 50
              </button>

              <div className="moderationUsersPageCount">Offset: {offset}</div>

              <button
                type="button"
                className="moderationUsersPageBtn"
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