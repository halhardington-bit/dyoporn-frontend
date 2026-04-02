import { useState, useEffect, useRef } from "react";
import "./LoginModal.css";
import { login, register } from "../api";

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

export default function AuthModal({
  mode = "login", // "login" | "register"
  onClose,
  onSuccess,
  onSwitchMode,
}) {
  const isLogin = mode === "login";

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");

  const backdropRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!onSuccess) {
      setError("onSuccess handler missing (AppLayout wiring).");
      return;
    }

    if (!isLogin) {
      if (!username.trim()) {
        setError("Please choose a username.");
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

      if (password !== confirm) {
        setError("Passwords do not match.");
        return;
      }
    }

    try {
      const data = isLogin
        ? await login({ email, password })
        : await register({
            email,
            username: username.trim(),
            password,
            dateOfBirth,
            country: country.trim() || null,
          });

      console.log("AUTH SUCCESS DATA:", data);
      onSuccess(data);
      onClose?.();
    } catch (err) {
      setError(err?.message || "Auth failed.");
    }
  }

  return (
    <div
      className="modal-backdrop"
      ref={backdropRef}
      onMouseDown={(e) => {
        if (e.target === backdropRef.current) {
          backdropRef.current._mouseDownOnBackdrop = true;
        }
      }}
      onMouseUp={(e) => {
        if (
          backdropRef.current?._mouseDownOnBackdrop &&
          e.target === backdropRef.current
        ) {
          onClose?.();
        }
        if (backdropRef.current) {
          backdropRef.current._mouseDownOnBackdrop = false;
        }
      }}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-left">
            <h2 className="modal-title">
              {isLogin ? "Log in" : "Create account"}
            </h2>

            <span className="signup-hint inline">
              {isLogin ? (
                <>
                  Not a member?{" "}
                  <button
                    className="signup-link"
                    type="button"
                    onClick={() => onSwitchMode?.("register")}
                  >
                    Sign up now
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    className="signup-link"
                    type="button"
                    onClick={() => onSwitchMode?.("login")}
                  >
                    Log in
                  </button>
                </>
              )}
            </span>
          </div>

          <button className="icon-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <label className="field">
              <span className="label">Username</span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username"
                autoFocus
              />
            </label>
          )}

          <label className="field">
            <span className="label">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              autoFocus={isLogin}
            />
          </label>

          {!isLogin && (
            <label className="field">
              <span className="label">Date of birth</span>
              <input
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                type="date"
                max={new Date().toISOString().split("T")[0]}
              />
            </label>
          )}

          {!isLogin && (
            <label className="field">
              <span className="label">Country <span style={{ opacity: 0.7 }}>(optional)</span></span>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                type="text"
                placeholder="e.g. Japan"
              />
            </label>
          )}

          <label className="field">
            <span className="label">Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
            />
          </label>

          {!isLogin && (
            <label className="field">
              <span className="label">Confirm password</span>
              <input
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                type="password"
                placeholder="••••••••"
              />
            </label>
          )}

          {isLogin ? (
            <div style={{ marginTop: 8 }}>
              <button
                type="button"
                className="signup-link"
                onClick={() => {
                  onClose?.();
                  window.location.href = "/forgot-password";
                }}
              >
                Forgot password?
              </button>
            </div>
          ) : null}

          {error && (
            <div style={{ marginTop: 8, opacity: 0.9 }}>
              <span style={{ color: "salmon" }}>{error}</span>
            </div>
          )}

          <div className="modal-actions">
            <button className="btn btn-primary" type="submit">
              {isLogin ? "Log in" : "Create account"}
            </button>
            <button className="btn btn-ghost" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}