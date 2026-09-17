import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./BlogLanding.css";

export default function FreeAiContentCreation() {
  useEffect(() => {
    const title =
      "Free AI Content Creation | Create Images, Video & Music | DYOP";

    const description =
      "Create AI content for free with DYOP. Generate characters, images, videos and music, then edit everything together in one downloadable creation package.";

    const canonicalUrl =
      "https://www.dyop.ai/free-ai-content-creation";

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
            FREE AI CREATION TOOLS
          </div>

          <h1>
            Free AI Content Creation
          </h1>

          <p className="blogLead">
            Create characters, images, videos and music
            with generative AI, then bring everything
            together through editing. DYOP is a free
            downloadable environment for end-to-end
            AI content creation.
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
              Explore AI Content
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Create more than one type of AI content
          </h2>

          <p>
            AI content creation can involve much more
            than generating a single image or video.
          </p>

          <p>
            A creative project might require characters,
            environments, artwork, moving shots, music
            and editing before the finished idea is
            ready to share.
          </p>

          <p>
            DYOP brings those different stages together
            in one downloadable creation environment,
            giving creators a place to develop complete
            AI-generated projects for free.
          </p>
        </div>
      </section>

      {/* CONTENT TYPES */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            What AI content can you create?
          </h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>AI Characters</h3>

              <p>
                Create original characters for stories,
                animation, films and other visual
                projects.
              </p>

              <Link to="/ai-character-generator">
                AI Character Generator →
              </Link>
            </article>

            <article>
              <h3>AI Images</h3>

              <p>
                Generate artwork, characters,
                environments and visual concepts for
                your projects.
              </p>
            </article>

            <article>
              <h3>AI Video</h3>

              <p>
                Generate moving shots and sequences
                from your creative ideas.
              </p>

              <Link to="/free-ai-video-generator">
                Free AI Video Generator →
              </Link>
            </article>

            <article>
              <h3>AI Animation</h3>

              <p>
                Bring characters, artwork and
                imaginative scenes into motion.
              </p>

              <Link to="/ai-animation-generator">
                AI Animation Generator →
              </Link>
            </article>

            <article>
              <h3>AI Music</h3>

              <p>
                Generate music to accompany your
                visual and video projects.
              </p>
            </article>

            <article>
              <h3>Edited Videos</h3>

              <p>
                Bring generated content together
                through editing and turn individual
                assets into finished videos.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ONE ENVIRONMENT */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            One place for AI content creation
          </h2>

          <p>
            Generative AI projects can quickly become
            fragmented across different tools.
          </p>

          <p>
            One service creates an image. Another
            generates video. Another creates music.
            Then everything has to be moved somewhere
            else again for editing.
          </p>

          <p>
            DYOP is designed around an end-to-end
            workflow where different forms of
            AI-generated content can become parts of
            the same creative project.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/ai-video-software"
              className="blogSecondary"
            >
              Explore AI Video Software
            </Link>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            How to create AI content with DYOP
          </h2>

          <div className="blogSteps">
            <article>
              <span>01</span>

              <h3>Start with an idea</h3>

              <p>
                Begin with a character, story, image,
                scene, piece of music or visual concept.
              </p>
            </article>

            <article>
              <span>02</span>

              <h3>Generate your content</h3>

              <p>
                Create the characters, imagery, video
                and music needed for your project.
              </p>
            </article>

            <article>
              <span>03</span>

              <h3>Build your project</h3>

              <p>
                Combine individual generations and
                develop them into something larger.
              </p>
            </article>

            <article>
              <span>04</span>

              <h3>Edit and publish</h3>

              <p>
                Finish your video through editing and
                publish your creation for others to
                discover.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FREE */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Free AI content creation without a subscription
          </h2>

          <p>
            DYOP does not require a paid subscription
            to use the application.
          </p>

          <p>
            Creators can explore AI generation and
            develop projects without adding another
            recurring DYOP software subscription to
            their creative workflow.
          </p>

          <p>
            Characters, images, video, music and editing
            are brought together as parts of the wider
            DYOP creation environment.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/ai-without-subscription"
              className="blogSecondary"
            >
              AI Without Subscription
            </Link>
          </div>
        </div>
      </section>

      {/* LOCAL */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Create AI content locally
          </h2>

          <p>
            DYOP is downloadable software built around
            local AI creation workflows.
          </p>

          <p>
            Supported generation workloads can use
            your own computer rather than requiring
            every creative task to be processed
            entirely through a remote service.
          </p>

          <p>
            This gives creators another way to build
            generative AI into their wider production
            workflow.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/local-ai-video-generator"
              className="blogSecondary"
            >
              Local AI Video Generator
            </Link>

            <Link
              to="/offline-ai-video-generator"
              className="blogSecondary"
            >
              Offline AI Video Generator
            </Link>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            AI content creation for different creators
          </h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>Filmmakers</h3>

              <p>
                Develop characters, environments,
                shots and visual ideas for film
                projects.
              </p>
            </article>

            <article>
              <h3>Animators</h3>

              <p>
                Generate characters and imagery,
                then explore movement and animated
                sequences.
              </p>
            </article>

            <article>
              <h3>Musicians</h3>

              <p>
                Create visual content and videos
                around music projects.
              </p>

              <Link to="/ai-music-video-generator">
                AI Music Video Generator →
              </Link>
            </article>

            <article>
              <h3>Artists</h3>

              <p>
                Experiment with generative imagery,
                animation and moving artwork.
              </p>
            </article>

            <article>
              <h3>Storytellers</h3>

              <p>
                Develop characters and worlds that
                can continue across multiple scenes
                and videos.
              </p>
            </article>

            <article>
              <h3>Online Creators</h3>

              <p>
                Create original visual content that
                can be developed into videos and
                published online.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CONSISTENCY */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Turn individual generations into projects
          </h2>

          <p>
            AI content creation becomes more powerful
            when individual generations can work
            together.
          </p>

          <p>
            Characters can return across scenes.
            Locations can become part of the same
            world. Images can become video. Generated
            shots can become sequences.
          </p>

          <p>
            DYOP provides a wider workflow for turning
            those individual pieces into a complete
            creative project.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/consistent-ai-generation"
              className="blogSecondary"
            >
              Consistent AI Generation
            </Link>

            <Link
              to="/ai-video-maker"
              className="blogSecondary"
            >
              AI Video Maker
            </Link>
          </div>
        </div>
      </section>

      {/* PUBLISH */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Create and publish AI content
          </h2>

          <p>
            Creating the content is only part of the
            process.
          </p>

          <p>
            DYOP also provides a platform where
            finished AI-generated videos can be
            published for viewers to watch and
            discover.
          </p>

          <p>
            This connects the tools used to make AI
            content with a community built around
            watching it.
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

      {/* FAQ */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Free AI content creation FAQ
          </h2>

          <div className="blogFaq">
            <article>
              <h3>
                What is AI content creation?
              </h3>

              <p>
                AI content creation uses generative AI
                as part of creating media such as
                characters, images, video, animation
                and music.
              </p>
            </article>

            <article>
              <h3>
                Can I create AI content for free?
              </h3>

              <p>
                Yes. DYOP is free downloadable software
                for AI video creation and does not
                require a paid DYOP subscription.
              </p>
            </article>

            <article>
              <h3>
                What kind of AI content can I create?
              </h3>

              <p>
                DYOP brings character, image, video
                and music generation together with
                video editing.
              </p>
            </article>

            <article>
              <h3>
                Can I create AI content locally?
              </h3>

              <p>
                Supported AI generation workflows in
                DYOP can use your own computer for
                processing.
              </p>
            </article>

            <article>
              <h3>
                Can I make complete videos with AI?
              </h3>

              <p>
                Yes. DYOP is designed around an
                end-to-end workflow where generated
                characters, imagery, video and music
                can be developed into a finished
                video through editing.
              </p>
            </article>

            <article>
              <h3>
                Can I publish AI-generated content?
              </h3>

              <p>
                Yes. Finished videos can be published
                online through DYOP for viewers to
                discover.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="blogFinal">
        <div className="blogSectionInner">
          <h2>
            Start creating AI content for free
          </h2>

          <p>
            Characters, images, video, music and
            editing together in one downloadable
            creation environment.
          </p>

          <div className="blogActions">
            <Link
              to="/generate"
              className="blogPrimary"
            >
              Start Creating for Free
            </Link>

            <Link
              to="/free-ai-video-generator"
              className="blogSecondary"
            >
              Free AI Video Generator
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}