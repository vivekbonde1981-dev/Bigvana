import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".thank-you-content", { opacity: 0, y: 30, duration: 1, ease: "power3.out" })
        .from(".success-check", { scale: 0, duration: 0.5, ease: "back.out(1.7)" }, "-=0.5")
        .from(".animate-text", { y: 20, opacity: 0, stagger: 0.1, duration: 0.8 }, "-=0.3");
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="thank-you-wrapper" style={{marginTop:"30px"}}>
      <div className="thank-you-content" ref={containerRef}>
        <div className="success-check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <h1 className="animate-text">Inquiry <span className="cyan-text">Received</span></h1>
        
        <p className="animate-text description">
         <strong>Thank you for sharing your vision with us</strong>
           <br />Your inquiry is in our queue. At BigVana, we value efficiency. We’ve received your details and are matching your needs with our technical leads. Expect a professional reach-out from our team within the next business day.
        </p>

        <div className="animate-text">
          <button className="nexgen-btn active" onClick={() => navigate('/')}>
            RETURN HOME
          </button>
        </div>
      </div>

      <style>{`
        .thank-you-wrapper {
          min-height: 60vh; /* Takes up space between header and footer */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          background: var(--bg-primary);
        }

        .thank-you-content {
          width: 100%;
          max-width: 600px;
          text-align: center;
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          padding: 50px 40px;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .success-check {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--accent-cyan), var(--accent-blue));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          padding: 20px;
          box-shadow: 0 10px 25px var(--glow);
          margin-bottom: 10px;
        }

        .thank-you-content h1 {
          font-size: clamp(2rem, 4vw, 3rem);
          color: var(--text-primary);
          font-weight: 800;
          margin: 0;
        }

        .description {
          color: var(--text-dim);
          line-height: 1.6;
          font-size: 1.1rem;
        }

        .nexgen-btn {
          margin-top: 10px;
          padding: 14px 40px;
          border-radius: 12px;
          border: none;
          font-weight: 800;
          transition: all 0.4s;
          background: linear-gradient(135deg, var(--accent-cyan), var(--accent-blue));
          color: #fff;
          cursor: pointer;
          box-shadow: 0 10px 25px var(--glow);
        }

        .nexgen-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }

        @media (max-width: 480px) {
          .thank-you-content { padding: 40px 20px; }
        }
      `}</style>
    </main>
  );
};

export default ThankYou;