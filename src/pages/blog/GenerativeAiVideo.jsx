import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./BlogLanding.css";

export default function GenerativeAiVideo() {
  useEffect(() => {
    const title =
      "Generative AI Video | How AI Video Generation Works | DYOP";

    const description =
      "Learn about generative AI video, including text-to-video, image-to-video, AI characters, animation, consistency and the workflow for creating complete AI videos.";

    const canonicalUrl =
      "https://www.dyop.ai/generative-ai-video";

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
            GENERATIVE VIDEO
          </div>

          <h1>Generative AI Video</h1>

          <p className="blogLead">
            Generative AI can create moving imagery
            from text, images and other creative
            inputs. Learn how AI video generation
            works and how individual generations can
            become part of complete video projects.
          </p>

          <div className="blogActions">
            <Link
              to="/ai-video-generator"
              className="blogPrimary"
            >
              Explore AI Video Generation
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

      {/* DEFINITION */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>What is generative AI video?</h2>

          <p>
            Generative AI video is video created or
            transformed using artificial intelligence
            models that generate new visual content.
          </p>

          <p>
            Instead of beginning exclusively with
            footage captured by a camera, creators can
            begin with text, images, characters,
            artwork or other visual ideas.
          </p>

          <p>
            Those inputs can then become moving
            imagery that forms individual shots,
            sequences or parts of a larger video.
          </p>
        </div>
      </section>

      {/* TYPES */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>Types of generative AI video</h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>Text to Video</h3>
              <p>
                A written description provides the
                starting point for generating a
                moving scene.
              </p>
              <Link to="/text-to-video">
                Explore Text to Video →
              </Link>
            </article>

            <article>
              <h3>Image to Video</h3>
              <p>
                An existing image becomes the visual
                foundation for movement and animation.
              </p>
              <Link to="/image-to-video">
                Explore Image to Video →
              </Link>
            </article>

            <article>
              <h3>AI Animation</h3>
              <p>
                Characters, artwork and imaginative
                visual concepts can be developed into
                animated content.
              </p>
              <Link to="/ai-animation-generator">
                Explore AI Animation →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>How does generative AI video work?</h2>

          <p>
            A creator begins by giving an AI model
            information about the desired result.
          </p>

          <p>
            That information might include a text
            description, an image, a character
            reference or other creative input.
          </p>

          <p>
            The model uses that input to generate
            frames representing movement over time,
            producing a new video result based on the
            requested visual direction.
          </p>

          <p>
            The generated result can then be refined,
            regenerated or combined with other shots
            as part of a larger production.
          </p>
        </div>
      </section>

      {/* MORE THAN PROMPTS */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>Generative video is more than a single prompt</h2>

          <p>
            A generated clip may only represent one
            shot in a much larger creative project.
          </p>

          <p>
            Longer videos can require recurring
            characters, consistent environments,
            multiple camera angles, music and editing.
          </p>

          <p>
            This turns AI video generation from a
            single generation task into a wider
            production workflow.
          </p>
        </div>
      </section>

      {/* CHARACTERS */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>Characters in generative AI video</h2>

          <p>
            Characters can become recurring elements
            across AI-generated scenes.
          </p>

          <p>
            Instead of designing every shot in
            isolation, creators can develop character
            ideas first and then use those characters
            as part of the wider visual project.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/ai-character-generator"
              className="blogSecondary"
            >
              AI Character Generator
            </Link>

            <Link
              to="/consistent-ai-generation"
              className="blogSecondary"
            >
              Consistent AI Generation
            </Link>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>A generative AI video workflow</h2>

          <div className="blogSteps">
            <article>
              <span>01</span>
              <h3>Develop the concept</h3>
              <p>
                Establish the idea, character,
                environment or story.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Create visual references</h3>
              <p>
                Develop characters and imagery that
                establish the look of the project.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Generate video shots</h3>
              <p>
                Create moving scenes from text,
                imagery and visual direction.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Edit the sequence</h3>
              <p>
                Combine generated shots, music and
                other elements into the final video.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CONSISTENCY */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>Consistency across AI-generated video</h2>

          <p>
            Creating multiple shots introduces a new
            challenge: making separate generations
            feel like they belong to the same project.
          </p>

          <p>
            Characters, clothing, environments,
            objects and visual style may need to
            remain recognisable from one scene to
            another.
          </p>

          <p>
            Consistency becomes increasingly important
            as AI video moves from isolated clips
            toward longer-form storytelling.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/consistent-ai-generation"
              className="blogSecondary"
            >
              Learn About Consistent AI Generation
            </Link>
          </div>
        </div>
      </section>

      {/* LOCAL */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>Local generative AI video</h2>

          <p>
            Generative video does not always have to
            be accessed exclusively through a remote
            web service.
          </p>

          <p>
            Supported AI generation workflows can run
            locally using your own computer, making
            generative video part of a local creative
            production environment.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/local-ai-video-generator"
              className="blogSecondary"
            >
              Local AI Video
            </Link>

            <Link
              to="/ai-video-for-pc"
              className="blogSecondary"
            >
              AI Video for PC
            </Link>
          </div>
        </div>
      </section>

      {/* DYOP */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>From generative AI to complete video creation</h2>

          <p>
            DYOP is designed around the wider process
            of creating AI-generated video.
          </p>

          <p>
            Characters, images, video and music can
            become parts of the same project before
            being brought together through editing.
          </p>

          <p>
            This creates a workflow that extends from
            the first generated idea through to a
            finished video.
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

      {/* FAQ */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>Generative AI video FAQ</h2>

          <div className="blogFaq">
            <article>
              <h3>What is generative AI video?</h3>
              <p>
                Generative AI video is moving visual
                content created or transformed using
                artificial intelligence models.
              </p>
            </article>

            <article>
              <h3>
                Can generative AI create video from text?
              </h3>
              <p>
                Yes. Text-to-video generation uses a
                written description as an input for
                creating moving imagery.
              </p>
            </article>

            <article>
              <h3>
                Can AI turn an image into a video?
              </h3>
              <p>
                Yes. Image-to-video generation uses an
                image as the visual starting point for
                generating movement.
              </p>
            </article>

            <article>
              <h3>
                Can AI video use recurring characters?
              </h3>
              <p>
                Characters can be developed as
                recurring elements across a larger
                generative video project.
              </p>
            </article>

            <article>
              <h3>
                Can generative AI video run locally?
              </h3>
              <p>
                Some generative AI workflows can run
                locally when supported models and
                appropriate hardware are available.
              </p>
            </article>

            <article>
              <h3>
                Can AI-generated clips become a full video?
              </h3>
              <p>
                Yes. Individual generated shots can be
                combined with other shots, music and
                editing to create a larger video
                project.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section className="blogFinal">
        <div className="blogSectionInner">
          <h2>Explore generative AI video</h2>

          <p>
            Create characters, imagery and moving
            scenes, then develop individual generations
            into complete video projects with DYOP.
          </p>

          <div className="blogActions">
            <Link
              to="/ai-video-generator"
              className="blogPrimary"
            >
              Create AI Video
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

    </main>
  );
}