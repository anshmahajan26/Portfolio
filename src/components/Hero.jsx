import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';
import { DURATION, EASE_STANDARD } from '../motion';
import './Hero.css';

// Reusable Magnetic Button Component
function MagneticButton({ children, className, href }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Center of button
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;

    // Mouse coordinates relative to viewport
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Distance from center of button
    const distanceX = mouseX - centerX;
    const distanceY = mouseY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < 80) {
      // Map distance within 80px to max 12px translation
      const strength = 12;
      const pct = (80 - distance) / 80; // 1 at center, 0 at edge
      const moveX = (distanceX / distance) * strength * pct;
      const moveY = (distanceY / distance) * strength * pct;
      x.set(moveX);
      y.set(moveY);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      className={className}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.a>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const backgroundRef = useRef(null);
  const blobAmberRef = useRef(null);
  const blobRoseRef = useRef(null);
  const blobGraphiteRef = useRef(null);
  const dotRef = useRef(null);

  // Typewriter Role Rotator State
  const roles = ["Java Full-Stack Developer", "Data Analyst", "AI & DS Student"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter Effect
  useEffect(() => {
    let timer;
    const currentRole = roles[currentRoleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, 25); // Delete speed: 25ms/char
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) => currentRole.slice(0, prev.length + 1));
      }, 45); // Type speed: 45ms/char
    }

    // Fully typed: Hold 1800ms
    if (!isDeleting && currentText === currentRole) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
    }

    // Fully deleted: Move to next role
    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex]);

  // GSAP Background Animations and Pin/Scale/Fade effects
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Continuous blob drifting
    const animateBlob = (el, xVal, yVal, dur) => {
      return gsap.to(el, {
        xPercent: xVal,
        yPercent: yVal,
        duration: dur,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    };

    const animAmber = animateBlob(blobAmberRef.current, 15, -15, 14);
    const animRose = animateBlob(blobRoseRef.current, -15, 15, 16);
    const animGraphite = animateBlob(blobGraphiteRef.current, 10, 12, 12);

    // Scrollcue traveling dot animation
    const cueAnim = gsap.timeline({ repeat: -1 });
    cueAnim.fromTo(dotRef.current,
      { y: 0, opacity: 0 },
      { opacity: 1, duration: 0.3 }
    ).to(dotRef.current,
      { y: 35, ease: 'power1.inOut', duration: 1.0 }
    ).to(dotRef.current,
      { opacity: 0, duration: 0.3 }
    );

    // Hero ScrollTrigger Pin & Background Scale/Fade animation
    const pinTrigger = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: 1,
      }
    });

    pinTrigger.to(backgroundRef.current, {
      scale: 1.15,
      opacity: 0,
      ease: 'none'
    });

    return () => {
      animAmber.kill();
      animRose.kill();
      animGraphite.kill();
      cueAnim.kill();
      if (pinTrigger.scrollTrigger) pinTrigger.scrollTrigger.kill();
      pinTrigger.kill();
    };
  }, []);

  // Framer Motion headline reveal animation
  const title = "Forging Next-Gen Digital Interfaces";
  const words = title.split(" ");

  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.09, // STAGGER.base
        delayChildren: 0.2
      }
    }
  };

  const wordVariants = {
    hidden: { y: prefersReduced ? 0 : '110%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: DURATION.slow, // 0.8
        ease: EASE_STANDARD // [0.22, 1, 0.36, 1]
      }
    }
  };

  // Entry animation configurations for sections
  const captionVariants = {
    hidden: { y: prefersReduced ? 0 : -30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.5, ease: EASE_STANDARD, delay: 0.1 } 
    }
  };

  const rotatorVariants = {
    hidden: { x: prefersReduced ? 0 : -45, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { duration: 0.5, ease: EASE_STANDARD, delay: 0.3 } 
    }
  };

  const descVariants = {
    hidden: { x: prefersReduced ? 0 : 45, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { duration: 0.5, ease: EASE_STANDARD, delay: 0.4 } 
    }
  };

  const actionsVariants = {
    hidden: { y: prefersReduced ? 0 : 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.5, ease: EASE_STANDARD, delay: 0.5 } 
    }
  };

  const cueVariants = {
    hidden: { y: prefersReduced ? 0 : 15, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.5, ease: EASE_STANDARD, delay: 0.7 } 
    }
  };

  return (
    <section ref={heroRef} id="home" className="hero-section">
      {/* Mesh Gradient Background Blobs */}
      <div ref={backgroundRef} className="hero-bg">
        <div ref={blobAmberRef} className="hero-blob blob-amber" />
        <div ref={blobRoseRef} className="hero-blob blob-rose" />
        <div ref={blobGraphiteRef} className="hero-blob blob-graphite" />
      </div>

      <div className="hero-content container">
        {/* Caption Label */}
        <motion.span 
          className="section-label hero-caption"
          variants={captionVariants}
          initial="hidden"
          animate="visible"
        >
          Interactive Portfolio
        </motion.span>

        {/* Clip-reveal Headline */}
        <motion.h1
          className="hero-title"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, i) => (
            <span key={i} className="hero-word-wrapper">
              <motion.span className="hero-word-inner" variants={wordVariants}>
                {word}
              </motion.span>
              {i < words.length - 1 && '\u00A0'}
            </span>
          ))}
        </motion.h1>

        {/* Role Rotator (Typewriter Effect) */}
        <motion.div 
          className="role-rotator"
          variants={rotatorVariants}
          initial="hidden"
          animate="visible"
        >
          <span className="role-prefix">I am an&nbsp;</span>
          <span className="role-text-gradient">
            {currentText}
            <span className="role-cursor" />
          </span>
        </motion.div>

        {/* Introduction */}
        <motion.p 
          className="hero-description"
          variants={descVariants}
          initial="hidden"
          animate="visible"
        >
          A passionate software creator specializing in robust architectures, interactive digital experiences, and neat user interfaces.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="hero-actions"
          variants={actionsVariants}
          initial="hidden"
          animate="visible"
        >
          <MagneticButton href="#projects" className="hero-btn primary-btn">
            <span>Explore Work</span>
          </MagneticButton>
          <MagneticButton href="#contact" className="hero-btn secondary-btn glassmorphism">
            <span>Let's Talk</span>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Cue */}
      <motion.a 
        href="#about" 
        className="scroll-cue" 
        aria-label="Scroll Down"
        variants={cueVariants}
        initial="hidden"
        animate="visible"
      >
        <span className="scroll-cue-text">Scroll Down</span>
        <div className="scroll-line">
          <div ref={dotRef} className="scroll-dot" />
        </div>
      </motion.a>
    </section>
  );
}
