import { NavLink, useNavigate } from "react-router-dom";

const placeholderSubscriptions = [
  "HallHardington",
  "RedRaven",
  "PixelPulse",
  "NightDrive",
  "CinemaCore",
];

const styleList = [
  "Photoreal",
  "Hyperreal",
  "Anime 3D",
  "Anime 2D",
  "Disney",
  "Ghibli",
  "North American 2D",
];

export default function Sidebar({ user, onOpenLogin }) {
  const navigate = useNavigate();

  function goToGenre(genre) {
    navigate(`/watch?q=${encodeURIComponent(genre)}`);
  }

  function handlePlaceholder(label) {
    if (!user) {
      onOpenLogin?.("/watch");
      return;
    }

    console.log(`${label} clicked`);
  }

  return (
    <aside className="sidebar">
      <div className="sidebarInner">
        <div className="sidebarSection">
          <NavLink
            to="/watch"
            end
            className={({ isActive }) =>
              `sidebarItem sidebarPrimary ${isActive ? "active" : ""}`
            }
          >
            Home
          </NavLink>
        </div>

        <div className="sidebarSection">
          <div className="sidebarHeading">Subscriptions</div>

          <div className="sidebarGroup">
            {placeholderSubscriptions.map((name) => (
              <button
                key={name}
                type="button"
                className="sidebarItem"
                onClick={() => handlePlaceholder(`Subscription: ${name}`)}
              >
                <span className="sidebarDot" />
                <span className="sidebarLabel">{name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="sidebarSection">
          <div className="sidebarHeading">You</div>

          <div className="sidebarGroup">
            <button
              type="button"
              className="sidebarItem"
              onClick={() => handlePlaceholder("History")}
            >
              History
            </button>

            <button
              type="button"
              className="sidebarItem"
              onClick={() => handlePlaceholder("Playlists")}
            >
              Playlists
            </button>

            <button
              type="button"
              className="sidebarItem"
              onClick={() => handlePlaceholder("Watch Later")}
            >
              Watch Later
            </button>

            <button
              type="button"
              className="sidebarItem"
              onClick={() => handlePlaceholder("Liked Videos")}
            >
              Liked Videos
            </button>
          </div>
        </div>

        <div className="sidebarSection">
          <div className="sidebarHeading">Styles</div>

          <div className="sidebarGroup">
            {styleList.map((genre) => (
              <button
                key={genre}
                type="button"
                className="sidebarItem"
                onClick={() => goToGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}