import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { DURATION, EASE_STANDARD } from '../motion';
import './Navbar.css';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [activeLink, setActiveLink] = useState('Home');
  const [theme, setTheme] = useState('dark');
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  // Toggle theme logic
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  };

  // GSAP ScrollTrigger for glass transition
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReduced) {
      const handleScroll = () => {
        if (window.scrollY > 40) {
          navRef.current?.classList.add('nav-scrolled');
        } else {
          navRef.current?.classList.remove('nav-scrolled');
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }

    // GSAP ScrollTrigger setup
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top+=40',
        end: 'top top+=120',
        scrub: 0.3,
      }
    });

    tl.fromTo(navRef.current,
      {
        backgroundColor: 'rgba(18, 18, 20, 0)',
        backdropFilter: 'blur(0px) saturate(100%)',
        webkitBackdropFilter: 'blur(0px) saturate(100%)',
        borderColor: 'rgba(255, 255, 255, 0)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0)'
      },
      {
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        backdropFilter: 'blur(20px) saturate(160%)',
        webkitBackdropFilter: 'blur(20px) saturate(160%)',
        borderColor: 'rgba(255, 255, 255, 0.14)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
        ease: 'none'
      }
    );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <>
      <nav ref={navRef} className="navbar">
        <div className="navbar-container container">
          {/* Logo / Initials */}
          <a href="#home" className="logo" onClick={() => setActiveLink('Home')}>
            <span className="logo-gradient">AG</span>
          </a>

          {/* Nav Links (Desktop) */}
          <div className="nav-links-desktop">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`nav-item ${activeLink === link.name ? 'active' : ''}`}
                onClick={() => setActiveLink(link.name)}
              >
                {activeLink === link.name && (
                  <motion.span
                    layoutId="nav-pill"
                    className="nav-pill-bg"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="nav-item-text">{link.name}</span>
              </a>
            ))}
          </div>

          {/* Right Section (Theme Toggle + CTA + Hamburger) */}
          <div className="nav-right">
            {/* Theme Toggle Button */}
            <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle Theme">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 180 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // EASE_SNAPPY
                  className="theme-icon-wrapper"
                >
                  {theme === 'dark' ? <Sun size={20} className="icon-sun" /> : <Moon size={20} className="icon-moon" />}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* CTA Button (Desktop) */}
            <a href="#contact" className="cta-btn neumorphic-btn">
              <span>Let's Talk</span>
            </a>

            {/* Hamburger Trigger (Mobile) */}
            <button className="hamburger-btn" onClick={() => setIsOpen(true)} aria-label="Open Menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Drawer Backdrop */}
            <motion.div
              className="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              className="drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: DURATION.base, ease: EASE_STANDARD }}
            >
              <div className="drawer-header">
                <span className="logo-gradient">AG</span>
                <button className="close-btn" onClick={() => setIsOpen(false)} aria-label="Close Menu">
                  <X size={24} />
                </button>
              </div>

              <div className="drawer-links">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`drawer-link-item ${activeLink === link.name ? 'active' : ''}`}
                    onClick={() => {
                      setActiveLink(link.name);
                      setIsOpen(false);
                    }}
                  >
                    <span>{link.name}</span>
                  </a>
                ))}
                <a
                  href="#contact"
                  className="drawer-cta-btn neumorphic-btn"
                  onClick={() => setIsOpen(false)}
                >
                  <span>Let's Talk</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
