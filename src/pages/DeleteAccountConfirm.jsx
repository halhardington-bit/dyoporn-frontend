import { useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { confirmAccountDeletion } from "../api.js";
import "./DeleteAccountConfirm.css";

export default function DeleteAccountConfirm() {
  const [params] = useSearchParams();
  const nav = useNavigate();

  const token = useMemo(() => (params.get("token") || "").trim(), [params]);

  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!token) {
      setErr("Missing or invalid delete token.");
      return;
    }

    if (!password) {
      setErr("Please enter your current password.");
      return;
    }

    try {
      setBusy(true);
      setErr("");

      await confirmAccountDeletion({ token, password });

      nav("/watch", { replace: true });
      window.location.reload();
    } catch (e2) {
      setErr(e2?.message || "Failed to delete account.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="deleteAccountPage">
      <div className="deleteAccountCard">
        <h1 className="deleteAccountTitle">Confirm account deletion</h1>
        <p className="deleteAccountText">
          Enter your current password to permanently delete your account.
        </p>

        <form onSubmit={handleSubmit} className="deleteAccountForm">
          <label className="deleteAccountLabel">
            Current password
            <input
              type="password"
              className="deleteAccountInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>

          {err ? <div className="deleteAccountError">{err}</div> : null}

          <button type="submit" className="deleteAccountButton" disabled={busy}>
            {busy ? "Deleting..." : "Delete account permanently"}
          </button>
        </form>
      </div>
    </div>
  );
}