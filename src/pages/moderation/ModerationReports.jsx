import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getModerationReports, resolveModerationReport } from "../../api.js";
import "./ModerationReports.css";

export default function ModerationReports() {
  const [archived, setArchived] = useState(false);
  const [q, setQ] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getModerationReports({
          archived,
          q,
          limit: 100,
          offset,
        });

        if (!alive) return;
        setRows(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!alive) return;
        setRows([]);
        setError(err?.message || "Failed to load reports");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [archived, q, offset]);

  async function handleResolve(reportId, action) {
    try {
      setBusyId(reportId);
      setError("");
      await resolveModerationReport(reportId, action);
      setRows((prev) => prev.filter((row) => row.id !== reportId));
    } catch (err) {
      setError(err?.message || "Failed to resolve report");
    } finally {
      setBusyId(null);
    }
  }

  function submitSearch(e) {
    e.preventDefault();
    setOffset(0);
    setQ(searchValue.trim());
  }

  function switchArchive(nextArchived) {
    setArchived(nextArchived);
    setOffset(0);
  }

  const canGoPrev = offset > 0;
  const canGoNext = rows.length === 100;

  return (
    <div className="page page--moderationReports">
      <div className="moderationReportsHeader">
        <div className="moderationReportsHeaderText">
          <div className="moderationReportsEyebrow">Moderation</div>
          <h1 className="moderationReportsTitle">Manage Reports</h1>
          <p className="moderationReportsSub">
            Review submitted reports and decide whether they pass or fail moderation.
          </p>
        </div>

        <div className="moderationReportsHeaderActions">
          <Link to="/moderation" className="moderationReportsBackBtn">
            ← Back to Moderation
          </Link>
        </div>
      </div>

      <div className="moderationReportsPanel">
        <div className="moderationReportsPanelTop">
          <div className="moderationReportsPanelTitle">
            {archived ? "Archived Reports" : "Outstanding Reports"}
          </div>

          <div className="moderationReportsToggles">
            <button
              type="button"
              className={`moderationReportsToggle ${!archived ? "active" : ""}`}
              onClick={() => switchArchive(false)}
            >
              Outstanding
            </button>

            <button
              type="button"
              className={`moderationReportsToggle ${archived ? "active" : ""}`}
              onClick={() => switchArchive(true)}
            >
              Archived
            </button>
          </div>
        </div>

        <div className="moderationReportsToolbar">
          <form className="moderationReportsSearch" onSubmit={submitSearch}>
            <input
              type="text"
              className="moderationReportsSearchInput"
              placeholder="Search by user ID, username, video, video ID, report reason, comment, or reporter ID"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type="submit" className="moderationReportsSearchBtn">
              Search
            </button>
          </form>

          <div className="moderationReportsPageInfo">
            Showing up to 100 reports
          </div>
        </div>

        {error ? <div className="moderationReportsError">{error}</div> : null}

        {loading ? (
          <div className="moderationReportsEmpty">Loading reports…</div>
        ) : rows.length === 0 ? (
          <div className="moderationReportsEmpty">
            {archived ? "No archived reports." : "No outstanding reports."}
          </div>
        ) : (
          <>
            <div className="moderationReportsTableWrap">
              <table className="moderationReportsTable">
                <thead>
                  <tr>
                    <th>Video</th>
                    <th>User</th>
                    <th>Reporter</th>
                    <th>Report Reason</th>
                    <th>Comments</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row) => {
                    const userLabel = row.displayName || row.username || "Unknown user";
                    const reporterLabel =
                      row.reporterDisplayName ||
                      row.reporterUsername ||
                      (row.reporterId ? `Reporter #${row.reporterId}` : "Unknown reporter");

                    const isBusy = busyId === row.id;

                    return (
                      <tr key={row.id}>
                        <td>
                          <Link
                            to={`/watch/${row.videoId}`}
                            className="moderationReportsLink"
                          >
                            {row.videoTitle || `Video #${row.videoId}`}
                          </Link>

                          <div className="moderationReportsMeta">
                            Video ID: {row.videoId}
                            {row.visibility ? ` • Visibility: ${row.visibility}` : ""}
                          </div>
                        </td>

                        <td>
                          {row.username ? (
                            <Link
                              to={`/u/${row.username}`}
                              className="moderationReportsLink"
                            >
                              {userLabel}
                            </Link>
                          ) : (
                            <span>{userLabel}</span>
                          )}

                          <div className="moderationReportsMeta">
                            User ID: {row.userId ?? "—"}
                          </div>
                        </td>

                        <td>
                          {row.reporterUsername ? (
                            <Link
                              to={`/u/${row.reporterUsername}`}
                              className="moderationReportsLink"
                            >
                              {reporterLabel}
                            </Link>
                          ) : (
                            <span>{reporterLabel}</span>
                          )}

                          <div className="moderationReportsMeta">
                            Reporter ID: {row.reporterId ?? "—"}
                          </div>
                        </td>

                        <td>{row.offense || "—"}</td>

                        <td>
                          {row.comments ? (
                            <div className="moderationReportsComments">
                              {row.comments}
                            </div>
                          ) : (
                            <span className="moderationReportsMuted">—</span>
                          )}
                        </td>

                        <td>
                          {row.status === "archived" ? (
                            <span className="moderationReportsBadge archived">
                              {row.actionTaken === "fail" ? "Failed" : "Passed"}
                            </span>
                          ) : (
                            <span className="moderationReportsBadge open">Open</span>
                          )}
                        </td>

                        <td>
                          {row.status === "archived" ? (
                            <span className="moderationReportsMuted">Archived</span>
                          ) : (
                            <div className="moderationReportsActions">
                              <button
                                type="button"
                                className="moderationReportsActionBtn"
                                disabled={isBusy}
                                onClick={() => handleResolve(row.id, "pass")}
                              >
                                {isBusy ? "Working..." : "Pass"}
                              </button>

                              <button
                                type="button"
                                className="moderationReportsActionBtn danger"
                                disabled={isBusy}
                                onClick={() => handleResolve(row.id, "fail")}
                              >
                                {isBusy ? "Working..." : "Fail"}
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="moderationReportsPagination">
              <button
                type="button"
                className="moderationReportsPageBtn"
                disabled={!canGoPrev}
                onClick={() => setOffset((prev) => Math.max(0, prev - 100))}
              >
                Previous 100
              </button>

              <div className="moderationReportsPageCount">
                Offset: {offset}
              </div>

              <button
                type="button"
                className="moderationReportsPageBtn"
                disabled={!canGoNext}
                onClick={() => setOffset((prev) => prev + 100)}
              >
                Next 100
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}