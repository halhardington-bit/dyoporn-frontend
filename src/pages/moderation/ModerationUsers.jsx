import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getModerationUsers } from "../../api.js";
import "./ModerationUsers.css";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

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

  const referralChartData = Object.values(
  rows.reduce((acc, row) => {
    const source =
      row.referralSource &&
      row.referralSource !== "unknown"
        ? row.referralSource
        : "Other";

    if (!acc[source]) {
      acc[source] = {
        source,
        count: 0,
      };
    }

    acc[source].count += 1;

    return acc;
  }, {})
).sort((a, b) => b.count - a.count);

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
        <section className="moderationUsersReferralPanel">
  <div className="moderationUsersReferralHead">
    <div>
      <div className="moderationUsersPanelTitle">
        User Referral Sources
      </div>

      <p className="moderationUsersReferralSub">
        Where currently listed users originally came from.
      </p>
    </div>

    <div className="moderationUsersReferralTotal">
      <span>Total users</span>
      <strong>{rows.length}</strong>
    </div>
  </div>

  {referralChartData.length > 0 ? (
    <div className="moderationUsersReferralChart">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={referralChartData}
          margin={{ top: 16, right: 12, left: 0, bottom: 8 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(244,241,234,0.08)"
          />

          <XAxis
            dataKey="source"
            tick={{
              fill: "rgba(244,241,234,0.65)",
              fontSize: 12,
            }}
            tickLine={false}
            axisLine={{
              stroke: "rgba(244,241,234,0.12)",
            }}
          />

          <YAxis
            allowDecimals={false}
            tick={{
              fill: "rgba(244,241,234,0.65)",
              fontSize: 12,
            }}
            tickLine={false}
            axisLine={{
              stroke: "rgba(244,241,234,0.12)",
            }}
          />

          <Tooltip
            cursor={{
              fill: "rgba(211,173,95,0.06)",
            }}
            contentStyle={{
              background: "rgba(12,12,14,0.96)",
              border: "1px solid rgba(244,241,234,0.08)",
              borderRadius: 12,
              color: "#f4f1ea",
            }}
            labelStyle={{
              color: "#d3ad5f",
              marginBottom: 6,
            }}
          />

          <Bar
            dataKey="count"
            fill="#d3ad5f"
            radius={[10, 10, 0, 0]}
            maxBarSize={80}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  ) : (
    <div className="moderationUsersEmpty">
      No referral data available.
    </div>
  )}
</section>
    </div>
  );
}