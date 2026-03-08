import React, { useState } from 'react';
import { Github, ExternalLink, Code2, Cpu, Zap } from 'lucide-react';

const ProjectShowcase = () => {
  const projects = [
    {
      id: 1,
      title: "AI-Powered Task Automation",
      description: "Intelligent automation system that streamlines repetitive workflows using machine learning algorithms. Reduces manual work by 80% through smart scheduling and predictive analysis.",
      technologies: ["Python", "TensorFlow", "FastAPI", "Docker"],
      category: "Automation",
      github: "https://github.com/yourusername/ai-automation",
      live: "http://13.206.13.64/project/",
    },
    {
      id: 2,
      title: "Microservices Architecture Platform",
      description: "Scalable microservices platform built with containerization and orchestration. Handles 10M+ requests daily with 99.9% uptime through intelligent load balancing.",
      technologies: ["Node.js", "Kubernetes", "Redis", "PostgreSQL"],
      category: "Development",
      github: "https://github.com/yourusername/microservices",
      live: "http://localhost:3000",
    },
  ];

  const [filter, setFilter] = useState('All');
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="project-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .project-page {
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 20px;
          font-family: 'Inter', sans-serif;
          transition: background 0.4s ease, color 0.4s ease;
        }

        .project-inner {
          max-width: 80rem;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          flex-direction: column;
          gap: 20px;
        }

        .project-header { display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 20px; margin-bottom: 3rem; }

        .project-title {
          font-size: 3rem;
          font-weight: 700;
          background: linear-gradient(to right, var(--accent-light), var(--accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .project-subtitle { color: var(--text-body); font-size: 1.125rem; transition: color 0.4s ease; }

        .project-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; width: 100%; }
        @media (min-width: 1024px) { .project-grid { grid-template-columns: 1fr 1fr; } }

        .project-card {
          background: var(--bg-card-solid);
          border-radius: 0.75rem;
          overflow: hidden;
          border: 1px solid var(--border);
          transition: border-color 0.3s, box-shadow 0.3s, background 0.4s ease;
        }
        .project-card:hover {
          border-color: var(--accent);
          box-shadow: 0 20px 40px var(--glow);
        }

        .project-img {
          height: 12rem;
          position: relative;
          overflow: hidden;
        }
        .project-img-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.4);
          transition: background 0.3s;
        }
        .project-card:hover .project-img-overlay { background: rgba(0,0,0,0.2); }

        [data-theme="light"] .project-img-overlay { background: rgba(255,255,255,0.15); }
        [data-theme="light"] .project-card:hover .project-img-overlay { background: rgba(255,255,255,0.05); }

        .project-img-grad-1 { background: linear-gradient(135deg, var(--bg-secondary) 0%, #1a1a3e 100%); }
        .project-img-grad-2 { background: linear-gradient(135deg, var(--bg-card-solid) 0%, #1e1e3f 100%); }
        [data-theme="light"] .project-img-grad-1 { background: linear-gradient(135deg, #e0eaf5 0%, #c7d8f0 100%); }
        [data-theme="light"] .project-img-grad-2 { background: linear-gradient(135deg, #e8f0fa 0%, #d0e2f5 100%); }

        .project-img-actions { position: absolute; top: 1rem; right: 1rem; display: flex; gap: 0.5rem; }
        .project-img-btn {
          padding: 0.5rem;
          background: rgba(0,0,0,0.5);
          border-radius: 0.5rem;
          color: var(--text-primary);
          transition: background 0.3s;
          text-decoration: none;
          display: flex;
        }
        .project-img-btn:hover { background: var(--accent); color: #000; }
        [data-theme="light"] .project-img-btn { background: rgba(255,255,255,0.7); color: var(--text-primary); }
        [data-theme="light"] .project-img-btn:hover { background: var(--accent); color: #fff; }

        .project-badge {
          position: absolute; bottom: 1rem; left: 1rem;
          padding: 0.25rem 0.75rem;
          background: var(--glow);
          color: var(--accent-light);
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          border: 1px solid var(--border);
        }

        .project-body { padding: 1.5rem; }

        .project-card-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          margin-top: 0.6rem;
          transition: color 0.3s;
        }
        .project-card:hover .project-card-title { color: var(--accent); }

        .project-card-desc { color: var(--text-body); margin-bottom: 1rem; line-height: 1.7; transition: color 0.4s ease; }

        .project-techs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
        .project-tech {
          padding: 0.25rem 0.75rem;
          background: var(--bg-secondary);
          color: var(--accent-light);
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-family: monospace;
          border: 1px solid var(--border);
          transition: border-color 0.3s, background 0.4s ease;
        }
        .project-tech:hover { border-color: var(--accent); }

        .project-stats { padding: 0 1.5rem 1.5rem; display: flex; gap: 1rem; color: var(--text-muted); font-size: 0.875rem; transition: color 0.4s ease; }
        .project-stat { display: flex; align-items: center; gap: 0.25rem; }
        .project-stat-icon { color: var(--accent); }
      `}</style>

      <div className="project-inner">
        <div className="project-header">
          <h1 className="project-title">PROJECTS</h1>
          <p className="project-subtitle">Showcasing automation solutions and software development expertise</p>
        </div>

        <div className="project-grid">
          {filteredProjects.map((project, idx) => (
            <div key={project.id} className="project-card">
              <div className={`project-img project-img-grad-${idx + 1}`}>
                <div className="project-img-overlay" />
                <div className="project-img-actions">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-img-btn">
                      <Github size={20} />
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-img-btn">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
                <div className="project-badge">{project.category}</div>
              </div>

              <div className="project-body">
                <h2 className="project-card-title">{project.title}</h2>
                <p className="project-card-desc">{project.description}</p>
                <div className="project-techs">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="project-tech">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="project-stats">
                <div className="project-stat"><Code2 size={16} className="project-stat-icon" /><span>Clean Code</span></div>
                <div className="project-stat"><Cpu size={16} className="project-stat-icon" /><span>Optimized</span></div>
                <div className="project-stat"><Zap size={16} className="project-stat-icon" /><span>High Performance</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;
