import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { nav } from 'framer-motion/client';
import { useNavigate } from 'react-router-dom';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    businessName: '', phone: '', email: '', service: '', bottleneck: '', launchDate: ''
  });
  const navigate = useNavigate();
  

  const isFormValid = Object.values(formData).every(val => val.trim() !== '');

  const titleRef     = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(containerRef.current, { opacity: 0, y: 30, duration: 1, ease: "power3.out" });
      gsap.from(".animate-in", { y: 20, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power2.out", delay: 0.2 });
    });
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
// 1. Initialize our states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    
    // 2. Start loading
    setIsSubmitting(true);
    setStatusMessage("Sending...");

    const formData = new FormData(event.target);
    formData.append("access_key", import.meta.env.VITE_WEB3FORM_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatusMessage("Success! Your message was sent.");
        event.target.reset();
        setTimeout(() => {
          navigate("/thank-you"); // Redirect to thank you page after 1 second
        }, 1000);
      } else {
        setStatusMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatusMessage("Network error. Check your connection.");
    } finally {
      // 3. Stop loading regardless of success or failure
      setIsSubmitting(false);
    }
  };

  

  return (
    <div className="page-wrapper">
      <div ref={containerRef} className="nexgen-container">

        <div className="text-section animate-in">
          <h1 ref={titleRef} className="main-title">
            Let's Build <br /> Something <br />
            <span className="cyan-text">Extraordinary</span>
          </h1>
          <p className="description">
            Tell us your vision, and we'll show you how to automate it.
          </p>
        </div>

        <form className="form-section" onSubmit={onSubmit}>
          <div className="grid-layout">
            <div className="field animate-in">
              <label>Business Name</label>
              <input type="text" name="businessName" placeholder="Company..." onChange={handleChange} />
            </div>
            <div className="field animate-in">
              <label>Phone</label>
              <input type="tel" name="phone" placeholder="Contact #" onChange={handleChange} />
            </div>
            <div className="field animate-in">
              <label>Email</label>
              <input type="email" name="email" placeholder="Email address" onChange={handleChange} />
            </div>
            <div className="field animate-in">
              <label>Service Needed</label>
              <select name="service" onChange={handleChange} className="nexgen-select">
                <option value="">Select a service...</option>
                <option value="software">Custom Software</option>
                <option value="automation">Automation</option>
                <option value="web">Web Dev</option>
              </select>
            </div>
            <div className="field animate-in full-width">
              <label>What's your 'Growth Bottleneck'?</label>
              <textarea name="bottleneck" rows="2" placeholder="What is holding you back?" onChange={handleChange} />
            </div>
            <div className="field animate-in">
              <label>Dream Launch Date</label>
              <input type="date" name="launchDate" onChange={handleChange} className="date-input" />
            </div>
            <div className="field animate-in btn-container">
              <button className={`nexgen-btn ${isFormValid ? 'active' : ''}`}>
                {isFormValid ? '🚀 SUBMIT INQUIRY' : 'COMPLETE FORM'}
              </button>
            </div>
          </div>
          {/* 5. Display the status message to the user */}
      {statusMessage && <p className="status-info" style={{marginTop:"10px", color: 'green'}}>{statusMessage}</p>}
        </form>
      </div>

      <style>{`
        @media (max-width: 600px) { .page-wrapper { margin-top: 50px; } }

        .page-wrapper {
          min-height: 100vh;
          background: var(--bg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          transition: background 0.4s ease;
        }

        .nexgen-container {
          width: 100%;
          max-width: 1200px;
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          border-radius: 24px;
          padding: 50px;
          display: flex;
          flex-direction: column;
          gap: 40px;
          transition: background 0.4s ease, border-color 0.4s ease;
        }

        @media (min-width: 1024px) {
          .nexgen-container { flex-direction: row; align-items: flex-start; }
          .text-section { flex: 1; position: sticky; top: 100px; }
          .form-section { flex: 1.5; }
        }

        .main-title {
          font-size: clamp(2.5rem, 5vw, 3.8rem);
          color: var(--text-primary);
          line-height: 1.1;
          font-weight: 800;
          margin-bottom: 20px;
          transition: color 0.4s ease;
        }

        .cyan-text { color: var(--accent-cyan); }
        .description { color: var(--text-dim); font-size: 1.1rem; line-height: 1.6; transition: color 0.4s ease; }

        .grid-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .full-width { grid-column: span 2; }

        .field label {
          display: block;
          color: var(--accent-cyan);
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          margin-bottom: 10px;
          letter-spacing: 1px;
        }

        input, select, textarea {
          width: 100%;
          background: var(--bg-input);
          border: 1px solid var(--border-card);
          border-radius: 12px;
          padding: 14px 18px;
          color: var(--text-primary);
          font-size: 1rem;
          outline: none;
          transition: border 0.3s, background 0.4s ease, color 0.4s ease;
        }

        input::placeholder, textarea::placeholder { color: var(--text-muted); }

        input:focus, select:focus, textarea:focus { border-color: var(--accent-cyan); }

        select option {
          background: var(--bg-card-solid);
          color: var(--text-primary);
        }

        .nexgen-btn {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          border: none;
          background: var(--bg-secondary);
          color: var(--text-muted);
          font-weight: 800;
          cursor: not-allowed;
          transition: all 0.4s;
        }

        .nexgen-btn.active {
          background: linear-gradient(135deg, var(--accent-cyan), var(--accent-blue));
          color: #fff;
          cursor: pointer;
          box-shadow: 0 10px 25px var(--glow);
        }

        @media (max-width: 768px) {
          .nexgen-container { padding: 30px 20px; }
          .grid-layout { grid-template-columns: 1fr; }
          .full-width { grid-column: span 1; }
          .main-title { font-size: 2.5rem; text-align: center; }
          .description { text-align: center; margin: 0 auto; }
          .btn-container { margin-top: 10px; }
        }

        .date-input::-webkit-calendar-picker-indicator {
          filter: invert(0.5) hue-rotate(180deg);
        }
        [data-theme="dark"] .date-input::-webkit-calendar-picker-indicator {
          filter: invert(1) hue-rotate(180deg);
        }
      `}</style>
    </div>
  );
};

export default ContactForm;
