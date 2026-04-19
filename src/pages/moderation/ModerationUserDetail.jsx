import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getModerationUserById,
  updateModerationUser,
} from "../../api.js";
import "./ModerationUserDetail.css";

const PLAN_OPTIONS = ["Free", "Watcher", "Basic", "Premium"];

export default function ModerationUserDetail() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [user, setUser] = useState(null);

  const [tokens, setTokens] = useState("");
  const [tier, setTier] = useState("Free");
  const [isModerator, setIsModerator] = useState(false);
  const [isCommentShadowbanned, setIsCommentShadowbanned] = useState(false);
  const [isBanned, setIsBanned] = useState(false);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError("");
        setSuccess("");

        const data = await getModerationUserById(id);
        if (!alive) return;

        setUser(data || null);
        setTokens(String(data?.tokens ?? 0));
        setTier(data?.tier || "Free");
        setIsModerator(Boolean(data?.isModerator));
        setIsCommentShadowbanned(Boolean(data?.isCommentShadowbanned));
        setIsBanned(Boolean(data?.isBanned));
      } catch (err) {
        if (!alive) return;
        setError(err?.message || "Failed to load user");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [id]);

  const effectivePlan = useMemo(() => {
    return isBanned ? "Free" : tier;
  }, [isBanned, tier]);

  async function handleSave(e) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const parsedTokens = Number(tokens);

      if (!Number.isFinite(parsedTokens) || parsedTokens < 0) {
        throw new Error("Tokens must be a valid non-negative number");
      }

      const payload = {
        tokens: Math.floor(parsedTokens),
        tier: effectivePlan,
        isModerator,
        isCommentShadowbanned,
        isBanned,
      };

      const updated = await updateModerationUser(id, payload);

      // re-fetch full user so UI stays complete
      const fresh = await getModerationUserById(id);

      setUser(fresh);
      setTokens(String(fresh?.tokens ?? 0));
      setTier(fresh?.tier || "Free");
      setIsModerator(Boolean(fresh?.isModerator));
      setIsCommentShadowbanned(Boolean(fresh?.isCommentShadowbanned));
      setIsBanned(Boolean(fresh?.isBanned));
    } catch (err) {
      setError(err?.message || "Failed to update user");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="page page--moderationUserDetail">
        <div className="moderationUserDetailEmpty">Loading user…</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="page page--moderationUserDetail">
        <div className="moderationUserDetailEmpty">User not found.</div>
      </div>
    );
  }

  const displayLabel =
    user.displayName || user.username || `User #${user.id}`;

  return (
    <div className="page page--moderationUserDetail">
      <div className="moderationUserDetailHeader">
        <div className="moderationUserDetailHeaderText">
          <div className="moderationUserDetailEyebrow">Moderation</div>
          <h1 className="moderationUserDetailTitle">{displayLabel}</h1>
          <p className="moderationUserDetailSub">
            Manage account access, moderation flags, and subscription overrides.
          </p>
        </div>

        <div className="moderationUserDetailHeaderActions">
          <Link to="/moderation/users" className="moderationUserDetailBackBtn">
            ← Back to User Manager
          </Link>
        </div>
      </div>

      <div className="moderationUserDetailGrid">
        <section className="moderationUserDetailCard">
          <div className="moderationUserDetailCardTitle">User Overview</div>

          <div className="moderationUserDetailFacts">
            <div><span>ID:</span> {user.id}</div>
            <div><span>Username:</span> @{user.username || "—"}</div>
            <div><span>Email:</span> {user.email || "—"}</div>
            <div><span>Display Name:</span> {user.displayName || "—"}</div>
            <div><span>Current Plan:</span> {user.tier || "Free"}</div>
            <div><span>Tokens:</span> {Number(user.tokens ?? 0).toLocaleString()}</div>
            <div><span>Rating:</span> {user.ratingAvg != null ? Number(user.ratingAvg).toFixed(2) : "—"}</div>
            <div><span>Review Count:</span> {user.reviewCount ?? 0}</div>
          </div>

          <div className="moderationUserDetailStatusRow">
            <span className={`moderationUserDetailBadge ${user.isModerator ? "yes" : "no"}`}>
              {user.isModerator ? "Moderator" : "Standard user"}
            </span>

            {user.isCommentShadowbanned ? (
              <span className="moderationUserDetailBadge shadow">Shadow banned</span>
            ) : null}

            {user.isBanned ? (
              <span className="moderationUserDetailBadge banned">Hard banned</span>
            ) : null}
          </div>
        </section>

        <section className="moderationUserDetailCard">
          <div className="moderationUserDetailCardTitle">Moderation Controls</div>

          <form className="moderationUserDetailForm" onSubmit={handleSave}>
            <label className="moderationUserDetailField">
              <span>Tokens</span>
              <input
                type="number"
                min="0"
                step="1"
                value={tokens}
                onChange={(e) => setTokens(e.target.value)}
              />
            </label>

            <label className="moderationUserDetailField">
              <span>Plan</span>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                disabled={isBanned}
              >
                {PLAN_OPTIONS.map((plan) => (
                  <option key={plan} value={plan}>
                    {plan}
                  </option>
                ))}
              </select>
            </label>

            <label className="moderationUserDetailCheck">
              <input
                type="checkbox"
                checked={isModerator}
                onChange={(e) => setIsModerator(e.target.checked)}
              />
              <span>Moderator</span>
            </label>

            <label className="moderationUserDetailCheck">
              <input
                type="checkbox"
                checked={isCommentShadowbanned}
                onChange={(e) => setIsCommentShadowbanned(e.target.checked)}
              />
              <span>
                Shadow ban comments
                <small>
                  User can still post comments, but only they can see them.
                </small>
              </span>
            </label>

            <label className="moderationUserDetailCheck dangerCheck">
              <input
                type="checkbox"
                checked={isBanned}
                onChange={(e) => setIsBanned(e.target.checked)}
              />
              <span>
                Hard ban account
                <small>
                  Blocks login and disables ratings, comments, likes, subscriptions,
                  and plan changes. Forces plan to Free.
                </small>
              </span>
            </label>

            {isBanned ? (
              <div className="moderationUserDetailNotice danger">
                This user is hard banned. Saving will force their plan to <strong>Free</strong>.
              </div>
            ) : null}

            {error ? <div className="moderationUserDetailError">{error}</div> : null}
            {success ? <div className="moderationUserDetailSuccess">{success}</div> : null}

            <div className="moderationUserDetailActions">
              <button
                type="submit"
                className="moderationUserDetailSaveBtn"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}