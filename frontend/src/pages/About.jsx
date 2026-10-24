import "../styles/about.css";
import "../styles/reveal.css";
import { useInView } from "../utils/useInView";

// Text from the original About design image, now real text so it reads
// well on any screen size.
export default function About() {

  // three groups animate separately, so each plays when it's actually on screen
  const [introRef, introVisible] = useInView({ threshold: 0.1 });
  const [textRef, textVisible] = useInView({ threshold: 0.15 });
  const [signRef, signVisible] = useInView({ threshold: 0.6 });

  const group = (visible) => `reveal-group ${visible ? "is-visible" : ""}`;

  return (
    <div className="about-page">

      <section className="about-story">

        <header ref={introRef} className={`about-heading ${group(introVisible)}`}>
          <span className="about-kicker reveal-item">Founder story</span>
          <div className="about-title-row">
            <h1 className="reveal-item" style={{ "--reveal-order": 1 }}>The story behind</h1>
            <img
              src="/logo.png"
              alt="PREP — from pantry to plate"
              className="about-logo reveal-item"
              style={{ "--reveal-order": 2 }}
            />
          </div>
        </header>

        <figure className={`about-photo ${group(introVisible)}`}>
          <img
            src="/about/founder.webp"
            alt="Chaithra Hegde, founder of PREP, smiling in a kitchen"
            width="900"
            height="1200"
          />
        </figure>

        <div ref={textRef} className={`about-text ${group(textVisible)}`}>
          <h2 className="reveal-item">Why I created it?</h2>

          <p className="reveal-item" style={{ "--reveal-order": 1 }}>Food is a daily part of life, yet planning it often feels chaotic.</p>

          <p className="reveal-item" style={{ "--reveal-order": 2 }}>
            Between deciding what to cook, organizing groceries, and keeping track of recipes,
            the small decisions around food can quickly become overwhelming. I often found
            myself repeating the same cycle every week — thinking about meals, forgetting
            ingredients, and trying to stay organized.
          </p>

          <p className="reveal-item" style={{ "--reveal-order": 3 }}>PREP was created to bring structure to that process.</p>

          <p className="reveal-item" style={{ "--reveal-order": 4 }}>
            It started as a small personal system to simplify everyday food planning.
            Over time, that system evolved into something bigger — a tool designed to help
            others organize meals, recipes, and groceries with more clarity and less effort.
          </p>

          <p className="reveal-item" style={{ "--reveal-order": 5 }}>
            The goal has always remained the same — making food routines feel structured,
            calm, and sustainable.
          </p>

          <p className="reveal-item about-quote" style={{ "--reveal-order": 6 }}>Small systems create lasting habits.</p>

          <div ref={signRef} className={`about-signoff ${signVisible ? "is-signing" : ""}`}>
            <img src="/about/signature.webp" alt="" className="about-signature" />
            <p className="about-name">Chaithra Hegde</p>
            <p className="about-role">Founder &amp; Developer</p>
          </div>
        </div>

      </section>

    </div>
  );
}
