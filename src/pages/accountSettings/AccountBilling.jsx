import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { me } from "../../api.js";
import "./AccountSettings.css";

export default function AccountBilling({ user, onUserUpdated }) {
  const navigate = useNavigate();

  const [localUser, setLocalUser] = useState(user || null);
  const [cancelBusy, setCancelBusy] = useState(false);
  const [cancelMsg, setCancelMsg] = useState("");
  const [cancelErr, setCancelErr] = useState("");
  const [renewBusy, setRenewBusy] = useState(false);

  const activeUser = localUser || user;
  if (!activeUser) return null;

  const currentPlan = activeUser.tier || "Free";
  const planActive = !!activeUser.planActive;
  const planExpiry = activeUser.planExpiry ? new Date(activeUser.planExpiry) : null;

  const expiryText = useMemo(() => {
    if (!planExpiry || Number.isNaN(planExpiry.getTime())) return null;

    return planExpiry.toLocaleString([], {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }, [activeUser.planExpiry]);

  const isFree = currentPlan === "Free";
  const isCancelledButActive = !isFree && !planActive && !!planExpiry;

  async function handleRenewSubscription() {
    if (isFree || renewBusy) return;

    try {
        setRenewBusy(true);
        setCancelErr("");
        setCancelMsg("");

        const res = await fetch("/api/me/renew-plan", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
        throw new Error(data?.error || "Failed to renew subscription");
        }

        const refreshedUser = await me();

        setLocalUser(refreshedUser || activeUser);
        onUserUpdated?.(refreshedUser || activeUser);

        setCancelMsg(
        data?.message || "Subscription renewed. Auto-renewal is active again."
        );
    } catch (err) {
        setCancelErr(err?.message || "Failed to renew subscription.");
    } finally {
        setRenewBusy(false);
    }
    }

  async function handleCancelSubscription() {
    if (isFree || cancelBusy) return;

    const confirmed = window.confirm(
      "Cancel your subscription? You will keep access until the end of your billing period."
    );
    if (!confirmed) return;

    try {
      setCancelBusy(true);
      setCancelErr("");
      setCancelMsg("");

      const res = await fetch("/api/me/cancel-plan", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Failed to cancel subscription");
      }

      const refreshedUser = await me();

      setLocalUser(refreshedUser || activeUser);
      onUserUpdated?.(refreshedUser || activeUser);

      setCancelMsg(
        data?.message ||
          "Subscription cancelled. Your plan will remain active until the end of the billing period."
      );
    } catch (err) {
      setCancelErr(err?.message || "Failed to cancel subscription.");
    } finally {
      setCancelBusy(false);
    }
  }

  return (
    <div className="accountSettingsContent">
      <section className="accountSettingsIntro">
        <div className="accountSettingsKicker">Billing</div>
        <h2 className="accountSettingsHeading">Plan & Billing</h2>
        <p className="accountSettingsSubtext">
          Manage your subscription and upgrade your account.
        </p>
      </section>

      <section className="accountSettingsSection">
        <div className="accountSettingsSectionHeader">
          <div className="accountSettingsSectionEyebrow">CURRENT PLAN</div>
          <h3 className="accountSettingsSectionTitle">Your subscription</h3>
        </div>

        <div className="billingCard">
          <div className="billingCardLeft">
            <div className="billingPlanName">{currentPlan}</div>

            <div className="billingPlanDesc">
              {isFree
                ? "Basic access to the platform."
                : isCancelledButActive
                ? `Cancelled. Your plan remains active until ${expiryText || "the end of your billing period"}.`
                : planExpiry
                ? `Active until ${expiryText}.`
                : "Full access to premium features."}
            </div>
          </div>

          <div className="billingCardRight">
            <button
              className="billingPrimaryBtn"
              onClick={() => navigate("/plans")}
            >
              {isFree ? "Upgrade" : "See Plans"}
            </button>
          </div>
        </div>
      </section>

      {!isFree && (
        <section className="accountSettingsSection">
            <div className="accountSettingsSectionHeader">
                <div className="accountSettingsSectionEyebrow">SUBSCRIPTION</div>
                <h3 className="accountSettingsSectionTitle">Manage subscription</h3>
            </div>

            <div className="billingManageCard">
                <div>
                <div className="billingManageTitle">
                    {isCancelledButActive ? "Subscription cancelled" : "Cancel subscription"}
                </div>

                <div className="billingManageText">
                    {isCancelledButActive
                    ? `Your subscription is set to end on ${
                        expiryText || "your expiry date"
                        }. You can renew it before then to keep your plan active.`
                    : "You’ll retain access until the end of your billing period. After that, your account will revert to the Free plan."}
                </div>
                </div>

                <button
                className={isCancelledButActive ? "billingRenewBtn" : "billingDangerBtn"}
                onClick={isCancelledButActive ? handleRenewSubscription : handleCancelSubscription}
                disabled={cancelBusy || renewBusy}
                >
                {cancelBusy
                    ? "Cancelling..."
                    : renewBusy
                    ? "Renewing..."
                    : isCancelledButActive
                    ? "Renew"
                    : "Cancel"}
                </button>
            </div>

            {cancelMsg ? (
                <div className="accountSettingsInlineSuccess">{cancelMsg}</div>
            ) : null}

            {cancelErr ? (
                <div className="accountSettingsInlineError">{cancelErr}</div>
            ) : null}
            </section>
      )}
    </div>
  );
}