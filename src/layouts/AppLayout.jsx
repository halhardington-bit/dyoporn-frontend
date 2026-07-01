import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import AuthModal from "../components/AuthModal.jsx";
import CompleteGoogleSignupModal from "../components/CompleteGoogleSignupModal.jsx";
import Sidebar from "../components/Sidebar.jsx";
import TermsModal from "../components/TermsModal.jsx";
import { resendVerificationEmail } from "../api.js";

function PlatformNotice({ onOpenTerms }) {
  return (
    <section className="platformNotice" aria-label="Platform notice">
      <div className="platformNoticeGrid">

        <article className="platformNoticeCard">
          <h3>Platform Notice</h3>
          <p>
            Content on this platform is presented as synthetic and intended to depict
            adults aged 21+ and over only. Material that violates platform rules or
            applicable law is prohibited.
          </p>

          <button
            type="button"
            className="platformNoticeLink platformNoticeButton"
            onClick={onOpenTerms}
          >
            Terms and Conditions
          </button>
        </article>

        <article className="platformNoticeCard">
          <h3>Privacy Policy</h3>
          <p>
            Learn what information DYOP collects, how it is used, and the choices
            users have regarding their data.
          </p>
          <Link to="/privacy" className="platformNoticeLink">
            Read more
          </Link>
        </article>

        <article className="platformNoticeCard">
          <h3>DMCA & Rights</h3>
          <p>
            We review valid copyright and rights complaints and may remove content
            or restrict accounts where necessary.
          </p>
          <Link to="/dmca" className="platformNoticeLink">
            Read more
          </Link>
        </article>

      </div>
    </section>
  );
}

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
  const [termsOpen, setTermsOpen] = useState(false);

  const nav = useNavigate();
  const location = useLocation();

  const isModerator = !!user?.isModerator;
  const isAccountRoute = location.pathname.startsWith("/account");
  const isLegalRoute =
    location.pathname.startsWith("/dmca") ||
    location.pathname.startsWith("/privacy");
  const hideSidebar = isAccountRoute || isLegalRoute;
  const useStandaloneLayout = isAccountRoute || isLegalRoute;

  useEffect(() => {
    if (hideSidebar) {
      setSidebarOpen(false);
    }
  }, [hideSidebar]);

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
        onToggleSidebar={() => {
          if (!hideSidebar) {
            setSidebarOpen((v) => !v);
          }
        }}
        q={q}
        setQ={setQ}
      />

      <div className={`appShell ${useStandaloneLayout ? "appShell--account" : ""}`}>
        {!hideSidebar && (
          <Sidebar
            user={user}
            onOpenLogin={onOpenLogin}
            mobileOpen={sidebarOpen}
            setMobileOpen={setSidebarOpen}
          />
        )}

        <main className={`appMain ${useStandaloneLayout ? "appMain--account" : ""}`}>
          <div className={`appContent ${useStandaloneLayout ? "appContent--account" : ""}`}>
            {user && user.emailVerified === false && !isLegalRoute && (
              <div className="verifyBanner">
                <div className="verifyBannerText">
                  Verify your email to unlock uploads, comments, ratings,
                  subscriptions, and history.
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

            {useStandaloneLayout ? (
              <Outlet context={{ q, setQ, user }} />
            ) : (
              <>
                <section className="workspaceShell">
                  <nav className="folderTabs" aria-label="Workspace tabs">
                    <NavLink
                      to="/watch"
                      end
                      className={({ isActive }) => `folderTab ${isActive ? "active" : ""}`}
                    >
                      Watch
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

                    <NavLink
                      to="/plans"
                      className={({ isActive }) => `folderTab ${isActive ? "active" : ""}`}
                    >
                      Plans
                    </NavLink>

                    {isModerator && (
                      <NavLink
                        to="/moderation"
                        className={({ isActive }) => `folderTab ${isActive ? "active" : ""}`}
                      >
                        Moderation
                      </NavLink>
                    )}
                  </nav>

                  <div className="folderBody">
                    <Outlet context={{ q, setQ, user }} />
                  </div>
                </section>

                <PlatformNotice onOpenTerms={() => setTermsOpen(true)} />
              </>
            )}
          </div>
        </main>
      </div>

      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />

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
            m === "login"
              ? onOpenLogin(postAuthPath)
              : onOpenRegister(postAuthPath)
          }
        />
      )}

      {user?.usernameNeedsSetup && (
        <CompleteGoogleSignupModal
          onSuccess={(updatedUser) => {
            onAuthSuccess(updatedUser);
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}