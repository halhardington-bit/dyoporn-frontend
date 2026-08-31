import "./Header.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { getMyProfile, whoami } from "../api.js";
import logo from "../assets/logo-01-exact-bounds.svg";

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
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

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
    setUserMenuOpen(false);
  }, [location.pathname, location.search, user?.id]);

  useEffect(() => {
    function handlePointerDown(e) {
      if (!userMenuOpen) return;

      const panelEl = menuRef.current;
      const buttonEl = menuButtonRef.current;
      const target = e.target;

      if (panelEl?.contains(target) || buttonEl?.contains(target)) return;
      setUserMenuOpen(false);
    }

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setUserMenuOpen(false);
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
  }, [userMenuOpen]);

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

  function closeMenu() {
    setUserMenuOpen(false);
  }

  function handleMenuLogout() {
    closeMenu();
    onLogout?.();
  }

  function handleMenuLogin() {
    closeMenu();
    onOpenLogin?.();
  }

  function handleMenuRegister() {
    closeMenu();
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
            <img src={logo} alt="DYOP" className="logoImg" />
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
            <div className="headerMenuGroup">
              <div className="auth-actions auth-actions-desktop">
                <button className="login-btn" onClick={onOpenLogin}>
                  Log in
                </button>
                <button className="signup-link" onClick={onOpenRegister}>
                  Sign up
                </button>
              </div>

              <button
                ref={menuButtonRef}
                type="button"
                className="userMenuButton"
                aria-label="Open site menu"
                aria-expanded={userMenuOpen}
                onClick={() => setUserMenuOpen((v) => !v)}
              >
                ⋯
              </button>

              {userMenuOpen ? (
                <div
                  ref={menuRef}
                  className="userMenuPanel"
                  role="menu"
                  aria-label="Guest menu"
                >
                  <NavLink
                    className="userMenuItem"
                    to="/dmca"
                    onClick={closeMenu}
                  >
                    DMCA
                  </NavLink>

                  <button
                    type="button"
                    className="userMenuItem userMenuDesktopOnly"
                    role="menuitem"
                    onClick={handleMenuLogin}
                  >
                    Log in
                  </button>

                  <button
                    type="button"
                    className="userMenuItem userMenuDesktopOnly"
                    role="menuitem"
                    onClick={handleMenuRegister}
                  >
                    Sign up
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="headerMenuGroup">
              <div className="userDesktopMeta">
                <NavLink className="username" to={`/u/${user.username}`}>
                  {headerName}
                </NavLink>

                <span className="rating">
                  ⭐ {ratingVal == null ? "—" : Number(ratingVal).toFixed(2)} ({reviewCountVal})
                </span>
              </div>

              <button
                ref={menuButtonRef}
                type="button"
                className="userMenuButton"
                aria-label="Open account menu"
                aria-expanded={userMenuOpen}
                onClick={() => setUserMenuOpen((v) => !v)}
              >
                ⋯
              </button>

              {userMenuOpen ? (
                <div
                  ref={menuRef}
                  className="userMenuPanel"
                  role="menu"
                  aria-label="Account menu"
                >
                  <NavLink
                    className="userMenuHeading"
                    to={`/u/${user.username}`}
                    onClick={closeMenu}
                  >
                    View Profile
                  </NavLink>

                  <NavLink
                    className="userMenuItem"
                    to="/account"
                    onClick={closeMenu}
                  >
                    Account Settings
                  </NavLink>

                  <NavLink
                    className="userMenuItem"
                    to="/dmca"
                    onClick={closeMenu}
                  >
                    DMCA
                  </NavLink>

                  <button
                    type="button"
                    className="userMenuItem userMenuLogout"
                    role="menuitem"
                    onClick={handleMenuLogout}
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