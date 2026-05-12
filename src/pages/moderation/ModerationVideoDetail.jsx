import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getModerationVideoById,
  updateModerationVideo,
  getModerationVideoWatchAnalytics,
} from "../../api.js";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import "./ModerationVideoDetail.css";

const VISIBILITY_OPTIONS = ["public", "private", "unlisted", "shadow"];

const CHART_COLORS = [
  "#d3ad5f",
  "#8ecae6",
  "#ffb703",
  "#fb8500",
  "#90be6d",
  "#f28482",
  "#cdb4db",
  "#bde0fe",
];

let referralSourcesGlobal = [];

function getSourceColor(source) {
  if (source === "Total") {
    return "#ffffff";
  }

  const index = referralSourcesGlobal.indexOf(source);

  return CHART_COLORS[
    Math.max(0, index) % CHART_COLORS.length
  ];
}

function formatDuration(seconds) {
  const total = Math.max(0, Math.floor(Number(seconds || 0)));
  const mins = Math.floor(total / 60);
  const secs = total % 60;

  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function formatBucketLabel(seconds) {
  const total = Math.max(0, Math.floor(Number(seconds || 0)));
  const mins = Math.floor(total / 60);
  const secs = total % 60;

  if (mins <= 0) return `${secs}s`;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function WatchAnalyticsTooltip({ active, payload, label, chartSources }) {
  if (!active || !payload?.length) return null;

  const data = payload[0]?.payload;
  if (!data) return null;

  return (
    <div className="watchAnalyticsTooltip">
      <div className="watchAnalyticsTooltipLabel">{label}</div>

      <div className="watchAnalyticsTooltipRows">
        {chartSources.map((source) => (
          <div key={source} className="watchAnalyticsTooltipRow">
            <span>{source}</span>
            <strong>{Number(data[source] || 0)}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ModerationVideoDetail() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [analyticsError, setAnalyticsError] = useState("");
  const [success, setSuccess] = useState("");

  const [video, setVideo] = useState(null);
  const [visibility, setVisibility] = useState("public");
  const [title, setTitle] = useState("");
  const [watchAnalytics, setWatchAnalytics] = useState(null);
  const [soloSource, setSoloSource] = useState(null);
  const [showTotal, setShowTotal] = useState(false);

  useEffect(() => {
    let alive = true;

    async function loadVideo() {
      try {
        setLoading(true);
        setError("");
        setSuccess("");

        const data = await getModerationVideoById(id);
        if (!alive) return;

        setVideo(data || null);
        setTitle(data?.title || "");
        setVisibility(data?.visibility || "public");
      } catch (err) {
        if (!alive) return;
        setError(err?.message || "Failed to load video");
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadVideo();

    return () => {
      alive = false;
    };
  }, [id]);

  useEffect(() => {
    let alive = true;

    async function loadAnalytics() {
      try {
        setAnalyticsLoading(true);
        setAnalyticsError("");

        const data = await getModerationVideoWatchAnalytics(id, 15);
        if (!alive) return;

        setWatchAnalytics(data || null);
      } catch (err) {
        if (!alive) return;
        setAnalyticsError(err?.message || "Failed to load watch analytics");
      } finally {
        if (alive) setAnalyticsLoading(false);
      }
    }

    loadAnalytics();

    return () => {
      alive = false;
    };
  }, [id]);

  const referralSources = useMemo(() => {
    if (!watchAnalytics?.rows?.length) return [];

    return Array.from(
      new Set(
        watchAnalytics.rows.map((row) => row.referral_source || "unknown")
      )
    ).sort();
  }, [watchAnalytics]);

  referralSourcesGlobal = referralSources;

  const analyticsChartData = useMemo(() => {
    if (!watchAnalytics?.rows?.length) return [];

    const bucketSize = Number(watchAnalytics.bucket_size || 15);

    const maxBucket = Math.max(
      ...watchAnalytics.rows.map((row) => Number(row.bucket_start || 0))
    );

    const map = new Map();

    for (
      let bucketStart = 0;
      bucketStart <= maxBucket;
      bucketStart += bucketSize
    ) {
      const entry = {
        bucketStart,
        time: formatBucketLabel(bucketStart),
      };

      for (const source of referralSources) {
        entry[source] = 0;
      }

      entry.Total = 0;

      map.set(String(bucketStart), entry);
    }

    for (const row of watchAnalytics.rows) {
      const bucketStart = Number(row.bucket_start || 0);
      const source = row.referral_source || "unknown";
      const watches = Number(row.watches || 0);

      const entry = map.get(String(bucketStart));

      if (entry) {
        entry[source] = watches;
      }
    }

    for (const entry of map.values()) {
      entry.Total = referralSources.reduce(
        (sum, source) => sum + Number(entry[source] || 0),
        0
      );
    }

    return Array.from(map.values()).sort(
      (a, b) => a.bucketStart - b.bucketStart
    );
  }, [watchAnalytics, referralSources]);

  const allChartSources = useMemo(() => {
    return ["Total", ...referralSources];
  }, [referralSources]);

  const chartSources = useMemo(() => {
    if (showTotal) {
        return ["Total"];
    }

    if (soloSource) {
        return referralSources.filter((source) => source === soloSource);
    }

    return referralSources;
    }, [showTotal, soloSource, referralSources]);

  async function handleSave(e) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await updateModerationVideo(id, {
        title: title.trim(),
        visibility,
      });

      const fresh = await getModerationVideoById(id);

      setVideo(fresh);
      setTitle(fresh?.title || "");
      setVisibility(fresh?.visibility || "public");
      setSuccess("Video updated.");
    } catch (err) {
      setError(err?.message || "Failed to update video");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="page page--moderationVideoDetail">
        <div className="moderationVideoDetailEmpty">Loading video…</div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="page page--moderationVideoDetail">
        <div className="moderationVideoDetailEmpty">Video not found.</div>
      </div>
    );
  }

  const displayTitle = video.title || `Video #${video.id}`;

  return (
    <div className="page page--moderationVideoDetail">
      <div className="moderationVideoDetailHeader">
        <div className="moderationVideoDetailHeaderText">
          <div className="moderationVideoDetailEyebrow">Moderation</div>
          <h1 className="moderationVideoDetailTitle">{displayTitle}</h1>
          <p className="moderationVideoDetailSub">
            Review video stats, creator details, visibility controls, and watch
            retention by referral source.
          </p>
        </div>

        <div className="moderationVideoDetailHeaderActions">
          <Link to="/moderation/videos" className="moderationVideoDetailBackBtn">
            ← Back to Video Manager
          </Link>
        </div>
      </div>

      <div className="moderationVideoDetailGrid">
        <section className="moderationVideoDetailCard">
          <div className="moderationVideoDetailCardTitle">Video Overview</div>

          <div className="moderationVideoDetailFacts">
            <div>
              <span>ID:</span> {video.id}
            </div>
            <div>
              <span>Title:</span> {video.title || "—"}
            </div>
            <div>
              <span>Creator:</span> @{video.username || "unknown"}
            </div>
            <div>
              <span>User ID:</span> {video.userId || video.user_id || "—"}
            </div>
            <div>
              <span>Views:</span>{" "}
              {Number(video.views ?? 0).toLocaleString()}
            </div>
            <div>
              <span>Rating:</span>{" "}
              {video.ratingAvg != null
                ? Number(video.ratingAvg).toFixed(2)
                : "—"}
            </div>
            <div>
              <span>Ratings:</span>{" "}
              {Number(video.ratingCount ?? 0).toLocaleString()}
            </div>
            <div>
              <span>Comments:</span>{" "}
              {Number(video.commentCount ?? 0).toLocaleString()}
            </div>
            <div>
              <span>Duration:</span>{" "}
              {video.durationText || formatDuration(video.duration)}
            </div>
            <div>
              <span>Created:</span>{" "}
              {video.createdAt
                ? new Date(video.createdAt).toLocaleString()
                : "—"}
            </div>
          </div>

          <div className="moderationVideoDetailStatusRow">
            <span
              className={`moderationVideoDetailBadge ${
                video.visibility || "public"
              }`}
            >
              {video.visibility || "public"}
            </span>
          </div>

          <div className="moderationVideoDetailQuickLinks">
            <Link
              to={`/watch/${video.id}`}
              className="moderationVideoDetailBackBtn"
            >
              Open Watch Page
            </Link>

            {video.userId || video.user_id ? (
              <Link
                to={`/moderation/users/${video.userId || video.user_id}`}
                className="moderationVideoDetailBackBtn"
              >
                Open Creator
              </Link>
            ) : null}
          </div>
        </section>

        <section className="moderationVideoDetailCard">
          <div className="moderationVideoDetailCardTitle">
            Moderation Controls
          </div>

          <form className="moderationVideoDetailForm" onSubmit={handleSave}>
            <label className="moderationVideoDetailField">
              <span>Title</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label className="moderationVideoDetailField">
              <span>Visibility</span>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
              >
                {VISIBILITY_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status[0].toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </label>

            {visibility === "shadow" ? (
              <div className="moderationVideoDetailNotice warning">
                This video will be hidden from normal browsing but preserved for
                review.
              </div>
            ) : null}

            {error ? (
              <div className="moderationVideoDetailError">{error}</div>
            ) : null}

            {success ? (
              <div className="moderationVideoDetailSuccess">{success}</div>
            ) : null}

            <div className="moderationVideoDetailActions">
              <button
                type="submit"
                className="moderationVideoDetailSaveBtn"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </section>
      </div>

      <section className="moderationVideoDetailCard moderationVideoDetailAnalyticsCard">
        <div className="moderationVideoDetailAnalyticsHeader">
          <div>
            <div className="moderationVideoDetailCardTitle">
              Watch Retention
            </div>
            <p className="moderationVideoDetailAnalyticsSub">
              Timeline popularity split by referral source. Click a source below
              to solo it, or click it again to show all.
            </p>
          </div>

          <div className="moderationVideoDetailAnalyticsPill">15s buckets</div>
        </div>

        {analyticsLoading ? (
          <div className="moderationVideoDetailEmpty">
            Loading watch analytics…
          </div>
        ) : analyticsError ? (
          <div className="moderationVideoDetailError">{analyticsError}</div>
        ) : analyticsChartData.length > 0 ? (
          <div className="moderationVideoAnalyticsChart">
            <ResponsiveContainer width="100%" height={330}>
              <LineChart data={analyticsChartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.18} />
                <XAxis dataKey="time" />
                <YAxis allowDecimals={false} />

                <Tooltip
                  content={
                    <WatchAnalyticsTooltip chartSources={chartSources} />
                  }
                />

                {chartSources.map((source, index) => (
                  <Line
                    key={source}
                    type="stepAfter"
                    dataKey={source}
                    stroke={getSourceColor(source)}
                    strokeWidth={source === "Total" ? 3 : 2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>

            <div className="watchAnalyticsLegend">
                <button
                    type="button"
                    className={`watchAnalyticsLegendItem ${showTotal ? "active" : "muted"}`}
                    onClick={() => {
                    setShowTotal((current) => !current);
                    setSoloSource(null);
                    }}
                >
                    <span
                    className="watchAnalyticsLegendSwatch"
                    style={{ background: getSourceColor("Total") }}
                    />
                    Total
                </button>

                {referralSources.map((source) => {
                    const active = !showTotal && (!soloSource || soloSource === source);

                    return (
                    <button
                        key={source}
                        type="button"
                        className={`watchAnalyticsLegendItem ${active ? "active" : "muted"}`}
                        onClick={() => {
                        setShowTotal(false);
                        setSoloSource((current) => (current === source ? null : source));
                        }}
                    >
                        <span
                        className="watchAnalyticsLegendSwatch"
                        style={{ background: getSourceColor(source) }}
                        />
                        {source}
                    </button>
                    );
                })}
                </div>
          </div>
        ) : (
          <div className="moderationVideoDetailEmpty">
            No watch analytics recorded yet.
          </div>
        )}
      </section>
    </div>
  );
}