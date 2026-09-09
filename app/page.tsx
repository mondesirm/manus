import Link from "next/link";
import { PricingTable } from "@clerk/nextjs";
import { LogoMarquee } from "@/components/LogoMarquee";
import { StaticHeader } from "@/components/StaticHeader";
import { Typewriter } from "@/components/Typewriter";
import { clerkAppearance } from "@/lib/clerk";

export default function Home() {
  return (
    <main className="site-shell">
      <StaticHeader />
      <section className="hero" aria-labelledby="hero-title">
        <div>
          <p className="eyebrow">The people operating system</p>
          <h1 id="hero-title"><Typewriter /></h1>
          <p className="hero-copy">Manus gives your team a clear place to meet, move, and make decisions. Less admin noise. More attention for the work that matters.</p>
          <div className="hero-actions">
            <Link className="primary-button" href="/login">Start your workspace <span className="arrow">↗</span></Link>
            <Link className="secondary-button" href="#approach">See how it works <span className="arrow">↓</span></Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="portrait-frame" />
          <div className="art-note"><span>01</span>Clarity is a team sport.</div>
        </div>
      </section>
      <LogoMarquee />

      <section className="feature-section" id="signal">
        <div className="section-kicker"><span>Designed for the real work</span><span>02 / 03</span></div>
        <div className="feature-grid">
          <div><h2>One place to see the whole picture.</h2><p>From first hello to next right step, Manus turns scattered people data into a shared sense of what is happening.</p></div>
          <div className="feature-illustration"><div className="illustration-window"><div className="illustration-line wide" /><div className="illustration-line" /><div className="illustration-line short" /><div className="illustration-avatars"><i /><i /><i /><i /></div></div><div className="illustration-tag">The signal, kept</div></div>
        </div>
      </section>

      <section className="pricing-section" id="pricing"><div><p className="eyebrow">Simple by design</p><h2>Choose your pace.</h2><p>Start with the essentials. Grow into the rhythm that fits your team.</p></div><PricingTable for="organization" highlightedPlan="pro" newSubscriptionRedirectUrl="/directory" appearance={clerkAppearance} /></section>
      <section className="booking-cta"><p className="eyebrow">A little context goes a long way</p><h2>Talk through the shape of your work.</h2><Link className="primary-button" href="https://cal.eu/mondesirm/discovery-call">Book a discovery call <span className="arrow">↗</span></Link></section>
      <section className="feature-strip" id="approach" aria-label="Manus principles">
        <span><strong>01</strong> &nbsp; Know your people</span>
        <span><strong>02</strong> &nbsp; Move with confidence</span>
        <span id="signal"><strong>03</strong> &nbsp; Keep the signal</span>
      </section>
      <footer className="site-footer"><div><Link className="brand" href="/"><span className="brand-mark">M</span> manus</Link><p>People, clearly managed.</p></div><div className="footer-contact"><a href="mailto:contact@mondesirm.me">contact@mondesirm.me</a><a href="https://mondesirm.me">mondesirm.me</a><span>Paris, France</span></div><p>© {new Date().getFullYear()} mondesirm</p></footer>
    </main>
  );
}
