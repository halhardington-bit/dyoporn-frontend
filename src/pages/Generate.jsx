import React, { useEffect, useMemo, useState } from "react";
import "./Generate.css";

import castingShot from "../assets/screenshots/casting.png";
import storyShot from "../assets/screenshots/story.png";
import actionShot from "../assets/screenshots/action.png";
import musicShot from "../assets/screenshots/music.png";
import editShot from "../assets/screenshots/edit.png";

const API_BASE = (import.meta.env.VITE_API_BASE || "https://api.dyop.ai").replace(/\/$/, "");

const FAQS = [
  {
    q: "What is the desktop app for?",
    a: "It provides a cleaner, more focused way to create, manage, and browse without relying entirely on the browser.",
  },
  {
    q: "Is the app available now?",
    a: "If a build is currently published, the download button will open it. If not, you'll be notified.",
  },
  {
    q: "What content is allowed?",
    a: "Only platform-compliant synthetic content is allowed. Prohibited, exploitative, or unlawful material is not permitted.",
  },
  {
    q: "How are rights complaints handled?",
    a: "Valid copyright and rights complaints may result in content removal or account action where appropriate.",
  },
];

const SCREENSHOTS = [
  {
    title: "Casting",
    description: "Build and manage performers, roles, and creative direction in one place.",
    image: castingShot,
  },
  {
    title: "Story",
    description: "Shape scenes, structure ideas, and keep the narrative workflow moving.",
    image: storyShot,
  },
  {
    title: "Action",
    description: "Block out momentum, pacing, and visual intensity with a clearer overview.",
    image: actionShot,
  },
  {
    title: "Music",
    description: "Guide tone and atmosphere with tools built around audio-driven mood.",
    image: musicShot,
  },
  {
    title: "Edit",
    description: "Refine the final cut with a cleaner space for sequencing and polish.",
    image: editShot,
  },
];

export default function Generate() {
  const [loading, setLoading] = useState(false);
  const [version, setVersion] = useState(null);
  const [activeShot, setActiveShot] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const currentShot = useMemo(() => SCREENSHOTS[activeShot], [activeShot]);

  useEffect(() => {
    async function fetchVersion() {
      try {
        const res = await fetch(`${API_BASE}/system/latest-version.json`);
        const data = await res.json().catch(() => null);

        if (res.ok && data?.latest_version) {
          setVersion(data.latest_version);
        } else if (res.ok && data?.latest) {
          setVersion(data.latest);
        } else {
          setVersion("Unavailable");
        }
      } catch {
        setVersion("Unavailable");
      }
    }

    fetchVersion();
  }, []);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setModalOpen(false);
      }
    }

    if (modalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalOpen]);

  function goPrevShot() {
    setActiveShot((prev) => (prev === 0 ? SCREENSHOTS.length - 1 : prev - 1));
  }

  function goNextShot() {
    setActiveShot((prev) => (prev === SCREENSHOTS.length - 1 ? 0 : prev + 1));
  }

  function handleDownload() {
  window.open(
    "https://drive.google.com/uc?export=download&id=10QlyGqbgY9PGggz63oe37k01fsfZfcI4",
    "_blank",
    "noopener,noreferrer"
  );
}

  return (
    <div className="page">
      <div className="downloadPage">
        <section className="downloadHero">
          <h1 className="downloadTitle">Download The App</h1>
          <p className="downloadSubtitle">
            A desktop experience for creating your fantasy
          </p>

          <div className="downloadActions">
            <button
              type="button"
              className="downloadButton"
              onClick={handleDownload}
              disabled={loading}
            >
              {loading ? "Preparing..." : "Download"}
            </button>

            <div className="downloadMeta">
              {version ? `Version: ${version}` : "Checking version..."}
            </div>
          </div>
        </section>

        <section className="downloadSection">
          <div className="sectionHeading">
            
          </div>

          <div className="screenshotCarousel">
            <div className="screenshotViewport">
              <button
                type="button"
                className="screenshotNav screenshotNav--left"
                onClick={goPrevShot}
                aria-label="Previous screenshot"
              >
                ‹
              </button>

              <button
                type="button"
                className="screenshotFrame"
                onClick={() => setModalOpen(true)}
                aria-label={`Open ${currentShot.title} screenshot`}
              >
                <img
                  className="screenshotImage"
                  src={currentShot.image}
                  alt={`${currentShot.title} screenshot`}
                />
              </button>

              <button
                type="button"
                className="screenshotNav screenshotNav--right"
                onClick={goNextShot}
                aria-label="Next screenshot"
              >
                ›
              </button>
            </div>

            <div className="screenshotCaption">
              <h3>{currentShot.title}</h3>
              <p>{currentShot.description}</p>
            </div>

            <div className="screenshotDots" aria-label="Screenshot navigation">
              {SCREENSHOTS.map((shot, index) => (
                <button
                  key={shot.title}
                  type="button"
                  className={`screenshotDot ${index === activeShot ? "is-active" : ""}`}
                  aria-label={`Go to ${shot.title}`}
                  aria-pressed={index === activeShot}
                  onClick={() => setActiveShot(index)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="downloadSection">
          <div className="sectionHeading">
            <h2>Requirements</h2>
            <p>Recommended for a comfortable desktop workflow.</p>
          </div>

          <div className="requirementsGrid">
            <article className="requirementCard">
              <h3>Minimum</h3>

              <div className="requirementRow">
                <span className="requirementLabel">GPU</span>
                <span className="requirementValue">16GB NVIDIA GPU</span>
              </div>

              <div className="requirementRow">
                <span className="requirementLabel">Memory</span>
                <span className="requirementValue">32GB RAM</span>
              </div>
            </article>

            <article className="requirementCard">
              <h3>Recommended</h3>

              <div className="requirementRow">
                <span className="requirementLabel">GPU</span>
                <span className="requirementValue">24GB NVIDIA GPU</span>
              </div>

              <div className="requirementRow">
                <span className="requirementLabel">Memory</span>
                <span className="requirementValue">64GB RAM</span>
              </div>
            </article>

            <article className="requirementCard requirementCard--highlight">
              <h3>Ideal</h3>

              <div className="requirementRow">
                <span className="requirementLabel">GPU</span>
                <span className="requirementValue">
                  RTX 5000 / 6000 Pro Blackwell
                </span>
              </div>

                <div className="requirementRow">
                <span className="requirementLabel">Memory</span>
                <span className="requirementValue">64GB RAM</span>
              </div>
              
            </article>
          </div>
        </section>

        

        <section className="downloadSection faqSection">
          <div className="sectionHeading">
            <h2>FAQ</h2>
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
      </div>

      {modalOpen && (
        <div
          className="screenshotModalOverlay"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${currentShot.title} screenshot enlarged`}
        >
          <div
            className="screenshotModal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="screenshotModalClose"
              onClick={() => setModalOpen(false)}
              aria-label="Close screenshot"
            >
              ×
            </button>

            <img
              className="screenshotModalImage"
              src={currentShot.image}
              alt={`${currentShot.title} screenshot enlarged`}
            />
          </div>
        </div>
      )}
    </div>
  );
}