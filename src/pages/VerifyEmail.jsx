import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../api";

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Missing verification token.");
      return;
    }

    async function run() {
      try {
        await verifyEmail(token);
        setStatus("success");
        setMessage("Your email has been verified!");

        // optional redirect after a few seconds
        setTimeout(() => {
          navigate("/watch");
        }, 2500);
      } catch (err) {
        setStatus("error");
        setMessage(err?.message || "Verification failed.");
      }
    }

    run();
  }, [params, navigate]);

  return (
    <div className="verifyPage">
      <div className="verifyCard">
        {status === "loading" && (
          <>
            <h2>Verifying your email...</h2>
            <p>Please wait a moment.</p>
          </>
        )}

        {status === "success" && (
          <>
            <h2>✅ Email verified</h2>
            <p>{message}</p>
            <p>Redirecting you back...</p>
          </>
        )}

        {status === "error" && (
          <>
            <h2>❌ Verification failed</h2>
            <p>{message}</p>

            <button
              onClick={() => navigate("/watch")}
              className="verifyBtn"
            >
              Go back
            </button>
          </>
        )}
      </div>
    </div>
  );
}