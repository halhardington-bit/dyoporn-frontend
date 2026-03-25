import { useNavigate } from "react-router-dom";

const plans = [
  {
    key: "viewer",
    name: "Viewing",
    price: "9.99",
    sub: "Perfect for watching",
    cta: "Get Viewing",
    featured: false,
    features: [
      "Watch videos",
      "Access premium viewing experience",
      "Browse all public content",
      "Rate and interact with videos",
    ],
  },
  {
    key: "basic",
    name: "Basic Creator",
    price: "11.99",
    sub: "Best value",
    cta: "Get Basic Creator",
    featured: false,
    features: [
      "Everything in Viewing",
      "Unlock creator tools",
      "Monthly credits for video generation",
      "Create and publish your own videos",
    ],
  },
  {
    key: "premium",
    name: "Premium Creator",
    price: "26.99",
    sub: "For serious creators",
    cta: "Get Premium Creator",
    featured: false,
    features: [
      "Everything in Basic Creator",
      "Unlock creator tools",
      "Unlimited credits each month",
      "Best option for frequent generation",
    ],
  },
];

export default function Plans({ user, onRequireLogin }) {
  const nav = useNavigate();

  function handleChoosePlan(planKey) {
    if (!user) {
      onRequireLogin?.("/plans");
      return;
    }

    // Placeholder for now:
    // later this can navigate into Stripe checkout or your billing flow
    nav(`/plans/checkout?plan=${planKey}`);
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

      <div className="plansGrid">
        {plans.map((plan) => (
          <section
            key={plan.key}
            className={`planCard ${plan.featured ? "planCard--featured" : ""}`}
          >
            {plan.featured && <div className="planBadge">✦ Best Value</div>}

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
                className={`planBtn ${plan.featured ? "planBtn--featured" : ""}`}
                onClick={() => handleChoosePlan(plan.key)}
              >
                {plan.cta}
              </button>

              <ul className="planFeatures">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}