import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./BlogLanding.css";

export default function AiVideoCommunity() {
  useEffect(() => {
    const title =
      "AI Video Community | Create, Watch & Share AI Videos | DYOP";

    const description =
      "Join an AI video community built for creators and viewers. Create, publish, watch and discover AI-generated videos on DYOP.";

    const canonicalUrl =
      "https://www.dyop.ai/ai-video-community";

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
    <main className="blogLanding">

      {/* HERO */}
      <section className="blogHero">
        <div className="blogHeroInner">

          <div className="blogEyebrow">
            DYOP COMMUNITY
          </div>

          <h1>
            A Community for AI Video
          </h1>

          <p className="blogLead">
            Create AI-generated videos, publish your work,
            discover other creators and see what people
            are making with generative video.
          </p>

          <div className="blogActions">
            <Link
              to="/"
              className="blogPrimary"
            >
              Watch AI Videos
            </Link>

            <Link
              to="/generate"
              className="blogSecondary"
            >
              Create a Video
            </Link>
          </div>

        </div>
      </section>

      {/* INTRO */}
      <section className="blogSection">
        <div className="blogSectionInner">

          <h2>
            AI video is becoming its own creative medium
          </h2>

          <p>
            Generative video gives creators new ways to
            experiment with animation, filmmaking,
            visual storytelling and ideas that would
            otherwise be difficult to produce.
          </p>

          <p>
            DYOP gives those creations somewhere to live.
            Instead of stopping when a generation is
            finished, creators can publish their videos
            and make them discoverable to other people.
          </p>

        </div>
      </section>

      {/* FEATURES */}
      <section className="blogSection">
        <div className="blogSectionInner">

          <h2>
            Create, publish and discover
          </h2>

          <div className="blogFeatureGrid">

            <article>
              <h3>Create</h3>

              <p>
                Experiment with AI video and turn your
                ideas into generated content.
              </p>
            </article>

            <article>
              <h3>Publish</h3>

              <p>
                Publish finished videos to your channel
                and build a collection of your work.
              </p>
            </article>

            <article>
              <h3>Discover</h3>

              <p>
                Browse videos from other creators and
                discover new ideas, styles and approaches.
              </p>
            </article>

            <article>
              <h3>Discuss</h3>

              <p>
                Join conversations around videos and
                interact with other people exploring
                generative media.
              </p>
            </article>

            <article>
              <h3>Rate</h3>

              <p>
                Rate videos you discover and see how
                viewers respond to your own creations.
              </p>
            </article>

            <article>
              <h3>Build a Channel</h3>

              <p>
                Give your AI-generated work a home with
                your own creator channel on DYOP.
              </p>
            </article>

          </div>
        </div>
      </section>

      {/* CREATOR SECTION */}
      <section className="blogSection">
        <div className="blogSectionInner">

          <h2>
            Built for AI video creators
          </h2>

          <p>
            AI video creation is highly experimental.
            Different prompts, images, models and creative
            approaches can produce dramatically different
            results.
          </p>

          <p>
            Publishing those experiments gives creators a
            way to share what they've made while giving
            everyone else a place to discover what's
            possible.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/ai-video-generator"
              className="blogSecondary"
            >
              AI Video Generator
            </Link>

            <Link
              to="/text-to-video"
              className="blogSecondary"
            >
              Text to Video
            </Link>

            <Link
              to="/image-to-video"
              className="blogSecondary"
            >
              Image to Video
            </Link>
          </div>

        </div>
      </section>

      {/* VIEWER SECTION */}
      <section className="blogSection">
        <div className="blogSectionInner">

          <h2>
            You don't have to be a creator
          </h2>

          <p>
            DYOP isn't only for generating video. You can
            explore the platform as a viewer, discover
            creators and browse AI-generated videos
            published by the community.
          </p>

          <p>
            As new videos are published, the platform
            becomes a constantly growing collection of
            generative video from different creators.
          </p>

        </div>
      </section>

      {/* FAQ */}
      <section className="blogSection">
        <div className="blogSectionInner">

          <h2>
            AI video community FAQ
          </h2>

          <div className="blogFaq">

            <article>
              <h3>
                What is an AI video community?
              </h3>

              <p>
                An AI video community brings together
                people creating, sharing and watching
                video made with generative AI tools.
              </p>
            </article>

            <article>
              <h3>
                Can I publish AI-generated videos on DYOP?
              </h3>

              <p>
                Yes. Creators can publish videos to DYOP
                and build a channel containing their work.
              </p>
            </article>

            <article>
              <h3>
                Can I use DYOP just to watch videos?
              </h3>

              <p>
                Yes. DYOP also functions as a video
                platform where viewers can browse and
                discover AI-generated content.
              </p>
            </article>

            <article>
              <h3>
                Can I discover other AI creators?
              </h3>

              <p>
                Yes. Videos connect viewers with creator
                channels, making it possible to discover
                more work from creators you find on DYOP.
              </p>
            </article>

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="blogFinal">
        <div className="blogSectionInner">

          <h2>
            See what people are creating
          </h2>

          <p>
            Explore AI-generated videos or start creating
            something of your own.
          </p>

          <div className="blogActions">
            <Link
              to="/"
              className="blogPrimary"
            >
              Explore DYOP
            </Link>

            <Link
              to="/generate"
              className="blogSecondary"
            >
              Start Creating
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}