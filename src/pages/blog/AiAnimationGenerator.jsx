import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./BlogLanding.css";

export default function AiAnimationGenerator() {
  useEffect(() => {
    const title =
      "AI Animation Generator | Create AI Animated Videos | DYOP";

    const description =
      "Create AI-generated animation with DYOP. Animate characters, artwork, images and imaginative scenes, then publish your animated videos.";

    const canonicalUrl =
      "https://www.dyop.ai/ai-animation-generator";

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
            AI ANIMATION
          </div>

          <h1>
            AI Animation Generator
          </h1>

          <p className="blogLead">
            Create animated video with generative AI.
            Bring characters, artwork, environments and
            imaginative ideas to life, then publish your
            finished creations on DYOP.
          </p>

          <div className="blogActions">
            <Link
              to="/generate"
              className="blogPrimary"
            >
              Create AI Animation
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

      {/* INTRO */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Create animation with AI
          </h2>

          <p>
            Generative AI offers a new way to experiment
            with animation. Instead of manually creating
            every frame, creators can begin with an idea,
            written description or still image and use AI
            to generate movement.
          </p>

          <p>
            This can make it possible to quickly explore
            animated characters, environments, visual
            concepts and sequences before developing them
            further.
          </p>
        </div>
      </section>

      {/* TYPES */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            What can you animate with AI?
          </h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>Characters</h3>

              <p>
                Bring characters to life with generated
                movement, actions and performances.
              </p>
            </article>

            <article>
              <h3>Artwork</h3>

              <p>
                Transform illustrations and digital
                artwork into moving sequences.
              </p>
            </article>

            <article>
              <h3>AI Images</h3>

              <p>
                Take an image you've already generated
                and explore how it might move.
              </p>
            </article>

            <article>
              <h3>Environments</h3>

              <p>
                Add atmospheric movement to landscapes,
                fantasy worlds and imagined locations.
              </p>
            </article>

            <article>
              <h3>Creatures</h3>

              <p>
                Experiment with animated creatures and
                characters that would be difficult to
                create using traditional production.
              </p>
            </article>

            <article>
              <h3>Concept Art</h3>

              <p>
                Turn visual development and concept
                frames into moving ideas.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            How to create AI animation
          </h2>

          <div className="blogSteps">
            <article>
              <span>01</span>

              <h3>Choose your idea</h3>

              <p>
                Start with the character, environment,
                artwork or scene you want to animate.
              </p>
            </article>

            <article>
              <span>02</span>

              <h3>Create your starting point</h3>

              <p>
                Begin from a written description or use
                an existing image as the visual foundation
                for your animation.
              </p>
            </article>

            <article>
              <span>03</span>

              <h3>Generate movement</h3>

              <p>
                Describe the action, camera behaviour or
                environmental motion you want to see in
                the generated shot.
              </p>
            </article>

            <article>
              <span>04</span>

              <h3>Publish your animation</h3>

              <p>
                Publish your finished video on DYOP and
                share your creation with other viewers.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* TEXT OR IMAGE */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Create animation from text or images
          </h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>Text to Animation</h3>

              <p>
                Begin by describing the animated scene
                you want to create, including the subject,
                action, environment and visual direction.
              </p>

              <Link to="/text-to-video">
                Explore Text to Video →
              </Link>
            </article>

            <article>
              <h3>Image to Animation</h3>

              <p>
                Start with artwork, photography or an
                AI-generated image and use it as the
                visual foundation for movement.
              </p>

              <Link to="/image-to-video">
                Explore Image to Video →
              </Link>
            </article>

            <article>
              <h3>Combine Both</h3>

              <p>
                Use an image to establish the appearance
                of your shot while written direction
                describes how the scene should move.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* IMAGE ANIMATION */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Turn still artwork into moving video
          </h2>

          <p>
            Image-to-video generation is particularly
            useful for animation because much of the
            visual design can already exist before
            movement is introduced.
          </p>

          <p>
            A character illustration, environment,
            concept frame or AI-generated image can
            provide the starting appearance while your
            instructions describe what should happen
            during the shot.
          </p>

          <div className="blogPromptExample">
            <div className="blogPromptLabel">
              Example motion
            </div>

            <p>
              The character slowly turns toward the
              camera as their coat moves gently in the
              wind. Leaves drift through the background
              while the camera gradually pushes closer.
            </p>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Ideas for AI-generated animation
          </h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>Animated Shorts</h3>

              <p>
                Create individual animated shots and
                develop them into short visual stories.
              </p>
            </article>

            <article>
              <h3>Fantasy Worlds</h3>

              <p>
                Bring imaginative environments,
                characters and creatures into motion.
              </p>
            </article>

            <article>
              <h3>Science Fiction</h3>

              <p>
                Experiment with futuristic worlds,
                spacecraft, alien landscapes and other
                speculative ideas.
              </p>
            </article>

            <article>
              <h3>Music Visuals</h3>

              <p>
                Create animated imagery and visual
                sequences to accompany music and audio.
              </p>
            </article>

            <article>
              <h3>Story Concepts</h3>

              <p>
                Explore what characters and scenes might
                look like in motion before developing a
                larger project.
              </p>
            </article>

            <article>
              <h3>Experimental Animation</h3>

              <p>
                Explore unusual movement, imagery and
                visual ideas made possible by generative
                tools.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* PLATFORM */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Create, publish and discover AI animation
          </h2>

          <p>
            DYOP combines generative video creation with
            a platform for publishing the finished result.
          </p>

          <p>
            Once you've created an animation, you can
            publish it to your channel and make it
            discoverable alongside work from other
            AI video creators.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/ai-video-maker"
              className="blogSecondary"
            >
              AI Video Maker
            </Link>

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
            AI animation generator FAQ
          </h2>

          <div className="blogFaq">
            <article>
              <h3>
                What is an AI animation generator?
              </h3>

              <p>
                An AI animation generator uses generative
                AI to create moving imagery from inputs
                such as text descriptions and still
                images.
              </p>
            </article>

            <article>
              <h3>
                Can I animate an image with AI?
              </h3>

              <p>
                Yes. Image-to-video generation can use
                a still image as the starting point for
                generating movement over time.
              </p>
            </article>

            <article>
              <h3>
                Can I create animated characters?
              </h3>

              <p>
                Characters can be used as subjects in
                generated video, with prompts describing
                the movement or action you want to create.
              </p>
            </article>

            <article>
              <h3>
                Can I create animation from text?
              </h3>

              <p>
                Text-to-video workflows can begin with a
                written description of the animated scene
                and action you want to generate.
              </p>
            </article>

            <article>
              <h3>
                Can I publish AI animation on DYOP?
              </h3>

              <p>
                Yes. DYOP allows creators to publish
                finished AI-generated videos for other
                viewers to discover.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="blogFinal">
        <div className="blogSectionInner">
          <h2>
            Bring your ideas to life
          </h2>

          <p>
            Start creating animated video with
            generative AI.
          </p>

          <div className="blogActions">
            <Link
              to="/generate"
              className="blogPrimary"
            >
              Create AI Animation
            </Link>

            <Link
              to="/free-ai-video-generator"
              className="blogSecondary"
            >
              Create for Free
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}