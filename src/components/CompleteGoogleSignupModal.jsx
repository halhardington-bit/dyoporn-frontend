import { useState } from "react";
import { completeGoogleSignup } from "../api";
import TermsModal from "./TermsModal.jsx";
import "./LoginModal.css";

export default function CompleteGoogleSignupModal({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Please choose a username.");
      return;
    }

    if (!termsAccepted) {
      setError("Please confirm that you have read the Terms and Conditions.");
      return;
    }

    setSaving(true);

    try {
      const user = await completeGoogleSignup({
        username: username.trim(),
      });

      onSuccess?.(user);
    } catch (err) {
      setError(err?.message || "Failed to choose username.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="modal-backdrop">
        <div className="modal">
          <div className="modal-header">
            <div className="modal-header-left">
              <h2 className="modal-title">Choose your username</h2>
              <span className="signup-hint inline">
                This is how people will find your channel.
              </span>
            </div>
          </div>

          <form className="modal-form" onSubmit={handleSubmit}>
            <label className="field">
              <span className="label">Username</span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username"
                autoFocus
              />
            </label>

            <div className="termsAgreement">
              <input
                id="googleTermsAccepted"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />

              <label
                htmlFor="googleTermsAccepted"
                className="termsAgreementLabel"
              >
                I confirm that I have read and agree to the{" "}
                <button
                  type="button"
                  className="termsInlineLink"
                  onClick={(e) => {
                    e.preventDefault();
                    setTermsOpen(true);
                  }}
                >
                  Terms and Conditions
                </button>
                .
              </label>
            </div>

            {error && (
              <div style={{ marginTop: 8 }}>
                <span style={{ color: "salmon" }}>{error}</span>
              </div>
            )}

            <div className="modal-actions">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={saving || !termsAccepted}
              >
                {saving ? "Saving..." : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
    </>
  );
}