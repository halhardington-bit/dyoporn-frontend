import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerBeta } from "../api";
import logo from "../assets/logo-01-exact-bounds.svg";
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

function buildDateOfBirth(year, month, day) {
  if (!year || !month || !day) return "";

  const yyyy = String(year).padStart(4, "0");
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

function getDaysInMonth(year, month) {
  if (!year || !month) return 31;
  return new Date(Number(year), Number(month), 0).getDate();
}

const MONTHS = [
  { value: "1", label: "Jan" },
  { value: "2", label: "Feb" },
  { value: "3", label: "Mar" },
  { value: "4", label: "Apr" },
  { value: "5", label: "May" },
  { value: "6", label: "Jun" },
  { value: "7", label: "Jul" },
  { value: "8", label: "Aug" },
  { value: "9", label: "Sep" },
  { value: "10", label: "Oct" },
  { value: "11", label: "Nov" },
  { value: "12", label: "Dec" },
];

export default function BetaSignup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");

  const currentYear = new Date().getFullYear();

  const yearOptions = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => String(currentYear - 18 - i));
  }, [currentYear]);

  const dayOptions = useMemo(() => {
    const count = getDaysInMonth(birthYear || 2000, birthMonth || 1);
    return Array.from({ length: count }, (_, i) => String(i + 1));
  }, [birthYear, birthMonth]);

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

    const dateOfBirth = buildDateOfBirth(birthYear, birthMonth, birthDay);

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
    window.location.href = `${apiBase}/auth/google?beta=1`;
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

            <div className="betaDobRow">
              <select
                className="betaInput betaSelect"
                value={birthDay}
                onChange={(e) => setBirthDay(e.target.value)}
                disabled={status === "loading"}
                aria-label="Birth day"
              >
                <option value="">Day</option>
                {dayOptions.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>

              <select
                className="betaInput betaSelect"
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
                disabled={status === "loading"}
                aria-label="Birth month"
              >
                <option value="">Month</option>
                {MONTHS.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>

              <select
                className="betaInput betaSelect"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                disabled={status === "loading"}
                aria-label="Birth year"
              >
                <option value="">Year</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

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