import { useState } from "react";
import "./AgeGate.css";

const MIN_AGE = 18;
const AGE_GATE_STORAGE_KEY = "dyop_age_gate_v1";

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
    age -= 1;
  }

  return age;
}

export default function AgeGate({ onPass }) {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!dateOfBirth) {
      setError("Please enter your date of birth.");
      return;
    }

    const age = calculateAge(dateOfBirth);

    if (age == null) {
      setError("Please enter a valid date of birth.");
      return;
    }

    if (age < MIN_AGE) {
      setError(`You must be at least ${MIN_AGE}+ to enter this site.`);
      return;
    }

    if (!confirmed) {
      setError("Please confirm that you are 18 or older.");
      return;
    }

    try {
      localStorage.setItem(
        AGE_GATE_STORAGE_KEY,
        JSON.stringify({
          passed: true,
          dob: dateOfBirth,
          verifiedAt: new Date().toISOString(),
        })
      );
    } catch {}

    onPass?.();
  }

  return (
    <div className="ageGateBackdrop">
      <div className="ageGateNoise" />
      <div className="ageGateGlow ageGateGlowA" />
      <div className="ageGateGlow ageGateGlowB" />

      <main className="ageGateWrap">
        <section className="ageGateCard">
          <div className="ageGateTopline">
            <span className="ageGateEyebrow">AGE VERIFICATION</span>
            <span className="ageGateDot" />
            <span className="ageGateSmall">ADULTS ONLY</span>
          </div>

          <h1 className="ageGateTitle">Enter date of birth</h1>

          <p className="ageGateText">
            This site contains AI-generated adult content intended only for
            users aged 18+. All depicted subjects are intended to represent
            adults aged 21+.
          </p>

          <form className="ageGateForm" onSubmit={handleSubmit}>
            <label className="ageGateField">
              <span className="ageGateLabel">Date of birth</span>
              <input
                className="ageGateInput"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </label>

            <label className="ageGateCheck">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
              <span>
                I confirm that I am 18 or older and understand this site
                contains adult content.
              </span>
            </label>

            {error ? <div className="ageGateError">{error}</div> : null}

            <button className="ageGateButton" type="submit">
              Continue
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}