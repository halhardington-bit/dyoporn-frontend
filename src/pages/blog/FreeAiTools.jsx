import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./BlogLanding.css";

export default function FreeAiTools() {
  useEffect(() => {
    const title =
      "Free AI Tools | Video, Images, Characters & Music | DYOP";

    const description =
      "Explore free AI tools for creating characters, images, video, animation and music. DYOP brings AI creation and editing together in one free downloadable package.";

    const canonicalUrl =
      "https://www.dyop.ai/free-ai-tools";

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
            FREE GENERATIVE AI TOOLS
          </div>

          <h1>
            Free AI Tools for Creative Projects
          </h1>

          <p className="blogLead">
            Create characters, images, video, animation
            and music with AI. DYOP brings free AI
            creation tools and editing together in one
            downloadable environment for building
            complete creative projects.
          </p>

          <div className="blogActions">
            <Link
              to="/generate"
              className="blogPrimary"
            >
              Download DYOP
            </Link>

            <Link
              to="/all-in-one-ai-generator"
              className="blogSecondary"
            >
              Explore All-in-One AI
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Free AI tools for creators
          </h2>

          <p>
            Generative AI can now become part of almost
            every stage of a creative project.
          </p>

          <p>
            AI tools can help develop characters,
            generate artwork, create moving video,
            animate images, produce music and build
            larger visual projects.
          </p>

          <p>
            DYOP brings these different forms of AI
            creation together in one free downloadable
            environment rather than treating each one
            as a completely separate workflow.
          </p>
        </div>
      </section>

      {/* TOOL CATEGORIES */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Free AI creation tools
          </h2>

          <div className="blogFeatureGrid">

            <article>
              <h3>AI Character Generator</h3>

              <p>
                Create original characters for films,
                animation, stories and other visual
                projects.
              </p>

              <Link to="/ai-character-generator">
                Explore AI Characters →
              </Link>
            </article>

            <article>
              <h3>AI Image Tools</h3>

              <p>
                Generate artwork, environments,
                characters, concepts and visual
                starting points for your projects.
              </p>
            </article>

            <article>
              <h3>AI Video Generator</h3>

              <p>
                Turn creative ideas into moving shots
                and video sequences using generative AI.
              </p>

              <Link to="/free-ai-video-generator">
                Free AI Video Generator →
              </Link>
            </article>

            <article>
              <h3>AI Animation Tools</h3>

              <p>
                Bring artwork, characters and visual
                concepts into motion.
              </p>

              <Link to="/ai-animation-generator">
                AI Animation Generator →
              </Link>
            </article>

            <article>
              <h3>AI Music Tools</h3>

              <p>
                Generate music to accompany films,
                videos and other creative projects.
              </p>
            </article>

            <article>
              <h3>Video Editing Tools</h3>

              <p>
                Bring generated content together and
                develop individual assets into a
                finished video project.
              </p>
            </article>

          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Free AI video tools
          </h2>

          <p>
            AI video creation can begin from several
            different types of input.
          </p>

          <p>
            A written idea can become the starting point
            for a generated shot. An existing image can
            be developed into movement. Characters and
            environments can become recurring elements
            across a larger project.
          </p>

          <div className="blogFeatureGrid">

            <article>
              <h3>Text to Video</h3>

              <p>
                Describe a scene and use your written
                idea as the starting point for video.
              </p>

              <Link to="/text-to-video">
                Explore Text to Video →
              </Link>
            </article>

            <article>
              <h3>Image to Video</h3>

              <p>
                Start with an image and develop it
                into moving AI-generated video.
              </p>

              <Link to="/image-to-video">
                Explore Image to Video →
              </Link>
            </article>

            <article>
              <h3>Consistent Generation</h3>

              <p>
                Develop recurring characters, visual
                styles and locations across a larger
                creative project.
              </p>

              <Link to="/consistent-ai-generation">
                Consistent AI Generation →
              </Link>
            </article>

          </div>
        </div>
      </section>

      {/* WHY FREE */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Explore generative AI without another subscription
          </h2>

          <p>
            Experimenting with generative AI can become
            expensive when every part of the workflow
            requires another recurring service.
          </p>

          <p>
            DYOP does not require a paid subscription
            to use the application.
          </p>

          <p>
            That gives creators a free environment for
            exploring AI characters, imagery, video,
            music and editing without adding another
            recurring DYOP software subscription.
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

      {/* ALL IN ONE */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Stop jumping between different AI tools
          </h2>

          <p>
            A single creative project can require
            several different kinds of generative AI.
          </p>

          <p>
            You might create a character first, generate
            an environment around them, turn images into
            moving shots, create additional video,
            generate music and finally edit everything
            together.
          </p>

          <p>
            DYOP is designed to bring those stages into
            one wider creative environment.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/all-in-one-ai-generator"
              className="blogSecondary"
            >
              All-in-One AI Generator
            </Link>

            <Link
              to="/ai-video-software"
              className="blogSecondary"
            >
              AI Video Software
            </Link>
          </div>
        </div>
      </section>

      {/* LOCAL */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Free local AI tools
          </h2>

          <p>
            DYOP is downloadable software built around
            local AI creation workflows.
          </p>

          <p>
            Supported generation workloads can use
            your own computer, allowing generative AI
            to become part of a local creative
            environment.
          </p>

          <p>
            Connected features such as publishing
            finished videos online can then be used
            when an internet connection is available.
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

      {/* WORKFLOW */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Build complete projects with AI tools
          </h2>

          <div className="blogSteps">

            <article>
              <span>01</span>

              <h3>Create the idea</h3>

              <p>
                Start with a story, character, scene,
                image or other creative concept.
              </p>
            </article>

            <article>
              <span>02</span>

              <h3>Generate the assets</h3>

              <p>
                Create the characters, images and
                visual elements needed for the project.
              </p>
            </article>

            <article>
              <span>03</span>

              <h3>Create video and music</h3>

              <p>
                Develop your visual ideas into moving
                shots and create music for the project.
              </p>
            </article>

            <article>
              <span>04</span>

              <h3>Edit everything together</h3>

              <p>
                Turn individual AI generations into a
                finished video ready to share.
              </p>
            </article>

          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Free AI tools for different creators
          </h2>

          <div className="blogFeatureGrid">

            <article>
              <h3>Filmmakers</h3>

              <p>
                Explore characters, environments,
                visual development and generated
                shots for film projects.
              </p>
            </article>

            <article>
              <h3>Animators</h3>

              <p>
                Create characters and artwork, then
                explore animation and movement.
              </p>
            </article>

            <article>
              <h3>Musicians</h3>

              <p>
                Develop AI-generated visuals and
                videos around music projects.
              </p>

              <Link to="/ai-music-video-generator">
                AI Music Video Generator →
              </Link>
            </article>

            <article>
              <h3>Artists</h3>

              <p>
                Explore generative imagery, visual
                concepts and moving artwork.
              </p>
            </article>

            <article>
              <h3>Storytellers</h3>

              <p>
                Build characters and worlds that can
                continue across multiple scenes.
              </p>
            </article>

            <article>
              <h3>Content Creators</h3>

              <p>
                Create original AI-generated visual
                content and develop it into videos
                ready to publish.
              </p>
            </article>

          </div>
        </div>
      </section>

      {/* DOWNLOADABLE */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Download AI tools for creative work
          </h2>

          <p>
            Not every AI creation workflow needs to
            exist entirely inside a web browser.
          </p>

          <p>
            DYOP is downloadable AI video software,
            providing a dedicated environment for
            developing generative media and larger
            video projects.
          </p>

          <p>
            Instead of treating AI as a collection of
            isolated websites, DYOP approaches
            generative AI as part of a wider creative
            production workflow.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/ai-video-software"
              className="blogSecondary"
            >
              Downloadable AI Video Software
            </Link>
          </div>
        </div>
      </section>

      {/* CREATE + PUBLISH */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Create, edit and publish with AI
          </h2>

          <p>
            AI tools can help create the individual
            pieces of a project, but DYOP is designed
            around what happens next.
          </p>

          <p>
            Generated content can become part of an
            edited video, and finished videos can be
            published through DYOP for viewers to
            discover.
          </p>

          <p>
            This connects AI creation with the
            audience watching the finished work.
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
            Free AI tools FAQ
          </h2>

          <div className="blogFaq">

            <article>
              <h3>
                Are there free AI tools for content creation?
              </h3>

              <p>
                Yes. DYOP is free downloadable software
                for AI video creation and brings
                character, image, video and music
                generation together with editing.
              </p>
            </article>

            <article>
              <h3>
                What can I create with free AI tools?
              </h3>

              <p>
                Generative AI tools can be used to
                create media including characters,
                images, video, animation and music.
              </p>
            </article>

            <article>
              <h3>
                Are there free AI video tools?
              </h3>

              <p>
                DYOP provides a free AI video creation
                environment that supports video as
                part of a larger generative workflow.
              </p>
            </article>

            <article>
              <h3>
                Can I use AI tools without a subscription?
              </h3>

              <p>
                DYOP does not require a paid
                subscription to use the application.
              </p>
            </article>

            <article>
              <h3>
                Can AI tools run locally?
              </h3>

              <p>
                Supported AI generation workflows in
                DYOP can use your own computer for
                processing.
              </p>
            </article>

            <article>
              <h3>
                Can one AI tool create images and video?
              </h3>

              <p>
                DYOP brings image and video generation
                into the same wider creation
                environment alongside characters,
                music and editing.
              </p>
            </article>

            <article>
              <h3>
                Can I edit AI-generated content?
              </h3>

              <p>
                Yes. Editing is part of DYOP's
                end-to-end video creation workflow.
              </p>
            </article>

            <article>
              <h3>
                Can I publish AI-generated videos?
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

      {/* FINAL */}
      <section className="blogFinal">
        <div className="blogSectionInner">
          <h2>
            Explore free AI creation tools
          </h2>

          <p>
            Create characters, images, video and music,
            edit your project and bring the whole
            creative process together with DYOP.
          </p>

          <div className="blogActions">
            <Link
              to="/generate"
              className="blogPrimary"
            >
              Download DYOP
            </Link>

            <Link
              to="/all-in-one-ai-generator"
              className="blogSecondary"
            >
              All-in-One AI Generator
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}