import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./BlogLanding.css";

export default function AiCreativeSuite() {
  useEffect(() => {
    const title =
      "AI Creative Suite | Images, Video, Characters & Music | DYOP";

    const description =
      "Create characters, images, video and music with DYOP, an AI creative suite that brings generative tools and video editing together in one downloadable application.";

    const canonicalUrl =
      "https://www.dyop.ai/ai-creative-suite";

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
            GENERATIVE CREATIVE SOFTWARE
          </div>

          <h1>AI Creative Suite</h1>

          <p className="blogLead">
            Create characters, images, video and music,
            then edit everything together. DYOP brings
            generative AI tools into one free
            downloadable creative environment.
          </p>

          <div className="blogActions">
            <Link to="/generate" className="blogPrimary">
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
          <h2>A creative suite built around generative AI</h2>

          <p>
            Traditional creative suites bring multiple
            production tools together so artists can
            move between different stages of a project.
          </p>

          <p>
            Generative AI introduces new stages to that
            process: character generation, image
            creation, video generation, animation and
            AI-generated music.
          </p>

          <p>
            DYOP brings those capabilities into a wider
            environment designed around creating
            complete AI video projects.
          </p>
        </div>
      </section>

      {/* SUITE */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>What's inside an AI creative suite?</h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>Character Creation</h3>
              <p>
                Develop original characters for
                stories, animation and video.
              </p>
              <Link to="/ai-character-generator">
                AI Character Generator →
              </Link>
            </article>

            <article>
              <h3>Image Generation</h3>
              <p>
                Create artwork, environments,
                characters and visual concepts.
              </p>
            </article>

            <article>
              <h3>Video Generation</h3>
              <p>
                Turn ideas and visual references into
                moving shots and sequences.
              </p>
              <Link to="/ai-video-generator">
                AI Video Generator →
              </Link>
            </article>

            <article>
              <h3>Animation</h3>
              <p>
                Bring characters, artwork and
                imaginative scenes into motion.
              </p>
              <Link to="/ai-animation-generator">
                AI Animation Generator →
              </Link>
            </article>

            <article>
              <h3>Music Generation</h3>
              <p>
                Create music as another part of the
                wider video production process.
              </p>
            </article>

            <article>
              <h3>Video Editing</h3>
              <p>
                Bring generated material together and
                develop it into a finished project.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* WHY SUITE */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>Why combine AI tools into one creative suite?</h2>

          <p>
            Creative projects rarely consist of only
            one type of media.
          </p>

          <p>
            A video might begin with character
            development and visual concepts before
            moving into image generation, animation,
            video, music and editing.
          </p>

          <p>
            Bringing these stages into one wider
            creative environment reduces the need to
            treat every generation as an unrelated
            task.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/all-in-one-ai-generator"
              className="blogSecondary"
            >
              All-in-One AI Generator
            </Link>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>One workflow from concept to video</h2>

          <div className="blogSteps">
            <article>
              <span>01</span>
              <h3>Concept</h3>
              <p>
                Begin with your story, character,
                visual direction or creative idea.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Create</h3>
              <p>
                Generate characters, artwork and
                environments for the project.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Generate</h3>
              <p>
                Develop your visual material into
                video, animation and music.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Edit</h3>
              <p>
                Bring the different elements together
                into a finished video.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* MULTIMEDIA */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>Create across different forms of media</h2>

          <p>
            Generative AI makes it possible for one
            project to move between different types
            of media.
          </p>

          <p>
            A character concept can become an image.
            An image can become a moving shot.
            Multiple shots can become an edited
            sequence. Music can then become part of
            the finished experience.
          </p>

          <p>
            DYOP is designed around connecting those
            creative stages rather than limiting the
            workflow to a single generator.
          </p>
        </div>
      </section>

      {/* CONSISTENCY */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>Build connected characters and worlds</h2>

          <p>
            Larger projects need more than isolated
            generations.
          </p>

          <p>
            Characters may return across scenes.
            Locations may need to remain recognisable.
            Visual style can help separate shots feel
            like parts of the same world.
          </p>

          <p>
            A wider creative suite gives these
            individual elements somewhere to become
            parts of the same project.
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
          <h2>A local AI creative environment</h2>

          <p>
            DYOP is downloadable software built around
            supported local AI generation workflows.
          </p>

          <p>
            Your computer can become part of the
            creative pipeline rather than requiring
            every generation task to happen through
            separate remote services.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/ai-video-for-pc"
              className="blogSecondary"
            >
              AI Video for PC
            </Link>

            <Link
              to="/local-ai-video-generator"
              className="blogSecondary"
            >
              Local AI Video
            </Link>
          </div>
        </div>
      </section>

      {/* FREE */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>A free AI creative suite</h2>

          <p>
            DYOP does not require a paid subscription
            to use the application.
          </p>

          <p>
            Creators can explore generative AI across
            characters, imagery, video and music while
            developing those creations through the
            wider DYOP workflow.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/free-ai-tools"
              className="blogSecondary"
            >
              Free AI Tools
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

      {/* PROJECTS */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>What can you make with an AI creative suite?</h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>AI Films</h3>
              <p>
                Develop characters, environments,
                shots, music and edited sequences.
              </p>
            </article>

            <article>
              <h3>Animation</h3>
              <p>
                Build animated characters, worlds and
                visual stories.
              </p>
            </article>

            <article>
              <h3>Music Videos</h3>
              <p>
                Combine generated visuals, video and
                music into complete projects.
              </p>
              <Link to="/ai-music-video-generator">
                AI Music Video Generator →
              </Link>
            </article>

            <article>
              <h3>Visual Development</h3>
              <p>
                Explore characters, locations and
                creative directions before generating
                finished shots.
              </p>
            </article>

            <article>
              <h3>Online Content</h3>
              <p>
                Create visual content and develop it
                into videos ready to publish.
              </p>
            </article>

            <article>
              <h3>Experimental Art</h3>
              <p>
                Combine different forms of generative
                media into new creative projects.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* PUBLISH */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>From creative suite to publishing platform</h2>

          <p>
            DYOP connects the creation process with
            an online platform for AI-generated video.
          </p>

          <p>
            Once a project is finished, videos can be
            published for viewers to watch and
            discover.
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
          <h2>AI creative suite FAQ</h2>

          <div className="blogFaq">
            <article>
              <h3>What is an AI creative suite?</h3>
              <p>
                An AI creative suite combines multiple
                generative creation workflows within
                a wider environment for developing
                creative projects.
              </p>
            </article>

            <article>
              <h3>
                Can an AI creative suite create images
                and video?
              </h3>
              <p>
                DYOP brings image and video generation
                into the same wider creative workflow.
              </p>
            </article>

            <article>
              <h3>Can I create AI characters?</h3>
              <p>
                Yes. Character generation can be part
                of the wider DYOP creation process.
              </p>
            </article>

            <article>
              <h3>Can I generate music?</h3>
              <p>
                Yes. DYOP includes music generation
                within its wider creative environment.
              </p>
            </article>

            <article>
              <h3>Can I edit AI-generated video?</h3>
              <p>
                Yes. Editing is part of DYOP's
                end-to-end video creation workflow.
              </p>
            </article>

            <article>
              <h3>Can AI generation run locally?</h3>
              <p>
                Supported DYOP generation workflows
                can use your own computer for
                processing.
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
          <h2>One creative environment for generative AI</h2>

          <p>
            Create characters, images, video and music,
            then edit everything together with DYOP.
          </p>

          <div className="blogActions">
            <Link to="/generate" className="blogPrimary">
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

    </main>
  );
}