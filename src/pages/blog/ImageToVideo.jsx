import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./BlogLanding.css";

export default function ImageToVideo() {
  useEffect(() => {
    const title =
      "Image to Video AI | Turn Images into Videos with DYOP";

    const description =
      "Turn images into AI-generated videos with DYOP. Animate still images, add movement and create video from your artwork, photos or AI images.";

    const canonicalUrl =
      "https://www.dyop.ai/image-to-video";

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
            DYOP IMAGE TO VIDEO
          </div>

          <h1>
            Turn Images into AI Video
          </h1>

          <p className="blogLead">
            Bring still images to life with AI. Start with
            an image, introduce movement and transform it
            into a video you can publish and share.
          </p>

          <div className="blogActions">
            <Link
              to="/generate"
              className="blogPrimary"
            >
              Animate an Image
            </Link>

            <Link
              to="/"
              className="blogSecondary"
            >
              Explore AI Videos
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            What is image-to-video AI?
          </h2>

          <p>
            Image-to-video AI transforms a still image
            into moving video. The source image provides
            the visual starting point while the AI model
            generates movement over time.
          </p>

          <p>
            This makes it possible to animate artwork,
            photographs, AI-generated images, characters,
            environments and other still imagery without
            creating every frame manually.
          </p>
        </div>
      </section>

      {/* STEPS */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            How to turn an image into a video
          </h2>

          <div className="blogSteps">
            <article>
              <span>01</span>

              <h3>Choose your image</h3>

              <p>
                Start with the image you want to animate.
                This becomes the visual foundation of your
                generated video.
              </p>
            </article>

            <article>
              <span>02</span>

              <h3>Describe the movement</h3>

              <p>
                Tell the AI what should happen. Describe
                subject movement, environmental motion or
                how you want the camera to behave.
              </p>
            </article>

            <article>
              <span>03</span>

              <h3>Generate the video</h3>

              <p>
                Generate your shot and experiment with
                different motion instructions to explore
                variations of the original image.
              </p>
            </article>

            <article>
              <span>04</span>

              <h3>Publish your creation</h3>

              <p>
                Publish the finished video on DYOP and
                share it with viewers and other AI
                creators.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* WHAT CAN BE ANIMATED */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            What can you animate with image-to-video AI?
          </h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>AI Images</h3>

              <p>
                Take an image you've already generated and
                turn it into a moving shot.
              </p>
            </article>

            <article>
              <h3>Artwork</h3>

              <p>
                Introduce movement to illustrations,
                concept art and other digital artwork.
              </p>
            </article>

            <article>
              <h3>Characters</h3>

              <p>
                Add movement to characters while using the
                original image as the visual reference.
              </p>
            </article>

            <article>
              <h3>Environments</h3>

              <p>
                Bring landscapes and environments to life
                through atmospheric and environmental
                motion.
              </p>
            </article>

            <article>
              <h3>Photography</h3>

              <p>
                Use a photograph as the starting point for
                a newly generated moving sequence.
              </p>
            </article>

            <article>
              <h3>Concept Frames</h3>

              <p>
                Turn a designed keyframe or visual concept
                into a moving shot.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* MOTION */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Describe how your image should move
          </h2>

          <p>
            The source image establishes what the scene
            looks like. Your instructions can then help
            communicate what should change during the
            generated shot.
          </p>

          <div className="blogPromptExample">
            <div className="blogPromptLabel">
              Example motion prompt
            </div>

            <p>
              The character slowly turns toward the
              camera as wind moves through their hair and
              clothing. Clouds drift across the background.
              Slow cinematic camera push forward.
            </p>
          </div>
        </div>
      </section>

      {/* TIPS */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Tips for image-to-video prompts
          </h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>Describe motion</h3>

              <p>
                Focus your instructions on what should
                change rather than repeatedly describing
                what is already visible in the image.
              </p>
            </article>

            <article>
              <h3>Direct the camera</h3>

              <p>
                Camera instructions can communicate
                movement such as a push-in, pan, orbit or
                tracking shot.
              </p>
            </article>

            <article>
              <h3>Consider the environment</h3>

              <p>
                Movement doesn't have to come only from
                the subject. Wind, water, clouds, smoke and
                lighting can give a scene life.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Image-to-video AI FAQ
          </h2>

          <div className="blogFaq">
            <article>
              <h3>
                What is the difference between
                image-to-video and text-to-video?
              </h3>

              <p>
                Text-to-video begins primarily from a
                written description. Image-to-video uses
                an existing image as the visual starting
                point for the generated sequence.
              </p>
            </article>

            <article>
              <h3>
                Can AI-generated images be turned into
                videos?
              </h3>

              <p>
                Yes. An AI-generated still image can be
                used as the source image for an
                image-to-video generation.
              </p>
            </article>

            <article>
              <h3>
                Can I control camera movement?
              </h3>

              <p>
                Depending on the generation model, motion
                instructions can be used to communicate
                desired camera behaviour alongside subject
                and environmental movement.
              </p>
            </article>

            <article>
              <h3>
                Can I publish the result on DYOP?
              </h3>

              <p>
                Yes. Finished AI-generated videos can be
                published on DYOP for viewers to discover.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="blogFinal">
        <div className="blogSectionInner">
          <h2>
            Bring your image to life
          </h2>

          <p>
            Start with a still image and turn it into
            something that moves.
          </p>

          <Link
            to="/generate"
            className="blogPrimary"
          >
            Animate an Image
          </Link>
        </div>
      </section>

    </main>
  );
}