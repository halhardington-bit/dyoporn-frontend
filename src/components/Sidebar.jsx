import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMySubscriptions } from "../api.js";

const styleList = [
  "Photoreal",
  "Hyperreal",
  "Anime 3D",
  "Anime 2D",
  "Cartoon 2D",
  "Cartoon 3D",
  "North American 2D",
];

const genreList = [
  "Fantasy",
  "Futuristic",
  "Sci-fi",
  "Superhero",
  "Western",
  "Horror",
];

export default function Sidebar({ user, onOpenLogin, mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [subscriptions, setSubscriptions] = useState([]);
  const [subsBusy, setSubsBusy] = useState(false);
  const [subsErr, setSubsErr] = useState("");

  const currentFilter = useMemo(() => {
    const sp = new URLSearchParams(location.search);
    return (sp.get("filter") || "").trim().toLowerCase();
  }, [location.search]);

  const currentQ = useMemo(() => {
    const sp = new URLSearchParams(location.search);
    return (sp.get("q") || "").trim().toLowerCase();
  }, [location.search]);

  const currentPath = location.pathname;

  useEffect(() => {
    let alive = true;

    (async () => {
      if (!user?.id) {
        if (alive) {
          setSubscriptions([]);
          setSubsBusy(false);
          setSubsErr("");
        }
        return;
      }

      try {
        setSubsBusy(true);
        setSubsErr("");

        const rows = await getMySubscriptions();
        if (!alive) return;

        setSubscriptions(Array.isArray(rows) ? rows : []);
      } catch (e) {
        if (!alive) return;
        setSubscriptions([]);
        setSubsErr(e?.message || "Failed to load subscriptions");
      } finally {
        if (alive) setSubsBusy(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [user?.id]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    }

    if (mobileOpen) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function goToGenre(genre) {
    navigate(`/watch?q=${encodeURIComponent(genre)}`);
    setMobileOpen(false);
  }

  function requireLogin(path = "/watch") {
    setMobileOpen(false);
    onOpenLogin?.(path);
  }

  function isGenreActive(genre) {
  return currentPath === "/watch" && currentQ === genre.toLowerCase();
}

  function isHomeActive() {
    return currentPath === "/watch" && !currentFilter && !currentQ;
  }

  function isHistoryActive() {
    return currentPath === "/watch" && currentFilter === "history";
  }

  function isRatedActive() {
    return currentPath === "/watch" && currentFilter === "rated";
  }

  function isSubscriptionActive(username) {
    if (!username) return false;
    return currentPath.toLowerCase() === `/u/${String(username).toLowerCase()}`;
  }

  function handleProtectedNavigate(path) {
    if (!user) {
      requireLogin(path);
      return;
    }
    navigate(path);
    setMobileOpen(false);
  }

  function goHome() {
    navigate("/watch");
    setMobileOpen(false);
  }

  function goToSubscription(username) {
    if (!username) return;
    navigate(`/u/${username}`);
    setMobileOpen(false);
  }

  function isWatchLaterActive() {
  return currentPath === "/watch" && currentFilter === "watch-later";
}

  return (
    <>
      <button
        type="button"
        className={`sidebarMobileToggle ${mobileOpen ? "isOpen" : ""}`}
        onClick={() => setMobileOpen((v) => !v)}
        aria-label={mobileOpen ? "Close sidebar" : "Open sidebar"}
        aria-expanded={mobileOpen}
      >
        <span className="sidebarMobileToggleLine" />
        <span className="sidebarMobileToggleLine" />
        <span className="sidebarMobileToggleLine" />
      </button>

      <div
        className={`sidebarMobileBackdrop ${mobileOpen ? "isOpen" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside className={`sidebar ${mobileOpen ? "isMobileOpen" : ""}`}>
        <div className="sidebarInner">
          <div className="sidebarMobileHeader">
            <div className="sidebarMobileTitle">Browse</div>
            <button
              type="button"
              className="sidebarMobileClose"
              onClick={() => setMobileOpen(false)}
              aria-label="Close sidebar"
            >
              ✕
            </button>
          </div>

          <div className="sidebarSection">
            <button
              type="button"
              className={`sidebarItem sidebarPrimary ${isHomeActive() ? "active" : ""}`}
              onClick={goHome}
            >
              Home
            </button>
          </div>

          <div className="sidebarSection">
            <div className="sidebarHeading">Subscriptions</div>

            <div className="sidebarGroup">
              {!user ? (
                <button
                  type="button"
                  className="sidebarItem"
                  onClick={() => requireLogin("/watch")}
                >
                  <span className="sidebarLabel">Log in to view subscriptions</span>
                </button>
              ) : subsBusy ? (
                <div className="sidebarItem">
                  <span className="sidebarLabel">Loading subscriptions…</span>
                </div>
              ) : subsErr ? (
                <div className="sidebarItem">
                  <span className="sidebarLabel">{subsErr}</span>
                </div>
              ) : subscriptions.length === 0 ? (
                <div className="sidebarItem">
                  <span className="sidebarLabel">No subscriptions yet</span>
                </div>
              ) : (
                subscriptions.map((sub) => {
                  const label =
                    sub.display_name ||
                    sub.displayName ||
                    sub.username ||
                    "Unknown channel";

                  const active = isSubscriptionActive(sub.username);

                  return (
                    <button
                      key={sub.id ?? sub.username}
                      type="button"
                      className={`sidebarItem ${active ? "active" : ""}`}
                      onClick={() => goToSubscription(sub.username)}
                      title={label}
                    >
                      <span className="sidebarDot" />
                      <span className="sidebarLabel">{label}</span>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          <div className="sidebarSection">
            <div className="sidebarHeading">You</div>

            <div className="sidebarGroup">
              <button
                type="button"
                className={`sidebarItem ${isHistoryActive() ? "active" : ""}`}
                onClick={() =>
                  handleProtectedNavigate("/watch?filter=history&sort=recent-history")
                }
              >
                History
              </button>

              <button
                type="button"
                className={`sidebarItem ${isWatchLaterActive() ? "active" : ""}`}
                onClick={() =>
                  handleProtectedNavigate("/watch?filter=watch-later&sort=recent-watch-later")
                }
              >
                Watch Later
              </button>

              <button
                type="button"
                className={`sidebarItem ${isRatedActive() ? "active" : ""}`}
                onClick={() =>
                  handleProtectedNavigate("/watch?filter=rated&sort=recent-rating")
                }
              >
                Recently Rated
              </button>
            </div>
          </div>

          <div className="sidebarSection">
            <div className="sidebarHeading">Styles</div>

            <div className="sidebarGroup">
              {styleList.map((genre) => {
                const active =
                  currentPath === "/watch" && currentQ === genre.toLowerCase();

                return (
                  <button
                    key={genre}
                    type="button"
                    className={`sidebarItem ${active ? "active" : ""}`}
                    onClick={() => goToGenre(genre)}
                  >
                    {genre}
                  </button>
                );
              })}
            </div>
          </div>
              
              <div className="sidebarSection">
                <div className="sidebarHeading">Genres</div>

                <div className="sidebarGroup">
                    {genreList.map((genre) => {
                    const active = isGenreActive(genre);

                    return (
                        <button
                        key={genre}
                        type="button"
                        className={`sidebarItem ${active ? "active" : ""}`}
                        onClick={() => goToGenre(genre)}
                        >
                        {genre}
                        </button>
                    );
                    })}
                </div>
                </div>
        </div>
      </aside>
    </>
  );
}