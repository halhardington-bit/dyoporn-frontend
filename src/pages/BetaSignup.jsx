import { useState } from "react";
import { betaSignup } from "../api";
import "./BetaSignup.css";

export default function BetaSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setStatus("error");
      setMessage("Please enter your email.");
      return;
    }

    try {
      setStatus("loading");
      setMessage("");

      const res = await betaSignup(cleanEmail);

      setStatus("success");
      setMessage(res?.message || "Thanks. You're on the list.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "Something went wrong.");
    }
  }

  return (
    <div className="betaPage">
      <div className="betaNoise" />
      <div className="betaGlow betaGlowA" />
      <div className="betaGlow betaGlowB" />

      <main className="betaWrap">
        <section className="betaShell">
          <div className="betaTopline">
            <span className="betaKicker">BETA ACCESS</span>
            <span className="betaDot" />
            <span className="betaSmall">Sign up for early entry</span>
          </div>

          <div className="betaBrandRow">
            <div className="betaBrandBlock">
              <div className="betaBrand">DYOPorn</div>
              <div className="betaBrandShadow">DYOPorn</div>
            </div>
          </div>

          <form className="betaForm" onSubmit={handleSubmit}>
            <input
              className="betaInput"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
            />

            <button
              className="betaButton"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Joining..." : "Join Beta"}
            </button>
          </form>

          {message ? (
            <div
              className={`betaMessage ${
                status === "success" ? "success" : "error"
              }`}
            >
              {message}
            </div>
          ) : null}

          <div className="betaMeta">
            
          </div>
        </section>
      </main>
    </div>
  );
}