import { useState } from "react";
import { betaSignup } from "../api";
import "./BetaSignup.css";

export default function BetaSignup() {
  const [email, setEmail] = useState("");
  const [watching, setWatching] = useState(false);
  const [creating, setCreating] = useState(false);
  const [status, setStatus] = useState("idle");
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

      const res = await betaSignup({
        email: cleanEmail,
        watching,
        creating,
      });

      setStatus("success");
      setMessage(res?.message || "Thanks. You're on the list.");
      setEmail("");
      setWatching(false);
      setCreating(false);
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
            <span className="betaSmall">SIGN UP FOR EARLY ENTRY</span>
          </div>

          <div className="betaBrandRow">
            <div className="betaBrandBlock">
              <div className="betaBrand">DYOPorn</div>
              <div className="betaBrandShadow">DYOPorn</div>
            </div>
          </div>

          <form className="betaForm" onSubmit={handleSubmit}>
            
            {/* Email input */}
            <input
              className="betaInput"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
            />

            {/* Optional section */}
            <div className="betaOptional">
              <div className="betaOptionalLabel">
                Optional — What do you want to use DYOPorn for?
              </div>

              <div className="betaChecks">
                <label className={`betaCheck ${watching ? "isChecked" : ""}`}>
                  <input
                    type="checkbox"
                    checked={watching}
                    onChange={(e) => setWatching(e.target.checked)}
                  />
                  <span>Watching videos</span>
                </label>

                <label className={`betaCheck ${creating ? "isChecked" : ""}`}>
                  <input
                    type="checkbox"
                    checked={creating}
                    onChange={(e) => setCreating(e.target.checked)}
                  />
                  <span>Creating videos</span>
                </label>
              </div>
            </div>

            {/* CTA */}
            <button
              className="betaButton betaButtonPrimary"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Joining..." : "Join Beta"}
            </button>

            {message && (
              <div className={`betaMessage ${status === "success" ? "success" : "error"}`}>
                {message}
              </div>
            )}

          </form>
        </section>
      </main>
    </div>
  );
}