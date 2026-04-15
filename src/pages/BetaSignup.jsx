import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerBeta } from "../api";
import logo from "../assets/logo-01-cropped.svg";
import "./BetaSignup.css";

function calculateAge(dateString) {
  if (!dateString) return null;

  const today = new Date();
  const birthDate = new Date(dateString);

  if (Number.isNaN(birthDate.getTime())) return null;

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

function getApiBase() {
  return window.location.hostname === "localhost"
    ? "http://localhost:3001"
    : "https://api.dyop.ai";
}

export default function BetaSignup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Please choose a username.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!dateOfBirth) {
      setError("Please enter your date of birth.");
      return;
    }

    const age = calculateAge(dateOfBirth);

    if (age == null) {
      setError("Please enter a valid date of birth.");
      return;
    }

    if (age < 18) {
      setError("You must be at least 18 years old to create an account.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setStatus("loading");

      const data = await registerBeta({
        email: email.trim().toLowerCase(),
        username: username.trim(),
        password,
        dateOfBirth,
        country: country.trim() || null,
      });

      if (data?.user) {
        navigate("/watch");
        return;
      }

      navigate("/watch");
    } catch (err) {
      setError(err?.message || "Failed to create account.");
      setStatus("idle");
    }
  }

  function handleGoogleBetaSignup() {
    const apiBase = getApiBase();
    window.location.href = `${apiBase}/auth/google/beta`;
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
            <span className="betaSmall">CREATE YOUR ACCOUNT</span>
          </div>

          <div className="betaBrandRow">
            <div className="betaBrandBlock">
              <img src={logo} alt="DYOP" className="betaLogo" />
            </div>
          </div>

          <div className="betaSocials">
            <button
              type="button"
              className="betaButton betaButtonGoogle"
              onClick={handleGoogleBetaSignup}
              disabled={status === "loading"}
            >
              Continue with Google
            </button>
          </div>

          <div className="betaDivider">
            <span>or</span>
          </div>

          <form className="betaForm" onSubmit={handleSubmit}>
            <input
              className="betaInput"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={status === "loading"}
            />

            <input
              className="betaInput"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
            />

            <input
              className="betaInput"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={status === "loading"}
            />

            <input
              className="betaInput"
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              disabled={status === "loading"}
            />

            <input
              className="betaInput"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              disabled={status === "loading"}
            />

            <input
              className="betaInput"
              type="text"
              placeholder="Country (optional)"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              disabled={status === "loading"}
            />

            {error ? <div className="betaMessage error">{error}</div> : null}

            <button
              className="betaButton betaButtonPrimary"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Creating account..." : "Continue"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}