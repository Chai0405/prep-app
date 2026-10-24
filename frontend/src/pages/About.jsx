import "../styles/about.css";

// Text from the original About design image, now real text so it reads
// well on any screen size.
export default function About() {

  return (
    <div className="about-page">

      <section className="about-story">

        <header className="about-heading">
          <span className="about-kicker">Founder story</span>
          <div className="about-title-row">
            <h1>The story behind</h1>
            <img src="/logo.png" alt="PREP — from pantry to plate" className="about-logo" />
          </div>
        </header>

        <figure className="about-photo">
          <img
            src="/about/founder.webp"
            alt="Chaithra Hegde, founder of PREP, smiling in a kitchen"
            width="900"
            height="1200"
          />
        </figure>

        <div className="about-text">
          <h2>Why I created it?</h2>

          <p>Food is a daily part of life, yet planning it often feels chaotic.</p>

          <p>
            Between deciding what to cook, organizing groceries, and keeping track of recipes,
            the small decisions around food can quickly become overwhelming. I often found
            myself repeating the same cycle every week — thinking about meals, forgetting
            ingredients, and trying to stay organized.
          </p>

          <p>PREP was created to bring structure to that process.</p>

          <p>
            It started as a small personal system to simplify everyday food planning.
            Over time, that system evolved into something bigger — a tool designed to help
            others organize meals, recipes, and groceries with more clarity and less effort.
          </p>

          <p>
            The goal has always remained the same — making food routines feel structured,
            calm, and sustainable.
          </p>

          <p className="about-quote">Small systems create lasting habits.</p>

          <div className="about-signoff">
            <img src="/about/signature.webp" alt="" className="about-signature" />
            <p className="about-name">Chaithra Hegde</p>
            <p className="about-role">Founder &amp; Developer</p>
          </div>
        </div>

      </section>

    </div>
  );
}
