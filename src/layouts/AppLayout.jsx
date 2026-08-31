import {
  useEffect,
  useState,
} from "react";

import {
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";

import Header from "../components/Header.jsx";
import AuthModal from "../components/AuthModal.jsx";
import CompleteGoogleSignupModal from "../components/CompleteGoogleSignupModal.jsx";
import Sidebar from "../components/Sidebar.jsx";
import TermsModal from "../components/TermsModal.jsx";
import ReviveAd from "../components/ReviveAd.jsx";
import FloatingVideoAd from "../components/FloatingVideoAd.jsx";

import {
  resendVerificationEmail,
} from "../api.js";

const FLOATING_VIDEO_VAST_URL =
  "https://servedby.revive-adserver.net/fc.php?script=apVideo:vast2&zoneid=30344";


function PlatformNotice({
  onOpenTerms,
}) {
  return (
    <section
      className="platformNotice"
      aria-label="Platform information"
    >
      <div className="platformNoticeGrid">

        <article className="platformNoticeCard">
          <h3>
            Platform Notice
          </h3>

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
          <h3>
            Privacy Policy
          </h3>

          <p>
            Learn what information DYOP collects, how it is used, and the choices
            users have regarding their data.
          </p>

          <Link
            to="/privacy"
            className="platformNoticeLink"
          >
            Read more
          </Link>
        </article>

        <article className="platformNoticeCard">
          <h3>
            DMCA & Rights
          </h3>

          <p>
            We review valid copyright and rights complaints and may remove content
            or restrict accounts where necessary.
          </p>

          <Link
            to="/dmca"
            className="platformNoticeLink"
          >
            Read more
          </Link>
        </article>

        <article className="platformNoticeCard">
          <h3>
            Advertising
          </h3>

          <p>
            Promote your brand, product, or service across DYOP with display and
            video advertising opportunities.
          </p>

          <Link
            to="/advertising"
            className="platformNoticeLink"
          >
            Advertise with DYOP
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
  const [q, setQ] =
    useState("");

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  const [
    verifyBusy,
    setVerifyBusy,
  ] = useState(false);

  const [
    verifyMsg,
    setVerifyMsg,
  ] = useState("");

  const [
    termsOpen,
    setTermsOpen,
  ] = useState(false);

  const nav =
    useNavigate();

  const location =
    useLocation();

  /* =========================================================
     ROUTE STATE
     ========================================================= */

  const isActualVideoRoute =
    /^\/watch\/[^/]+\/?$/.test(
      location.pathname
    );

  const isModerator =
    !!user?.isModerator;

  const isAccountRoute =
    location.pathname.startsWith(
      "/account"
    );

  const isLegalRoute =
  location.pathname.startsWith(
    "/dmca"
  ) ||
  location.pathname.startsWith(
    "/privacy"
  ) ||
  location.pathname.startsWith(
    "/advertising"
  );

  const hideSidebar =
    isAccountRoute ||
    isLegalRoute;

  const useStandaloneLayout =
    isAccountRoute ||
    isLegalRoute;

  /* =========================================================
     SIDEBAR
     ========================================================= */

  useEffect(() => {
    if (hideSidebar) {
      setSidebarOpen(false);
    }
  }, [
    hideSidebar,
  ]);

  /* =========================================================
     GLOBAL AD SUSPENSION

     Keeps all Revive ads suspended while a modal or setup
     flow is open.
     ========================================================= */

  useEffect(() => {
    const shouldSuspendAds =
      !!authOpen ||
      !!termsOpen ||
      !!user?.usernameNeedsSetup;

    document.documentElement.dataset.adsSuspended =
      shouldSuspendAds
        ? "true"
        : "false";

    window.dispatchEvent(
      new CustomEvent(
        "dyop:ads-suspended",
        {
          detail: {
            suspended:
              shouldSuspendAds,
          },
        }
      )
    );

    return () => {
      delete document.documentElement.dataset.adsSuspended;
    };
  }, [
    authOpen,
    termsOpen,
    user?.usernameNeedsSetup,
  ]);

  /* =========================================================
     IMMEDIATE AD SUSPENSION

     This runs BEFORE opening a modal so Revive iframes are
     removed before React mounts AuthModal / TermsModal.
     ========================================================= */

  function suspendAdsImmediately() {
    document.documentElement.dataset.adsSuspended =
      "true";

    window.dispatchEvent(
      new CustomEvent(
        "dyop:ads-suspended",
        {
          detail: {
            suspended: true,
          },
        }
      )
    );
  }

  /* =========================================================
     SAFE MODAL OPENERS
     ========================================================= */

  function handleOpenLogin(
    path = null
  ) {
    suspendAdsImmediately();

    requestAnimationFrame(() => {
      onOpenLogin(
        path
      );
    });
  }

  function handleOpenRegister(
    path = null
  ) {
    suspendAdsImmediately();

    requestAnimationFrame(() => {
      onOpenRegister(
        path
      );
    });
  }

  function handleOpenTerms() {
    suspendAdsImmediately();

    requestAnimationFrame(() => {
      setTermsOpen(
        true
      );
    });
  }

  /* =========================================================
     EMAIL VERIFICATION
     ========================================================= */

  async function handleResendVerification() {
    try {
      setVerifyBusy(
        true
      );

      setVerifyMsg(
        ""
      );

      await resendVerificationEmail();

      setVerifyMsg(
        "Verification email sent."
      );
    } catch (err) {
      setVerifyMsg(
        err?.message ||
        "Failed to resend verification email."
      );
    } finally {
      setVerifyBusy(
        false
      );
    }
  }

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <div className="shell">

      <Header
        user={user}

        onOpenLogin={
          handleOpenLogin
        }

        onOpenRegister={
          handleOpenRegister
        }

        onLogout={
          onLogout
        }

        onToggleSidebar={() => {
          if (!hideSidebar) {
            setSidebarOpen(
              (v) => !v
            );
          }
        }}

        q={q}
        setQ={setQ}
      />

      <div
        className={`appShell ${
          useStandaloneLayout
            ? "appShell--account"
            : ""
        }`}
      >

        {!hideSidebar && (
          <Sidebar
            user={user}

            onOpenLogin={
              handleOpenLogin
            }

            mobileOpen={
              sidebarOpen
            }

            setMobileOpen={
              setSidebarOpen
            }
          />
        )}

        <main
          className={`appMain ${
            useStandaloneLayout
              ? "appMain--account"
              : ""
          }`}
        >
          <div
            className={`appContent ${
              useStandaloneLayout
                ? "appContent--account"
                : ""
            }`}
          >

            {user &&
            user.emailVerified === false &&
            !isLegalRoute && (
              <div className="verifyBanner">

                <div className="verifyBannerText">
                  Verify your email to unlock uploads,
                  comments, ratings, subscriptions,
                  and history.
                </div>

                <div className="verifyBannerActions">

                  <button
                    type="button"
                    className="verifyBannerBtn"

                    onClick={
                      handleResendVerification
                    }

                    disabled={
                      verifyBusy
                    }
                  >
                    {verifyBusy
                      ? "Sending..."
                      : "Resend verification email"}
                  </button>

                </div>

                {verifyMsg ? (
                  <div className="verifyBannerMsg">
                    {verifyMsg}
                  </div>
                ) : null}

              </div>
            )}

            {useStandaloneLayout ? (

              <Outlet
                context={{
                  q,
                  setQ,
                  user,
                }}
              />

            ) : (

              <>

                <section className="workspaceShell">

                  <nav
                    className="folderTabs"
                    aria-label="Workspace tabs"
                  >

                    <NavLink
                      to="/watch"
                      end

                      className={({
                        isActive,
                      }) =>
                        `folderTab ${
                          isActive
                            ? "active"
                            : ""
                        }`
                      }
                    >
                      Watch
                    </NavLink>

                    <NavLink
                      to="/generate"

                      className={({
                        isActive,
                      }) =>
                        `folderTab ${
                          isActive
                            ? "active"
                            : ""
                        } ${
                          !user
                            ? "lockedTab"
                            : ""
                        }`
                      }

                      onClick={(e) => {
                        if (!user) {
                          e.preventDefault();

                          handleOpenLogin(
                            "/generate"
                          );
                        }
                      }}
                    >
                      Generate
                    </NavLink>

                    

                    {isModerator && (

                      <NavLink
                        to="/moderation"

                        className={({
                          isActive,
                        }) =>
                          `folderTab ${
                            isActive
                              ? "active"
                              : ""
                          }`
                        }
                      >
                        Moderation
                      </NavLink>

                    )}

                  </nav>

                  <div className="folderBody">

                    <Outlet
                      context={{
                        q,
                        setQ,
                        user,
                      }}
                    />

                  </div>

                </section>

                <div className="platformNoticeAd">
                  <ReviveAd
                    zoneId={30437}
                    width={728}
                    height={90}

                    mobileZoneId={30491}
                    mobileWidth={300}
                    mobileHeight={100}
                  />
                </div>

                <PlatformNotice
                  onOpenTerms={
                    handleOpenTerms
                  }
                />

              </>

            )}

          </div>
        </main>

      </div>

      {/* =====================================================
          FLOATING VIDEO AD

          Hidden on:
          - actual /watch/:id pages
          - login / register
          - terms
          - Google username setup
         ===================================================== */}

      {!isActualVideoRoute &&
      !authOpen &&
      !termsOpen &&
      !user?.usernameNeedsSetup && (

        <FloatingVideoAd
          vastUrl={`${API_BASE}/api/ads/vast?zoneId=YOUR_FLOATING_ZONE_ID`}
        />

      )}

      {/* =====================================================
          TERMS MODAL
         ===================================================== */}

      <TermsModal
        open={
          termsOpen
        }

        onClose={() =>
          setTermsOpen(
            false
          )
        }
      />

      {/* =====================================================
          AUTH MODAL
         ===================================================== */}

      {authOpen && (

        <AuthModal
          mode={
            authMode
          }

          onClose={
            onCloseAuth
          }

          onSuccess={(userData) => {
            onAuthSuccess(
              userData
            );

            if (postAuthPath) {
              nav(
                postAuthPath
              );

              setPostAuthPath(
                null
              );
            }
          }}

          onSwitchMode={(mode) => {
            if (
              mode === "login"
            ) {
              handleOpenLogin(
                postAuthPath
              );
            } else {
              handleOpenRegister(
                postAuthPath
              );
            }
          }}
        />

      )}

      {/* =====================================================
          GOOGLE SIGNUP COMPLETION
         ===================================================== */}

      {user?.usernameNeedsSetup && (

        <CompleteGoogleSignupModal
          onSuccess={(updatedUser) => {
            onAuthSuccess(
              updatedUser
            );

            window.location.reload();
          }}
        />

      )}

    </div>
  );
}