import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./BlogLanding.css";

export default function TextToVideo() {
  useEffect(() => {
    const title =
      "Text to Video AI | Create Videos from Text with DYOP";

    const description =
      "Create AI videos from text with DYOP. Describe a scene, turn your prompt into video, and publish your AI-generated creation.";

    const canonicalUrl =
      "https://www.dyop.ai/text-to-video";

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
    <main className="textVideoLanding">

      {/* HERO */}
      <section className="textVideoHero">
        <div className="textVideoHeroInner">
          <div className="textVideoEyebrow">
            DYOP TEXT TO VIDEO
          </div>

          <h1>
            Turn Text into AI Video
          </h1>

          <p className="textVideoLead">
            Describe what you want to see and transform
            your idea into AI-generated video. Create,
            publish and share your videos with DYOP.
          </p>

          <div className="textVideoActions">
            <Link
              to="/generate"
              className="textVideoPrimary"
            >
              Create from Text
            </Link>

            <Link
              to="/"
              className="textVideoSecondary"
            >
              Explore AI Videos
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT IS TEXT TO VIDEO */}
      <section className="textVideoSection">
        <div className="textVideoSectionInner">
          <h2>
            What is text-to-video AI?
          </h2>

          <p>
            Text-to-video AI creates video from a written
            description. You provide a prompt describing
            the subject, environment, action, camera or
            visual style you want, and an AI video model
            interprets those instructions to generate
            moving imagery.
          </p>

          <p>
            A prompt can be simple, such as describing a
            character walking through a forest, or much
            more detailed with instructions for lighting,
            cinematography, movement and atmosphere.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="textVideoSection">
        <div className="textVideoSectionInner">
          <h2>
            How to create a video from text
          </h2>

          <div className="textVideoSteps">
            <article>
              <span>01</span>

              <h3>Describe your scene</h3>

              <p>
                Write what you want to see. Include the
                subject, location and action that should
                happen in the shot.
              </p>
            </article>

            <article>
              <span>02</span>

              <h3>Add visual direction</h3>

              <p>
                Refine your prompt with details such as
                lighting, atmosphere, camera movement and
                visual style.
              </p>
            </article>

            <article>
              <span>03</span>

              <h3>Generate your video</h3>

              <p>
                Use your prompt to generate the shot and
                experiment with different descriptions
                until you get the result you want.
              </p>
            </article>

            <article>
              <span>04</span>

              <h3>Publish on DYOP</h3>

              <p>
                Publish your finished creation and make it
                discoverable to viewers and other AI
                creators.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* PROMPT EXAMPLE */}
      <section className="textVideoSection">
        <div className="textVideoSectionInner">
          <h2>
            What does a text-to-video prompt look like?
          </h2>

          <p>
            A useful prompt clearly communicates what is
            happening in the shot while giving the model
            enough visual information to interpret your
            idea.
          </p>

          <div className="textVideoPromptExample">
            <div className="textVideoPromptLabel">
              Example prompt
            </div>

            <p>
              A lone astronaut walks through a field of
              tall red grass on an alien planet at sunset.
              Two enormous moons hang above the horizon.
              Slow cinematic tracking shot, soft golden
              light, atmospheric haze.
            </p>
          </div>
        </div>
      </section>

      {/* PROMPT BUILDING */}
      <section className="textVideoSection">
        <div className="textVideoSectionInner">
          <h2>
            What should you include in an AI video prompt?
          </h2>

          <div className="textVideoFeatureGrid">
            <article>
              <h3>Subject</h3>
              <p>
                Describe the person, creature, object or
                environment at the centre of the shot.
              </p>
            </article>

            <article>
              <h3>Action</h3>
              <p>
                Explain what is moving or happening during
                the video.
              </p>
            </article>

            <article>
              <h3>Environment</h3>
              <p>
                Establish where the scene takes place and
                what surrounds the subject.
              </p>
            </article>

            <article>
              <h3>Camera</h3>
              <p>
                Describe framing or movement such as a
                close-up, tracking shot or slow push-in.
              </p>
            </article>

            <article>
              <h3>Lighting</h3>
              <p>
                Specify qualities such as daylight,
                moonlight, neon lighting or dramatic
                shadows.
              </p>
            </article>

            <article>
              <h3>Style</h3>
              <p>
                Describe the overall visual treatment or
                aesthetic you want the generation to have.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="textVideoSection">
        <div className="textVideoSectionInner">
          <h2>
            Text-to-video AI FAQ
          </h2>

          <div className="textVideoFaq">
            <article>
              <h3>
                How detailed should my text-to-video
                prompt be?
              </h3>

              <p>
                Start with the important visual information
                and add detail where it helps communicate
                your intent. Longer prompts are not
                automatically better; clarity is more
                useful than unnecessary description.
              </p>
            </article>

            <article>
              <h3>
                Can I create cinematic AI videos from
                text?
              </h3>

              <p>
                Prompts can include cinematography
                instructions such as framing, camera
                movement, lighting and atmosphere to help
                communicate the type of shot you want.
              </p>
            </article>

            <article>
              <h3>
                Can I publish text-to-video creations on
                DYOP?
              </h3>

              <p>
                Yes. DYOP combines AI creation with a video
                platform where generated work can be
                published and discovered.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="textVideoFinal">
        <div className="textVideoSectionInner">
          <h2>
            Turn your next idea into video
          </h2>

          <p>
            Start with a description and see where it
            takes you.
          </p>

          <Link
            to="/generate"
            className="textVideoPrimary"
          >
            Create from Text
          </Link>
        </div>
      </section>

    </main>
  );
}