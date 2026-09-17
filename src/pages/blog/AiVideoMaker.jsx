import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./BlogLanding.css";

export default function AiVideoMaker() {
  useEffect(() => {
    const title =
      "AI Video Maker | Create & Publish AI Videos with DYOP";

    const description =
      "Make AI-generated videos with DYOP. Turn ideas, text and images into video, develop your creation and publish it for others to discover.";

    const canonicalUrl =
      "https://www.dyop.ai/ai-video-maker";

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
            DYOP AI VIDEO MAKER
          </div>

          <h1>
            AI Video Maker
          </h1>

          <p className="blogLead">
            Turn your ideas into AI-generated video.
            Create shots, experiment with generative
            visuals and publish your finished videos
            for others to discover.
          </p>

          <div className="blogActions">
            <Link
              to="/generate"
              className="blogPrimary"
            >
              Make an AI Video
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
            Make videos with generative AI
          </h2>

          <p>
            AI video tools make it possible to create
            moving imagery from ideas that begin as text,
            images or other creative inputs.
          </p>

          <p>
            DYOP brings AI video creation together with
            a platform for publishing and discovering
            generative video, giving your finished work
            somewhere to go after you've created it.
          </p>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            How to make an AI video
          </h2>

          <div className="blogSteps">
            <article>
              <span>01</span>

              <h3>Start with an idea</h3>

              <p>
                Decide what you want to create. It might
                be a single visual idea, an animated shot,
                a short sequence or part of a larger story.
              </p>
            </article>

            <article>
              <span>02</span>

              <h3>Generate your shots</h3>

              <p>
                Turn text, images and creative direction
                into generated video and experiment with
                different versions of your idea.
              </p>
            </article>

            <article>
              <span>03</span>

              <h3>Build your video</h3>

              <p>
                Develop your generated material into the
                video you want to create by selecting and
                arranging the content that works.
              </p>
            </article>

            <article>
              <span>04</span>

              <h3>Publish your creation</h3>

              <p>
                Publish your finished video on DYOP and
                make it available for other viewers and
                creators to discover.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* WAYS TO START */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            Different ways to make AI video
          </h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>Text to Video</h3>

              <p>
                Describe the shot you want to create and
                use your written idea as the starting
                point for generated video.
              </p>

              <Link to="/text-to-video">
                Explore Text to Video →
              </Link>
            </article>

            <article>
              <h3>Image to Video</h3>

              <p>
                Begin with a still image and introduce
                movement to turn it into a generated
                video sequence.
              </p>

              <Link to="/image-to-video">
                Explore Image to Video →
              </Link>
            </article>

            <article>
              <h3>Experiment and Iterate</h3>

              <p>
                Generate different versions of an idea
                and explore alternative motion, framing
                and visual approaches.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* IDEAS */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            What can you make with AI video?
          </h2>

          <div className="blogFeatureGrid">
            <article>
              <h3>Short Films</h3>

              <p>
                Build visual stories from generated
                shots and sequences.
              </p>
            </article>

            <article>
              <h3>Animation</h3>

              <p>
                Experiment with animated characters,
                environments and imaginative worlds.
              </p>
            </article>

            <article>
              <h3>Cinematic Shots</h3>

              <p>
                Explore camera movement, environments,
                lighting and visual storytelling.
              </p>
            </article>

            <article>
              <h3>Concept Videos</h3>

              <p>
                Turn ideas and visual concepts into
                moving imagery before committing to a
                larger production.
              </p>
            </article>

            <article>
              <h3>Experimental Art</h3>

              <p>
                Explore unusual visual ideas and
                generative imagery without being limited
                by traditional production methods.
              </p>
            </article>

            <article>
              <h3>Short-Form Content</h3>

              <p>
                Make compact AI-generated videos designed
                around a single idea, moment or visual.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* PLATFORM */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            From AI video maker to video platform
          </h2>

          <p>
            Creating the video is only part of the
            process. DYOP also gives creators somewhere
            to publish their finished work.
          </p>

          <p>
            Public videos can be discovered by viewers,
            connected to creator channels and explored
            alongside other AI-generated content on the
            platform.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/watch-ai-videos"
              className="blogSecondary"
            >
              Watch AI Videos
            </Link>

            <Link
              to="/ai-video-community"
              className="blogSecondary"
            >
              AI Video Community
            </Link>
          </div>
        </div>
      </section>

      {/* GENERATOR VS MAKER */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            AI video generation is just the beginning
          </h2>

          <p>
            Generating a shot can be the first step in
            making an AI video. A finished creation may
            involve exploring multiple generations,
            selecting the material you like and developing
            those results into something worth sharing.
          </p>

          <p>
            If you're looking specifically for AI video
            generation, you can also explore DYOP's
            dedicated AI video generator page.
          </p>

          <div className="blogActions blogActionsLeft">
            <Link
              to="/ai-video-generator"
              className="blogSecondary"
            >
              AI Video Generator
            </Link>

            <Link
              to="/free-ai-video-generator"
              className="blogSecondary"
            >
              Free AI Video Generator
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="blogSection">
        <div className="blogSectionInner">
          <h2>
            AI video maker FAQ
          </h2>

          <div className="blogFaq">
            <article>
              <h3>
                What is an AI video maker?
              </h3>

              <p>
                An AI video maker uses generative AI as
                part of the process of creating video,
                allowing creators to develop moving
                imagery from inputs such as text and
                images.
              </p>
            </article>

            <article>
              <h3>
                Can I make AI videos from text?
              </h3>

              <p>
                Text-to-video workflows use written
                descriptions and prompts as the starting
                point for generating video.
              </p>
            </article>

            <article>
              <h3>
                Can I make a video from an image?
              </h3>

              <p>
                Image-to-video workflows use an existing
                still image as the visual starting point
                and generate movement over time.
              </p>
            </article>

            <article>
              <h3>
                Can I publish AI videos on DYOP?
              </h3>

              <p>
                Yes. DYOP combines AI video creation with
                a platform where creators can publish
                finished videos for viewers to discover.
              </p>
            </article>

            <article>
              <h3>
                Is DYOP free to use?
              </h3>

              <p>
                DYOP does not require a paid subscription
                to start using the platform.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="blogFinal">
        <div className="blogSectionInner">
          <h2>
            Make your next AI video
          </h2>

          <p>
            Start with an idea and turn it into something
            you can share.
          </p>

          <div className="blogActions">
            <Link
              to="/generate"
              className="blogPrimary"
            >
              Start Making
            </Link>

            <Link
              to="/free-ai-video-generator"
              className="blogSecondary"
            >
              Explore Free AI Video
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}