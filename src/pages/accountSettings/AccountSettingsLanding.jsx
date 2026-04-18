import { NavLink } from "react-router-dom";
import "./AccountSettings.css";


export default function AccountSettingsLanding({ user }) {
  if (!user) return null;

  console.log("Account user:", user);

  return (
    <div className="accountSettingsContent">
      <section className="accountSettingsIntro">
        <div className="accountSettingsKicker">Overview</div>
        <h2 className="accountSettingsHeading">Profile</h2>
        <p className="accountSettingsSubtext">
          Your personal details, account security, and plans
        </p>
      </section>

      <section className="accountSettingsSection">
        <div className="accountSettingsSectionHeader">
          <div className="accountSettingsSectionEyebrow">ACCOUNT DETAILS</div>
          <h3 className="accountSettingsSectionTitle">Profile information</h3>
        </div>

        <div className="accountSettingsDetailsList">
          <div className="accountSettingsDetailRow">
            <div className="accountSettingsDetailLabel">Username</div>
            <div className="accountSettingsDetailValue">
              @{user.username || "—"}
            </div>
          </div>

          <div className="accountSettingsDetailRow">
            <div className="accountSettingsDetailLabel">Email</div>
            <div className="accountSettingsDetailValue">
              {user.email || "—"}
            </div>
          </div>

          <div className="accountSettingsDetailRow">
            <div className="accountSettingsDetailLabel">Plan</div>
            <div className="accountSettingsDetailValue">
              {user.tier || "Free"}
            </div>
          </div>

          <div className="accountSettingsDetailRow">
            <div className="accountSettingsDetailLabel">Email verified</div>
            <div className="accountSettingsDetailValue">
              {user.emailVerified ? "Yes" : "No"}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}