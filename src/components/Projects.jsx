import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, X, Eye } from 'lucide-react';
import { EASE_STANDARD } from '../motion';
import dashboardImg from '../assets/dashboard_mockup.png';
import dataImg from '../assets/data_analysis_mockup.png';
import neuralImg from '../assets/neural_net_mockup.png';
import './Projects.css';

// Inline SVG Github component since brand icons are absent in this lucide-react version
const Github = ({ size = 24, className }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 1,
    title: "Enterprise Admin Panel",
    category: "Full-Stack",
    image: dashboardImg,
    tags: ["React", "Java Spring Boot", "PostgreSQL"],
    description: "A comprehensive administration control deck featuring real-time logging systems, telemetry reports, and structured tables.",
    extendedDesc: "This enterprise solution leverages Java Spring Boot on the backend to coordinate secure role-based access control and high-performance database indexing. The frontend utilizes React to construct fluid widgets, responsive telemetry charts, and reactive data tables.",
    live: "#",
    github: "#"
  },
  {
    id: 2,
    title: "AI Predictive Analytics Suite",
    category: "Data & AI",
    image: dataImg,
    tags: ["Python", "Pandas", "Scikit-Learn"],
    description: "Interactive data science dashboard providing predictive indicators and forecast curves over complex datasets.",
    extendedDesc: "A complete machine learning analytics platform that ingests structured data columns, applies predictive models, and exports interactive forecasts. Built on Python with data pipelines feeding into automated training routines.",
    live: "#",
    github: "#"
  },
  {
    id: 3,
    title: "Neural Graph Explorer",
    category: "AI & ML",
    image: neuralImg,
    tags: ["TensorFlow", "R3F", "Three.js"],
    description: "3D visualizer rendering deep learning node activations and weights in real-time in the browser.",
    extendedDesc: "An immersive graphical playground depicting feed-forward activations in deep convolutional neural networks. Implemented using React Three Fiber to display node clusters and tensor transformations at 60fps.",
    live: "#",
    github: "#"
  }
];

const categories = ["All", "Full-Stack", "Data & AI", "AI & ML"];

export default function Projects() {
  const [filterCategory, setFilterCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const gridRef = useRef(null);

  const filteredProjects = filterCategory === "All"
    ? projectsData
    : projectsData.filter(p => p.category === filterCategory);

  // GSAP ScrollTrigger.batch() for scroll reveals
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let ctx;
    // Timeout allows AnimatePresence layout transitions to finalize before recalculating triggers
    const timer = setTimeout(() => {
      const cards = gridRef.current?.querySelectorAll('.project-card');
      if (!cards || cards.length === 0) return;

      ctx = gsap.context(() => {
        // Set initial values
        gsap.set(cards, { opacity: 0, y: 40 });

        // Create new batch reveal
        ScrollTrigger.batch(cards, {
          interval: 0.1,
          onEnter: batch => gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto"
          }),
          onLeave: batch => gsap.to(batch, {
            opacity: 0,
            y: 40,
            overwrite: "auto"
          }),
          onEnterBack: batch => gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto"
          }),
          onLeaveBack: batch => gsap.to(batch, {
            opacity: 0,
            y: 40,
            overwrite: "auto"
          })
        });

        ScrollTrigger.refresh();
      }, gridRef);
    }, 300);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, [filterCategory]);

  // Framer Motion filter transition variants
  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, ease: EASE_STANDARD }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.25 }
    }
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container container">
        
        {/* Section Title & Filter Tabs */}
        <div className="projects-header">
          <div>
            <span className="section-label">Selected Work</span>
            <h2 className="projects-title">Featured Projects</h2>
          </div>

          <div className="filter-tabs glassmorphism">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-tab-btn ${filterCategory === cat ? 'active' : ''}`}
                onClick={() => setFilterCategory(cat)}
              >
                {filterCategory === cat && (
                  <motion.span
                    layoutId="active-filter-pill"
                    className="active-filter-bg"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="filter-tab-text">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid-wrapper">
          <motion.div
            ref={gridRef}
            className="projects-grid"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="project-card neumorphic"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Aspect Ratio 4/3 image region */}
                  <div className="project-image-container">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="project-overlay glassmorphism-strong">
                      <div>
                        <p className="project-overlay-desc">{project.description}</p>
                        <div className="project-tags">
                          {project.tags.map(t => (
                            <span key={t} className="project-tag-chip">{t}</span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="project-actions">
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="project-link-icon-btn"
                          onClick={(e) => e.stopPropagation()}
                          aria-label="Live Demo Link"
                        >
                          <ExternalLink size={18} />
                          <span>Live</span>
                        </a>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="project-link-icon-btn"
                          onClick={(e) => e.stopPropagation()}
                          aria-label="GitHub Repository Link"
                        >
                          <Github size={18} />
                          <span>Code</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Panel */}
                  <div className="project-content-panel glassmorphism">
                    <span className="project-card-category">{project.category}</span>
                    <div className="project-card-title-row">
                      <h3 className="project-card-title">{project.title}</h3>
                      <button className="project-view-more" aria-label="Open Details">
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
            <motion.div
              className="modal-content glassmorphism-strong"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: EASE_STANDARD }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="modal-close-btn"
                onClick={() => setSelectedProject(null)}
                aria-label="Close Modal"
              >
                <X size={20} />
              </button>

              <div className="modal-body">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="modal-image"
                />
                
                <div className="modal-info">
                  <span className="modal-category">{selectedProject.category}</span>
                  <h3 className="modal-title">{selectedProject.title}</h3>
                  
                  <p className="modal-description">{selectedProject.extendedDesc}</p>
                  
                  <div className="modal-tags">
                    {selectedProject.tags.map(t => (
                      <span key={t} className="project-tag-chip">{t}</span>
                    ))}
                  </div>

                  <div className="modal-links">
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noreferrer"
                      className="modal-btn primary-btn"
                    >
                      <ExternalLink size={18} />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="modal-btn secondary-btn glassmorphism"
                    >
                      <Github size={18} />
                      <span>GitHub Repository</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
