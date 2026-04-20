import { NavLink, Navigate, Outlet } from "react-router-dom";
import "./AccountSettings.css";

export default function AccountSettingsLayout({ user }) {
  if (!user) {
    return <Navigate to="/watch" replace />;
  }

  return (
    <div className="accountSettingsPage">
      <aside className="accountSettingsSidebar">
        <div className="accountSettingsSidebarInner">
          <div className="accountSettingsEyebrow">SETTINGS</div>
          <h1 className="accountSettingsTitle">Account</h1>

          <nav
            className="accountSettingsSidebarNav"
            aria-label="Account settings navigation"
          >
            <NavLink
              to="/account"
              end
              className={({ isActive }) =>
                `accountSettingsSidebarItem ${isActive ? "isActive" : ""}`
              }
            >
              Overview
            </NavLink>

            <NavLink
              to="/account/security"
              className={({ isActive }) =>
                `accountSettingsSidebarItem ${isActive ? "isActive" : ""}`
              }
            >
              Security
            </NavLink>

            <NavLink
              to="/account/billing"
              className={({ isActive }) =>
                `accountSettingsSidebarItem ${isActive ? "isActive" : ""}`
              }
            >
              Plan & Billing
            </NavLink>

            

            <NavLink
              to="/account/danger"
              className={({ isActive }) =>
                `accountSettingsSidebarItem ${isActive ? "isActive" : ""}`
              }
            >
              Delete Account
            </NavLink>
          </nav>
        </div>
      </aside>

      <main className="accountSettingsMain">
        <div className="accountSettingsMainInner">
          <Outlet />
        </div>
      </main>
    </div>
  );
}