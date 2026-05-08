import { useEffect, useMemo, useState } from "react";
import { getModStats } from "../../api.js";
import "./ModStats.css";

function StatCard({ label, value, sub }) {
  return (
    <div className="modStatCard">
      <div className="modStatLabel">{label}</div>
      <div className="modStatValue">{value}</div>
      {sub ? <div className="modStatSub">{sub}</div> : null}
    </div>
  );
}

export default function ModStats() {
  const [days, setDays] = useState(7);
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setErr("");
        const stats = await getModStats(days);
        if (alive) setData(stats);
      } catch (e) {
        if (alive) setErr(e.message || "Failed to load stats");
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();

    return () => {
      alive = false;
    };
  }, [days]);

  const totals = useMemo(() => {
    const daily = data?.daily || [];

    return daily.reduce(
      (acc, row) => {
        acc.siteVisits += Number(row.site_visits || 0);
        acc.uniqueVisitors += Number(row.unique_visitors || 0);
        acc.loggedInVisitors += Number(row.logged_in_visitors || 0);
        acc.minutesWatched += Number(row.minutes_watched || 0);
        acc.videosWatched += Number(row.videos_watched || 0);
        acc.betaSignups += Number(row.beta_signups || 0);
        acc.uploads += Number(row.uploads || 0);
        acc.reportsCreated += Number(row.reports_created || 0);
        acc.reportsActioned += Number(row.reports_actioned || 0);
        return acc;
      },
      {
        siteVisits: 0,
        uniqueVisitors: 0,
        loggedInVisitors: 0,
        minutesWatched: 0,
        videosWatched: 0,
        betaSignups: 0,
        uploads: 0,
        reportsCreated: 0,
        reportsActioned: 0,
      }
    );
  }, [data]);

  return (
    <main className="modStatsPage">
      <section className="modStatsHero">
        <div>
          <div className="modStatsKicker">Moderation</div>
          <h1>Stats</h1>
          <p>
            Daily visibility for traffic, watch activity, beta sign-ups,
            uploads, and moderation workload.
          </p>
        </div>

        <select
          className="modStatsSelect"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
        >
          <option value={1}>Last 24 hours</option>
          <option value={7}>Last 7 days</option>
          <option value={14}>Last 14 days</option>
          <option value={30}>Last 30 days</option>
        </select>
      </section>

      {loading ? (
        <div className="modStatsNotice">Loading stats...</div>
      ) : err ? (
        <div className="modStatsNotice error">{err}</div>
      ) : (
        <>
          <section className="modStatsGrid">
            <StatCard label="Site visits" value={totals.siteVisits} />
            <StatCard label="Unique visitors" value={totals.uniqueVisitors} />
            <StatCard label="Logged-in visitors" value={totals.loggedInVisitors} />
            <StatCard label="Minutes watched" value={totals.minutesWatched} />
            <StatCard label="Videos watched" value={totals.videosWatched} />
            <StatCard label="Beta sign-ups" value={totals.betaSignups} />
            <StatCard label="New uploads" value={totals.uploads} />
            <StatCard label="Reports created" value={totals.reportsCreated} />
            <StatCard label="Reports actioned" value={totals.reportsActioned} />
          </section>

          <section className="modStatsPanel">
            <div className="modStatsPanelHead">
              <h2>Daily activity</h2>
            </div>

            <div className="modStatsTableWrap">
              <table className="modStatsTable">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Visits</th>
                    <th>Visitors</th>
                    <th>Minutes watched</th>
                    <th>Beta sign-ups</th>
                    <th>Uploads</th>
                    <th>Reports</th>
                  </tr>
                </thead>
                <tbody>
                  {(data.daily || []).map((row) => (
                    <tr key={row.day}>
                      <td>{new Date(row.day).toLocaleDateString()}</td>
                      <td>{row.site_visits}</td>
                      <td>{row.unique_visitors}</td>
                      <td>{row.minutes_watched}</td>
                      <td>{row.beta_signups}</td>
                      <td>{row.uploads}</td>
                      <td>{row.reports_created}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="modStatsTwoCol">
            <div className="modStatsPanel">
              <div className="modStatsPanelHead">
                <h2>Videos Most Minutes Watched</h2>
              </div>

              <div className="modStatsList">
                {(data.topVideos || []).map((video) => (
                  <div className="modStatsListItem" key={video.id}>
                    <div>
                      <strong>{video.title}</strong>
                      <span>{video.username || "Unknown creator"}</span>
                    </div>
                    <div className="modStatsListMeta">
                      {video.minutesWatched} min
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="modStatsPanel">
              <div className="modStatsPanelHead">
                <h2>Most reported videos</h2>
              </div>

              <div className="modStatsList">
                {(data.topReported || []).map((video) => (
                    <div className="modStatsListItem" key={video.videoId || video.title}>
                        <div>
                        <strong>{video.title}</strong>
                        <span>{video.displayName || video.username || "Unknown creator"}</span>
                        </div>

                        <div className="modStatsListMeta">
                        {Number(video.reports || 0)} reports
                        </div>
                    </div>
                    ))}
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}