import "./Advertising.css";

export default function Advertising() {
  return (
    <div className="advertisingPage">

      <div className="advertisingLayout">

        {/* =========================================
            MAIN CONTENT
           ========================================= */}

        <section className="advertisingContent">

          <div className="advertisingEyebrow">
            DYOP FOR ADVERTISERS
          </div>

          <h1 className="advertisingTitle">
            Advertising
          </h1>

          <p className="advertisingLead">
            Reach audiences across DYOP through a growing range of
            display and video advertising placements.
          </p>

          <p>
            DYOP advertising campaigns can appear throughout the
            platform across discovery feeds, search results, creator
            profiles, video pages, and dedicated video advertising
            placements.
          </p>

          <p>
            Campaigns are currently managed directly by DYOP. Advertisers
            provide their campaign material, creative assets and intended
            campaign requirements, and we configure delivery across the
            appropriate advertising inventory.
          </p>

          <h2>
            Advertising on DYOP
          </h2>

          <p>
            DYOP supports both traditional display advertising and video
            advertising. Campaigns can be built around individual placements
            or combined into broader packages across the platform.
          </p>

          <div className="advertisingFeatureGrid">

            <article className="advertisingFeatureCard">
              <div className="advertisingFeatureIcon">
                ▭
              </div>

              <div>
                <h3>
                  Display Advertising
                </h3>

                <p>
                  Banner and rectangle placements across feeds,
                  profiles, search results and selected platform pages.
                </p>
              </div>
            </article>

            <article className="advertisingFeatureCard">
              <div className="advertisingFeatureIcon">
                ▶
              </div>

              <div>
                <h3>
                  Video Advertising
                </h3>

                <p>
                  Pre-roll and floating video placements powered through
                  DYOP&apos;s custom video advertising system.
                </p>
              </div>
            </article>

            <article className="advertisingFeatureCard">
              <div className="advertisingFeatureIcon">
                ◎
              </div>

              <div>
                <h3>
                  Campaign Placement
                </h3>

                <p>
                  Campaigns can target specific advertising surfaces or
                  run across multiple areas of DYOP.
                </p>
              </div>
            </article>

            <article className="advertisingFeatureCard">
              <div className="advertisingFeatureIcon">
                ◫
              </div>

              <div>
                <h3>
                  Multiple Creative Sizes
                </h3>

                <p>
                  Desktop and mobile campaigns can use dedicated creative
                  formats designed for each placement.
                </p>
              </div>
            </article>

          </div>

          <h2>
            Current advertising formats
          </h2>

          <div className="advertisingFormats">

            <div className="advertisingFormatRow">
              <div>
                <strong>
                  Desktop Display
                </strong>

                <span>
                  728 × 90 and selected rectangle placements
                </span>
              </div>

              <span className="advertisingFormatStatus">
                Available
              </span>
            </div>

            <div className="advertisingFormatRow">
              <div>
                <strong>
                  Mobile Display
                </strong>

                <span>
                  300 × 100 and responsive mobile placements
                </span>
              </div>

              <span className="advertisingFormatStatus">
                Available
              </span>
            </div>

            <div className="advertisingFormatRow">
              <div>
                <strong>
                  Video Pre-Roll
                </strong>

                <span>
                  Video advertisements served before DYOP content
                </span>
              </div>

              <span className="advertisingFormatStatus">
                Available
              </span>
            </div>

            <div className="advertisingFormatRow">
              <div>
                <strong>
                  Floating Video
                </strong>

                <span>
                  Autoplay video advertising while browsing DYOP
                </span>
              </div>

              <span className="advertisingFormatStatus">
                Available
              </span>
            </div>

            <div className="advertisingFormatRow">
              <div>
                <strong>
                  Sidecar Display
                </strong>

                <span>
                  300 × 250 display advertising alongside video content
                </span>
              </div>

              <span className="advertisingFormatStatus">
                Available
              </span>
            </div>

          </div>

          <h2>
            How campaigns work
          </h2>

          <p>
            Advertisers can contact DYOP with details about the campaign,
            intended audience, campaign duration, creative material and
            desired placement types.
          </p>

          <p>
            We will then confirm the required creative specifications and
            configure the campaign for delivery through DYOP&apos;s
            advertising infrastructure.
          </p>

        </section>

        {/* =========================================
            CTA CARD
           ========================================= */}

        <aside className="advertisingSidebar">

          <div className="advertisingCtaCard">

            <h2>
              Advertise on DYOP
            </h2>

            <p>
              Interested in advertising on DYOP? Get in touch with our
              advertising team to discuss campaign availability, placements
              and creative requirements.
            </p>

            <ul className="advertisingBenefits">
              <li>
                Display and video inventory
              </li>

              <li>
                Desktop and mobile formats
              </li>

              <li>
                Pre-roll video advertising
              </li>

              <li>
                Floating video placements
              </li>

            </ul>

           <div className="advertisingContact">

            <div className="advertisingContactLabel">
              Advertising enquiries
            </div>

            <a
              className="advertisingContactEmail"
              href="mailto:advertising@dyop.ai"
            >
              advertising@dyop.ai
            </a>

          </div>

            <div className="advertisingCtaFinePrint">
              Campaign availability, pricing and placement are subject
              to approval.
            </div>

          </div>

        </aside>

      </div>

    </div>
  );
}