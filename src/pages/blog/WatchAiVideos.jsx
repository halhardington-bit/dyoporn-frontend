import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVideos } from "../../api.js";
import VideoGrid from "../../ui/VideoGrid.jsx";
import "./BlogLanding.css";

export default function WatchAiVideos({
  user = null,
  onRequireLogin,
}) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const title =
      "Watch AI Videos | Discover AI-Generated Videos on DYOP";

    const description =
      "Watch AI-generated videos on DYOP. Discover videos, creators and new generative content from the AI video community.";

    const canonicalUrl =
      "https://www.dyop.ai/watch-ai-videos";

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

  useEffect(() => {
    let cancelled = false;

    async function loadVideos() {
      setLoading(true);
      setError("");

      try {
        const result = await getVideos({
          sort: "newest",
        });

        if (!cancelled) {
          setVideos(
            Array.isArray(result) ? result : []
          );
        }
      } catch (err) {
        console.error(
          "Failed to load AI videos:",
          err
        );

        if (!cancelled) {
          setVideos([]);
          setError(
            "Unable to load videos right now."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadVideos();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="blogLanding">

      {/* HERO */}
      <section className="blogHero">
        <div className="blogHeroInner">

          <div className="blogEyebrow">
            EXPLORE DYOP
          </div>

          <h1>
            Watch AI-Generated Videos
          </h1>

          <p className="blogLead">
            Discover AI-generated videos from creators
            experimenting with generative filmmaking,
            animation and visual storytelling.
          </p>

          <div className="blogActions">
            <a
              href="#latest-ai-videos"
              className="blogPrimary"
            >
              Watch Videos
            </a>

            <Link
              to="/generate"
              className="blogSecondary"
            >
              Create Your Own
            </Link>
          </div>

        </div>
      </section>

      {/* LIVE VIDEOS */}
      <section
        className="blogSection"
        id="latest-ai-videos"
      >
        <div className="blogSectionInner blogSectionWide">

          <div className="watchAiHeading">
            <div>
              <h2>
                Latest AI Videos
              </h2>

              <p>
                Explore recently published videos
                from the DYOP community.
              </p>
            </div>
          </div>

          {loading && (
            <div className="watchAiStatus">
              Loading videos...
            </div>
          )}

          {!loading && error && (
            <div className="watchAiStatus">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            videos.length > 0 && (
              <VideoGrid
                videos={videos}
                user={user}
                onRequireLogin={onRequireLogin}
              />
            )}

          {!loading &&
            !error &&
            videos.length === 0 && (
              <div className="watchAiStatus">
                No public videos available yet.
              </div>
            )}

        </div>
      </section>

      {/* ABOUT */}
      <section className="blogSection">
        <div className="blogSectionInner">

          <h2>
            Discover what's being created with AI video
          </h2>

          <p>
            Generative video can be used for animation,
            filmmaking, experimental visuals, short-form
            content and entirely new forms of visual
            storytelling.
          </p>

          <p>
            DYOP gives creators somewhere to publish
            those creations and gives viewers one place
            to discover them.
          </p>

        </div>
      </section>

      {/* DISCOVERY */}
      <section className="blogSection">
        <div className="blogSectionInner">

          <h2>
            Explore the world of AI video
          </h2>

          <div className="blogFeatureGrid">

            <article>
              <h3>Discover Creators</h3>

              <p>
                Find creators experimenting with
                generative video and explore more
                work from their channels.
              </p>
            </article>

            <article>
              <h3>Find New Ideas</h3>

              <p>
                See how other people approach AI
                filmmaking, animation and visual
                storytelling.
              </p>
            </article>

            <article>
              <h3>Explore New Videos</h3>

              <p>
                Discover newly published work as
                creators add more videos to DYOP.
              </p>
            </article>

          </div>

        </div>
      </section>

      {/* CREATOR CTA */}
      <section className="blogSection">
        <div className="blogSectionInner">

          <h2>
            Create AI videos of your own
          </h2>

          <p>
            Watching is only half of DYOP. Create your
            own generative videos and publish them for
            other viewers to discover.
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

      {/* COMMUNITY */}
      <section className="blogSection">
        <div className="blogSectionInner">

          <h2>
            Join the AI video community
          </h2>

          <p>
            DYOP brings AI video creators and viewers
            together. Publish your work, discover
            creators and see what other people are
            making with generative video.
          </p>

          <Link
            to="/ai-video-community"
            className="blogSecondary"
          >
            Explore the AI Video Community
          </Link>

        </div>
      </section>

      {/* FAQ */}
      <section className="blogSection">
        <div className="blogSectionInner">

          <h2>
            Watching AI videos on DYOP
          </h2>

          <div className="blogFaq">

            <article>
              <h3>
                Where can I watch AI-generated videos?
              </h3>

              <p>
                DYOP is a video platform where creators
                can publish AI-generated videos for
                viewers to discover and watch.
              </p>
            </article>

            <article>
              <h3>
                Can I find AI video creators on DYOP?
              </h3>

              <p>
                Yes. Public videos connect to creator
                channels where you can discover more
                work from individual creators.
              </p>
            </article>

            <article>
              <h3>
                Can I upload my own AI videos?
              </h3>

              <p>
                Yes. Creators can publish their own
                videos and build a channel on DYOP.
              </p>
            </article>

          </div>

        </div>
      </section>

      {/* FINAL */}
      <section className="blogFinal">
        <div className="blogSectionInner">

          <h2>
            See what's new on DYOP
          </h2>

          <p>
            Discover the latest AI-generated videos
            from the community.
          </p>

          <a
            href="#latest-ai-videos"
            className="blogPrimary"
          >
            Watch AI Videos
          </a>

        </div>
      </section>

    </main>
  );
}