import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { 
  Coffee, Cpu, Code, Database, Cloud, GitBranch, Terminal, Shield, 
  Layers, HardDrive, Smartphone, Globe, Grid, LayoutList
} from 'lucide-react';
import { STAGGER } from '../motion';
import './Skills.css';

const skillsData = [
  { name: 'Java', icon: Coffee, level: '90%', category: 'Languages' },
  { name: 'React', icon: Code, level: '85%', category: 'Frontend' },
  { name: 'AI & ML', icon: Cpu, level: '75%', category: 'Data & AI' },
  { name: 'Databases', icon: Database, level: '80%', category: 'Backend' },
  { name: 'Cloud Computing', icon: Cloud, level: '70%', category: 'DevOps' },
  { name: 'Git & GitHub', icon: GitBranch, level: '90%', category: 'Tools' },
  { name: 'Shell Script', icon: Terminal, level: '80%', category: 'Systems' },
  { name: 'Security', icon: Shield, level: '75%', category: 'Security' },
  { name: 'REST APIs', icon: Layers, level: '85%', category: 'Architecture' },
  { name: 'Data Structures', icon: HardDrive, level: '85%', category: 'Core CS' },
  { name: 'Mobile Apps', icon: Smartphone, level: '70%', category: 'Mobile' },
  { name: 'Web Dev', icon: Globe, level: '90%', category: 'Frontend' }
];

export default function Skills() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'bars'
  const marqueeRef = useRef(null);
  const barRefs = useRef([]);

  // Clear barRefs on viewMode change to prevent stale refs
  useEffect(() => {
    barRefs.current = [];
  }, [viewMode]);

  // GSAP Marquee scroll
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 25,
        ease: 'none',
        repeat: -1
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  // GSAP Proficiency Bars scroll trigger animation
  useEffect(() => {
    if (viewMode === 'bars') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (prefersReduced) {
        barRefs.current.forEach((bar) => {
          if (bar) bar.style.width = bar.getAttribute('data-width');
        });
        return;
      }

      const ctx = gsap.context(() => {
        barRefs.current.forEach((bar) => {
          if (!bar) return;
          const targetWidth = bar.getAttribute('data-width');

          gsap.fromTo(bar,
            { width: '0%' },
            {
              width: targetWidth,
              duration: 1.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: bar,
                start: 'top 95%',
                toggleActions: 'play reverse play reverse'
              }
            }
          );
        });
      });

      return () => ctx.revert();
    }
  }, [viewMode]);

  // Global timeline hover pause behavior for Marquee
  const handleMarqueeMouseEnter = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    gsap.globalTimeline.pause();
  };

  const handleMarqueeMouseLeave = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    gsap.globalTimeline.play();
  };

  // Framer Motion Grid reveal animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: STAGGER.tight // 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container container">
        
        {/* Header Section */}
        <div className="skills-header">
          <div>
            <span className="section-label">Tech Stack</span>
            <h2 className="skills-title">Technical Expertise</h2>
          </div>
          
          {/* Dual-View Toggle Buttons */}
          <div className="view-toggle glassmorphism">
            <button 
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid View"
            >
              <Grid size={18} />
              <span>Grid</span>
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'bars' ? 'active' : ''}`}
              onClick={() => setViewMode('bars')}
              aria-label="Proficiency Bars View"
            >
              <LayoutList size={18} />
              <span>Bars</span>
            </button>
          </div>
        </div>

        {/* Dynamic Views */}
        {viewMode === 'grid' ? (
          /* Grid View */
          <motion.div 
            className="skills-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {skillsData.map((skill) => (
              <motion.div 
                key={skill.name} 
                className="skill-card neumorphic"
                variants={cardVariants}
              >
                <div className="skill-icon-wrapper">
                  <skill.icon size={28} className="skill-icon" />
                </div>
                <span className="skill-name">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Proficiency Bars View */
          <div className="skills-bars-container">
            {skillsData.map((skill, idx) => (
              <div key={skill.name} className="skill-bar-row">
                <div className="skill-bar-info">
                  <div className="skill-bar-title">
                    <skill.icon size={16} className="skill-icon-small" />
                    <span>{skill.name}</span>
                  </div>
                  <span className="skill-bar-percent">{skill.level}</span>
                </div>
                <div className="skill-bar-track">
                  <div 
                    ref={(el) => (barRefs.current[idx] = el)} 
                    className="skill-bar-fill" 
                    data-width={skill.level}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Marquee Strip */}
        <div className="marquee-section">
          <span className="marquee-title">Core Languages & Tools (Hover to Pause)</span>
          <div 
            className="marquee-container glassmorphism"
            onMouseEnter={handleMarqueeMouseEnter}
            onMouseLeave={handleMarqueeMouseLeave}
            style={{ cursor: 'pointer' }}
          >
            <div className="marquee-wrapper" ref={marqueeRef}>
              {/* First Half */}
              <div className="marquee-content">
                {skillsData.map((skill, i) => (
                  <div key={`m1-${i}`} className="marquee-item">
                    <skill.icon size={20} className="marquee-icon" />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
              {/* Second Half (duplicate for seamless loop) */}
              <div className="marquee-content" aria-hidden="true">
                {skillsData.map((skill, i) => (
                  <div key={`m2-${i}`} className="marquee-item">
                    <skill.icon size={20} className="marquee-icon" />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
