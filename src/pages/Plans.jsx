import { useEffect, useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const plans = [
  {
    key: "Watcher",
    name: "Watcher",
    price: "9.99",
    sub: "Perfect for watching",
    cta: "Choose Watcher",
    features: [
      "Watch videos",
      "Access premium viewing experience",
      "Browse all public content",
      "Rate and interact with videos",
    ],
  },
  {
    key: "Basic",
    name: "Basic",
    price: "11.99",
    sub: "For casual creators",
    cta: "Choose Basic",
    features: [
      "Everything in Watcher",
      "Unlock creator tools",
      "Monthly credits for video generation",
      "Create and publish your own videos",
    ],
  },
  {
    key: "Premium",
    name: "Premium",
    price: "26.99",
    sub: "For serious creators",
    cta: "Choose Premium",
    features: [
      "Everything in Basic",
      "Unlimited credits each month",
      "Best option for frequent generation",
      "Full creator workflow access",
    ],
  },
];

export default function Plans({ user, onRequireLogin }) {
  const [currentTier, setCurrentTier] = useState(user?.tier || "Free");
  const [busyTier, setBusyTier] = useState("");
  const [loadingTier, setLoadingTier] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sortedPlans = useMemo(() => plans, []);

  useEffect(() => {
    setCurrentTier(user?.tier || "Free");
  }, [user?.tier]);

  useEffect(() => {
    let alive = true;

    (async () => {
      if (!user) {
        if (alive) setCurrentTier("Free");
        return;
      }

      try {
        setLoadingTier(true);

        const res = await fetch(`${API_BASE}/auth/me`, {
          credentials: "include",
        });

        const data = await res.json().catch(() => null);

        if (!res.ok || !data) return;
        if (!alive) return;

        setCurrentTier(data.tier || "Free");
      } catch {
        // silent fallback to current prop/state
      } finally {
        if (alive) setLoadingTier(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [user]);

  async function handleChoosePlan(tier) {
    if (!user) {
      onRequireLogin?.("/plans");
      return;
    }

    if (tier === currentTier) return;

    try {
      setBusyTier(tier);
      setError("");
      setSuccess("");

      const res = await fetch(`${API_BASE}/api/me/tier`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ tier }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Failed to update plan");
      }

      setCurrentTier(tier);
      setSuccess(``);
    } catch (err) {
      setError(err?.message || "Failed to update plan");
    } finally {
      setBusyTier("");
    }
  }

  return (
    <div className="plansPage">
      <div className="plansHero">
        <div className="plansEyebrow">Subscriptions</div>
        <h1 className="plansTitle">Choose your plan</h1>
        <p className="plansSub">
          Pick the tier that fits how you want to use the platform — whether
          you’re here to watch, create occasionally, or generate as much as you like.
        </p>
      </div>

      {error ? <div className="plansError">{error}</div> : null}
      {success ? <div className="plansSuccess">{success}</div> : null}

      <div className="plansGrid">
        {sortedPlans.map((plan) => {
          const isCurrent = currentTier === plan.key;
          const isBusy = busyTier === plan.key;

          return (
            <section
              key={plan.key}
              className={`planCard ${isCurrent ? "planCard--current" : ""}`}
            >
              {isCurrent && <div className="planBadge">Current Plan</div>}

              <div className="planInner">
                <div className="planName">{plan.name}</div>

                <div className="planPriceRow">
                  <span className="planCurrency">$</span>
                  <span className="planPrice">{plan.price}</span>
                  <span className="planPer">/month</span>
                </div>

                <div className="planSub">{plan.sub}</div>

                <button
                  type="button"
                  className={`planBtn ${isCurrent ? "planBtn--current" : ""}`}
                  disabled={isCurrent || !!busyTier || loadingTier}
                  onClick={() => handleChoosePlan(plan.key)}
                >
                  {isCurrent
                    ? "Current Plan"
                    : isBusy
                    ? "Updating..."
                    : loadingTier
                    ? "Loading..."
                    : plan.cta}
                </button>

                <ul className="planFeatures">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}