import "./privacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <div className="privacyStandalonePage">
      <div className="privacyPage">
        <div className="privacyHero">
          <div className="privacyHeroBadge">LEGAL / PRIVACY</div>
          <h1 className="privacyHeroTitle">Privacy Policy</h1>
          <p className="privacyHeroText">
            This Privacy Policy explains what information DYOP collects, why we
            collect it, how it is used, and the choices users have regarding
            their information.
          </p>
        </div>

        <div className="privacyGrid">
          <section className="privacyPanel privacyPanelPrimary">
            <div className="privacyPanelHeader">
              <span className="privacyStep">01</span>
              <h2>Information we collect</h2>
            </div>

            <p>
              When you create and use an account, we collect your email address,
              username, date of birth, optional country/location information,
              profile picture, uploaded media, comments, ratings, and watch
              history.
            </p>
          </section>

          <section className="privacyPanel">
            <div className="privacyPanelHeader">
              <span className="privacyStep">02</span>
              <h2>Account information</h2>
            </div>

            <ul className="privacyChecklist">
              <li>Email is used to create, manage, and secure your account.</li>
              <li>Date of birth is used to confirm that you are 18 or older.</li>
              <li>
                Country/location is optional but used for demographic tracking.
              </li>
            </ul>
          </section>

          <section className="privacyPanel">
            <div className="privacyPanelHeader">
              <span className="privacyStep">03</span>
              <h2>Profile pictures</h2>
            </div>

            <p>
              You may upload a profile picture. This does not need to be a photo
              of yourself, but any image you upload will be stored and displayed
              as part of your public profile.
            </p>
          </section>

          <section className="privacyPanel">
            <div className="privacyPanelHeader">
              <span className="privacyStep">04</span>
              <h2>Media and public content</h2>
            </div>

            <p>
              Creating content is optional. If you publish media, that content
              will be visible to other users and may be consumed, rated,
              commented on, or otherwise interacted with on the platform.
            </p>
          </section>

          <section className="privacyPanel">
            <div className="privacyPanelHeader">
              <span className="privacyStep">05</span>
              <h2>Comments, ratings, and watch history</h2>
            </div>

            <ul className="privacyChecklist">
              <li>Comments are publicly visible to other users.</li>
              <li>Ratings are used for user statistics and platform ranking.</li>
              <li>
                Watch history is used for your own tracking and personalized
                recommendations.
              </li>
            </ul>
          </section>

          <section className="privacyPanel">
            <div className="privacyPanelHeader">
              <span className="privacyStep">06</span>
              <h2>IP address processing</h2>
            </div>

            <p>
              We temporarily query your IP address to determine whether access is
              permitted from your country. DYOP does not retain IP addresses for
              advertising, analytics, or user profiling purposes.
            </p>
          </section>

          <section className="privacyPanel">
            <div className="privacyPanelHeader">
              <span className="privacyStep">07</span>
              <h2>Cookies and sessions</h2>
            </div>

            <p>
              We use cookies and session technology to keep users logged in,
              secure accounts, and operate the platform. We do not use
              advertising cookies.
            </p>
          </section>

          <section className="privacyPanel">
            <div className="privacyPanelHeader">
              <span className="privacyStep">08</span>
              <h2>Referral information</h2>
            </div>

            <p>
              To help us understand how people discover DYOP, we may record how
              you arrived at the platform. This may include referral links,
              campaign identifiers, or other publicly available referral
              information provided by your browser.
            </p>

            <p>
              This information is used for analytics and demographic purposes to
              understand how users find DYOP and improve the platform. We do not
              use this information to build advertising profiles or sell your
              personal information.
            </p>
          </section>

          <section className="privacyPanel">
            <div className="privacyPanelHeader">
              <span className="privacyStep">09</span>
              <h2>Third-party services</h2>
            </div>

            <p>
              DYOP relies on trusted third-party providers for authentication,
              hosting, storage, delivery, and database services.
            </p>
          </section>

          <section className="privacyPanel">
            <div className="privacyPanelHeader">
              <span className="privacyStep">10</span>
              <h2>Your choices</h2>
            </div>

            <p>
              You may update your account information, remove uploaded content,
              or request account deletion where available.
            </p>
          </section>

          <section className="privacyPanel privacyPanelWarning">
            <div className="privacyPanelHeader">
              <span className="privacyStep">11</span>
              <h2>Changes to this policy</h2>
            </div>

            <p>
              We may update this Privacy Policy from time to time. Continued use
              of DYOP means you accept the updated policy.
            </p>

            <div className="privacyCallout">
              <div className="privacyCalloutRow">
                <span className="privacyCalloutLabel">Last updated</span>
                <span className="privacyCalloutValue">July 1, 2026</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}