import { useState, useRef, useEffect } from 'react'
import gsap from "gsap";
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

export default function Header() {
  const headerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    gsap.fromTo(headerRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 });
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 1, name: 'HOME',     slug: "/" },
    { id: 2, name: "OUR WORK", slug: "/projects" },
    { id: 3, name: "ABOUT",    slug: "/about" },
    { id: 4, name: "SERVICE",  slug: "/service" },
  ];

  const mobileNavItems = [
    { id: 1, name: 'HOME',     slug: "/" },
    { id: 2, name: "OUR WORK", slug: "/projects" },
    { id: 3, name: "ABOUT",    slug: "/about" },
    { id: 4, name: "SERVICE",  slug: "/service" },
    { id: 5, name: "CONTACT",  slug: "/contact" },
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-[75px] flex items-center ${
        scrolled || isOpen
          ? 'backdrop-blur-xl border-b'
          : 'bg-transparent'
      }`}
      style={{
        backgroundColor: scrolled || isOpen ? 'var(--bg-header)' : 'transparent',
        borderColor: scrolled || isOpen ? 'var(--scrolled-border)' : 'transparent',
      }}
    >
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 flex items-center justify-between">

        {/* Logo */}
        <div className="lasan flex items-center gap-3 cursor-pointer group">
          
          <div className="relative w-15 h-10 flex items-center justify-center">
           <img src="icon.png" alt="Author" style={{height:"50px",width:"150px",marginTop:"5px"}} />
            {/* <div
              className="absolute inset-0 border-2 rounded-lg rotate-45 transition-transform group-hover:rotate-[225deg]"
              style={{ borderColor: 'var(--accent)' }}
            />
            <div className="relative w-5 h-5 rounded-[3px]" style={{ backgroundColor: 'var(--accent)' }} /> */}
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-bold font-['Montserrat']" style={{ color: 'var(--text-primary)' }}>
              BigVana<span style={{ color: 'var(--accent)' }}>.</span>
            </span>
            <span className="text-[8px] font-medium tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
              Software Studio
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center justify-between gap-10">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.slug}
              style={{
                color: 'var(--text-muted)',
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.82rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--nav-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right: Theme Toggle + Contact */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="theme-toggle-btn"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? (
              /* Sun icon */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              /* Moon icon */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <Link to="/contact">
            <button className="qf-cta-btn qf-nav-cta" style={{ height: "35px", width: "130px", backgroundColor: 'var(--accent)', color: isDark ? '#000' : '#fff' }}>
              <span></span>CONTACT
            </button>
          </Link>
        </div>

        {/* Mobile: Toggle + Burger */}
        <div className="md:hidden flex items-center gap-2" style={{ marginRight: "20px" }}>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="theme-toggle-btn"
          >
            {isDark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <button
            className="text-2xl"
            style={{ color: 'var(--accent)' }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="absolute top-[75px] left-0 w-full flex flex-col p-6 gap-4 md:hidden border-b justify-center items-center"
          style={{
            backgroundColor: 'var(--bg-mobile-menu)',
            borderColor: 'var(--scrolled-border)',
          }}
        >
          {mobileNavItems.map((item) => (
            <Link
              key={item.id}
              to={item.slug}
              className="text-lg font-medium"
              style={{ color: 'var(--text-steel)' }}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 600px) { .lasan { margin-left: 15px; } }
        @media (min-width: 1200px) { .lasan { margin-left: 40px; } }

        .qf-cta-btn {
          font-family: 'Montserrat', sans-serif; font-weight: 700;
          font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase;
          border: none; cursor: pointer;
          padding: 11px 24px; border-radius: 9999px;
          box-shadow: 0 0 20px var(--glow);
          transition: box-shadow 0.25s, transform 0.2s;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .qf-cta-btn:hover {
          box-shadow: 0 0 36px var(--glow-hi);
          transform: translateY(-2px);
        }
        .qf-nav-cta { padding: 10px 20px; font-size: 0.68rem; }

        .theme-toggle-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid var(--border-hi);
          background: var(--bg-glass);
          color: var(--accent);
          cursor: pointer;
          transition: background 0.25s, border-color 0.25s, box-shadow 0.25s, transform 0.2s;
          backdrop-filter: blur(10px);
        }
        .theme-toggle-btn:hover {
          background: var(--bg-glass2);
          border-color: var(--accent);
          box-shadow: 0 0 16px var(--glow);
          transform: rotate(15deg) scale(1.08);
        }
      `}</style>
    </header>
  );
}
