import { useState } from "react";
import { requestAccountDeletionEmail } from "../../api.js";
import "./AccountSettings.css";

export default function AccountDanger({ user }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  if (!user) return null;

  async function handleProceed() {
    try {
      setBusy(true);
      setMsg("");
      setErr("");

      const res = await requestAccountDeletionEmail();

      setMsg(
        res?.message ||
          "A confirmation email has been sent. The link will expire shortly."
      );
    } catch (e) {
      setErr(e?.message || "Failed to send delete confirmation email.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="accountSettingsContent">
      <section className="accountSettingsIntro">
        <div className="accountSettingsKicker">Delete account</div>
        <h2 className="accountSettingsHeading">Delete your account</h2>
        <p className="accountSettingsSubtext">
          This action is permanent and cannot be reversed.
        </p>
      </section>

      <section className="accountSettingsSection accountSettingsDangerSection">
        <div className="accountDangerBlock">
          <h3 className="accountDangerTitle">Before you continue</h3>
          <p className="accountDangerText">
            Deleting your account will permanently remove your profile, account
            data, and any uploaded videos associated with it.
          </p>
          <p className="accountDangerText">
            This includes content and related data that cannot be recovered once
            deletion is complete.
          </p>

          <div className="accountDangerActions">
            <button
              type="button"
              className="accountDangerButton"
              onClick={handleProceed}
              disabled={busy}
            >
              {busy ? "Sending..." : "Proceed"}
            </button>
          </div>

          {msg ? <div className="accountSettingsSuccess">{msg}</div> : null}
          {err ? <div className="accountSettingsError">{err}</div> : null}
        </div>
      </section>
    </div>
  );
}