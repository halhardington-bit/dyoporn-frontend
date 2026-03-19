import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import AuthModal from "../components/AuthModal.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { resendVerificationEmail } from "../api.js";

export default function AppLayout({
  user,
  onLogout,
  authOpen,
  authMode,
  onOpenLogin,
  onOpenRegister,
  onCloseAuth,
  onAuthSuccess,
  postAuthPath,
  setPostAuthPath,
}) {
  const [q, setQ] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [verifyBusy, setVerifyBusy] = useState(false);
  const [verifyMsg, setVerifyMsg] = useState("");
  const nav = useNavigate();

  async function handleResendVerification() {
    try {
      setVerifyBusy(true);
      setVerifyMsg("");
      await resendVerificationEmail();
      setVerifyMsg("Verification email sent.");
    } catch (err) {
      setVerifyMsg(err?.message || "Failed to resend verification email.");
    } finally {
      setVerifyBusy(false);
    }
  }

  return (
    <div className="shell">
      <Header
        user={user}
        onOpenLogin={onOpenLogin}
        onOpenRegister={onOpenRegister}
        onLogout={onLogout}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
        q={q}
        setQ={setQ}
      />

      <div className="appShell">
        <Sidebar
          user={user}
          onOpenLogin={onOpenLogin}
          mobileOpen={sidebarOpen}
          setMobileOpen={setSidebarOpen}
        />

        <div className="appMain">
          <div className="appContent">
            {user && user.emailVerified === false && (
              <div className="verifyBanner">
                <div className="verifyBannerText">
                  Verify your email to unlock uploads, comments, ratings, subscriptions, and history.
                </div>

                <div className="verifyBannerActions">
                  <button
                    type="button"
                    className="verifyBannerBtn"
                    onClick={handleResendVerification}
                    disabled={verifyBusy}
                  >
                    {verifyBusy ? "Sending..." : "Resend verification email"}
                  </button>
                </div>

                {verifyMsg ? <div className="verifyBannerMsg">{verifyMsg}</div> : null}
              </div>
            )}

            <div className="folderShell">
              <nav className="folderTabs">
                <NavLink
                  to="/watch"
                  end
                  className={({ isActive }) => `folderTab ${isActive ? "active" : ""}`}
                >
                  Watch
                </NavLink>

                <NavLink
                  to="/create"
                  className={({ isActive }) =>
                    `folderTab ${isActive ? "active" : ""} ${!user ? "lockedTab" : ""}`
                  }
                  onClick={(e) => {
                    if (!user) {
                      e.preventDefault();
                      onOpenLogin("/create");
                    }
                  }}
                >
                  Upload
                </NavLink>

                <NavLink
                  to="/generate"
                  className={({ isActive }) =>
                    `folderTab ${isActive ? "active" : ""} ${!user ? "lockedTab" : ""}`
                  }
                  onClick={(e) => {
                    if (!user) {
                      e.preventDefault();
                      onOpenLogin("/generate");
                    }
                  }}
                >
                  Generate
                </NavLink>
              </nav>

              <div className="folderBody">
                <Outlet context={{ q, setQ, user }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {authOpen && (
        <AuthModal
          mode={authMode}
          onClose={onCloseAuth}
          onSuccess={(userData) => {
            onAuthSuccess(userData);

            if (postAuthPath) {
              nav(postAuthPath);
              setPostAuthPath(null);
            }
          }}
          onSwitchMode={(m) =>
            m === "login" ? onOpenLogin(postAuthPath) : onOpenRegister(postAuthPath)
          }
        />
      )}
    </div>
  );
}