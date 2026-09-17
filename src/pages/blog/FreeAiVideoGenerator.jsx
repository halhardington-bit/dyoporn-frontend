import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./BlogLanding.css";

export default function FreeAiVideoGenerator() {
  useEffect(() => {
    const title =
      "Free AI Video Generator | Create AI Videos Free | DYOP";

    const description =
      "Create AI-generated videos for free with DYOP. Generate videos from your ideas, publish your creations and discover AI videos from other creators.";

    const canonicalUrl =
      "https://www.dyop.ai/free-ai-video-generator";

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
            FREE AI VIDEO CREATION
          </div>

          <h1>
            Free AI Video Generator
          </h1>

          <p className="blogLead">
            Create AI-generated videos with DYOP without
            paying for a subscription. Turn your ideas
            into video, publish your creations and
            discover what other AI creators are making.
          </p>

          <div className="blogActions">
            <Link
              to="/generate"
              className="blogPrimary"
            >
              Create an AI Video for Free
            </Link>

            <Link
              to="/watch-ai-videos"
              className="blogSecondary"
            >
              Watch AI Videos
            </Link>
          </div>
        </div>
      </section>

      {/* FREE ACCESS */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Create AI videos without a subscription
          </h2>

          <p>
            DYOP gives creators a place to experiment
            with AI video creation without requiring a
            paid subscription.
          </p>

          <p>
            Start with an idea, create your video and
            publish your finished work on DYOP for other
            viewers to discover.
          </p>

          <p>
            Whether you're experimenting with generative
            video for the first time or regularly creating
            AI content, you can start creating without
            committing to a monthly plan.
          </p>
        </div>
      </section>

      {/* WHAT YOU CAN CREATE */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            What can you create with AI video?
          </h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>Text to Video</h3>

              <p>
                Start with a written idea or scene
                description and turn it into
                AI-generated video.
              </p>

              <Link to="/text-to-video">
                Explore Text to Video →
              </Link>
            </article>

            <article>
              <h3>Image to Video</h3>

              <p>
                Start with an existing image and bring
                it to life with generated movement.
              </p>

              <Link to="/image-to-video">
                Explore Image to Video →
              </Link>
            </article>

            <article>
              <h3>Short Films</h3>

              <p>
                Experiment with individual generated
                shots and combine ideas into short-form
                visual stories.
              </p>
            </article>

            <article>
              <h3>Animation</h3>

              <p>
                Explore animated characters, environments
                and visual ideas using generative video.
              </p>
            </article>

            <article>
              <h3>Experimental Video</h3>

              <p>
                Try unusual concepts, visual styles and
                creative ideas that would be difficult to
                produce traditionally.
              </p>
            </article>

            <article>
              <h3>Social Video</h3>

              <p>
                Create short-form AI video concepts that
                can be published and shared online.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            How to create an AI video for free
          </h2>

          <div className="blogSteps">
            <article>
              <span>01</span>

              <h3>Start creating</h3>

              <p>
                Open DYOP's generation tools and begin
                with the idea you want to turn into video.
              </p>
            </article>

            <article>
              <span>02</span>

              <h3>Create your video</h3>

              <p>
                Generate your content and experiment with
                different ideas until you have something
                you want to keep.
              </p>
            </article>

            <article>
              <span>03</span>

              <h3>Publish on DYOP</h3>

              <p>
                Publish your finished creation and give
                your video its own page on DYOP.
              </p>
            </article>

            <article>
              <span>04</span>

              <h3>Share and discover</h3>

              <p>
                Share your work and discover videos
                published by other AI creators.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* GENERATOR + PLATFORM */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Create and publish AI videos in one place
          </h2>

          <p>
            DYOP isn't only an AI video generator. It's
            also a platform for publishing and discovering
            AI-generated video.
          </p>

          <p>
            Once you've created something, you can publish
            it to your channel instead of leaving your
            finished generations hidden inside a creation
            tool.
          </p>

          <p>
            Viewers can discover public videos, explore
            creator channels and find more AI-generated
            content across DYOP.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/ai-video-community"
              className="blogSecondary"
            >
              AI Video Community
            </Link>

            <Link
              to="/watch-ai-videos"
              className="blogSecondary"
            >
              Watch AI Videos
            </Link>
          </div>
        </div>
      </section>

      {/* WHO IT IS FOR */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Experiment with generative video
          </h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>New Creators</h3>

              <p>
                Explore AI video creation and experiment
                with generative filmmaking without
                starting with a paid subscription.
              </p>
            </article>

            <article>
              <h3>AI Artists</h3>

              <p>
                Take generated images and visual concepts
                further by experimenting with movement
                and video.
              </p>
            </article>

            <article>
              <h3>Filmmakers</h3>

              <p>
                Experiment with concepts, shots,
                environments and visual storytelling
                using generative tools.
              </p>
            </article>

            <article>
              <h3>Animators</h3>

              <p>
                Explore generated movement and alternative
                approaches to creating animated imagery.
              </p>
            </article>

            <article>
              <h3>Content Creators</h3>

              <p>
                Experiment with AI-generated visuals and
                short-form video ideas.
              </p>
            </article>

            <article>
              <h3>Curious Humans</h3>

              <p>
                You don't need to be a professional
                creator. Start experimenting and see what
                you can make.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Free AI video generator FAQ
          </h2>

          <div className="blogFaq">
            <article>
              <h3>
                Is DYOP's AI video generator free?
              </h3>

              <p>
                Yes. DYOP does not require a paid
                subscription to access the platform's
                AI video creation experience.
              </p>
            </article>

            <article>
              <h3>
                Do I need a subscription to use DYOP?
              </h3>

              <p>
                No paid subscription is required to start
                using DYOP.
              </p>
            </article>

            <article>
              <h3>
                Can I create videos from text?
              </h3>

              <p>
                DYOP supports generative video workflows
                that can begin with written ideas and
                prompts.
              </p>
            </article>

            <article>
              <h3>
                Can I animate an image with AI?
              </h3>

              <p>
                Image-to-video workflows use an existing
                image as the visual starting point for
                generated movement.
              </p>
            </article>

            <article>
              <h3>
                Can I publish my AI videos?
              </h3>

              <p>
                Yes. DYOP combines creation with a video
                platform where creators can publish their
                finished work.
              </p>
            </article>

            <article>
              <h3>
                Can I watch videos from other creators?
              </h3>

              <p>
                Yes. Public videos from other creators can
                be discovered and watched across DYOP.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="blogFinal">
        <div className="blogSectionInner">
          <h2>
            Start creating AI video for free
          </h2>

          <p>
            Turn your next idea into an AI-generated
            video with DYOP.
          </p>

          <div className="blogActions">
            <Link
              to="/generate"
              className="blogPrimary"
            >
              Start Creating for Free
            </Link>

            <Link
              to="/watch-ai-videos"
              className="blogSecondary"
            >
              Explore AI Videos
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}