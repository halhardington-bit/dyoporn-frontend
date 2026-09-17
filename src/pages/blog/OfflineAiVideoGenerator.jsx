import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./BlogLanding.css";

export default function OfflineAiVideoGenerator() {
  useEffect(() => {
    const title =
      "Offline AI Video Generator | Create AI Videos Locally | DYOP";

    const description =
      "Create AI videos locally with DYOP. Use supported AI generation workflows on your own computer for characters, images, video and music, then edit everything in one application.";

    const canonicalUrl =
      "https://www.dyop.ai/offline-ai-video-generator";

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
            LOCAL AI CREATION
          </div>

          <h1>
            Offline AI Video Generator
          </h1>

          <p className="blogLead">
            Create AI-generated video using your own
            computer. DYOP brings local generation,
            characters, images, video, music and editing
            together in one downloadable application.
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
            Create AI video without relying entirely on the cloud
          </h2>

          <p>
            Many AI video generators work primarily as
            online services. Your prompt, image or other
            input is sent to remote infrastructure where
            the generation is processed before the
            result is returned.
          </p>

          <p>
            Local AI generation allows supported
            workloads to run directly on your own
            computer instead.
          </p>

          <p>
            DYOP is a downloadable AI video creation
            application designed to combine those local
            generation workflows with the wider process
            of making a finished video.
          </p>
        </div>
      </section>

      {/* WHAT OFFLINE MEANS */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            What is an offline AI video generator?
          </h2>

          <p>
            An offline or local AI video generator uses
            models running on your own computer rather
            than requiring every generation to be
            processed by a remote cloud service.
          </p>

          <p>
            Once the required software, models and
            dependencies are available locally,
            supported generation workloads can use your
            own hardware for processing.
          </p>

          <p>
            Features that interact with online services,
            such as publishing a finished video to the
            DYOP platform, still require an internet
            connection.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            More than local video generation
          </h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>Character Creation</h3>

              <p>
                Develop characters and subjects for use
                throughout your AI-generated project.
              </p>
            </article>

            <article>
              <h3>Image Generation</h3>

              <p>
                Create artwork, environments, concepts
                and visual starting points for your
                scenes.
              </p>
            </article>

            <article>
              <h3>AI Video</h3>

              <p>
                Generate moving shots and visual
                sequences using supported local
                workflows.
              </p>
            </article>

            <article>
              <h3>AI Music</h3>

              <p>
                Create music as another part of your
                end-to-end video production workflow.
              </p>
            </article>

            <article>
              <h3>Video Editing</h3>

              <p>
                Arrange generated material and develop
                individual assets into a finished video.
              </p>
            </article>

            <article>
              <h3>Publishing</h3>

              <p>
                When you're ready to go online, publish
                your finished creation for other viewers
                to discover.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            How local AI video generation works
          </h2>

          <div className="blogSteps">
            <article>
              <span>01</span>

              <h3>Download DYOP</h3>

              <p>
                Install the DYOP application on your
                computer and prepare the supported
                generation workflows you want to use.
              </p>
            </article>

            <article>
              <span>02</span>

              <h3>Create locally</h3>

              <p>
                Use your own hardware to process
                supported AI generation tasks.
              </p>
            </article>

            <article>
              <span>03</span>

              <h3>Build your project</h3>

              <p>
                Bring generated characters, images,
                video and music into your wider creative
                workflow.
              </p>
            </article>

            <article>
              <span>04</span>

              <h3>Edit your video</h3>

              <p>
                Arrange and develop your generated
                material into a finished video within
                the same creation environment.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* LOCAL VS CLOUD */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Offline AI video vs online AI video
          </h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>Local Processing</h3>

              <p>
                Supported generation workloads are
                processed using hardware on your own
                computer.
              </p>
            </article>

            <article>
              <h3>Cloud Processing</h3>

              <p>
                Online generators process your request
                using remote infrastructure operated by
                the service provider.
              </p>
            </article>

            <article>
              <h3>Hybrid Workflows</h3>

              <p>
                A creative application can combine local
                generation with connected features when
                online services are useful or required.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* HARDWARE */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Your computer becomes the AI workstation
          </h2>

          <p>
            Running AI models locally means the
            generation workload is handled by your own
            hardware.
          </p>

          <p>
            The performance and hardware requirements
            can vary depending on the model, resolution,
            workflow and type of content being
            generated.
          </p>

          <p>
            AI video generation can be particularly
            demanding, so the experience available on
            one computer may differ from another.
          </p>
        </div>
      </section>

      {/* TEXT / IMAGE */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Build different AI video workflows
          </h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>Text to Video</h3>

              <p>
                Begin with a written description of the
                scene and movement you want to create.
              </p>

              <Link to="/text-to-video">
                Explore Text to Video →
              </Link>
            </article>

            <article>
              <h3>Image to Video</h3>

              <p>
                Use an existing image as the visual
                starting point for generated movement.
              </p>

              <Link to="/image-to-video">
                Explore Image to Video →
              </Link>
            </article>

            <article>
              <h3>AI Animation</h3>

              <p>
                Create animated characters, environments,
                artwork and imaginative visual sequences.
              </p>

              <Link to="/ai-animation-generator">
                Explore AI Animation →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* FREE */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Free local AI video creation
          </h2>

          <p>
            DYOP is designed as a free downloadable
            environment for AI video creation.
          </p>

          <p>
            Instead of separating generation and editing
            into completely different applications,
            DYOP brings the stages of creating an
            AI-generated video together.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/free-ai-video-generator"
              className="blogSecondary"
            >
              Free AI Video Generator
            </Link>

            <Link
              to="/local-ai-video-generator"
              className="blogSecondary"
            >
              Local AI Video Generator
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Offline AI video generator FAQ
          </h2>

          <div className="blogFaq">
            <article>
              <h3>
                Can AI video generation work offline?
              </h3>

              <p>
                Supported AI generation models can run
                locally when the required software,
                models and dependencies are available
                on your computer.
              </p>
            </article>

            <article>
              <h3>
                Can I generate AI videos without the cloud?
              </h3>

              <p>
                Local AI workflows can process supported
                generation tasks using your own hardware
                instead of sending every generation to
                a remote cloud service.
              </p>
            </article>

            <article>
              <h3>
                Is DYOP downloadable?
              </h3>

              <p>
                Yes. DYOP is a downloadable application
                for end-to-end AI video creation.
              </p>
            </article>

            <article>
              <h3>
                Is DYOP free?
              </h3>

              <p>
                DYOP does not require a paid subscription
                to use the application.
              </p>
            </article>

            <article>
              <h3>
                Does everything in DYOP work offline?
              </h3>

              <p>
                No. Supported local generation can use
                your own computer, while connected
                features such as publishing content
                online require an internet connection.
              </p>
            </article>

            <article>
              <h3>
                Can I edit AI videos locally?
              </h3>

              <p>
                DYOP includes editing as part of its
                end-to-end video creation workflow.
              </p>
            </article>

            <article>
              <h3>
                Do I need a powerful computer?
              </h3>

              <p>
                Hardware requirements depend on the
                models and workflows being used. AI
                video generation is generally more
                demanding than lighter AI workloads.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="blogFinal">
        <div className="blogSectionInner">
          <h2>
            Create AI video on your own computer
          </h2>

          <p>
            Download DYOP and bring local AI generation,
            video creation and editing together.
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
              Learn About Local AI Video
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}