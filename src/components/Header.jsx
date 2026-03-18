import "./Header.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { getMyProfile, whoami } from "../api.js";

export default function Header({
  user,
  onOpenLogin,
  onOpenRegister,
  onLogout,
  onToggleSidebar,
  q,
  setQ,
}) {
  const nav = useNavigate();
  const location = useLocation();

  const [meProfile, setMeProfile] = useState(null);
  const [sessionUser, setSessionUser] = useState(null);
  const [mobileUserMenuOpen, setMobileUserMenuOpen] = useState(false);

  const mobileMenuRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      if (!user) {
        setSessionUser(null);
        setMeProfile(null);
        return;
      }

      try {
        const [u, profile] = await Promise.allSettled([whoami(), getMyProfile()]);

        if (!alive) return;

        if (u.status === "fulfilled") setSessionUser(u.value || null);
        else setSessionUser(null);

        if (profile.status === "fulfilled") setMeProfile(profile.value || null);
        else setMeProfile(null);
      } catch {
        if (!alive) return;
        setSessionUser(null);
        setMeProfile(null);
      }
    })();

    return () => {
      alive = false;
    };
  }, [user?.id]);

  useEffect(() => {
    setMobileUserMenuOpen(false);
  }, [location.pathname, location.search, user?.id]);

  useEffect(() => {
    function handlePointerDown(e) {
      if (!mobileUserMenuOpen) return;

      const panelEl = mobileMenuRef.current;
      const buttonEl = mobileMenuButtonRef.current;
      const target = e.target;

      if (panelEl?.contains(target) || buttonEl?.contains(target)) return;
      setMobileUserMenuOpen(false);
    }

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setMobileUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileUserMenuOpen]);

  function submitSearch(e) {
    e.preventDefault();
    const query = String(q ?? "").trim();
    const url = query ? `/watch?q=${encodeURIComponent(query)}` : "/watch";
    if (location.pathname + location.search !== url) nav(url);
  }

  const ratingVal = sessionUser?.rating ?? user?.rating ?? meProfile?.rating ?? null;
  const reviewCountVal =
    sessionUser?.reviewCount ??
    user?.reviewCount ??
    user?.review_count ??
    meProfile?.reviewCount ??
    0;

  const tokensVal = sessionUser?.tokens ?? user?.tokens ?? meProfile?.tokens ?? 0;

  const headerName = useMemo(() => {
    if (!user) return "";
    return (meProfile?.displayName || user.displayName || user.username || "").trim();
  }, [user, meProfile]);

  function closeMobileMenu() {
    setMobileUserMenuOpen(false);
  }

  function handleMobileLogout() {
    closeMobileMenu();
    onLogout?.();
  }

  function handleMobileLogin() {
    closeMobileMenu();
    onOpenLogin?.();
  }

  function handleMobileRegister() {
    closeMobileMenu();
    onOpenRegister?.();
  }

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <button
            type="button"
            className="sidebarMobileToggle topbarSidebarToggle"
            onClick={onToggleSidebar}
            aria-label="Open sidebar menu"
          >
            <span className="sidebarMobileToggleLine" />
            <span className="sidebarMobileToggleLine" />
            <span className="sidebarMobileToggleLine" />
          </button>

          <NavLink to="/watch" className="logo">
            DYOPorn
          </NavLink>
        </div>

        <div className="header-center">
          <form className="searchForm" onSubmit={submitSearch}>
            <input
              className="search"
              placeholder="Search"
              value={q ?? ""}
              onChange={(e) => setQ(e.target.value)}
            />
          </form>
        </div>

        <div className="header-right">
          {!user ? (
            <div className="guest-menu">
              <div className="auth-actions">
                <button className="login-btn" onClick={onOpenLogin}>
                  Log in
                </button>
                <button className="signup-link" onClick={onOpenRegister}>
                  Sign up
                </button>
              </div>

              <button
                ref={mobileMenuButtonRef}
                type="button"
                className="userMenuButton"
                aria-label="Open sign in menu"
                aria-expanded={mobileUserMenuOpen}
                onClick={() => setMobileUserMenuOpen((v) => !v)}
              >
                ⋯
              </button>

              {mobileUserMenuOpen ? (
                <div
                  ref={mobileMenuRef}
                  className="userMenuPanel"
                  role="menu"
                  aria-label="Guest menu"
                >
                  <button
                    type="button"
                    className="userMenuItem"
                    role="menuitem"
                    onClick={handleMobileLogin}
                  >
                    Log in
                  </button>

                  <button
                    type="button"
                    className="userMenuItem"
                    role="menuitem"
                    onClick={handleMobileRegister}
                  >
                    Sign up
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="user-info">
              <div className="userDesktopMeta">
                <NavLink className="username" to={`/u/${user.username}`}>
                  {headerName}
                </NavLink>

                <span className="tokens">🪙 {tokensVal}</span>
                <span className="rating">
                  ⭐ {ratingVal == null ? "—" : Number(ratingVal).toFixed(2)} ({reviewCountVal})
                </span>

                <button className="signup-link" onClick={onLogout}>
                  Log out
                </button>
              </div>

              <button
                ref={mobileMenuButtonRef}
                type="button"
                className="userMenuButton"
                aria-label="Open account menu"
                aria-expanded={mobileUserMenuOpen}
                onClick={() => setMobileUserMenuOpen((v) => !v)}
              >
                ⋯
              </button>

              {mobileUserMenuOpen ? (
                <div
                  ref={mobileMenuRef}
                  className="userMenuPanel"
                  role="menu"
                  aria-label="Account menu"
                >
                  <NavLink
                    className="userMenuHeading"
                    to={`/u/${user.username}`}
                    onClick={closeMobileMenu}
                  >
                    {headerName}
                  </NavLink>

                  <div className="userMenuItem" role="presentation">
                    🪙 {tokensVal}
                  </div>

                  <div className="userMenuItem" role="presentation">
                    ⭐ {ratingVal == null ? "—" : Number(ratingVal).toFixed(2)} ({reviewCountVal})
                  </div>

                  <button
                    type="button"
                    className="userMenuItem userMenuLogout"
                    role="menuitem"
                    onClick={handleMobileLogout}
                  >
                    Log out
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}