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
            Welcome to DYOP. By using this platform, you agree to follow these
            Terms and Conditions.
          </p>

          <h3>1. User Content</h3>
          <p>
            You are responsible for the videos, audio, images, comments, and any
            other content you upload or post. You must only publish content that
            adheres to the conditions.
          </p>

          <h3>2. Prohibited Content</h3>
          <p>
            You may not upload illegal, abusive, exploitative, hateful,
            threatening, or infringing content. We may remove content or suspend
            accounts that violate these rules.
          </p>

          <h3>3. Copyright</h3>
          <p>
            Do not upload copyrighted material unless you have the legal right to
            do so. We may remove content that appears to infringe another
            person’s rights.
          </p>

          <h3>4. Accounts</h3>
          <p>
            You are responsible for keeping your account secure. You must not
            impersonate others or misuse the platform.
          </p>

          <h3>5. Platform Availability</h3>
          <p>
            We may update, modify, pause, or discontinue parts of the platform at
            any time.
          </p>

          <h3>6. Limitation of Liability</h3>
          <p>
            The platform is provided “as is”. We are not responsible for losses,
            damages, or issues caused by your use of the platform.
          </p>

          <h3>7. Changes to These Terms</h3>
          <p>
            We may update these terms from time to time. Continued use of the
            platform means you accept the updated terms.
          </p>

          <p className="termsNote">
            Last updated: July 1, 2026
          </p>
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