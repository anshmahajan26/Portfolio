import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useInView, animate } from 'framer-motion';
import gsap from 'gsap';
import { EASE_STANDARD } from '../motion';
import portraitImg from '../assets/about-portrait.png';
import './About.css';

// Reusable Stat Counter with scroll trigger & performance optimizations
function StatCounter({ targetValue, suffix = "" }) {
  const count = useMotionValue(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        count.set(targetValue);
        if (ref.current) {
          ref.current.textContent = targetValue + suffix;
        }
        return;
      }

      count.set(0);

      const controls = animate(count, targetValue, {
        duration: 1.8,
        ease: EASE_STANDARD,
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.round(latest) + suffix;
          }
        }
      });
      return () => controls.stop();
    } else {
      if (ref.current) {
        ref.current.textContent = "0";
      }
      count.set(0);
    }
  }, [isInView, targetValue, count, suffix]);

  return <span ref={ref}>0</span>;
}

export default function About() {
  const sectionRef = useRef(null);
  const imageColumnRef = useRef(null);
  const headingRef = useRef(null);
  const descParagraphsRef = useRef(null);
  const statsGridRef = useRef(null);

  const stats = [
    { value: 3, suffix: "+", label: "Years Experience" },
    { value: 40, suffix: "+", label: "Projects Completed" },
    { value: 15, suffix: "+", label: "OSS Contributions" },
    { value: 99, suffix: "%", label: "Success Rate" }
  ];

  // Framer Motion 3D Hover Tilt hook setup (±18deg sensitivity)
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [18, -18]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-18, 18]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  // GSAP ScrollTrigger for precise outer-to-inner entrance animations
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%', // Starts when About section is 75% from the top of viewport
          toggleActions: 'play reverse play reverse'
        }
      });

      // 1. Image column slides in from left
      tl.fromTo(imageColumnRef.current,
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      // 2. Heading slides in from top
      tl.fromTo(headingRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.6'
      );

      // 3. Paragraphs slide in from right
      const paragraphs = descParagraphsRef.current ? descParagraphsRef.current.querySelectorAll('.about-description-para') : [];
      if (paragraphs.length > 0) {
        tl.fromTo(paragraphs,
          { x: 120, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.15 },
          '-=0.4'
        );
      }

      // 4. Stats cards slide up from bottom
      const cards = statsGridRef.current ? statsGridRef.current.querySelectorAll('.stat-card') : [];
      if (cards.length > 0) {
        tl.fromTo(cards,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1 },
          '-=0.4'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about-section">
      <div className="about-container container">
        
        {/* Left Column: Portrait image with 3D hover tilt */}
        <div ref={imageColumnRef} className="about-image-column">
          <motion.div
            className="about-image-frame glassmorphism"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
              rotateX, 
              rotateY, 
              transformStyle: 'preserve-3d', 
              perspective: 1000 
            }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="about-image-wrapper">
              <img 
                src={portraitImg} 
                className="about-portrait" 
                alt="Developer Portrait" 
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>

        {/* Right Column: Text block with outer-to-inner directions */}
        <div className="about-text-column">
          {/* Label and Heading: Slide in from Top */}
          <div ref={headingRef}>
            <span className="section-label">About Me</span>
            <h2 className="about-heading">
              Engineering High-Performance Digital Solutions
            </h2>
          </div>

          {/* Paragraphs: Slide in from Right */}
          <div ref={descParagraphsRef}>
            <p className="about-description about-description-para">
              I am a dedicated Artificial Intelligence & Data Science student and a passionate software developer. My approach combines robust engineering architecture with smooth visual polish to create memorable digital interactions.
            </p>
            <p className="about-description about-description-para">
              Whether designing high-throughput database pipelines or refining user interfaces, I prioritize writing clean, maintainable, and modular code. I thrive on solving complex backend problems and translating them into elegant frontend solutions.
            </p>
          </div>

          {/* Stat Cards Container: Stagger up from Bottom */}
          <div ref={statsGridRef} className="about-stats-grid">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="stat-card glassmorphism"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <span className="stat-number">
                  <StatCounter targetValue={stat.value} suffix={stat.suffix} />
                </span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
