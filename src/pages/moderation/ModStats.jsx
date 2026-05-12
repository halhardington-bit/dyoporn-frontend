import { useEffect, useMemo, useState } from "react";
import { getModStats } from "../../api.js";
import "./ModStats.css";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function StatCard({ label, value, sub }) {
  return (
    <div className="modStatCard">
      <div className="modStatLabel">{label}</div>
      <div className="modStatValue">{Number(value || 0).toLocaleString()}</div>
      {sub ? <div className="modStatSub">{sub}</div> : null}
    </div>
  );
}

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString();
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

  const referralSources = useMemo(() => {
    return (data?.referrals?.sources || []).map((row) => ({
      source: row.source || "unknown",
      count: Number(row.count || 0),
    }));
  }, [data]);

  const referralTotal = Number(data?.referrals?.total || 0);

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
            <StatCard
              label="Logged-in visitors"
              value={totals.loggedInVisitors}
            />
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
                  {(data?.daily || []).map((row) => (
                    <tr key={row.day}>
                      <td>{formatDate(row.day)}</td>
                      <td>{Number(row.site_visits || 0).toLocaleString()}</td>
                      <td>
                        {Number(row.unique_visitors || 0).toLocaleString()}
                      </td>
                      <td>
                        {Number(row.minutes_watched || 0).toLocaleString()}
                      </td>
                      <td>{Number(row.beta_signups || 0).toLocaleString()}</td>
                      <td>{Number(row.uploads || 0).toLocaleString()}</td>
                      <td>
                        {Number(row.reports_created || 0).toLocaleString()}
                      </td>
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
                {(data?.topVideos || []).length > 0 ? (
                  data.topVideos.map((video) => (
                    <div className="modStatsListItem" key={video.id}>
                      <div>
                        <strong>{video.title}</strong>
                        <span>
                          {video.displayName ||
                            video.username ||
                            "Unknown creator"}
                        </span>
                      </div>

                      <div className="modStatsListMeta">
                        {Number(video.minutesWatched || 0).toLocaleString()} min
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="modStatsEmpty">No watched videos yet.</div>
                )}
              </div>
            </div>

            <div className="modStatsPanel">
              <div className="modStatsPanelHead">
                <h2>Most reported videos</h2>
              </div>

              <div className="modStatsList">
                {(data?.topReported || []).length > 0 ? (
                  data.topReported.map((video) => (
                    <div
                      className="modStatsListItem"
                      key={video.videoId || video.title}
                    >
                      <div>
                        <strong>{video.title}</strong>
                        <span>
                          {video.displayName ||
                            video.username ||
                            "Unknown creator"}
                        </span>
                      </div>

                      <div className="modStatsListMeta">
                        {Number(video.reports || 0).toLocaleString()} reports
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="modStatsEmpty">No reports yet.</div>
                )}
              </div>
            </div>
          </section>

          <section className="modStatsPanel modStatsReferralPanel">
            <div className="modStatsPanelHead modStatsReferralHead">
              <div>
                <h2>Referral Traffic</h2>
                <p>Visits captured from referral links like ?ref=4chan.</p>
              </div>

              <div className="modStatsReferralTotal">
                <span>Total referrals</span>
                <strong>{referralTotal.toLocaleString()}</strong>
              </div>
            </div>

            {referralSources.length > 0 ? (
              <div className="modStatsChart modStatsReferralChart">
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={referralSources} margin={{ top: 18, right: 18, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(244, 241, 234, 0.12)" />
                  <XAxis
                    dataKey="source"
                    tick={{ fill: "rgba(244, 241, 234, 0.62)", fontSize: 12 }}
                    axisLine={{ stroke: "rgba(244, 241, 234, 0.16)" }}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fill: "rgba(244, 241, 234, 0.62)", fontSize: 12 }}
                    axisLine={{ stroke: "rgba(244, 241, 234, 0.16)" }}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(211, 173, 95, 0.08)" }}
                    contentStyle={{
                      background: "rgba(15, 15, 18, 0.96)",
                      border: "1px solid rgba(244, 241, 234, 0.1)",
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
                    name="Visits"
                    fill="#d3ad5f"
                    radius={[10, 10, 0, 0]}
                    maxBarSize={80}
                  />
                </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="modStatsEmpty">
                No referral visits recorded yet.
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}