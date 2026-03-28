import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../ThemeContext";
import { useNavigate } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";
import {
  Search,
  Menu,
  X,
  ChevronRight,
  Github,
  Twitter,
  Linkedin,
  ArrowRight,
  Clock,
  User,
  Tag,
  Bookmark,
  MessageCircle,
  Instagram
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AutoSoftHeros() {
  const heroRef = useRef(null);
  const videoWrapRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const paragraphRef = useRef(null);
  const btnRef = useRef(null);
  const iconRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollConfig = {
        trigger: heroRef.current,
        start: "top 65%",
        toggleActions: "play none none none",
      };
      gsap.fromTo(
        videoWrapRef.current,
        { opacity: 0, x: -80, scale: 0.92 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: scrollConfig,
          delay: 0.5,
        },
      );
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: scrollConfig,
      });
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1 },
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.8 },
          "-=0.5",
        )
        .fromTo(
          paragraphRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4",
        ).fromTo(
          iconRef.current,
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.3",
        )
        .fromTo(
          btnRef.current,
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.3",
        );
      const btn = btnRef.current;
      if (btn) {
        btn.addEventListener("mouseenter", () =>
          gsap.to(btn, { scale: 1.07, duration: 0.2, ease: "power2.out" }),
        );
        btn.addEventListener("mouseleave", () =>
          gsap.to(btn, { scale: 1, duration: 0.2, ease: "power2.in" }),
        );
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const { isDark } = useTheme();

  return (
    <div ref={heroRef} className="asd-hero">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap');

        .asd-hero {
          min-height: 100vh;
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 40px 60px;
          font-family: 'Syne', 'Space Grotesk', sans-serif;
          transition: background 0.4s ease;
        }

        .asd-grid {
          max-width: 1300px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          position: relative;
          z-index: 10;
        }

        .asd-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 12px;
        }

        .asd-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .asd-btn {
          position: relative;
          padding: 0 48px;
          height: 54px;
          background: linear-gradient(135deg, var(--accent-cyan), var(--accent));
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 2px;
          text-transform: uppercase;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          overflow: hidden;
          box-shadow: 0 0 30px var(--glow), 0 4px 20px var(--glow);
          transition: box-shadow 0.3s ease;
        }

        .asd-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s ease;
        }

        .asd-btn:hover::before { left: 100%; }
        .asd-btn:hover { box-shadow: 0 0 50px var(--glow-hi), 0 4px 30px var(--glow); }

        @keyframes shimmer {
          0% { background-position: 0% center }
          100% { background-position: 200% center }
        }

        @media (max-width: 768px) {
          .asd-hero { padding: 100px 20px 60px; }
          .asd-grid { grid-template-columns: 1fr; gap: 32px; }
          .asd-video { max-height: 380px; object-fit: cover; }
          .asd-btn { width: 100%; justify-content: center; }
        }

        @media (max-width: 480px) {
          .asd-hero { padding: 90px 16px 48px; }
        }
      `}</style>

      <div className="asd-grid">
        <video
          ref={videoWrapRef}
          src={isDark ? "robot.mp4" : "robot2.mp4"}
          autoPlay
          muted
          loop
          playsInline
          className="asd-video"
          style={{ marginBottom: "200px" }}
        />

        <div ref={contentRef} className="asd-content">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "-8px",
            }}
          >
            <span
              style={{
                display: "block",
                width: "32px",
                height: "2px",
                background:
                  "linear-gradient(to right, var(--accent-cyan), var(--accent))",
              }}
            />
            <span
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "12px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--accent-cyan)",
                fontWeight: 400,
              }}
            >
              Software · Automation · Growth
            </span>
          </div>

          <div ref={titleRef}>
            <h1
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(32px, 4.5vw, 62px)",
                fontWeight: 800,
                color: "var(--text-primary)",
                lineHeight: 1.1,
                margin: 0,
                letterSpacing: "-1px",
                transition: "color 0.4s ease",
              }}
            >
              Welcome to{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent) 60%, var(--accent-cyan) 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shimmer 4s linear infinite",
                }}
              >
                BigVana
              </span>
              <br />
              <span style={{ color: "var(--text-secondary)" }}></span>
            </h1>
          </div>

          <div ref={subtitleRef}>
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "clamp(15px, 1.8vw, 22px)",
                fontStyle: "italic",
                fontWeight: 300,
                color: "var(--accent-cyan)",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              We listen, we innovate, and we deliver.
            </p>
          </div>

          <div
            ref={paragraphRef}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "16px",
                color: "var(--text-body)",
                lineHeight: 1.8,
                margin: 0,
                transition: "color 0.4s ease",
              }}
            >
              In today's fast-paced landscape, efficiency isn't just an
              advantage—it's a necessity. At AutoSoft, we specialize in bridging
              the gap between ambitious ideas and functional reality.
            </p>
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "16px",
                color: "var(--text-body)",
                lineHeight: 1.8,
                margin: 0,
                transition: "color 0.4s ease",
              }}
            >
              Whether you're looking to reclaim hours through intelligent
              automation or need high-performance custom software tailored to
              your goals—we build the engine that drives your growth.
            </p>
          </div>

          <div className="flex gap-4" ref={iconRef}>
            <a
              href="https://wa.me/919689299714?text=Hi%20Vivek%20from%20Bigvana!%20I'm%20interested%20in%20your%20Automation,%20Web%20and%20Software%20Services."
               target="_blank" 
                  rel="noreferrer"
              className="p-2 rounded-full hover:text-[rgb(56,189,248)] transition-all"
            >
              <IoLogoWhatsapp
                size={40}
                //  color={[!isDark? 'black' : 'white']}
              />
            </a>
           
            <a
              href="https://www.linkedin.com/company/bigvana"
               target="_blank" 
                  rel="noreferrer"
              className="p-2 rounded-full hover:text-[#38bdf8] transition-all"
            >
              <Linkedin size={40} />
            </a>
            <a
              href="https://www.instagram.com/bigvana.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noreferrer"

              className="p-2 rounded-full hover:text-[#38bdf8] transition-all"
            >
              <Instagram size={40} />
            </a>
          </div>

          <div
            ref={btnRef}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginTop: "8px",
            }}
          >
            <button
              className="asd-btn"
              onClick={navigate.bind(null, "/contact")}
            >
              Hire Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
