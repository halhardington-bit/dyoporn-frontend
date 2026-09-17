import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./BlogLanding.css";

export default function AllInOneAiGenerator() {
  useEffect(() => {
    const title =
      "All-in-One AI Generator | Images, Video, Music & More | DYOP";

    const description =
      "Create with an all-in-one AI generator. DYOP combines characters, images, video, music and editing in one free downloadable AI creation package.";

    const canonicalUrl =
      "https://www.dyop.ai/all-in-one-ai-generator";

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
            ONE AI CREATION ENVIRONMENT
          </div>

          <h1>
            All-in-One AI Generator
          </h1>

          <p className="blogLead">
            Create characters, images, video and music,
            then bring everything together through
            editing. DYOP puts the AI video creation
            workflow into one free downloadable
            application.
          </p>

          <div className="blogActions">
            <Link
              to="/generate"
              className="blogPrimary"
            >
              Download DYOP
            </Link>

            <Link
              to="/free-ai-content-creation"
              className="blogSecondary"
            >
              Explore AI Content Creation
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            One AI tool for the whole creative process
          </h2>

          <p>
            Creating with generative AI often means
            jumping between different tools.
          </p>

          <p>
            You might use one AI generator for
            characters, another for images, another
            for video, another for music and then
            separate editing software to put the
            finished project together.
          </p>

          <p>
            DYOP is designed as an all-in-one AI
            creation environment where those different
            stages can become part of the same
            workflow.
          </p>
        </div>
      </section>

      {/* EVERYTHING */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            What can you create with DYOP?
          </h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>AI Characters</h3>

              <p>
                Develop original characters for
                stories, films, animation and visual
                projects.
              </p>

              <Link to="/ai-character-generator">
                AI Character Generator →
              </Link>
            </article>

            <article>
              <h3>AI Images</h3>

              <p>
                Generate artwork, environments,
                characters and visual concepts for
                your project.
              </p>
            </article>

            <article>
              <h3>AI Video</h3>

              <p>
                Generate moving shots and sequences
                that can become part of a complete
                video.
              </p>

              <Link to="/ai-video-generator">
                AI Video Generator →
              </Link>
            </article>

            <article>
              <h3>AI Animation</h3>

              <p>
                Bring characters, artwork and
                imaginative visual ideas into motion.
              </p>

              <Link to="/ai-animation-generator">
                AI Animation Generator →
              </Link>
            </article>

            <article>
              <h3>AI Music</h3>

              <p>
                Generate music alongside the visual
                elements of your project.
              </p>
            </article>

            <article>
              <h3>Video Editing</h3>

              <p>
                Bring generated assets together and
                develop them into a finished video.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* WHY ALL IN ONE */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Why use an all-in-one AI generator?
          </h2>

          <p>
            Generative AI can create many different
            parts of a project, but those parts still
            need to work together.
          </p>

          <p>
            Characters need to appear in scenes.
            Images may become video. Generated shots
            need to become sequences. Music needs to
            accompany the finished project.
          </p>

          <p>
            An all-in-one AI workflow brings those
            stages closer together so creators can
            concentrate on the finished idea rather
            than constantly moving between unrelated
            tools.
          </p>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            From idea to finished AI video
          </h2>

          <div className="blogSteps">
            <article>
              <span>01</span>

              <h3>Develop your idea</h3>

              <p>
                Start with a story, character, visual
                concept, scene or creative idea.
              </p>
            </article>

            <article>
              <span>02</span>

              <h3>Generate your world</h3>

              <p>
                Create characters, environments,
                imagery and other visual elements
                for your project.
              </p>
            </article>

            <article>
              <span>03</span>

              <h3>Create video and music</h3>

              <p>
                Generate moving shots and music as
                your project develops.
              </p>
            </article>

            <article>
              <span>04</span>

              <h3>Edit the finished project</h3>

              <p>
                Bring your generated material together
                and turn individual creations into a
                complete video.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* TEXT / IMAGE / VIDEO */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Multiple AI generation workflows in one place
          </h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>Text to Video</h3>

              <p>
                Start with a written description and
                turn your idea into moving imagery.
              </p>

              <Link to="/text-to-video">
                Explore Text to Video →
              </Link>
            </article>

            <article>
              <h3>Image to Video</h3>

              <p>
                Use an image as the visual foundation
                for generated movement and video.
              </p>

              <Link to="/image-to-video">
                Explore Image to Video →
              </Link>
            </article>

            <article>
              <h3>Character to Project</h3>

              <p>
                Develop characters that can become
                recurring parts of larger visual
                stories.
              </p>

              <Link to="/consistent-ai-generation">
                Consistent AI Generation →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* CONSISTENCY */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Build connected AI creations
          </h2>

          <p>
            An end-to-end AI workflow becomes especially
            useful when you're creating more than one
            isolated image or clip.
          </p>

          <p>
            Characters may need to return throughout a
            story. Locations may appear across multiple
            scenes. Generated imagery can establish the
            visual identity of later video shots.
          </p>

          <p>
            DYOP provides a wider project environment
            for developing those elements as parts of
            the same creation.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/consistent-ai-generation"
              className="blogSecondary"
            >
              Consistent AI Generation
            </Link>
          </div>
        </div>
      </section>

      {/* LOCAL */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            All-in-one local AI creation
          </h2>

          <p>
            DYOP is downloadable software built around
            local AI creation workflows.
          </p>

          <p>
            Supported generation workloads can use
            your own computer, bringing AI generation
            into a local production environment rather
            than requiring every creative step to be
            performed through separate browser-based
            services.
          </p>

          <p>
            Connected features can then be used when
            needed, including publishing finished
            creations online.
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

      {/* FREE */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            A free all-in-one AI creation tool
          </h2>

          <p>
            DYOP does not require a paid subscription
            to use the application.
          </p>

          <p>
            Creators can explore character generation,
            imagery, video, music and editing within
            the same downloadable environment without
            adding another recurring DYOP subscription
            to their workflow.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/ai-without-subscription"
              className="blogSecondary"
            >
              AI Without Subscription
            </Link>

            <Link
              to="/free-ai-content-creation"
              className="blogSecondary"
            >
              Free AI Content Creation
            </Link>
          </div>
        </div>
      </section>

      {/* SOFTWARE */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            More than a collection of AI generators
          </h2>

          <p>
            DYOP is designed as AI creation software,
            not simply a page containing several
            unrelated generators.
          </p>

          <p>
            The goal is to provide an environment where
            different generative media can become part
            of one larger production workflow.
          </p>

          <p>
            Generate the pieces, develop the project,
            edit the finished video and take your idea
            from its first concept to something ready
            to share.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/ai-video-software"
              className="blogSecondary"
            >
              AI Video Software
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

      {/* USE CASES */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            One AI tool for different creative projects
          </h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>Films</h3>

              <p>
                Develop characters, locations, shots,
                music and edited sequences for visual
                stories.
              </p>
            </article>

            <article>
              <h3>Animation</h3>

              <p>
                Create characters and imagery, then
                bring those visual ideas into motion.
              </p>
            </article>

            <article>
              <h3>Music Videos</h3>

              <p>
                Combine generated visuals, video and
                music into creative music projects.
              </p>

              <Link to="/ai-music-video-generator">
                AI Music Video Generator →
              </Link>
            </article>

            <article>
              <h3>Online Content</h3>

              <p>
                Create original visual content and
                develop it into finished videos.
              </p>
            </article>

            <article>
              <h3>Concept Development</h3>

              <p>
                Explore characters, worlds and visual
                directions before developing them
                further.
              </p>
            </article>

            <article>
              <h3>Experimental Projects</h3>

              <p>
                Combine different generative media
                and explore new creative workflows.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* PUBLISH */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Generate, edit and publish
          </h2>

          <p>
            The creative process doesn't have to stop
            when the final generation finishes.
          </p>

          <p>
            DYOP connects AI creation and editing with
            an online platform where finished videos
            can be published and discovered.
          </p>

          <p>
            That creates a workflow from the first
            generated idea through to the audience
            watching the finished creation.
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
            All-in-one AI generator FAQ
          </h2>

          <div className="blogFaq">
            <article>
              <h3>
                What is an all-in-one AI generator?
              </h3>

              <p>
                An all-in-one AI generator brings
                multiple forms of generative AI into
                a wider creation workflow instead of
                focusing on only one type of output.
              </p>
            </article>

            <article>
              <h3>
                Can one AI tool generate images and video?
              </h3>

              <p>
                DYOP brings image and video generation
                into the same wider creation environment,
                alongside characters, music and editing.
              </p>
            </article>

            <article>
              <h3>
                Can DYOP generate music too?
              </h3>

              <p>
                Yes. Music generation is part of the
                wider DYOP creative workflow.
              </p>
            </article>

            <article>
              <h3>
                Can I edit generated content in DYOP?
              </h3>

              <p>
                Yes. Editing is part of DYOP's
                end-to-end video creation workflow.
              </p>
            </article>

            <article>
              <h3>
                Is DYOP downloadable?
              </h3>

              <p>
                Yes. DYOP is downloadable AI video
                creation software.
              </p>
            </article>

            <article>
              <h3>
                Can DYOP run AI locally?
              </h3>

              <p>
                Supported generation workflows can
                use your own computer for processing.
              </p>
            </article>

            <article>
              <h3>
                Is DYOP free?
              </h3>

              <p>
                DYOP does not require a paid
                subscription to use the application.
              </p>
            </article>

            <article>
              <h3>
                Can I publish what I create?
              </h3>

              <p>
                Yes. Finished AI-generated videos can
                be published online through DYOP for
                viewers to discover.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section className="blogFinal">
        <div className="blogSectionInner">
          <h2>
            One place to create with AI
          </h2>

          <p>
            Characters, images, video, music and editing
            brought together in one free downloadable
            AI creation environment.
          </p>

          <div className="blogActions">
            <Link
              to="/generate"
              className="blogPrimary"
            >
              Download DYOP
            </Link>

            <Link
              to="/free-ai-content-creation"
              className="blogSecondary"
            >
              Explore Free AI Creation
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}