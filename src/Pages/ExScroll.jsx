import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@300;400;500;600&display=swap');

  .sc-card {
    position: relative;
    width: 100%;
    max-width: 800px;
    min-height: 500px;
    margin: 0 auto;
    background: var(--bg-card);
    border-radius: 24px;
    padding: 52px 44px 48px;
    overflow: hidden;
    border: 1px solid var(--border-card);
    box-shadow: 0 0 0 1px var(--glow) inset, 0 25px 60px rgba(0,0,0,0.25);
    animation: sc-cardIn .9s cubic-bezier(.16,1,.3,1) both;
    font-family: 'Inter', sans-serif;
    transition: background 0.4s ease, border-color 0.4s ease;
  }
  @keyframes sc-cardIn {
    from { opacity:0; transform: translateY(28px) scale(.97); }
    to   { opacity:1; transform: translateY(0) scale(1); }
  }

  .sc-card::before {
    content: '';
    position: absolute;
    top: 0; left: 16%; right: 16%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent-mid), var(--accent-light), var(--accent-mid), transparent);
    border-radius: 0 0 2px 2px;
    z-index: 2;
  }

  .sc-glow {
    position: absolute; border-radius: 50%;
    filter: blur(70px); pointer-events: none; z-index: 0;
  }
  .sc-glow--top {
    width: 280px; height: 180px;
    background: radial-gradient(ellipse, var(--glow) 0%, transparent 72%);
    top: -60px; right: -60px;
    animation: sc-drift 8s ease-in-out infinite alternate;
  }
  .sc-glow--bottom {
    width: 220px; height: 160px;
    background: radial-gradient(ellipse, var(--glow) 0%, transparent 70%);
    bottom: -50px; left: -40px;
    animation: sc-drift 10s ease-in-out infinite alternate-reverse;
  }
  @keyframes sc-drift { 0% { transform: translate(0,0); } 100% { transform: translate(18px,12px); } }

  .sc-corner { position: absolute; width: 28px; height: 28px; z-index: 1; pointer-events: none; }
  .sc-corner--tl { top:14px; left:14px; border-top:1.5px solid var(--accent-mid); border-left:1.5px solid var(--accent-mid); border-radius:6px 0 0 0; }
  .sc-corner--tr { top:14px; right:14px; border-top:1.5px solid var(--accent-mid); border-right:1.5px solid var(--accent-mid); border-radius:0 6px 0 0; }
  .sc-corner--bl { bottom:14px; left:14px; border-bottom:1.5px solid var(--accent-mid); border-left:1.5px solid var(--accent-mid); border-radius:0 0 0 6px; }
  .sc-corner--br { bottom:14px; right:14px; border-bottom:1.5px solid var(--accent-mid); border-right:1.5px solid var(--accent-mid); border-radius:0 0 6px 0; }

  .sc-particle { position: absolute; width: 3px; height: 3px; border-radius: 50%; background: var(--accent-mid); opacity: 0; z-index: 0; animation: sc-particleFade 4s ease-in-out infinite; }
  .sc-particle:nth-child(1) { top:18%; left:12%; animation-delay:0s; }
  .sc-particle:nth-child(2) { top:72%; left:88%; animation-delay:1.2s; width:2px; height:2px; }
  .sc-particle:nth-child(3) { top:55%; left:6%;  animation-delay:2.4s; width:2px; height:2px; }
  .sc-particle:nth-child(4) { top:30%; right:10%; animation-delay:3.2s; }
  .sc-particle:nth-child(5) { bottom:20%; left:40%; animation-delay:0.8s; width:2px; height:2px; }
  @keyframes sc-particleFade { 0%,100% { opacity:0; transform:scale(.5); } 50% { opacity:.55; transform:scale(1); } }

  .sc-icon-wrap { position: relative; z-index: 1; width: 68px; height: 68px; margin: 0 auto 28px; }
  .sc-icon-ring { position: absolute; inset: 0; border-radius: 50%; border: 1.5px solid var(--border); animation: sc-spinRing 18s linear infinite; }
  .sc-icon-ring::after { content: ''; position: absolute; top: -3px; left: 50%; transform: translateX(-50%); width: 6px; height: 6px; background: var(--accent-mid); border-radius: 50%; box-shadow: 0 0 8px 2px var(--glow); }
  @keyframes sc-spinRing { to { transform:rotate(360deg); } }
  .sc-icon-inner { position: absolute; inset: 10px; border-radius: 50%; background: linear-gradient(135deg, var(--glow), var(--border)); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; }
  .sc-icon-inner svg { width: 26px; height: 26px; stroke: var(--accent-light); fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; filter: drop-shadow(0 0 6px var(--glow)); }

  .sc-tag { position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; gap: 7px; margin-bottom: 18px; }
  .sc-tag__dot { width: 6px; height: 6px; background: var(--accent-mid); border-radius: 50%; box-shadow: 0 0 6px var(--glow); animation: sc-pulse 2.2s ease-in-out infinite; }
  @keyframes sc-pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.5; transform:scale(.75); } }
  .sc-tag__label { font-size: 11px; font-weight: 500; letter-spacing: 2.2px; text-transform: uppercase; color: var(--accent-light); }

  .sc-title { position: relative; z-index: 1; font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(28px, 6vw, 38px); line-height: 1.1; text-align: center; color: var(--text-primary); margin-bottom: 8px; letter-spacing: -0.5px; transition: color 0.4s ease; }
  .sc-title .sc-accent { background: linear-gradient(135deg, var(--accent-light), var(--accent-cyan)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

  .sc-desc { position: relative; z-index: 1; color: var(--text-body); font-size: 14.5px; line-height: 1.75; text-align: center; max-width: 380px; margin: 0 auto 34px; font-weight: 300; transition: color 0.4s ease; }

  .sc-pills { position: relative; z-index: 1; display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-bottom: 36px; }
  .sc-pill { padding: 7px 16px; border-radius: 30px; border: 1px solid var(--border); background: var(--glow); color: var(--accent-light); font-size: 12px; font-weight: 500; letter-spacing: 0.6px; cursor: default; transition: border-color .3s, background .3s, box-shadow .3s, transform .25s; user-select: none; }
  .sc-pill:hover { border-color: var(--border-hi); background: var(--glow-hi); box-shadow: 0 0 14px var(--glow); transform: translateY(-2px); }

  .sc-section-bg {
    background: var(--bg-primary);
    transition: background 0.4s ease;
  }
`;

const StackedCards = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const styleRef = useRef(null);

  useEffect(() => {
    const tag = document.createElement("style");
    tag.textContent = CSS;
    tag.setAttribute("data-service-card", "");
    document.head.appendChild(tag);
    styleRef.current = tag;
    return () => tag.remove();
  }, []);

  const cards = [
    { id: 1, title1: "Web Design &", title2: "Development", content: "From high-end aesthetic layouts to high-performance code, we build websites that don't just look stunning—they convert. Using modern frameworks like React and advanced animations via GSAP, we create immersive digital experiences that captivate your audience.", pills: ["React", "GSAP", "Next.js", "UI / UX"], icon: "code" },
    { id: 2, title1: "Custom Software", title2: "Solutions", content: "Off-the-shelf software often falls short. We engineer tailor-made software designed specifically to solve your unique business bottlenecks, ensuring every feature serves a purpose.", pills: ["Node.js", "Python", "APIs", "Databases"], icon: "layers" },
    { id: 3, title1: "Intelligent", title2: "Automation", content: "Reclaim your time by letting us handle the repetitive tasks. We design and deploy automation workflows that streamline your operations, reduce human error, and significantly lower overhead costs.", pills: ["Workflows", "Zapier", "RPA", "AI"], icon: "zap" },
    { id: 4, title1: "Mobile App", title2: "Development", content: "We build high-performance native and cross-platform mobile applications that live in your users' pockets. By leveraging React Native and Flutter, we deliver butter-smooth performance, offline capabilities, and intuitive interfaces.", pills: ["React Native", "Firebase", "iOS", "Android"], icon: "smartphone" },
    { id: 5, title1: "100% Responsive", title2: "Design", content: "Your brand should look flawless on every screen. Our Mobile-First approach ensures that whether your clients are on a phone, tablet, or desktop, their experience is seamless and professional.", pills: ["Mobile-First", "Tailwind", "CSS Grid", "A11y"], icon: "monitor" },
    { id: 6, title1: "24/7 Free", title2: "Support", content: "We believe a partnership doesn't end at launch. Enjoy peace of mind with our around-the-clock support, ensuring your systems stay online and optimized whenever you need us.", pills: ["Live Chat", "Email", "Uptime", "SLA"], icon: "headphones" },
  ];

  const Icons = {
    code: <svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /><line x1="14" y1="4" x2="10" y2="20" /></svg>,
    layers: <svg viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>,
    zap: <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10" /></svg>,
    monitor: <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    smartphone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>,
    headphones: <svg viewBox="0 0 24 24"><path d="M3 9v6a9 9 0 0 0 9 9 9 9 0 0 0 9-9V9" /><path d="M3 9a9 9 0 0 1 18 0" /><rect x="2" y="8" width="3" height="6" rx="1" /><rect x="19" y="8" width="3" height="6" rx="1" /></svg>,
  };

  useLayoutEffect(() => {
    if (cardsRef.current.length !== cards.length) return;
    const context = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        if (index < cards.length - 1) {
          const nextCard = cardsRef.current[index + 1];
          if (!nextCard) return;
          gsap.to(card, {
            scale: 0.9, opacity: 0.5,
            scrollTrigger: {
              trigger: card,
              start: `top ${60 + index * 40}px`,
              endTrigger: nextCard,
              end: `top ${60 + (index + 1) * 40}px`,
              scrub: true,
            },
          });
        }
      });
      ScrollTrigger.refresh();
    }, containerRef);
    return () => context.revert();
  }, [cards.length]);

  return (
    <div ref={containerRef} className="sc-section-bg min-h-screen pb-[30vh]" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="max-w-4xl mx-auto flex flex-col items-center pt-20" style={{ marginTop: "70px", paddingBottom: "50px", marginBottom: "1px" }}>
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="sc-card"
            style={{ position: 'sticky', top: `${60 + (index + 1) * 40}px`, zIndex: index + 1, marginBottom: "170px" }}
          >
            <div className="sc-glow sc-glow--top" />
            <div className="sc-glow sc-glow--bottom" />
            <div className="sc-corner sc-corner--tl" />
            <div className="sc-corner sc-corner--tr" />
            <div className="sc-corner sc-corner--bl" />
            <div className="sc-corner sc-corner--br" />
            {[...Array(5)].map((_, i) => <div className="sc-particle" key={i} />)}
            <div className="sc-icon-wrap">
              <div className="sc-icon-ring" />
              <div className="sc-icon-inner">{Icons[card.icon]}</div>
            </div>
            <div className="sc-tag">
              <span className="sc-tag__dot" />
              <span className="sc-tag__label">Our Services</span>
            </div>
            <h2 className="sc-title">
              {card.title1}<br />
              <span className="sc-accent">{card.title2}</span>
            </h2>
            <p className="sc-desc">{card.content}</p>
            <div className="sc-pills">
              {card.pills.map((label) => <span className="sc-pill" key={label}>{label}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackedCards;
