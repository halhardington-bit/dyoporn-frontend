import { useState } from "react";
import { completeGoogleSignup } from "../api";
import "./LoginModal.css";

export default function CompleteGoogleSignupModal({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
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

          {error && (
            <div style={{ marginTop: 8 }}>
              <span style={{ color: "salmon" }}>{error}</span>
            </div>
          )}

          <div className="modal-actions">
            <button className="btn btn-primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}