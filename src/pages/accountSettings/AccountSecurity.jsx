import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendChangePasswordEmail, logoutAllDevices } from "../../api.js";
import "./AccountSettings.css";

export default function AccountSecurity({ user, onLogout }) {
  const [busy, setBusy] = useState(false);
  const [logoutAllBusy, setLogoutAllBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  if (!user) return null;

  async function handleSendPasswordEmail() {
    try {
      setBusy(true);
      setErr("");
      setMsg("");

      const result = await sendChangePasswordEmail();
      setMsg(result?.message || "Password reset email sent.");
    } catch (e) {
      setErr(e?.message || "Failed to send password reset email.");
    } finally {
      setBusy(false);
    }
  }

  async function handleLogoutAllDevices() {
    if (!window.confirm("Log out of all devices? You will need to sign in again.")) {
        return;
        }

    try {
      setLogoutAllBusy(true);
      setErr("");
      setMsg("");

      const result = await logoutAllDevices();

      onLogout?.();
      setMsg(result?.message || "Logged out of all devices.");
      nav("/watch");
    } catch (e) {
      setErr(e?.message || "Failed to log out of all devices.");
    } finally {
      setLogoutAllBusy(false);
    }
  }

  return (
    <div className="accountSettingsContent">
      <section className="accountSettingsIntro">
        <div className="accountSettingsKicker">Security</div>
        <h2 className="accountSettingsHeading">Account security</h2>
        <p className="accountSettingsSubtext">
          Manage your password, email address, verification status, and session
          security.
        </p>
      </section>

      <section className="accountSettingsSection">
        <div className="accountSettingsSectionHeader">
          <div className="accountSettingsSectionEyebrow">EMAIL</div>
          <h3 className="accountSettingsSectionTitle">Email and verification</h3>
        </div>

        <div className="accountSettingsDetailsList">
          <div className="accountSettingsDetailRow">
            <div className="accountSettingsDetailLabel">Current email</div>
            <div className="accountSettingsDetailValue">
              {user.email || "—"}
            </div>
          </div>

          <div className="accountSettingsDetailRow">
            <div className="accountSettingsDetailLabel">Verification status</div>
            <div className="accountSettingsDetailValue">
              <span
                className={`accountSettingsStatusPill ${
                  user.emailVerified ? "isVerified" : "isUnverified"
                }`}
              >
                {user.emailVerified ? "Verified" : "Not verified"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="accountSettingsSection">
        <div className="accountSettingsSectionHeader">
          <div className="accountSettingsSectionEyebrow">CREDENTIALS</div>
          <h3 className="accountSettingsSectionTitle">Sign-in settings</h3>
        </div>

        <div className="accountSettingsActionList">
          <button
            type="button"
            className="accountSettingsActionRow accountSettingsActionButton"
            onClick={handleSendPasswordEmail}
            disabled={busy}
          >
            <div>
              <div className="accountSettingsActionTitle">
                {busy ? "Sending password email..." : "Change password"}
              </div>
              <div className="accountSettingsActionText">
                Send a secure password reset link to your account email.
              </div>
            </div>
            <div className="accountSettingsActionArrow">→</div>
          </button>

          <button
            type="button"
            className="accountSettingsActionRow accountSettingsActionButton danger"
            onClick={handleLogoutAllDevices}
            disabled={logoutAllBusy}
          >
            <div>
              <div className="accountSettingsActionTitle">
                {logoutAllBusy ? "Logging out everywhere..." : "Log out of all devices"}
              </div>
              <div className="accountSettingsActionText">
                End every active session for this account across all devices.
              </div>
            </div>
            <div className="accountSettingsActionArrow">→</div>
          </button>
        </div>

        {msg ? <div className="accountSettingsInlineSuccess">{msg}</div> : null}
        {err ? <div className="accountSettingsInlineError">{err}</div> : null}
      </section>
    </div>
  );
}