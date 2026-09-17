import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./BlogLanding.css";

export default function LocalAiVideoGenerator() {
  useEffect(() => {
    const title =
      "Local AI Video Generator | Generate AI Video Locally | DYOP";

    const description =
      "Generate AI videos locally with DYOP. Create characters, images, video and music, then edit your project in one free downloadable AI video creation package.";

    const canonicalUrl =
      "https://www.dyop.ai/local-ai-video-generator";

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
            LOCAL AI VIDEO GENERATION
          </div>

          <h1>
            Local AI Video Generator
          </h1>

          <p className="blogLead">
            Generate AI video locally with DYOP.
            Create characters, images, videos and music,
            then bring everything together in one
            end-to-end video creation package.
          </p>

          <div className="blogActions">
            <Link
              to="/generate"
              className="blogPrimary"
            >
              Download DYOP
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

      {/* WHAT IS LOCAL AI VIDEO */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Generate AI video on your own computer
          </h2>

          <p>
            A local AI video generator runs AI video
            creation tools on your own computer rather
            than relying entirely on a remote generation
            service.
          </p>

          <p>
            DYOP is downloadable software designed to
            bring the AI video creation process together
            in one place, from generating the elements
            of your project through to editing the
            finished video.
          </p>

          <p>
            Instead of jumping between separate tools
            for characters, images, video, music and
            editing, DYOP provides an end-to-end
            environment for AI video creation.
          </p>
        </div>
      </section>

      {/* END TO END */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            End-to-end local AI video creation
          </h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>Characters</h3>

              <p>
                Create characters for your project and
                develop the people and subjects that
                appear throughout your video.
              </p>
            </article>

            <article>
              <h3>Images</h3>

              <p>
                Generate visual concepts, characters,
                environments and starting frames for
                your video.
              </p>
            </article>

            <article>
              <h3>Video</h3>

              <p>
                Generate moving shots and sequences
                that become the building blocks of
                your finished project.
              </p>
            </article>

            <article>
              <h3>Music</h3>

              <p>
                Create music alongside your visuals
                as part of the same video creation
                workflow.
              </p>
            </article>

            <article>
              <h3>Editing</h3>

              <p>
                Bring generated material together,
                arrange your shots and develop your
                project into a finished video.
              </p>
            </article>

            <article>
              <h3>Publishing</h3>

              <p>
                Take your finished creation beyond the
                editor and publish it for viewers to
                discover.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Make an AI video from start to finish
          </h2>

          <div className="blogSteps">
            <article>
              <span>01</span>

              <h3>Build your idea</h3>

              <p>
                Start with the story, character, scene,
                visual concept or video you want to
                create.
              </p>
            </article>

            <article>
              <span>02</span>

              <h3>Generate your assets</h3>

              <p>
                Create the characters, imagery, video
                and music needed for your project.
              </p>
            </article>

            <article>
              <span>03</span>

              <h3>Edit your video</h3>

              <p>
                Bring your generated material together
                and build it into a complete sequence.
              </p>
            </article>

            <article>
              <span>04</span>

              <h3>Finish and publish</h3>

              <p>
                Complete your project and publish your
                finished AI-generated video.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* LOCAL VS CLOUD */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Local AI video generation vs cloud generation
          </h2>

          <p>
            Many AI video generators are built entirely
            around cloud services. You submit a prompt
            or image, wait for a remote service to
            generate the result and then download the
            finished clip.
          </p>

          <p>
            Local AI generation takes a different
            approach by allowing supported generation
            workloads to run on your own computer.
          </p>

          <p>
            For creators who want a more complete
            production environment, DYOP combines local
            AI creation with the wider process of
            developing and editing a video.
          </p>
        </div>
      </section>

      {/* LOCAL WORKFLOWS */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Local text-to-video and image-to-video
          </h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>Local Text to Video</h3>

              <p>
                Start with a written description and
                generate moving imagery based on your
                idea.
              </p>

              <Link to="/text-to-video">
                Explore Text to Video →
              </Link>
            </article>

            <article>
              <h3>Local Image to Video</h3>

              <p>
                Begin with an existing image and use it
                as the visual foundation for generated
                movement.
              </p>

              <Link to="/image-to-video">
                Explore Image to Video →
              </Link>
            </article>

            <article>
              <h3>Local AI Animation</h3>

              <p>
                Experiment with animated characters,
                artwork, environments and generated
                visual ideas.
              </p>

              <Link to="/ai-animation-generator">
                Explore AI Animation →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* WHY LOCAL */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Why use a local AI video generator?
          </h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>Run AI Locally</h3>

              <p>
                Use your own computer for supported AI
                generation workloads rather than
                depending entirely on remote generation.
              </p>
            </article>

            <article>
              <h3>One Creation Environment</h3>

              <p>
                Keep characters, images, generated video,
                music and editing together as part of
                the same creative process.
              </p>
            </article>

            <article>
              <h3>Experiment Freely</h3>

              <p>
                Explore ideas and iterate throughout the
                production process using a downloadable
                creation environment.
              </p>
            </article>

            <article>
              <h3>End-to-End Workflow</h3>

              <p>
                Move from an initial idea through
                generation and editing without treating
                every stage as a completely separate
                workflow.
              </p>
            </article>

            <article>
              <h3>Free to Use</h3>

              <p>
                DYOP is available without requiring a
                paid subscription to access the
                application.
              </p>
            </article>

            <article>
              <h3>Publish Your Work</h3>

              <p>
                When your video is finished, DYOP also
                provides a platform where your work can
                be published and discovered.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* HARDWARE */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Local AI video uses your own hardware
          </h2>

          <p>
            Running generative AI locally means your
            computer performs the generation workload.
            Performance can therefore depend on your
            hardware and the AI models being used.
          </p>

          <p>
            More demanding video generation workflows
            may require more capable hardware than
            lighter image or creative AI tasks.
          </p>

          <p>
            DYOP brings supported local workflows into
            the same application so creators can focus
            on making the project rather than treating
            every generation step as an unrelated tool.
          </p>
        </div>
      </section>

      {/* FREE */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            A free local AI video generator
          </h2>

          <p>
            DYOP is designed as a free downloadable
            environment for AI video creation.
          </p>

          <p>
            Generate the elements of your project,
            develop your video and edit your creation
            within the same package without requiring
            a paid DYOP subscription.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/free-ai-video-generator"
              className="blogSecondary"
            >
              Free AI Video Generator
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

      {/* FAQ */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Local AI video generator FAQ
          </h2>

          <div className="blogFaq">
            <article>
              <h3>
                Can AI video generation run locally?
              </h3>

              <p>
                Yes. Supported AI video models and
                workflows can run on local computer
                hardware instead of relying entirely
                on remote cloud generation.
              </p>
            </article>

            <article>
              <h3>
                Can I generate AI video on my own PC?
              </h3>

              <p>
                Yes, provided your hardware meets the
                requirements of the generation models
                and workflows you want to use.
              </p>
            </article>

            <article>
              <h3>
                Is DYOP downloadable?
              </h3>

              <p>
                Yes. DYOP is a downloadable application
                designed for end-to-end AI video
                creation.
              </p>
            </article>

            <article>
              <h3>
                Is DYOP a free local AI video generator?
              </h3>

              <p>
                DYOP is available without requiring a
                paid subscription and includes local
                AI creation workflows within the
                application.
              </p>
            </article>

            <article>
              <h3>
                Can I create more than video?
              </h3>

              <p>
                Yes. DYOP brings character, image,
                video and music generation together
                with video editing.
              </p>
            </article>

            <article>
              <h3>
                Can I edit the generated videos?
              </h3>

              <p>
                Yes. Editing is part of DYOP's
                end-to-end creation workflow, allowing
                generated material to be developed into
                a finished project.
              </p>
            </article>

            <article>
              <h3>
                Do I need an internet connection?
              </h3>

              <p>
                Local generation can perform supported
                generation workloads on your own
                hardware. Some DYOP features, including
                online publishing and other connected
                services, may still require an internet
                connection.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="blogFinal">
        <div className="blogSectionInner">
          <h2>
            Create AI video locally
          </h2>

          <p>
            Characters, images, video, music and editing
            brought together in one free AI video
            creation package.
          </p>

          <div className="blogActions">
            <Link
              to="/generate"
              className="blogPrimary"
            >
              Download DYOP
            </Link>

            <Link
              to="/watch-ai-videos"
              className="blogSecondary"
            >
              See What Creators Are Making
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}