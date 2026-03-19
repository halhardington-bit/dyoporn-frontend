import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../api";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("ready");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setToken(params.get("token") || "");
  }, [params]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!token) {
      setStatus("error");
      setMessage("Missing reset token.");
      return;
    }

    if (password.length < 8) {
      setStatus("error");
      setMessage("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setBusy(true);
      setStatus("ready");
      setMessage("");

      await resetPassword(token, password);

      setStatus("success");
      setMessage("Your password has been reset. Redirecting to login...");

      setTimeout(() => {
        navigate("/watch");
      }, 2000);
    } catch (e) {
      setStatus("error");
      setMessage(e?.message || "Failed to reset password.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="verifyPage">
      <div className="verifyCard">
        <h2>Choose a new password</h2>
        <p>Enter your new password below.</p>

        <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
            className="verifyInput"
            required
          />

          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm new password"
            className="verifyInput"
            required
            style={{ marginTop: 10 }}
          />

          <button className="verifyBtn" type="submit" disabled={busy}>
            {busy ? "Resetting..." : "Reset password"}
          </button>
        </form>

        {status === "success" ? <p style={{ marginTop: 14 }}>{message}</p> : null}
        {status === "error" ? <p style={{ marginTop: 14, color: "salmon" }}>{message}</p> : null}
      </div>
    </div>
  );
}