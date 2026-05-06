/* global React, ReactDOM */
const { useState, useEffect, useRef, useCallback, useMemo } = React;

// ─────────── SiteNav ───────────
function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`site-nav ${scrolled ? "scrolled" : ""}`}>
      <div className="brand">
        <span className="brand-mark"></span>
        <span>DYAI</span>
      </div>
      <nav className="nav-meta">
        <span className="label hide-sm">v 0.4 · 2026</span>
        <span className="label hide-sm">DE / EN</span>
        <span className="nav-status">System nominal</span>
      </nav>
    </header>
  );
}

// ─────────── IntroLoader ───────────
function IntroLoader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1700);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`intro-loader ${done ? "done" : ""}`}>
      <div className="intro-meta">
        <span>DYAI · INIT</span>
        <span>BOOT 0x004A</span>
        <span>2026</span>
      </div>
      <div className="intro-bar"></div>
      <div className="intro-meta">
        <span>LOADING SYSTEM OBJECT</span>
      </div>
    </div>
  );
}

// ─────────── Hero ───────────
function Hero({ tweaks }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !window.THREE) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new window.HeroScene(canvasRef.current);
    sceneRef.current = scene;
    scene.density = reduce ? 0.4 : tweaks.density;
    scene.motion = reduce ? 0.3 : tweaks.motion;
    scene.start();
    scene.setAccent(parseInt(tweaks.accent.replace("#", ""), 16));

    let raf;
    const onScroll = () => {
      if (!wrapRef.current) return;
      const r = wrapRef.current.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const scrolled = -r.top;
      const p = total > 0 ? scrolled / total : 0;
      scene.setScrollProgress(p);
    };
    const tick = () => { onScroll(); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      scene.destroy();
    };
  }, []);

  // react to tweak changes
  useEffect(() => {
    if (!sceneRef.current) return;
    sceneRef.current.setAccent(parseInt(tweaks.accent.replace("#", ""), 16));
    sceneRef.current.setDensity(tweaks.density);
    sceneRef.current.setMotion(tweaks.motion);
  }, [tweaks.accent, tweaks.density, tweaks.motion]);

  return (
    <section className="hero" ref={wrapRef} data-screen-label="01 Hero">
      <div className="hero-pin">
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="hero-grid"></div>
        <div className="hero-vignette"></div>

        <div className="hero-corner tl">
          <span className="tick"></span>
          <span>SYS · DYAI / CORE-Δ</span>
        </div>
        <div className="hero-corner tr">
          <span className="tick"></span>
          <span>52.520 N · 13.405 E</span>
        </div>
        <div className="hero-corner bl">
          <span className="tick"></span>
          <span>FRAME 0001 / OBSERVATION</span>
        </div>
        <div className="hero-corner br">
          <span className="tick"></span>
          <span>HUMAN × MACHINE / v0.4</span>
        </div>

        <div className="hero-content">
          <span className="hero-eyebrow">
            <span className="bar"></span>
            <span>Design Your Augmented Intelligence</span>
          </span>
          <h1 className="hero-title">
            Nicht künstlich.<br />
            <span className="accent">Augmentiert.</span>
          </h1>
          <div className="hero-sub">
            <p className="hero-claim">
              DYAI begleitet Menschen und Organisationen an der Schwelle zur tiefen Mensch-KI-Integration.
              Wir bauen keine Werkzeuge — wir entwerfen Beziehungen zwischen menschlicher Praxis
              und maschineller Intelligenz, die sich anfühlen wie eine Erweiterung deiner selbst.
            </p>
            <div className="hero-cta-row">
              <a className="btn-tech" href="#projects">
                <span className="dot"></span>
                System öffnen
              </a>
              <a className="btn-tech" href="#philosophy">
                Manifest lesen
              </a>
            </div>
          </div>
        </div>

        <div className="hero-spec">
          <div className="row"><span>OBJECT</span><span>CORE-Δ</span></div>
          <div className="row"><span>STATE</span><span>RESONANT</span></div>
          <div className="row"><span>ROT</span><span>0.14 rad/s</span></div>
          <div className="row"><span>UPLINK</span><span>OPEN</span></div>
        </div>

        <div className="scroll-cue">
          <span>scroll</span>
          <div className="line"></div>
        </div>
      </div>
    </section>
  );
}

// ─────────── PhilosophyDeck ───────────
const PHILOSOPHY = [
  { num: "01", tag: "Axiom", title: "Die Revolution ist psychologisch, nicht technologisch.", body: "Wir lösen keine Tool-Probleme. Wir verändern, wie Menschen mit Bedeutung, Entscheidung und Vertrauen umgehen.", variant: "" },
  { num: "02", tag: "Praxis", title: "Integration vor Innovation.", body: "Eine neue Funktion ist nichts wert, wenn sie nicht in eine bestehende menschliche Praxis hineinpasst.", variant: "olive" },
  { num: "03", tag: "Prinzip", title: "Transparenz über Kontrolle.", body: "Ein KI-System, das man versteht, schlägt jedes System, das einen kontrolliert.", variant: "dark" },
  { num: "04", tag: "Methode", title: "Relationaler Ansatz.", body: "Mensch und KI sind nicht zwei getrennte Systeme. Sie bilden eine Beziehung — und Beziehungen wachsen.", variant: "accent" }
];

function PhilosophyDeck() {
  const wrapRef = useRef(null);
  const cardsRef = useRef([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf;
    const tick = () => {
      if (wrapRef.current) {
        const r = wrapRef.current.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const scrolled = -r.top;
        const p = Math.max(0, Math.min(1, total > 0 ? scrolled / total : 0));
        setProgress(p);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Each card claims a 0.18 wide window of progress, staggered.
  const cardTransform = (i) => {
    const start = 0.05 + i * 0.18;
    const end = start + 0.22;
    const local = Math.max(0, Math.min(1, (progress - start) / (end - start)));
    // ease out
    const e = 1 - Math.pow(1 - local, 3);
    // start far off-screen-right + rotated, end at restPosition
    const restX = -120 + i * 90;       // staggered final x (px)
    const restY = -40 + i * 18;        // staggered final y (px)
    const restRot = -8 + i * 5;        // final rotation (deg)
    const fromX = 600;
    const fromY = 80;
    const fromRot = 30 - i * 6;
    const x = fromX + (restX - fromX) * e;
    const y = fromY + (restY - fromY) * e;
    const rot = fromRot + (restRot - fromRot) * e;
    const scale = 0.85 + 0.15 * e;
    const opacity = e;
    const blur = (1 - e) * 8;
    const z = i * 2;
    return {
      transform: `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${scale})`,
      opacity,
      filter: `blur(${blur}px)`,
      zIndex: z + Math.round(local * 10),
    };
  };

  return (
    <section className="philosophy" ref={wrapRef} style={{ height: "260vh" }} data-screen-label="02 Philosophy" id="philosophy">
      <div className="philosophy-pin">
        <div className="philosophy-inner">
          <div className="philosophy-lede">
            <span className="label">§ 02 · Manifest</span>
            <h2>Was wir glauben, bevor wir bauen.</h2>
            <p>
              Vier Sätze, die jede Entscheidung filtern. Keine Marketing-Werte —
              operative Axiome, die man im Code, im Gespräch und in der Roadmap wiederfindet.
            </p>
            <div className="label" style={{ marginTop: 22, opacity: 0.6 }}>
              {String(Math.round(progress * 100)).padStart(3, "0")} / 100
            </div>
          </div>
          <div className="philosophy-deck">
            {PHILOSOPHY.map((p, i) => (
              <article
                key={p.num}
                ref={(el) => (cardsRef.current[i] = el)}
                className={`p-card ${p.variant}`}
                style={cardTransform(i)}
              >
                <div className="p-meta">
                  <span>{p.tag}</span>
                  <span className="p-num">{p.num} / 04</span>
                </div>
                <div>
                  <h3 className="p-title">{p.title}</h3>
                  <p className="p-body">{p.body}</p>
                </div>
                <div className="p-tag">DYAI · Frontier Practice</div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

window.SiteNav = SiteNav;
window.IntroLoader = IntroLoader;
window.Hero = Hero;
window.PhilosophyDeck = PhilosophyDeck;
