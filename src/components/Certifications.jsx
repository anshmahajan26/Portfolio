import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { Award, Calendar, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import './Certifications.css';

const certsData = [
  {
    id: 1,
    title: "Full Stack Web Development",
    issuer: "Apna College",
    date: "2024",
    credentialId: "APNA-FSWD-101"
  },
  {
    id: 2,
    title: "SQL (Certified)",
    issuer: "HackerRank",
    date: "2024",
    credentialId: "HR-SQL-CERT"
  },
  {
    id: 3,
    title: "JavaScript (Intermediate)",
    issuer: "HackerRank",
    date: "2024",
    credentialId: "HR-JS-INTER"
  },
  {
    id: 4,
    title: "Building with the Claude API",
    issuer: "Anthropic",
    date: "2025",
    credentialId: "ANTH-CLAUDE-API"
  },
  {
    id: 5,
    title: "Claude Code in Action",
    issuer: "Anthropic",
    date: "2025",
    credentialId: "ANTH-CLAUDE-CODE"
  }
];

export default function Certifications() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const x = useMotionValue(0);

  // Cards are 280px wide + 24px grid gap = 304px step
  const cardStep = 304;

  // Calculate constraints dynamically on resize/mount
  useEffect(() => {
    const calculateConstraints = () => {
      if (containerRef.current && trackRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;
        const delta = trackWidth - containerWidth;
        setMaxScroll(delta > 0 ? delta : 0);
      }
    };

    calculateConstraints();
    // Allow images/content to fully paint before calculating
    const timer = setTimeout(calculateConstraints, 200);

    window.addEventListener('resize', calculateConstraints);
    return () => {
      window.removeEventListener('resize', calculateConstraints);
      clearTimeout(timer);
    };
  }, []);

  // Flick snapping velocity handler
  const handleDragEnd = (event, info) => {
    const currentX = x.get();
    const velocityFactor = 0.2;
    const velocityX = info.velocity.x;
    
    // Project target coordinate based on drag velocity
    const targetX = currentX + velocityX * velocityFactor;
    
    // Find nearest matching card index
    const nearestIndex = Math.round(-targetX / cardStep);
    const maxIndex = certsData.length - 1;
    const clampedIndex = Math.max(0, Math.min(maxIndex, nearestIndex));
    
    // Snap target X position
    const snapTarget = -clampedIndex * cardStep;

    animate(x, snapTarget, {
      type: "spring",
      stiffness: 300,
      damping: 30
    });
  };

  // Nav buttons click handlers
  const handlePrev = () => {
    const currentX = x.get();
    const nearestIndex = Math.round(-currentX / cardStep);
    const prevIndex = Math.max(0, nearestIndex - 1);
    animate(x, -prevIndex * cardStep, { type: "spring", stiffness: 300, damping: 30 });
  };

  const handleNext = () => {
    const currentX = x.get();
    const nearestIndex = Math.round(-currentX / cardStep);
    const nextIndex = Math.min(certsData.length - 1, nearestIndex + 1);
    animate(x, -nextIndex * cardStep, { type: "spring", stiffness: 300, damping: 30 });
  };

  return (
    <section id="certifications" className="certs-section">
      <div className="certs-container container">
        
        {/* Title & Nav Buttons */}
        <div className="certs-header">
          <div>
            <span className="section-label">Achievements</span>
            <h2 className="certs-title">Certifications</h2>
          </div>
          
          <div className="certs-nav glassmorphism">
            <button 
              className="certs-nav-btn" 
              onClick={handlePrev}
              aria-label="Previous Slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className="certs-nav-btn" 
              onClick={handleNext}
              aria-label="Next Slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Drag Carousel Outer track */}
        <div ref={containerRef} className="carousel-container">
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{ left: -maxScroll, right: 0 }}
            dragElastic={0.15}
            style={{ x }}
            onDragEnd={handleDragEnd}
            className="carousel-track"
          >
            {certsData.map((cert) => (
              <div key={cert.id} className="carousel-card glassmorphism">
                <div className="cert-card-header">
                  <div className="cert-badge glassmorphism">
                    <Award size={20} className="icon-award" />
                  </div>
                  <div className="cert-check">
                    <ShieldCheck size={16} className="icon-check" />
                  </div>
                </div>

                <div className="cert-body">
                  <h3 className="cert-card-title">{cert.title}</h3>
                  <span className="cert-issuer">{cert.issuer}</span>
                </div>

                <div className="cert-footer">
                  <div className="cert-date">
                    <Calendar size={12} />
                    <span>{cert.date}</span>
                  </div>
                  <span className="cert-id">{cert.credentialId}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="carousel-hint">
          <span>← Drag horizontally to navigate →</span>
        </div>

      </div>
    </section>
  );
}
