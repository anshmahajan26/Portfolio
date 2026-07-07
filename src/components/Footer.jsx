import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const [showButton, setShowButton] = useState(false);

  // Monitor scroll height to reveal back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const footerRevealVariants = {
    hidden: { y: prefersReduced ? 0 : 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.6, ease: 'easeOut' } 
    }
  };

  return (
    <footer className="footer-section">
      {/* Scroll Reveal Wrapper */}
      <motion.div
        className="footer-container container"
        variants={footerRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        
        {/* Footer 3-column layout */}
        <div className="footer-grid">
          {/* Brand/Logo */}
          <div className="footer-col brand-col">
            <span className="footer-brand">AG</span>
            <p className="footer-tagline">Crafting secure architectures & interactive designs.</p>
          </div>

          {/* Quick Links */}
          <div className="footer-col links-col">
            <h4 className="footer-subheading">Navigation</h4>
            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          {/* Copyright Info */}
          <div className="footer-col copyright-col">
            <h4 className="footer-subheading">Availability</h4>
            <p className="footer-status">Currently open to junior roles and software engineering opportunities.</p>
            <span className="footer-copy">© {new Date().getFullYear()} Antigravity. All rights reserved.</span>
          </div>
        </div>

      </motion.div>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            className="back-to-top-btn glassmorphism"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25 }}
            onClick={handleScrollToTop}
            aria-label="Scroll to Top"
          >
            <motion.div
              className="arrow-spin-wrapper"
              whileHover={prefersReduced ? {} : { rotate: -90 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUp size={20} />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
