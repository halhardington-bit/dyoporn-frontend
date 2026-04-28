import "./SorryPage.css";
import logo from "../assets/logo-01-exact-bounds.svg"; // adjust if needed

export default function SorryPage() {
  return (
    <main className="sorryPage">
      <div className="sorryAmbient sorryAmbientLeft" />
      <div className="sorryAmbient sorryAmbientRight" />

      <section className="sorryCard">
        <img className="sorryLogo" src={logo} alt="DYOP" />

        <div className="sorryBadge">
          Regional Availability
        </div>

        <h1 className="sorryTitle">
          Sorry, DYOP isn’t
          <br />
          available in your
          <br />
          region.
        </h1>

        <div className="sorryAccent" />

        <p className="sorryText">
          Due to regional restrictions, access to DYOP is currently
          unavailable from your location.
        </p>

        <div className="sorryDivider" />

        <p className="sorryFooter">
          If you believe this is an error, please try again later
        </p>
      </section>
    </main>
  );
}