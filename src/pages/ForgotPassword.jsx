import { useState } from "react";
import { forgotPassword } from "../api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    setMsg("");

    try {
      const data = await forgotPassword(email);
      setMsg(data?.message || "If that email exists, a reset link has been sent.");
    } catch (e) {
      setErr(e?.message || "Failed to request password reset");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="verifyPage">
      <div className="verifyCard">
        <h2>Reset password</h2>
        <p>Enter your email and we’ll send you a reset link.</p>

        <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="verifyInput"
            required
          />

          <button className="verifyBtn" type="submit" disabled={busy}>
            {busy ? "Sending..." : "Send reset link"}
          </button>
        </form>

        {msg ? <p style={{ marginTop: 14 }}>{msg}</p> : null}
        {err ? <p style={{ marginTop: 14, color: "salmon" }}>{err}</p> : null}
      </div>
    </div>
  );
}