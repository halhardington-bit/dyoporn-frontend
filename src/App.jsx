import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { me, logout, checkRegion } from "./api";

import AppLayout from "./layouts/AppLayout.jsx";
import Home from "./pages/Home.jsx";
import Watch from "./pages/Watch.jsx";
import Plans from "./pages/Plans.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Generate from "./pages/Generate.jsx";
import GenerateAssets from "./pages/GenerateAssets.jsx";
import GenerateShots from "./pages/GenerateShots.jsx";
import GenerateDashboard from "./pages/GenerateDashboard.jsx";
import GenerateEdit from "./pages/GenerateEdit.jsx";
import BetaSignup from "./pages/BetaSignup.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import SorryPage from "./pages/SorryPage.jsx";

import Moderation from "./pages/Moderation.jsx";
import ModerationReports from "./pages/moderation/ModerationReports.jsx";
import ModerationUsers from "./pages/moderation/ModerationUsers.jsx";
import ModerationUserDetail from "./pages/moderation/ModerationUserDetail.jsx";

import AgeGate from "./pages/AgeGate.jsx";
import Dmca from "./pages/dmca.jsx";

import AccountSettingsLayout from "./pages/accountSettings/AccountSettingsLayout.jsx";
import AccountSettingsLanding from "./pages/accountSettings/AccountSettingsLanding.jsx";
import AccountSecurity from "./pages/accountSettings/AccountSecurity.jsx";
import AccountBilling from "./pages/accountSettings/AccountBilling.jsx";
import DeleteAccountConfirm from "./pages//DeleteAccountConfirm.jsx";
import AccountDanger from "./pages/accountSettings/AccountDanger.jsx";

const BETA_LOCK = false;
const AGE_GATE_STORAGE_KEY = "dyop_age_gate_v1";

export default function App() {
  const [user, setUser] = useState(null);
  const [postAuthPath, setPostAuthPath] = useState(null);

  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const [ageVerified, setAgeVerified] = useState(false);
  const [ageGateReady, setAgeGateReady] = useState(false);
  const [regionReady, setRegionReady] = useState(false);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const data = await checkRegion();
        console.log("REGION CHECK:", data);

        if (
          alive &&
          data?.enabled &&
          data?.isAustralia &&
          window.location.pathname !== "/sorry"
        ) {
          window.location.replace("/sorry");
          return;
        }
      } catch (err) {
        console.warn("Region check failed:", err);
      } finally {
        if (alive) setRegionReady(true);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(AGE_GATE_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.passed) {
          setAgeVerified(true);
        }
      }
    } catch {
      // ignore malformed storage
    }

    setAgeGateReady(true);
  }, []);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const u = await me();
        if (alive) setUser(u || null);
      } catch {
        if (alive) setUser(null);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const refreshMe = useCallback(async () => {
    try {
      const currentUser = await me();
      setUser(currentUser || null);
      return currentUser || null;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  const openLogin = (redirectTo = null) => {
    setPostAuthPath(redirectTo);
    setAuthMode("login");
    setAuthOpen(true);
  };

  const openRegister = (redirectTo = null) => {
    setPostAuthPath(redirectTo);
    setAuthMode("register");
    setAuthOpen(true);
  };

  const closeAuth = () => setAuthOpen(false);

  const handleAuthSuccess = (userData) => {
    setUser(userData || null);
    setAuthOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // ignore logout failure and clear local user anyway
    }
    setUser(null);
  };

  useEffect(() => {
    refreshMe();
  }, [refreshMe]);

  if (!regionReady || !ageGateReady) {
    return null;
  }

  if (!ageVerified) {
    return (
      <AgeGate
        onPass={() => {
          setAgeVerified(true);
        }}
      />
    );
  }

  if (BETA_LOCK) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BetaSignup />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/watch" replace />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/beta" element={<BetaSignup />} />
        <Route path="/delete-account" element={<DeleteAccountConfirm />} />
        <Route path="/sorry" element={<SorryPage />} />

        <Route
          element={
            <AppLayout
              user={user}
              setUser={setUser}
              refreshMe={refreshMe}
              onLogout={handleLogout}
              authOpen={authOpen}
              authMode={authMode}
              onOpenLogin={openLogin}
              onOpenRegister={openRegister}
              onCloseAuth={closeAuth}
              onAuthSuccess={handleAuthSuccess}
              postAuthPath={postAuthPath}
              setPostAuthPath={setPostAuthPath}
            />
          }
        >
          <Route
            path="/watch"
            element={<Home user={user} onRequireLogin={openLogin} />}
          />
          <Route
            path="/watch/:id"
            element={<Watch user={user} onRequireLogin={openLogin} />}
          />

          <Route
            path="/plans"
            element={<Plans user={user} onRequireLogin={openLogin} />}
          />
          <Route path="/dmca" element={<Dmca />} />

          <Route
            path="/generate"
            element={<Generate user={user} onRequireLogin={openLogin} />}
          >
            <Route index element={<Navigate to="assets" replace />} />
            <Route path="assets" element={<GenerateAssets />} />
            <Route path="shots" element={<GenerateShots />} />
            <Route path="projects" element={<GenerateDashboard />} />
            <Route path="edit/:projectId" element={<GenerateEdit user={user} />} />
          </Route>

          <Route
            path="/moderation"
            element={
              user?.isModerator ? <Moderation /> : <Navigate to="/watch" replace />
            }
          />

          <Route
            path="/moderation/users"
            element={
              user?.isModerator ? <ModerationUsers /> : <Navigate to="/watch" replace />
            }
          />

          <Route
            path="/moderation/users/:id"
            element={
              user?.isModerator ? <ModerationUserDetail /> : <Navigate to="/watch" replace />
            }
          />

          <Route
            path="/moderation/reports"
            element={
              user?.isModerator ? <ModerationReports /> : <Navigate to="/watch" replace />
            }
          />

          <Route
            path="/me/profile"
            element={
              <EditProfile
                user={user}
                onRequireLogin={openLogin}
                onUserUpdated={setUser}
                refreshMe={refreshMe}
              />
            }
          />

          <Route
            path="/account"
            element={
              <AccountSettingsLayout
                user={user}
                onRequireLogin={openLogin}
              />
            }
          >
            <Route
              index
              element={
                <AccountSettingsLanding
                  user={user}
                  onRequireLogin={openLogin}
                />
              }
            />
            <Route
              path="security"
              element={<AccountSecurity user={user} onLogout={handleLogout} />}
            />

            <Route
              path="danger"
              element={<AccountDanger user={user} onLogout={handleLogout} />}
            />

            <Route
              path="billing"
              element={
                <AccountBilling
                  user={user}
                  onUserUpdated={setUser}
                />
              }
            />
          </Route>

          <Route
            path="/u/:username"
            element={<Profile user={user} onRequireLogin={openLogin} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}