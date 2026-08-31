import "./TermsModal.css";

export default function TermsModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="termsOverlay" onMouseDown={onClose}>
      <div
        className="termsModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="termsTitle"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="termsHeader">
          <h2 id="termsTitle">Terms and Conditions</h2>
          <button className="termsCloseBtn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="termsBody">
          <p>
            Welcome to DYOP. By creating an account or using this platform, you
            agree to these Terms and Conditions. If you do not agree with these
            terms, you should not use DYOP.
          </p>

          <h3>1. User Content</h3>
          <p>
            You are responsible for all videos, audio, images, comments, profile
            pictures, and any other content you upload or publish on DYOP.
          </p>
          <p>
            You may only publish content that complies with these Terms and all
            applicable laws.
          </p>
          <p>
            Content created using DYOP&apos;s built-in content generation tools,
            including but not limited to images, videos, audio, text, or other
            generated media, is the property of DYOP.
          </p>

          <h3>2. Prohibited Content</h3>
          <p>You must not upload, publish, or distribute content that is:</p>
          <ul>
            <li>Illegal or promotes illegal activity.</li>
            <li>Exploitative or abusive.</li>
            <li>Hateful or intended to harass or threaten others.</li>
            <li>Infringing on another person&apos;s intellectual property rights.</li>
            <li>Fraudulent or misleading.</li>
            <li>Otherwise prohibited by applicable law or platform policies.</li>
          </ul>
          <p>
            DYOP reserves the right to remove content or suspend accounts that
            violate these Terms.
          </p>

          <h3>3. Copyright</h3>
          <p>
            You must not publish copyrighted material unless you own the rights
            to the content or have permission from the copyright owner.
          </p>
          <p>
            If we receive a valid copyright complaint, we may remove or disable
            access to the content while the matter is reviewed.
          </p>

          <h3>4. Accounts</h3>
          <p>
            You are responsible for maintaining the security of your account and
            password.
          </p>
          <p>You must not:</p>
          <ul>
            <li>Impersonate another individual or organization.</li>
            <li>Share your account with others.</li>
            <li>Attempt to gain unauthorized access to other accounts or systems.</li>
          </ul>
          <p>You are responsible for all activity that occurs under your account.</p>

          <h3>5. Platform Availability</h3>
          <p>
            DYOP may modify, update, suspend, or discontinue any feature or part
            of the platform at any time without prior notice.
          </p>
          <p>We do not guarantee uninterrupted availability of the service.</p>

          <h3>6. Limitation of Liability</h3>
          <p>DYOP is provided on an &quot;as is&quot; and &quot;as available&quot; basis.</p>
          <p>
            To the fullest extent permitted by law, DYOP is not responsible for
            any direct, indirect, incidental, consequential, or other damages
            arising from your use of the platform or your inability to use the
            platform.
          </p>

          <h3>7. Account Termination</h3>
          <p>
            We reserve the right to suspend, restrict, or terminate accounts that
            violate these Terms, engage in unlawful activity, or misuse the
            platform.
          </p>
          <p>
            Where appropriate, we may also remove content that breaches these
            Terms.
          </p>

          <h3>8. Changes to These Terms</h3>
          <p>
            We may update these Terms and Conditions from time to time.
          </p>
          <p>
            Continued use of DYOP after changes are published constitutes your
            acceptance of the updated Terms.
          </p>

          <p className="termsNote">Last updated: July 1, 2026</p>
        </div>

        <div className="termsFooter">
          <button className="termsAcceptBtn" onClick={onClose}>
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}