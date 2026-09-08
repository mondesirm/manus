import Link from "next/link";

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="site-nav" aria-label="Primary navigation">
        <Link className="brand" href="/">
          <span className="brand-mark">M</span>
          manus
        </Link>
        <div className="nav-links">
          <Link href="#approach">Approach</Link>
          <Link href="#signal">Signal</Link>
          <Link className="nav-action" href="/login">Sign in</Link>
        </div>
      </nav>
      <section className="hero" aria-labelledby="hero-title">
        <div>
          <p className="eyebrow">The people operating system</p>
          <h1 id="hero-title">Make room for <em>good</em> work.</h1>
          <p className="hero-copy">Manus gives your team a clear place to meet, move, and make decisions. Less admin noise. More attention for the work that matters.</p>
          <div className="hero-actions">
            <Link className="primary-button" href="/register">Start your workspace <span className="arrow">↗</span></Link>
            <Link className="secondary-button" href="#approach">See how it works <span className="arrow">↓</span></Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="portrait-frame" />
          <div className="art-note"><span>01</span>Clarity is a team sport.</div>
        </div>
      </section>
      <section className="feature-strip" id="approach" aria-label="Manus principles">
        <span><strong>01</strong> &nbsp; Know your people</span>
        <span><strong>02</strong> &nbsp; Move with confidence</span>
        <span id="signal"><strong>03</strong> &nbsp; Keep the signal</span>
      </section>
    </main>
  );
}
