import React, { useEffect, useState } from 'react';
import './Preloader.css';

export default function Preloader({ onComplete }) {
  const [exiting, setExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReduced) {
      // In reduced motion, exit preloader immediately with simple fade
      const timer = setTimeout(() => {
        setIsDone(true);
        if (onComplete) onComplete();
      }, 200);
      return () => clearTimeout(timer);
    }

    // 1.2s logo draw + 0.2s hold
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 1400);

    // 0.8s clip-path exit transition
    const doneTimer = setTimeout(() => {
      setIsDone(true);
      if (onComplete) onComplete();
    }, 2200);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div className={`preloader-overlay ${exiting ? 'exiting' : ''}`}>
      <div className="preloader-content">
        <svg viewBox="0 0 200 100" className="preloader-logo" aria-label="Ansh Mahajan Logo">
          <defs>
            <linearGradient id="preloader-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-1)" />
              <stop offset="100%" stopColor="var(--accent-2)" />
            </linearGradient>
          </defs>
          {/* Logo A */}
          <path 
            d="M 40 80 L 70 20 L 100 80 M 52 56 L 88 56" 
            className="logo-path" 
          />
          {/* Logo G (styled as M for Mahajan or G for Genius/Design) */}
          {/* Let's write Mahajan M or custom digital G initials: G initials are gorgeous */}
          <path 
            d="M 160 32 C 144 18, 114 18, 114 50 C 114 82, 144 82, 160 68 L 160 50 L 132 50" 
            className="logo-path" 
          />
        </svg>
        <span className="preloader-status">Initializing System...</span>
      </div>
    </div>
  );
}
