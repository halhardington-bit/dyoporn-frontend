import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./BlogLanding.css";

export default function AiVideoSoftware() {
  useEffect(() => {
    const title =
      "AI Video Software | Download AI Video Creation Software | DYOP";

    const description =
      "Download AI video software for creating characters, images, video and music with local AI workflows and editing in one free creation package.";

    const canonicalUrl =
      "https://www.dyop.ai/ai-video-software";

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
            AI VIDEO CREATION SOFTWARE
          </div>

          <h1>AI Video Software</h1>

          <p className="blogLead">
            Download AI video creation software built
            for the whole creative process. Generate
            characters, images, video and music, then
            bring everything together through editing
            with DYOP.
          </p>

          <div className="blogActions">
            <Link
              to="/generate"
              className="blogPrimary"
            >
              Download DYOP
            </Link>

            <Link
              to="/local-ai-video-generator"
              className="blogSecondary"
            >
              Explore Local AI Video
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            AI video creation in one piece of software
          </h2>

          <p>
            Making an AI-generated video can involve
            much more than entering a prompt and
            generating a single clip.
          </p>

          <p>
            A complete project might involve developing
            characters, creating images, generating
            multiple video shots, producing music and
            finally editing everything into a finished
            sequence.
          </p>

          <p>
            DYOP is downloadable AI video software
            designed around that complete creative
            process.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            What can you create with AI video software?
          </h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>AI Characters</h3>

              <p>
                Develop original characters for films,
                animation, stories and visual projects.
              </p>

              <Link to="/ai-character-generator">
                AI Character Generator →
              </Link>
            </article>

            <article>
              <h3>AI Images</h3>

              <p>
                Generate characters, environments,
                concepts and visual starting points
                for your video.
              </p>
            </article>

            <article>
              <h3>AI Video</h3>

              <p>
                Generate moving shots and sequences
                that become part of a larger project.
              </p>
            </article>

            <article>
              <h3>AI Animation</h3>

              <p>
                Create animated characters, artwork,
                environments and imaginative scenes.
              </p>

              <Link to="/ai-animation-generator">
                AI Animation Generator →
              </Link>
            </article>

            <article>
              <h3>AI Music</h3>

              <p>
                Create music alongside the visual
                elements of your project.
              </p>
            </article>

            <article>
              <h3>Video Editing</h3>

              <p>
                Bring your generated assets and shots
                together and develop them into a
                finished video.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* SOFTWARE VS GENERATOR */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            AI video software vs an AI video generator
          </h2>

          <p>
            An AI video generator is usually focused on
            producing an individual video clip from a
            prompt, image or other input.
          </p>

          <p>
            AI video software can go further by providing
            an environment where those generated clips
            become part of a larger production.
          </p>

          <p>
            DYOP combines generation with the wider
            creative workflow so characters, images,
            video, music and editing can become parts
            of the same project.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/ai-video-generator"
              className="blogSecondary"
            >
              AI Video Generator
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

      {/* DOWNLOADABLE */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Downloadable AI video software
          </h2>

          <p>
            DYOP is a downloadable application rather
            than only a browser-based AI generation
            service.
          </p>

          <p>
            This allows supported AI workflows to become
            part of a local creative environment on your
            own computer.
          </p>

          <p>
            Instead of treating AI generation as a
            website you visit for individual outputs,
            DYOP is designed as software for developing
            complete AI video projects.
          </p>
        </div>
      </section>

      {/* LOCAL */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Local AI video software
          </h2>

          <p>
            Supported AI generation workloads can run
            locally using your own computer.
          </p>

          <p>
            Local workflows can be used for different
            stages of the creation process while DYOP
            provides the wider environment for building
            the finished project.
          </p>

          <p>
            Connected features such as publishing your
            finished work online can then be used when
            an internet connection is available.
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
            An end-to-end AI video workflow
          </h2>

          <div className="blogSteps">
            <article>
              <span>01</span>

              <h3>Develop the idea</h3>

              <p>
                Start with your concept, story,
                character or visual idea.
              </p>
            </article>

            <article>
              <span>02</span>

              <h3>Create your assets</h3>

              <p>
                Generate the characters, imagery,
                video and music needed for the project.
              </p>
            </article>

            <article>
              <span>03</span>

              <h3>Build your video</h3>

              <p>
                Bring individual generated elements
                together into a larger sequence.
              </p>
            </article>

            <article>
              <span>04</span>

              <h3>Edit and finish</h3>

              <p>
                Develop your shots into a finished
                project ready to share or publish.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* TEXT / IMAGE */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Different ways to create AI video
          </h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>Text to Video</h3>

              <p>
                Describe a scene and use text as the
                starting point for generated video.
              </p>

              <Link to="/text-to-video">
                Explore Text to Video →
              </Link>
            </article>

            <article>
              <h3>Image to Video</h3>

              <p>
                Start with an image and develop it into
                moving video.
              </p>

              <Link to="/image-to-video">
                Explore Image to Video →
              </Link>
            </article>

            <article>
              <h3>Consistent AI Generation</h3>

              <p>
                Develop recurring characters, locations
                and visual ideas across multiple
                generations.
              </p>

              <Link to="/consistent-ai-generation">
                Explore AI Consistency →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* WHO */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            AI video software for creative projects
          </h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>Filmmaking</h3>

              <p>
                Develop characters, scenes and shots
                for AI-assisted films and stories.
              </p>
            </article>

            <article>
              <h3>Animation</h3>

              <p>
                Create animated imagery, characters
                and sequences.
              </p>
            </article>

            <article>
              <h3>Music Videos</h3>

              <p>
                Generate visual concepts and video
                around music.
              </p>

              <Link to="/ai-music-video-generator">
                AI Music Video Generator →
              </Link>
            </article>

            <article>
              <h3>Short Videos</h3>

              <p>
                Create individual sequences and short
                creative video projects.
              </p>
            </article>

            <article>
              <h3>Visual Development</h3>

              <p>
                Explore characters, worlds and imagery
                before developing them into video.
              </p>
            </article>

            <article>
              <h3>Experimental Video</h3>

              <p>
                Explore new combinations of generative
                imagery, movement, music and editing.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FREE */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Free AI video software
          </h2>

          <p>
            DYOP is designed as a free downloadable
            environment for AI video creation.
          </p>

          <p>
            The application does not require a paid
            DYOP subscription, allowing creators to
            explore AI video production without adding
            another recurring software subscription.
          </p>

          <p>
            Characters, images, video, music and editing
            can all become part of the same creative
            workflow.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/free-ai-video-generator"
              className="blogSecondary"
            >
              Free AI Video Generator
            </Link>

            <Link
              to="/ai-without-subscription"
              className="blogSecondary"
            >
              AI Without Subscription
            </Link>
          </div>
        </div>
      </section>

      {/* PLATFORM */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Create, edit and publish
          </h2>

          <p>
            DYOP doesn't stop when generation finishes.
          </p>

          <p>
            After developing and editing your video,
            finished projects can be published for
            viewers to discover through the DYOP
            platform.
          </p>

          <p>
            That connects the creation process with a
            community built around watching and
            discovering AI-generated video.
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
            AI video software FAQ
          </h2>

          <div className="blogFaq">
            <article>
              <h3>
                What is AI video software?
              </h3>

              <p>
                AI video software uses generative AI
                and video creation tools to help create
                visual assets, moving shots and complete
                video projects.
              </p>
            </article>

            <article>
              <h3>
                Can I download AI video software?
              </h3>

              <p>
                Yes. DYOP is a downloadable application
                designed for AI video creation.
              </p>
            </article>

            <article>
              <h3>
                Can AI video software run locally?
              </h3>

              <p>
                Supported AI generation workflows in
                DYOP can use your own computer for
                processing.
              </p>
            </article>

            <article>
              <h3>
                Is DYOP free AI video software?
              </h3>

              <p>
                DYOP does not require a paid subscription
                to use the application.
              </p>
            </article>

            <article>
              <h3>
                Can AI video software create characters?
              </h3>

              <p>
                Yes. Character generation can be part
                of the wider AI video creation process,
                allowing characters to become part of
                larger visual projects.
              </p>
            </article>

            <article>
              <h3>
                Can I edit AI-generated videos?
              </h3>

              <p>
                Yes. DYOP includes editing as part of
                its end-to-end video creation workflow.
              </p>
            </article>

            <article>
              <h3>
                Can I make music for AI videos?
              </h3>

              <p>
                DYOP brings music generation into the
                same wider creation environment as
                characters, imagery and video.
              </p>
            </article>

            <article>
              <h3>
                Can I publish videos created in DYOP?
              </h3>

              <p>
                Yes. Finished creations can be published
                online for viewers to discover.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section className="blogFinal">
        <div className="blogSectionInner">
          <h2>
            Download AI video creation software
          </h2>

          <p>
            Create characters, images, video and music,
            edit your project and bring the entire
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
              to="/ai-video-maker"
              className="blogSecondary"
            >
              Explore AI Video Making
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}