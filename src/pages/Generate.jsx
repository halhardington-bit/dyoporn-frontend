import React, { useState } from "react";
import "./Generate.css";

const API_BASE = (import.meta.env.VITE_API_BASE || "https://api.dyop.ai").replace(/\/$/, "");

const FAQS = [
  {
    q: "What is the app for?",
    a: "The app is designed to provide a smoother creation and viewing experience, with a more streamlined workflow than the browser version.",
  },
  {
    q: "Is the app available right now?",
    a: "The download page is being prepared now. The button is currently a placeholder while the frontend is being finalized.",
  },
  {
    q: "What kind of content is allowed?",
    a: "Only synthetic, AI-generated adult content that complies with platform rules is permitted. Any prohibited, abusive, exploitative, or unlawful content is forbidden.",
  },
  {
    q: "How does DMCA work on this platform?",
    a: "We respond to valid DMCA and copyright-related complaints. If you believe content infringes your rights, you can contact the platform through the designated takedown process.",
  },
  {
    q: "Are real people shown on this platform?",
    a: "Content on this platform is presented as AI-generated and synthetic. Uploading or distributing prohibited impersonation, non-consensual material, or unlawful content is not allowed.",
  },
];

export default function Generate() {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    if (loading) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/system/latest-version.json`)

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Failed to fetch version info");
      }

      const url = data?.engine_patch_url;

      if (!url) {
        alert("Download not available yet.");
        return;
      }

      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to fetch download.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="downloadPage">
        <section className="downloadHero">
          <div className="downloadHeroCopy">
            <div className="downloadEyebrow">Desktop App</div>
            <h1 className="downloadTitle">Download the app</h1>
            <p className="downloadSubtitle">
              Create, manage, and access your platform experience in a cleaner,
              faster desktop environment.
            </p>

            <div className="downloadActions">
              <button
                type="button"
                className="downloadButton"
                onClick={handleDownload}
                disabled={loading}
              >
                {loading ? "Preparing..." : "Download App"}
              </button>

              <div className="downloadMeta">
                Windows support planned first. Additional platforms may follow.
              </div>
            </div>
          </div>

          <div className="downloadHeroCard">
            <div className="downloadPreview">
              <div className="downloadPreviewTop">
                <span className="previewDot" />
                <span className="previewDot" />
                <span className="previewDot" />
              </div>

              <div className="downloadPreviewBody">
                <div className="previewSidebar">
                  <div className="previewSidebarItem active">Library</div>
                  <div className="previewSidebarItem">Generate</div>
                  <div className="previewSidebarItem">Projects</div>
                  <div className="previewSidebarItem">Profile</div>
                </div>

                <div className="previewMain">
                  <div className="previewMainHeader">App Experience TEMP TEMP TEMP</div>
                  <div className="previewGrid">
                    <div className="previewPanel large" />
                    <div className="previewPanel" />
                    <div className="previewPanel" />
                    <div className="previewPanel wide" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="downloadInfoGrid">
          <div className="infoCard">
            <h2>Why use the app?</h2>
            <p>
              The desktop version is intended to offer a more focused experience
              for browsing, creating, and managing your content with fewer browser
              limitations.
            </p>
          </div>

          <div className="infoCard">
            <h2>DMCA & rights complaints</h2>
            <p>
              We take copyright and intellectual property complaints seriously.
              Valid DMCA notices and similar takedown requests may result in
              content removal, restricted access, or account action where
              appropriate.
            </p>
          </div>

          <div className="infoCard">
            <h2>Platform notice</h2>
            <p>
              All content on this platform is presented as AI-generated or
              synthetic and is intended to depict adults only. Any content that
              violates platform rules, applicable law, or safety standards is
              prohibited.
            </p>
          </div>
        </section>

        <section className="faqSection">
          <div className="sectionHeading">
            <div className="sectionEyebrow">Help</div>
            <h2>Frequently asked questions</h2>
          </div>

          <div className="faqList">
            {FAQS.map((item) => (
              <details className="faqItem" key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="disclaimerSection">
          <div className="sectionHeading">
            <div className="sectionEyebrow">Important</div>
            <h2>Disclaimers</h2>
          </div>

          <div className="disclaimerCard">
            <p>
              All content displayed or distributed through this platform is
              represented as AI-generated, synthetic, or fictional and intended
              to depict individuals aged 18 and over only.
            </p>
            <p>
              Content that involves or appears to involve minors, coercion,
              exploitation, non-consensual scenarios, unlawful material, or
              prohibited real-person misuse is strictly forbidden.
            </p>
            <p>
              Users are responsible for complying with all applicable laws,
              regulations, and platform policies when accessing or using the
              service.
            </p>
            <p>
              Copyright, impersonation, privacy, and rights-holder complaints may
              lead to removal of content and further moderation action.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}