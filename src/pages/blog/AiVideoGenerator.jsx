import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./BlogLanding.css";

export default function AiVideoGenerator() {
  useEffect(() => {
    const title = "AI Video Generator | Create AI Videos with DYOP";

    const description =
      "Create AI-generated videos with DYOP. Turn your ideas into video, explore AI creations from other creators, and publish your own videos.";

    const canonicalUrl =
      "https://www.dyop.ai/ai-video-generator";

    document.title = title;

    function setMeta(name, content) {
      let element = document.querySelector(
        `meta[name="${name}"]`
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("name", name);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    }

    setMeta("description", description);
    setMeta("robots", "index, follow");

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", canonicalUrl);
  }, []);

  return (
    <main className="aiLanding">
      <section className="aiLandingHero">
        <div className="aiLandingHeroInner">
          <div className="aiLandingEyebrow">
            DYOP AI Video
          </div>

          <h1>
            Create AI Videos from Your Ideas
          </h1>

          <p className="aiLandingLead">
            Turn an idea into an AI-generated video
            with DYOP, then publish your creation and
            share it with the community.
          </p>

          <div className="aiLandingActions">
            <Link
              to="/generate"
              className="aiLandingPrimary"
            >
              Create an AI Video
            </Link>

            <Link
              to="/"
              className="aiLandingSecondary"
            >
              Watch AI Videos
            </Link>
          </div>
        </div>
      </section>

      <section className="aiLandingSection">
        <div className="aiLandingSectionInner">
          <h2>What is an AI video generator?</h2>

          <p>
            An AI video generator uses artificial
            intelligence to create video from instructions
            provided by the creator. Instead of starting
            with traditional footage, creators can describe
            an idea and use generative tools to turn it into
            moving imagery.
          </p>

          <p>
            DYOP brings AI video creation and video
            publishing together, so you can create,
            discover and share AI-generated videos in one
            place.
          </p>
        </div>
      </section>

      <section className="aiLandingSection">
        <div className="aiLandingSectionInner">
          <h2>How to create an AI video with DYOP</h2>

          <div className="aiLandingSteps">
            <article>
              <span>01</span>
              <h3>Start with an idea</h3>
              <p>
                Decide what you want to create and describe
                the scene, subject, action or visual style.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Generate your video</h3>
              <p>
                Use DYOP's generation tools to turn your
                concept into AI-generated video content.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Publish and share</h3>
              <p>
                Publish your finished creation on DYOP and
                make it discoverable to viewers.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="aiLandingSection aiLandingFeatureSection">
        <div className="aiLandingSectionInner">
          <h2>More than an AI video generator</h2>

          <p>
            DYOP is also a platform for discovering what
            other AI creators are making. Explore public
            videos, creators and tags for inspiration,
            then create something of your own.
          </p>

          <div className="aiLandingFeatureGrid">
            <article>
              <h3>Create</h3>
              <p>
                Generate video content from your own ideas.
              </p>
            </article>

            <article>
              <h3>Publish</h3>
              <p>
                Give your creations their own video pages
                and share them with others.
              </p>
            </article>

            <article>
              <h3>Discover</h3>
              <p>
                Browse AI-generated videos and discover
                other creators on DYOP.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="aiLandingSection">
        <div className="aiLandingSectionInner">
          <h2>AI video generator FAQ</h2>

          <div className="aiLandingFaq">
            <article>
              <h3>What can I create with AI video?</h3>
              <p>
                AI video can be used for short films,
                animation, experimental content, concepts,
                visual storytelling and many other creative
                projects.
              </p>
            </article>

            <article>
              <h3>Can I publish my videos on DYOP?</h3>
              <p>
                Yes. DYOP combines video creation with a
                platform for publishing and discovering
                AI-generated content.
              </p>
            </article>

            <article>
              <h3>Can I watch other AI-generated videos?</h3>
              <p>
                Yes. DYOP includes a public video platform
                where you can browse videos from other
                creators.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="aiLandingFinal">
        <div className="aiLandingSectionInner">
          <h2>Ready to create something?</h2>

          <p>
            Start creating an AI-generated video with DYOP.
          </p>

          <Link
            to="/generate"
            className="aiLandingPrimary"
          >
            Start Creating
          </Link>
        </div>
      </section>
    </main>
  );
}