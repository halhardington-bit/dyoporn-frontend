import { Link } from "react-router-dom";
import { useEffect } from "react";

import castingScreenshot from "../../assets/screenshots/casting.png";
import storyScreenshot from "../../assets/screenshots/story.png";
import actionScreenshot from "../../assets/screenshots/action.png";
import musicScreenshot from "../../assets/screenshots/music.png";
import editScreenshot from "../../assets/screenshots/edit.png";

import "./BlogLanding.css";

export default function HowToMakeAiVideos() {
  useEffect(() => {
    const title =
      "How to Make AI Videos | Step-by-Step Guide | DYOP";

    const description =
      "Learn how to make AI videos step by step. Create characters, generate images, turn them into video, create music and edit everything into a finished AI video.";

    const canonicalUrl =
      "https://www.dyop.ai/how-to-make-ai-videos";

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
            AI VIDEO TUTORIAL
          </div>

          <h1>How to Make AI Videos</h1>

          <p className="blogLead">
            Making an AI video is more than generating
            a single clip. With DYOP, you can develop
            characters, create images, generate video,
            make music and edit everything together
            into a finished project.
          </p>

          <div className="blogActions">
            <Link
              to="/generate"
              className="blogPrimary"
            >
              Start Creating
            </Link>

            <Link
              to="/ai-video-generator"
              className="blogSecondary"
            >
              AI Video Generator
            </Link>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>The AI video creation process</h2>

          <p>
            A complete AI-generated video can be built
            in stages. Instead of asking AI for one
            finished movie, you create the different
            elements of the production and gradually
            assemble them into the final result.
          </p>

          <p>
            In DYOP, the basic workflow moves through
            five stages:
          </p>

          <div className="blogSteps">
            <article>
              <span>01</span>
              <h3>Character</h3>
              <p>
                Design the characters who will appear
                in your project.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Image</h3>
              <p>
                Create scenes and still images using
                your characters.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Video</h3>
              <p>
                Turn your imagery into moving
                AI-generated shots.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Music</h3>
              <p>
                Create music for the finished
                production.
              </p>
            </article>

            <article>
              <span>05</span>
              <h3>Editing</h3>
              <p>
                Assemble your shots, audio and music
                into the finished video.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* STEP 1 */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <div className="blogTutorialStep">
            <div className="blogTutorialNumber">
              STEP 1
            </div>

            <h2>Create your AI characters</h2>

            <p>
              Start by developing the characters who
              will appear throughout your video.
            </p>

            <p>
              DYOP's Casting Director lets you establish
              the character before creating the scenes
              they will appear in. You can define their
              visual style, identity, appearance and
              other characteristics, then save the
              finished character for use throughout
              your project.
            </p>

            <p>
              Creating the character first gives the
              rest of the production a visual starting
              point. Instead of inventing a completely
              new subject for every shot, you have an
              established character to build around.
            </p>

            <div className="blogScreenshot">
              <img
                src={castingScreenshot}
                alt="DYOP Casting Director used to create an AI character"
                loading="lazy"
              />
            </div>

            <div className="blogActions blogActionsLeft">
              <Link
                to="/ai-character-generator"
                className="blogSecondary"
              >
                Learn About AI Characters
              </Link>

              <Link
                to="/consistent-ai-generation"
                className="blogSecondary"
              >
                Consistent AI Generation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STEP 2 */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <div className="blogTutorialStep">
            <div className="blogTutorialNumber">
              STEP 2
            </div>

            <h2>Create images and scenes</h2>

            <p>
              Once your characters are established,
              the next stage is creating the images
              that define the scenes of your video.
            </p>

            <p>
              DYOP's Story Director is where you can
              develop those visual moments. A character
              can be placed into different scenes while
              you establish the style, camera,
              action, lighting and mood of the image.
            </p>

            <p>
              These images become more than standalone
              artwork. They can act as the visual
              foundation for the moving shots you'll
              create in the next stage.
            </p>

            <div className="blogScreenshot">
              <img
                src={storyScreenshot}
                alt="DYOP Story Director used to create an AI image and scene"
                loading="lazy"
              />
            </div>

            <div className="blogActions blogActionsLeft">
              <Link
                to="/image-to-video"
                className="blogSecondary"
              >
                Learn About Image to Video
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STEP 3 */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <div className="blogTutorialStep">
            <div className="blogTutorialNumber">
              STEP 3
            </div>

            <h2>Turn your images into AI video</h2>

            <p>
              With the visual starting point created,
              the next step is turning your still
              imagery into moving video.
            </p>

            <p>
              In DYOP's Action Director, your starting
              media becomes the basis of the generated
              shot. You can describe the action and
              movement you want to happen as the scene
              develops.
            </p>

            <p>
              Rather than trying to create the entire
              finished film in one generation, you can
              build the project shot by shot. Each
              generated video becomes another piece
              of the final sequence.
            </p>

            <div className="blogScreenshot">
              <img
                src={actionScreenshot}
                alt="DYOP Action Director generating AI video from an image"
                loading="lazy"
              />
            </div>

            <div className="blogActions blogActionsLeft">
              <Link
                to="/image-to-video"
                className="blogSecondary"
              >
                Image to Video
              </Link>

              <Link
                to="/generative-ai-video"
                className="blogSecondary"
              >
                Generative AI Video
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STEP 4 */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <div className="blogTutorialStep">
            <div className="blogTutorialNumber">
              STEP 4
            </div>

            <h2>Create music for your AI video</h2>

            <p>
              Once your visual sequence begins taking
              shape, music can establish the tone and
              atmosphere of the finished video.
            </p>

            <p>
              DYOP's Music Director provides a dedicated
              stage for creating music for the project.
              You can develop the musical direction
              alongside the visual work rather than
              treating the soundtrack as a completely
              separate production.
            </p>

            <p>
              The resulting music can then become part
              of the final edit alongside your
              generated video and other audio.
            </p>

            <div className="blogScreenshot">
              <img
                src={musicScreenshot}
                alt="DYOP Music Director used to generate music for an AI video"
                loading="lazy"
              />
            </div>

            <div className="blogActions blogActionsLeft">
              <Link
                to="/ai-music-video-generator"
                className="blogSecondary"
              >
                AI Music Video Creation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STEP 5 */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <div className="blogTutorialStep">
            <div className="blogTutorialNumber">
              STEP 5
            </div>

            <h2>Edit your AI video</h2>

            <p>
              Generation creates the pieces. Editing
              turns those pieces into a finished video.
            </p>

            <p>
              DYOP's Movie Director brings your
              generated material together into a
              timeline where the structure of the
              finished project takes shape.
            </p>

            <p>
              Video shots, audio and music can be
              arranged into a complete sequence,
              allowing the individual generations
              created throughout the workflow to
              become one finished production.
            </p>

            <div className="blogScreenshot">
              <img
                src={editScreenshot}
                alt="DYOP Movie Director editing AI-generated video, audio and music"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* COMPLETE WORKFLOW */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            From an idea to a finished AI video
          </h2>

          <p>
            The important difference between generating
            an AI clip and making an AI video is the
            workflow around the generation.
          </p>

          <p>
            A character becomes part of an image. That
            image becomes the foundation for a moving
            shot. Multiple shots become a sequence.
            Music adds another layer to the production.
            Editing brings everything together.
          </p>

          <p>
            That creates a simple production pipeline:
          </p>

          <div className="blogWorkflowChain">
            <span>Character</span>
            <b>→</b>
            <span>Image</span>
            <b>→</b>
            <span>Video</span>
            <b>→</b>
            <span>Music</span>
            <b>→</b>
            <span>Editing</span>
          </div>
        </div>
      </section>

      {/* WHY WORKFLOW */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Why create AI video in stages?
          </h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>Develop Characters First</h3>

              <p>
                Establish who appears in your project
                before building scenes around them.
              </p>
            </article>

            <article>
              <h3>Build Visual References</h3>

              <p>
                Create imagery that establishes how
                each scene should look before
                generating movement.
              </p>
            </article>

            <article>
              <h3>Create Shot by Shot</h3>

              <p>
                Treat generated video as individual
                shots that can become parts of a
                larger sequence.
              </p>
            </article>

            <article>
              <h3>Add Music</h3>

              <p>
                Develop the soundtrack as another
                creative element of the project.
              </p>
            </article>

            <article>
              <h3>Edit the Story</h3>

              <p>
                Decide how your generated material
                fits together in the finished video.
              </p>
            </article>

            <article>
              <h3>Build Larger Projects</h3>

              <p>
                Move beyond isolated AI clips and
                develop complete video productions.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ALL IN ONE */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Make an AI video in one creative environment
          </h2>

          <p>
            One challenge with AI video creation is
            that each stage can require a different
            tool.
          </p>

          <p>
            Character creation, image generation,
            video generation, music and editing can
            quickly become a workflow spread across
            several applications and services.
          </p>

          <p>
            DYOP brings those stages together so the
            complete AI video production can develop
            inside one wider creative environment.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/all-in-one-ai-generator"
              className="blogSecondary"
            >
              All-in-One AI Generator
            </Link>

            <Link
              to="/ai-creative-suite"
              className="blogSecondary"
            >
              AI Creative Suite
            </Link>
          </div>
        </div>
      </section>

      {/* LOCAL */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Make AI videos on your own computer
          </h2>

          <p>
            DYOP is downloadable software built around
            supported local AI generation workflows.
          </p>

          <p>
            This means your computer can become part
            of the generation pipeline while DYOP
            provides the wider environment for
            developing the project.
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
              Local AI Video Generator
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            How to make AI videos FAQ
          </h2>

          <div className="blogFaq">
            <article>
              <h3>
                How do you make an AI video?
              </h3>

              <p>
                One workflow is to create your
                characters first, generate images for
                your scenes, turn those images into
                video, create music and finally edit
                the generated material into a finished
                sequence.
              </p>
            </article>

            <article>
              <h3>
                Can I create a character before making
                an AI video?
              </h3>

              <p>
                Yes. Establishing characters before
                generating scenes gives the project a
                visual starting point for later images
                and video.
              </p>
            </article>

            <article>
              <h3>
                Can I turn AI images into video?
              </h3>

              <p>
                Yes. Image-to-video generation uses
                still imagery as the visual starting
                point for creating moving shots.
              </p>
            </article>

            <article>
              <h3>
                Can AI create music for a video?
              </h3>

              <p>
                Yes. Music can be generated as part of
                the production and then incorporated
                into the final edit.
              </p>
            </article>

            <article>
              <h3>
                Do AI-generated videos still need editing?
              </h3>

              <p>
                Editing allows separate generated
                shots, audio and music to be structured
                into a complete finished video.
              </p>
            </article>

            <article>
              <h3>
                Can I make the whole AI video in DYOP?
              </h3>

              <p>
                DYOP brings character creation, image
                generation, video generation, music
                and editing into the same wider
                production workflow.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section className="blogFinal">
        <div className="blogSectionInner">
          <h2>
            Make your first AI video
          </h2>

          <p>
            Create the character. Build the scene.
            Generate the video. Make the music.
            Edit the finished project.
          </p>

          <div className="blogActions">
            <Link
              to="/generate"
              className="blogPrimary"
            >
              Start Creating with DYOP
            </Link>

            <Link
              to="/free-ai-tools"
              className="blogSecondary"
            >
              Explore Free AI Tools
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}