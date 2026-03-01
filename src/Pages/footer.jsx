import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AgencyFooter = () => {
  const container = useRef();

  useGSAP(() => {
    gsap.to('.footer-bg', { backgroundPosition: '100px 100px', duration: 20, repeat: -1, ease: 'none' });
    gsap.to('.orb-1', { x: 100, y: 50, scale: 1.2, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.orb-2', { x: -80, y: -30, scale: 0.9, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: 'footer', start: 'top 80%', end: 'top 30%', toggleActions: 'play none none reverse' }
    });
    tl.to('.footer-brand', { opacity: 1, y: 0, duration: 0.8 })
      .to('.footer-column', { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, '-=0.4')
      .to('.footer-bottom', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');

    gsap.to('.brand-logo', {
      '--underline-width': '100%',
      scrollTrigger: { trigger: 'footer', start: 'top 80%', end: 'top 50%', scrub: 1 }
    });
  }, { scope: container });

  return (
    <footer ref={container} className="footer-container">
      <div className="footer-bg"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="code-decoration code-1">{'< /automation >'}</div>
      <div className="code-decoration code-2">console.log('innovate');</div>

      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="brand-logo">AUTOMATE.DEV</div>
            <p className="brand-tagline">
              Transforming businesses through intelligent automation and cutting-edge software solutions.
            </p>
            <div className="social-links">
              {['LinkedIn', 'GitHub', 'Twitter'].map((platform) => (
                <motion.a
                  key={platform}
                  href="#"
                  className="social-link"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span style={{ fontSize: '10px' }}>{platform[0]}</span>
                </motion.a>
              ))}
            </div>
          </div>

          <div className="footer-column">
            <h3>Services</h3>
            <ul>
              {['Process Automation', 'Custom Software', 'AI Integration', 'Cloud Solutions'].map(item => (
                <li key={item}><a href="#">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              {['About Us', 'Our Team', 'Case Studies', 'Careers'].map(item => (
                <li key={item}><a href="#">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h3>Contact</h3>
            <div className="contact-item"><span>📧</span> hello@automate.dev</div>
            <div className="contact-item"><span>📱</span> +1 (555) 123-4567</div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">© 2026 AUTOMATE.DEV. Built with precision.</div>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-container {
          background: var(--bg-secondary);
          color: var(--text-primary);
          position: relative;
          overflow: hidden;
          padding: 80px 40px 40px;
          font-family: 'JetBrains Mono', monospace;
          border-top: 1px solid var(--border-footer);
          transition: background 0.4s ease;
        }
        .footer-bg {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          opacity: var(--grid-opacity);
          background-image: linear-gradient(var(--accent-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--accent-cyan) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }
        .orb {
          position: absolute; border-radius: 50%; filter: blur(80px);
          opacity: var(--orb-opacity); pointer-events: none;
          transition: opacity 0.4s ease;
        }
        .orb-1 { width: 400px; height: 400px; background: var(--orb-color); top: -200px; left: -100px; }
        .orb-2 { width: 300px; height: 300px; background: var(--orb-color); bottom: -150px; right: -50px; }

        .brand-logo {
          font-family: 'Orbitron', sans-serif;
          font-size: 2rem; font-weight: 900;
          color: var(--accent-cyan);
          position: relative; display: inline-block;
          --underline-width: 0%;
        }
        .brand-logo::after {
          content: ''; position: absolute; bottom: -5px; left: 0;
          width: var(--underline-width); height: 3px;
          background: var(--accent-cyan); box-shadow: 0 0 10px var(--accent-cyan);
        }
        .brand-tagline { color: var(--text-body); margin-top: 14px; font-size: 0.9rem; line-height: 1.6; max-width: 280px; transition: color 0.4s ease; }
        .social-links { display: flex; gap: 12px; margin-top: 20px; }
        .social-link { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; background: var(--bg-card); border: 1px solid var(--border); color: var(--text-steel); text-decoration: none; transition: all 0.3s ease; }
        .social-link:hover { border-color: var(--accent-cyan); color: var(--accent-cyan); }

        .footer-main { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; position: relative; z-index: 2; }
        .footer-brand, .footer-column, .footer-bottom { opacity: 0; transform: translateY(30px); }
        h3 { font-family: 'Orbitron', sans-serif; color: var(--accent-cyan); margin-bottom: 25px; font-size: 1.1rem; }
        ul { list-style: none; padding: 0; }
        li { margin-bottom: 12px; }
        .footer-container a { color: var(--text-body); text-decoration: none; transition: all 0.3s ease; font-size: 0.9rem; }
        .footer-container a:hover { color: var(--accent-cyan); padding-left: 10px; }

        .contact-item { color: var(--text-body); font-size: 0.9rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }

        .code-decoration { position: absolute; color: var(--border); font-size: 0.75rem; }
        .code-1 { top: 20px; right: 40px; }
        .code-2 { bottom: 100px; left: 40px; }

        .footer-content { position: relative; z-index: 2; }
        .footer-bottom { display: flex; justify-content: space-between; align-items: center; margin-top: 60px; padding-top: 30px; border-top: 1px solid var(--border); flex-wrap: wrap; gap: 12px; }
        .copyright { color: var(--text-muted); font-size: 0.85rem; transition: color 0.4s ease; }
        .footer-links { display: flex; gap: 24px; }

        @media (max-width: 1024px) { .footer-main { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 640px) { .footer-main { grid-template-columns: 1fr; } .footer-container { padding: 50px 24px 30px; } }
      `}</style>
    </footer>
  );
};

export default AgencyFooter;
