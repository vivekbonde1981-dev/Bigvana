// 100% correct light-dark theme with ThemeProvider integration

import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "../ThemeContext"; // adjust path based on your folder structure
import gsap from "gsap";

const CONTENT = {
  auto: {
    headlinePre: "Building \n",
    headlineMid: "Next-Gen",
    headlinePost: "Software &\n",
    headlineStroke: "\n Automation.",
    sub: "We architect intelligent automation pipelines, seamless integrations, and AI-driven systems that eliminate friction and amplify output.",
    accents: ["AI_Node: active", "2.4ms latency", "12 Flows Live", "+340% Output"],
    tag: "AI AUTOMATION",
  },
  web: {
    headlinePre: "Crafting \n",
    headlineMid: "High-End",
    headlinePost: "Digital\n",
    headlineStroke: "\n Experence.",
    sub: "Pixel-perfect, performance-obsessed web applications built with cutting-edge architecture to captivate audiences and drive results.",
    accents: ["React & Next.js", "98 Lighthouse", "8 Launches/mo", "+220% Conversions"],
    tag: "WEB DEVELOPMENT",
  },
  app: {
    headlinePre: "Developing \n",
    headlineMid: "Seamless",
    headlinePost: "Mobile \n",
    headlineStroke: "\n Solutions.",
    sub: "Native iOS & Android experiences engineered for performance, scalability, and the kind of delight that earns five-star reviews.",
    accents: ["Swift & Kotlin", "4.9★ App Store", "50K+ Users", "+180% Retention"],
    tag: "APP DEVELOPMENT",
  },
};

const SERVICES = [
  { id: "auto", icon: "⚙", label: "Automation" },
  { id: "web",  icon: "◈", label: "Web Dev" },
  { id: "app",  icon: "◻", label: "App Dev" },
];
const FADE_MS = 280;

function AutoObj({ show }) {
  return (
    <div className={`qf-obj qf-auto-obj${show ? " qf-show" : " qf-hide"}`}>
      <div className="qf-orbit qf-o1"><div className="qf-node qf-n1" /><div className="qf-node qf-n2" /></div>
      <div className="qf-orbit qf-o2" />
      <div className="qf-orbit qf-o3" />
      <div className="qf-sphere">
        <div className="qf-sphere-inner">
          <div className="qf-sphere-core" />
        </div>
      </div>
    </div>
  );
}

function WebObj({ show }) {
  return (
    <div className={`qf-obj qf-web-obj${show ? " qf-show" : " qf-hide"}`}>
      <div className="qf-tablet-wrap">
        <div className="qf-tablet">
          <div className="qf-tab-dots"><span /><span /><span /></div>
          <div className="qf-tab-bar qf-w80" />
          <div className="qf-tab-bar qf-w60" />
          <div className="qf-tab-grid">
            <div className="qf-tab-card" /><div className="qf-tab-card" />
            <div className="qf-tab-card" /><div className="qf-tab-card" />
          </div>
          <div className="qf-tab-bar qf-w40" />
          <div className="qf-tab-bar qf-w70" />
          <div className="qf-tab-grid qf-tab-grid-sm">
            <div className="qf-tab-card" /><div className="qf-tab-card" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AppObj({ show }) {
  return (
    <div className={`qf-obj qf-app-obj${show ? " qf-show" : " qf-hide"}`}>
      <div className="qf-phone-wrap">
        <div className="qf-phone">
          <div className="qf-phone-notch" />
          <div className="qf-phone-bar qf-w70" />
          <div className="qf-phone-bar qf-w50" />
          <div className="qf-phone-card" />
          <div className="qf-phone-row">
            <div className="qf-phone-mini" /><div className="qf-phone-mini" />
          </div>
          <div className="qf-phone-bar qf-w35" />
          <div className="qf-phone-card qf-phone-card-sm" />
          <div className="qf-phone-bar qf-w55" />
        </div>
      </div>
    </div>
  );
}

function FloatChips({ accents }) {
  const cls = ["qf-chip-a", "qf-chip-b", "qf-chip-c", "qf-chip-d"];
  return (
    <>
      {accents.map((t, i) => (
        <div key={i} className={`qf-chip ${cls[i]}`}>
          <span className="qf-chip-dot" />
          <span className="qf-chip-text">{t}</span>
        </div>
      ))}
    </>
  );
}

function Particles({ list }) {
  return (
    <div className="qf-particles">
      {list.map(p => (
        <span key={p.id} className="qf-particle" style={{
          width: p.size, height: p.size,
          background: p.color,
          "--ptx": p.tx, "--pty": p.ty,
          "--pdur": p.dur, "--pdl": p.delay,
        }} />
      ))}
    </div>
  );
}

export default function QuantumFlow() {
  const [active,     setActive]     = useState("auto");
  const [live,       setLive]       = useState("auto");
  const [textVis,    setTextVis]    = useState(true);
  const [particles,  setParticles]  = useState([]);
  const { isDark } = useTheme(); // Get theme from context

  const pidRef    = useRef(0);
  const timersRef = useRef([]);
  const switching = useRef(false);
  const content   = CONTENT[live];

  useEffect(() => {
    if (!document.getElementById("qf-gf")) {
      const l = document.createElement("link");
      l.id = "qf-gf"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800&family=Inter:wght@300;400;500&display=swap";
      document.head.appendChild(l);
    }
  }, []);

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  const burst = useCallback(() => {
    const C = ["var(--accent)", "#ffffff", "var(--text-steel)"];
    setParticles(Array.from({ length: 20 }, (_, i) => {
      const ang = (i / 20) * 360 * (Math.PI / 180);
      const d   = 80 + Math.random() * 120;
      return {
        id:    ++pidRef.current,
        tx:    `${(Math.cos(ang) * d).toFixed(1)}px`,
        ty:    `${(Math.sin(ang) * d).toFixed(1)}px`,
        color: C[i % 3],
        size:  `${(2.5 + Math.random() * 4).toFixed(1)}px`,
        dur:   `${(0.4 + Math.random() * 0.35).toFixed(2)}s`,
        delay: `${(Math.random() * 0.08).toFixed(3)}s`,
      };
    }));
    const t = setTimeout(() => setParticles([]), 1000);
    timersRef.current.push(t);
  }, []);

  const switchTo = useCallback((next) => {
    if (next === active || switching.current) return;
    switching.current = true;
    setActive(next);
    burst();
    setTextVis(false);
    const t = setTimeout(() => {
      setLive(next);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setTextVis(true);
        switching.current = false;
      }));
    }, FADE_MS);
    timersRef.current.push(t);
  }, [active, burst]);

  return (
    <div className={`qf-root ${isDark ? 'qf-dark' : 'qf-light'}`}>
      <style>{CSS}</style>
      <div className="qf-glow qf-glow1" />
      <div className="qf-glow qf-glow2" />
      <div className="qf-glow qf-glow3" />

      <section className="qf-hero" style={{ marginTop: "60px" }}>
        <div className="qf-hero-left">
          <div
            className="qf-tag"
            style={{
              opacity:   textVis ? 1 : 0,
              transform: textVis ? "translateY(0)" : "translateY(-8px)",
              transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
            }}
          >
            <span className="qf-tag-dot" />
            {content.tag}
          </div>

          <div
            className="qf-text-wrap"
            style={{
              opacity:    textVis ? 1 : 0,
              transform:  textVis ? "translateY(0) scale(1)" : "translateY(-12px) scale(0.98)",
              filter:     textVis ? "blur(0px)" : "blur(4px)",
              transition: `opacity ${FADE_MS}ms cubic-bezier(0.4,0,0.2,1),
                           transform ${FADE_MS}ms cubic-bezier(0.4,0,0.2,1),
                           filter ${FADE_MS}ms ease`,
            }}
          >
            <h1 className="qf-h1">
              {content.headlinePre.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
              <span className="qf-accent">{content.headlineMid}</span>
              <br />
              <span className="qf-h1">{content.headlinePost}</span>
              <br />
              <span className="qf-stroke">{content.headlineStroke}</span>
            </h1>
            <p className="qf-sub">{content.sub}</p>
          </div>

          <div className="qf-ctas">
            <button className="qf-cta-btn qf-cta-primary">
              <span>EXPLORE SERVICES</span>
              <span className="qf-cta-arrow">→</span>
            </button>
            <button className="qf-ghost-btn">VIEW PORTFOLIO</button>
          </div>

          <div className="qf-rule" />
        </div>

        <div className="qf-hero-right">
          <div className="qf-scene">
            <FloatChips accents={content.accents} />
            <AutoObj show={live === "auto"} />
            <Particles list={particles} />
            <WebObj  show={live === "web"} />
            <AppObj  show={live === "app"} />
          </div>

          <div className="qf-switcher">
            {SERVICES.map(svc => (
              <button
                key={svc.id}
                className={`qf-svc${active === svc.id ? " qf-active" : ""}`}
                onClick={() => switchTo(svc.id)}
              >
                <span className="qf-svc-icon">{svc.icon}</span>
                <span className="qf-svc-label">{svc.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800&family=Inter:wght@300;400;500&display=swap');

  .qf-root *, .qf-root *::before, .qf-root *::after { box-sizing:border-box; margin:0; padding:0; }

  /* ──── LIGHT THEME (DEFAULT) ──── */
  .qf-root.qf-light {
    --accent:       #0ea5e9;
    --text-primary: #111827;
    --text-steel:   #4b5563;
    --text-muted:   #6b7280;
    --bg-primary:   #ffffff;
    --bg-secondary: #f3f4f6;
    --bg-glass:     rgba(243,244,246,0.8);
    --bg-glass2:    rgba(255,255,255,0.7);
    --bg-card-solid: rgba(250,251,252,0.95);
    --border:       rgba(0,102,255,0.12);
    --border-hi:    rgba(0,102,255,0.25);
    --glow:         rgba(0,102,255,0.15);
    --glow-hi:      rgba(0,102,255,0.35);
  }

  /* ──── DARK THEME ──── */
  .qf-root.qf-dark {
    --accent:       #5cb8ff;
    --text-primary: #e8f4ff;
    --text-steel:   #a8cfe8;
    --text-muted:   #6b8fad;
    --bg-primary:   #000000;
    --bg-secondary: #0a0e1a;
    --bg-glass:     rgba(8,8,8,0.85);
    --bg-glass2:    rgba(12,18,28,0.7);
    --bg-card-solid: rgba(8,18,36,0.95);
    --border:       rgba(92,184,255,0.18);
    --border-hi:    rgba(92,184,255,0.42);
    --glow:         rgba(92,184,255,0.22);
    --glow-hi:      rgba(92,184,255,0.5);
  }

  .qf-root {
    font-family: 'Inter', sans-serif;
    background: var(--bg-primary);
    min-height: 100vh;
    color: var(--text-primary);
    overflow-x: hidden;
    position: relative;
    transition: background 0.4s ease, color 0.4s ease;
  }

  .qf-glow {
    position: fixed; border-radius: 50%;
    filter: blur(120px); pointer-events: none; z-index: 0;
  }
  .qf-glow1 {
    width: 600px; height: 500px; top: -160px; right: -60px;
    background: radial-gradient(ellipse, var(--glow) 0%, transparent 70%);
    animation: qfGlow1 14s ease-in-out infinite;
  }
  .qf-glow2 {
    width: 400px; height: 380px; bottom: 40px; left: -100px;
    background: radial-gradient(ellipse, var(--glow) 0%, transparent 70%);
    animation: qfGlow2 18s ease-in-out infinite;
    opacity: 0.7;
  }
  .qf-glow3 {
    width: 300px; height: 300px; top: 40%; left: 45%;
    background: radial-gradient(ellipse, var(--glow) 0%, transparent 70%);
    animation: qfGlow2 22s ease-in-out infinite reverse;
    opacity: 0.5;
  }
  @keyframes qfGlow1 { 0%,100% { transform: translate(0,0) scale(1); opacity: 1; } 50% { transform: translate(-30px, 40px) scale(1.1); opacity: 0.7; } }
  @keyframes qfGlow2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px, -24px); } }

  .qf-hero {
    display: grid; grid-template-columns: 1fr 1fr;
    align-items: center; min-height: calc(100vh - 67px);
    padding: 0 64px 60px; gap: 40px; position: relative;
  }

  .qf-hero-left {
    position: relative; z-index: 10;
    display: flex; flex-direction: column; gap: 0;
  }

  .qf-tag {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: 'Inter', sans-serif; font-weight: 500;
    font-size: 0.68rem; letter-spacing: 0.28em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 24px;
    will-change: opacity, transform;
  }
  .qf-tag-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 8px var(--accent);
    animation: qfPulse 2s ease-in-out infinite;
  }
  @keyframes qfPulse {
    0%,100% { opacity: 1; transform: scale(1); }
    50%      { opacity: 0.55; transform: scale(0.75); }
  }

  .qf-text-wrap { will-change: opacity, transform, filter; }

  .qf-h1 {
    font-family: 'Montserrat', sans-serif; font-weight: 800;
    font-size: clamp(2.6rem, 4.2vw, 3.8rem); line-height: 1.06;
    letter-spacing: -0.03em; color: var(--text-primary);
    margin-bottom: 22px;
    transition: color 0.4s ease;
  }

  .qf-accent { color: var(--accent); }

  .qf-stroke {
    -webkit-text-stroke: 1.5px var(--accent);
    color: transparent;
    display: inline;
    filter: drop-shadow(0 0 12px var(--glow));
  }

  .qf-sub {
    font-family: 'Inter', sans-serif; font-weight: 300;
    font-size: 0.98rem; line-height: 1.75; color: var(--text-muted);
    max-width: 440px; margin-bottom: 0;
    transition: color 0.4s ease;
  }

  .qf-ctas { display: flex; gap: 14px; margin-top: 36px; margin-bottom: 32px; flex-wrap: wrap; }

  .qf-cta-btn {
    font-family: 'Montserrat', sans-serif; font-weight: 700;
    font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase;
    background: var(--accent); color: #000; border: none; cursor: pointer;
    padding: 11px 24px; border-radius: 9999px;
    box-shadow: 0 0 20px var(--glow);
    transition: box-shadow 0.25s, transform 0.2s;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .qf-cta-btn:hover { box-shadow: 0 0 36px var(--glow-hi); transform: translateY(-2px); }
  .qf-cta-primary { background: var(--accent); }
  .qf-cta-arrow { font-size: 1rem; }

  .qf-ghost-btn {
    font-family: 'Montserrat', sans-serif; font-weight: 700;
    font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase;
    background: transparent; color: var(--text-steel);
    border: 1px solid var(--border-hi); cursor: pointer;
    padding: 11px 24px; border-radius: 9999px;
    transition: border-color 0.25s, color 0.25s, box-shadow 0.25s, transform 0.2s;
  }
  .qf-ghost-btn:hover {
    border-color: var(--accent); color: var(--accent);
    box-shadow: 0 0 20px var(--glow);
    transform: translateY(-2px);
  }

  .qf-rule {
    height: 1px; max-width: 300px;
    background: linear-gradient(90deg, var(--accent) 0%, var(--glow) 60%, transparent 100%);
    margin-top: 8px;
  }

  .qf-hero-right {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; gap: 28px;
    height: 580px; position: relative;
  }

  .qf-scene {
    position: relative; width: 400px; height: 400px;
    animation: qfFloat 6s ease-in-out infinite;
    flex-shrink: 0;
  }
  @keyframes qfFloat {
    0%,100% { transform: translateY(0) rotate(0deg); }
    33%      { transform: translateY(-16px) rotate(1.5deg); }
    66%      { transform: translateY(-8px) rotate(-1deg); }
  }

  .qf-switcher {
    display: flex; gap: 6px;
    background: var(--bg-glass); backdrop-filter: blur(20px);
    border: 1px solid var(--border); border-radius: 9999px;
    padding: 6px; z-index: 20;
    box-shadow: 0 0 30px var(--glow), inset 0 1px 0 rgba(255,255,255,0.04);
    transition: background 0.4s ease;
  }
  .qf-svc {
    display: flex; align-items: center; gap: 8px;
    background: transparent; border: 1px solid transparent; border-radius: 9999px;
    padding: 8px 18px; cursor: pointer;
    transition: background 0.25s, border-color 0.25s, color 0.25s, box-shadow 0.25s, transform 0.18s;
    font-family: 'Inter', sans-serif; font-size: 0.78rem; font-weight: 500;
    letter-spacing: 0.06em; color: var(--text-muted); white-space: nowrap;
  }
  .qf-svc.qf-active {
    background: var(--glow);
    border-color: var(--border-hi);
    color: var(--accent);
    box-shadow: 0 0 16px var(--glow);
  }
  .qf-svc:hover:not(.qf-active) { color: var(--text-steel); transform: translateY(-1px); background: rgba(255,255,255,0.03); }
  .qf-svc-icon { font-size: 0.9rem; line-height: 1; }

  .qf-obj {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    transition: opacity 0.44s cubic-bezier(0.4,0,0.2,1), transform 0.52s cubic-bezier(0.34,1.38,0.64,1);
  }
  .qf-auto-obj { transform: scale(0.7) rotate(20deg);    opacity: 0; pointer-events: none; }
  .qf-web-obj  { transform: scale(0.7) rotateY(-42deg);  opacity: 0; pointer-events: none; }
  .qf-app-obj  { transform: scale(0.7) rotateY(42deg);   opacity: 0; pointer-events: none; }
  .qf-obj.qf-show { opacity: 1; pointer-events: auto; transform: scale(1) rotate(0deg) rotateY(0deg); }
  .qf-auto-obj.qf-hide { transform: scale(0.76) rotate(-18deg); }
  .qf-web-obj.qf-hide  { transform: scale(0.76) rotateY(38deg); }
  .qf-app-obj.qf-hide  { transform: scale(0.76) rotateY(-38deg); }

  /* ──── SPHERE STYLES ──── */
  .qf-sphere {
    width: 260px; height: 260px; border-radius: 50%;
    background: radial-gradient(ellipse at 35% 30%, var(--glow) 0%, rgba(8,20,40,0.7) 50%, rgba(0,0,0,0.9) 100%);
    box-shadow: 0 0 60px var(--glow), 0 0 120px var(--glow), inset 0 0 60px var(--glow), inset 0 0 20px var(--glow);
    display: flex; align-items: center; justify-content: center;
    border: 1px solid var(--border-hi);
    backdrop-filter: blur(8px); position: relative;
    transition: box-shadow 0.4s ease, background 0.4s ease;
  }

  .qf-root.qf-light .qf-sphere {
    background: radial-gradient(ellipse at 35% 30%, rgba(0,102,255,0.15) 0%, rgba(220,235,250,0.7) 50%, rgba(240,244,248,0.9) 100%);
  }

  .qf-sphere-inner {
    width: 160px; height: 160px; border-radius: 50%;
    background: radial-gradient(ellipse at 40% 35%, var(--glow) 0%, rgba(8,14,28,0.8) 100%);
    border: 1px solid var(--border-hi);
    box-shadow: 0 0 30px var(--glow-hi), inset 0 0 20px var(--glow);
    display: flex; align-items: center; justify-content: center;
    animation: qfSpin 9s linear infinite;
  }

  .qf-root.qf-light .qf-sphere-inner {
    background: radial-gradient(ellipse at 40% 35%, rgba(0,102,255,0.2) 0%, rgba(220,235,250,0.6) 100%);
  }

  .qf-sphere-core {
    width: 52px; height: 52px; border-radius: 50%;
    background: radial-gradient(ellipse, rgba(255,255,255,0.9) 0%, var(--accent) 60%, var(--glow) 100%);
    box-shadow: 0 0 28px var(--glow-hi), 0 0 60px var(--glow);
    animation: qfSpin 3s linear infinite reverse;
  }
  @keyframes qfSpin { from { transform: rotate(0); } to { transform: rotate(360deg); } }

  .qf-orbit {
    position: absolute; border-radius: 50%; border: 1px solid;
    top: 50%; left: 50%; transform: translate(-50%,-50%);
    animation: qfOrb linear infinite;
  }
  .qf-o1 { width:292px; height:292px; border-color:var(--border);  animation-duration:12s; }
  .qf-o2 { width:334px; height:198px; border-color:var(--border);  animation-duration:19s; animation-direction:reverse; border-style:dashed; }
  .qf-o3 { width:374px; height:374px; border-color:var(--border);  animation-duration:26s; }
  @keyframes qfOrb { from { transform: translate(-50%,-50%) rotate(0); } to { transform: translate(-50%,-50%) rotate(360deg); } }
  .qf-node { position: absolute; width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 12px var(--accent); }
  .qf-n1 { top: -4px; left: 50%; transform: translateX(-50%); }
  .qf-n2 { bottom: -4px; left: 50%; transform: translateX(-50%); }

  .qf-tablet-wrap { width: 220px; height: 300px; perspective: 620px; }
  .qf-tablet {
    width: 100%; height: 100%; border-radius: 20px;
    background: linear-gradient(135deg, var(--bg-card-solid), var(--bg-secondary));
    border: 1px solid var(--border-hi);
    box-shadow: 0 0 50px var(--glow), inset 0 1px 0 var(--border);
    padding: 18px 14px; display: flex; flex-direction: column; gap: 10px;
    transform: rotateY(-12deg) rotateX(5deg);
    backdrop-filter: blur(10px);
    transition: background 0.4s ease;
  }
  .qf-tab-dots { display: flex; gap: 6px; }
  .qf-tab-dots span { width: 7px; height: 7px; border-radius: 50%; }
  .qf-tab-dots span:nth-child(1) { background: var(--accent); box-shadow: 0 0 6px var(--accent); }
  .qf-tab-dots span:nth-child(2) { background: var(--border-hi); }
  .qf-tab-dots span:nth-child(3) { background: var(--border); }
  .qf-tab-bar { height: 8px; border-radius: 4px; background: var(--border); }
  .qf-w80{width:80%;} .qf-w60{width:60%;} .qf-w40{width:40%;} .qf-w70{width:70%;}
  .qf-tab-grid { flex: 1; border-radius: 8px; background: var(--glow); border: 1px solid var(--border); display: grid; grid-template-columns: 1fr 1fr; gap: 5px; padding: 7px; }
  .qf-tab-grid-sm { flex: 0.65; }
  .qf-tab-card { border-radius: 6px; background: var(--glow); border: 1px solid var(--border); }

  .qf-phone-wrap { width: 160px; height: 300px; perspective: 620px; }
  .qf-phone {
    width: 100%; height: 100%; border-radius: 30px;
    background: linear-gradient(135deg, var(--bg-card-solid), var(--bg-secondary));
    border: 1px solid var(--border-hi);
    box-shadow: 0 0 50px var(--glow), inset 0 1px 0 var(--border);
    padding: 22px 14px; display: flex; flex-direction: column; gap: 8px;
    transform: rotateY(12deg) rotateX(5deg);
    backdrop-filter: blur(10px);
    transition: background 0.4s ease;
  }
  .qf-phone-notch { width: 64px; height: 9px; border-radius: 5px; background: var(--border); margin: 0 auto 4px; }
  .qf-phone-bar { height: 7px; border-radius: 4px; background: var(--border); }
  .qf-w50{width:50%;} .qf-w35{width:35%;} .qf-w55{width:55%;}
  .qf-phone-card { border-radius: 10px; height: 64px; background: var(--glow); border: 1px solid var(--border); }
  .qf-phone-card-sm { height: 44px; }
  .qf-phone-row { display: flex; gap: 6px; }
  .qf-phone-mini { flex: 1; height: 38px; border-radius: 8px; background: var(--glow); border: 1px solid var(--border); }

  .qf-chip {
    position: absolute; display: flex; align-items: center; gap: 8px;
    background: var(--bg-glass); backdrop-filter: blur(16px);
    border: 1px solid var(--border); border-radius: 10px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.3), 0 0 16px var(--glow);
    padding: 9px 14px;
    font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 500;
    letter-spacing: 0.04em; color: var(--text-steel); white-space: nowrap;
    transition: background 0.4s ease;
  }
  .qf-chip-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; background: var(--accent); box-shadow: 0 0 8px var(--accent); animation: qfPulse 2s ease-in-out infinite; }
  .qf-chip-a { top:8%;  left:-10%; animation: qfFA 7s ease-in-out infinite; }
  .qf-chip-b { bottom:14%; right:-9%; animation: qfFB 9s ease-in-out infinite; }
  .qf-chip-c { top:53%; left:-16%; animation: qfFC 8s ease-in-out infinite; }
  .qf-chip-d { top:6%;  right:0%;  animation: qfFD 6s ease-in-out infinite; }
  @keyframes qfFA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes qfFB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(10px)} }
  @keyframes qfFC { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-9px) rotate(2deg)} }
  @keyframes qfFD { 0%,100%{transform:translateY(0)} 50%{transform:translateY(14px)} }

  .qf-particles { position:absolute; inset:0; pointer-events:none; overflow:visible; z-index:30; }
  .qf-particle {
    position:absolute; top:50%; left:50%; border-radius:50%; opacity:0;
    animation: qfPop var(--pdur,.55s) var(--pdl,0s) cubic-bezier(.15,0,.7,1) forwards;
  }
  @keyframes qfPop {
    0%   { opacity:1; transform:translate(-50%,-50%) scale(1); }
    100% { opacity:0; transform:translate(calc(-50% + var(--ptx,50px)),calc(-50% + var(--pty,50px))) scale(0); }
  }

  @keyframes qfFUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  .qf-hero-left > * { animation: qfFUp 0.7s cubic-bezier(0,0,0.2,1) both; }
  .qf-hero-left > *:nth-child(1) { animation-delay: 0.08s; }
  .qf-hero-left > *:nth-child(2) { animation-delay: 0.18s; }
  .qf-hero-left > *:nth-child(3) { animation-delay: 0.28s; }
  .qf-hero-left > *:nth-child(4) { animation-delay: 0.36s; }
  .qf-hero-right { animation: qfFUp 0.85s 0.2s cubic-bezier(0,0,0.2,1) both; }

  @media(max-width:1024px) {
    .qf-hero { padding:0 32px 48px; gap:20px; }
    .qf-hero-right { height:520px; }
    .qf-scene { width:340px; height:340px; }
    .qf-sphere { width:210px; height:210px; }
    .qf-sphere-inner { width:130px; height:130px; }
    .qf-sphere-core { width:42px; height:42px; }
    .qf-o1{width:240px;height:240px;}
    .qf-o2{width:270px;height:164px;}
    .qf-o3{width:308px;height:308px;}
    .qf-chip-c { display:none; }
  }

  @media(max-width:768px) {
    .qf-hero { grid-template-columns:1fr; min-height:auto; padding:24px 24px 52px; gap:32px; text-align:center; }
    .qf-hero-left { align-items:center; }
    .qf-sub { text-align:center; max-width:100%; }
    .qf-ctas { justify-content:center; }
    .qf-rule { margin-left:auto; margin-right:auto; }
    .qf-hero-right { order:-1; height:auto; gap:20px; }
    .qf-scene { width:280px; height:280px; }
    .qf-sphere { width:170px; height:170px; }
    .qf-sphere-inner { width:106px; height:106px; }
    .qf-sphere-core { width:34px; height:34px; }
    .qf-o1{width:196px;height:196px;}
    .qf-o2{width:224px;height:136px;}
    .qf-o3{width:254px;height:254px;}
    .qf-chip-a { left:-4%; font-size:.68rem; padding:7px 10px; }
    .qf-chip-b { right:-4%; font-size:.68rem; padding:7px 10px; }
    .qf-chip-c, .qf-chip-d { display:none; }
    .qf-tablet-wrap { width:170px; height:228px; }
    .qf-phone-wrap { width:130px; height:242px; }
    .qf-h1 { font-size:clamp(2.1rem,8vw,2.9rem); }
    .qf-svc { padding:8px 14px; font-size:.75rem; }
  }

  @media(max-width:480px) {
    .qf-hero { padding:14px 18px 40px; gap:24px; }
    .qf-h1 { font-size:clamp(1.8rem,9.5vw,2.3rem); }
    .qf-scene { width:240px; height:240px; }
    .qf-sphere { width:145px; height:145px; }
    .qf-sphere-inner { width:90px; height:90px; }
    .qf-sphere-core { width:28px; height:28px; }
    .qf-o1{width:166px;height:166px;}
    .qf-o2{width:188px;height:114px;}
    .qf-o3{width:214px;height:214px;}
    .qf-chip-a, .qf-chip-b { display:none; }
    .qf-ctas { flex-direction:column; align-items:stretch; }
    .qf-cta-btn, .qf-ghost-btn { justify-content:center; text-align:center; }
    .qf-switcher { gap:4px; padding:5px; }
    .qf-svc { padding:7px 10px; font-size:.72rem; gap:5px; }
    .qf-tablet-wrap { width:146px; height:200px; }
    .qf-phone-wrap { width:116px; height:216px; }
  }

  @media(max-width:360px) {
    .qf-h1 { font-size:1.6rem; }
    .qf-scene { width:200px; height:200px; }
    .qf-sphere { width:120px; height:120px; }
    .qf-sphere-inner { width:74px; height:74px; }
    .qf-sphere-core { width:22px; height:22px; }
    .qf-o1{width:136px;height:136px;}
    .qf-o2{width:155px;height:94px;}
    .qf-o3{width:176px;height:176px;}
    .qf-svc { padding:7px 9px; font-size:.7rem; }
  }
`;