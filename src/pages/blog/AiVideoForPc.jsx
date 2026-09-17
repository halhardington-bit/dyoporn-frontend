import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./BlogLanding.css";

export default function AiVideoForPc() {
  useEffect(() => {
    const title =
      "AI Video Generator for PC | Create AI Videos Locally | DYOP";

    const description =
      "Create AI videos on your PC with DYOP. Generate characters, images, video and music using supported local AI workflows, then edit everything in one application.";

    const canonicalUrl =
      "https://www.dyop.ai/ai-video-for-pc";

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
            LOCAL AI VIDEO CREATION
          </div>

          <h1>AI Video Generator for PC</h1>

          <p className="blogLead">
            Create AI-generated video on your own
            computer. DYOP is downloadable AI video
            software for generating characters, images,
            video and music, then bringing everything
            together through editing.
          </p>

          <div className="blogActions">
            <Link to="/generate" className="blogPrimary">
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
          <h2>Create AI videos on your PC</h2>

          <p>
            AI video generation does not have to exist
            entirely inside a browser or remote cloud
            service.
          </p>

          <p>
            DYOP is downloadable software built around
            AI video creation workflows that can use
            your own computer for supported generation
            tasks.
          </p>

          <p>
            Instead of generating an isolated clip and
            stopping there, you can develop characters,
            create imagery, generate video and music,
            then bring those pieces into a larger
            project.
          </p>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>AI creation on your computer</h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>AI Characters</h3>
              <p>
                Develop characters for stories,
                animation and video projects.
              </p>
              <Link to="/ai-character-generator">
                AI Character Generator →
              </Link>
            </article>

            <article>
              <h3>AI Images</h3>
              <p>
                Generate artwork, environments,
                characters and visual concepts.
              </p>
            </article>

            <article>
              <h3>AI Video</h3>
              <p>
                Generate moving shots and sequences
                as part of a larger project.
              </p>
            </article>

            <article>
              <h3>AI Animation</h3>
              <p>
                Turn characters and visual ideas into
                animated content.
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
                Bring generated assets together and
                develop them into a finished video.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* LOCAL */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>Local AI video generation</h2>

          <p>
            Supported AI generation workflows in DYOP
            can use your own computer for processing.
          </p>

          <p>
            Local generation makes it possible to bring
            generative AI into a dedicated creative
            environment on your PC rather than relying
            exclusively on individual browser-based
            generation services.
          </p>

          <p>
            Connected features, including online
            publishing, can then be used when an
            internet connection is available.
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
          <h2>Build complete AI videos on your PC</h2>

          <div className="blogSteps">
            <article>
              <span>01</span>
              <h3>Develop the idea</h3>
              <p>
                Start with a character, scene, story
                or visual concept.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Create your assets</h3>
              <p>
                Generate characters, imagery and
                other elements for the project.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Generate video</h3>
              <p>
                Turn your concepts into moving shots
                and sequences.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Edit your project</h3>
              <p>
                Combine your generated material into
                a finished video.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* INPUTS */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>Different ways to generate AI video</h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>Text to Video</h3>
              <p>
                Use a written description as the
                starting point for a generated scene.
              </p>
              <Link to="/text-to-video">
                Text to Video →
              </Link>
            </article>

            <article>
              <h3>Image to Video</h3>
              <p>
                Start with an image and develop it
                into moving video.
              </p>
              <Link to="/image-to-video">
                Image to Video →
              </Link>
            </article>

            <article>
              <h3>Consistent Generation</h3>
              <p>
                Develop recurring characters,
                locations and visual ideas across
                your project.
              </p>
              <Link to="/consistent-ai-generation">
                Consistent AI Generation →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* SOFTWARE */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>Downloadable AI video software</h2>

          <p>
            DYOP is designed as downloadable AI video
            software rather than only a website for
            generating individual clips.
          </p>

          <p>
            Characters, imagery, video, music and
            editing can become parts of the same
            wider creative environment.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/ai-video-software"
              className="blogSecondary"
            >
              AI Video Software
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

      {/* FREE */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>Free AI video creation software</h2>

          <p>
            DYOP does not require a paid subscription
            to use the application.
          </p>

          <p>
            Creators can explore AI video production
            and supported local generation workflows
            without adding another recurring DYOP
            subscription.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/free-ai-tools"
              className="blogSecondary"
            >
              Free AI Tools
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

      {/* FAQ */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>AI video for PC FAQ</h2>

          <div className="blogFaq">
            <article>
              <h3>Can I generate AI video on my PC?</h3>
              <p>
                Yes. DYOP supports local AI creation
                workflows that can use your own
                computer for supported generation
                tasks.
              </p>
            </article>

            <article>
              <h3>
                Can I download an AI video generator?
              </h3>
              <p>
                Yes. DYOP is downloadable AI video
                creation software.
              </p>
            </article>

            <article>
              <h3>
                Can AI video generation run locally?
              </h3>
              <p>
                Supported generation workflows can
                use your own computer for processing.
              </p>
            </article>

            <article>
              <h3>Can I create images and video?</h3>
              <p>
                DYOP brings image and video generation
                into the same wider creation
                environment.
              </p>
            </article>

            <article>
              <h3>Can I edit the generated videos?</h3>
              <p>
                Yes. Editing is part of DYOP's
                end-to-end video creation workflow.
              </p>
            </article>

            <article>
              <h3>Is DYOP free?</h3>
              <p>
                DYOP does not require a paid
                subscription to use the application.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section className="blogFinal">
        <div className="blogSectionInner">
          <h2>Create AI video on your PC</h2>

          <p>
            Generate characters, images, video and
            music, then edit your project in one
            downloadable creation environment.
          </p>

          <div className="blogActions">
            <Link to="/generate" className="blogPrimary">
              Download DYOP
            </Link>

            <Link
              to="/local-ai-video-generator"
              className="blogSecondary"
            >
              Explore Local AI
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}