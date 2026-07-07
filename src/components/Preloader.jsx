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

    // 2.6s logo draw and load + 0.2s hold
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 2600);

    // 0.8s exit slide transition
    const doneTimer = setTimeout(() => {
      setIsDone(true);
      if (onComplete) onComplete();
    }, 3400);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div className={`preloader-overlay ${exiting ? 'exiting' : ''}`}>
      <div className="preloader-content">
        {/* Name Reveal */}
        <div className="preloader-name-container">
          <h1 className="preloader-name">Ansh Mahajan</h1>
        </div>

        {/* Sword Loader SVG */}
        <div className="sword-loader-container">
          <svg viewBox="0 0 300 80" className="sword-svg" aria-label="Sword Loading Animation">
            <defs>
              {/* Glow Filter for the sparked blade */}
              <filter id="sword-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              
              {/* Glowing Linear Gradient for the blade fill */}
              <linearGradient id="sword-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent-1)" />
                <stop offset="100%" stopColor="var(--accent-2)" />
              </linearGradient>
            </defs>

            {/* Pommel */}
            <circle cx="20" cy="40" r="5" className="sword-hilt-pommel" />
            {/* Grip / Handle */}
            <rect x="25" y="37" width="25" height="6" rx="2" className="sword-hilt-grip" />
            {/* Crossguard */}
            <path d="M 50 20 L 50 60" className="sword-crossguard" />

            {/* Sword Blade Outline (base path) */}
            <path 
              d="M 50 35 L 250 35 L 265 40 L 250 45 L 50 45 Z" 
              className="sword-blade-bg" 
            />

            {/* Sword Blade Spark/Fill (the loading effect) */}
            <path 
              d="M 50 35 L 250 35 L 265 40 L 250 45 L 50 45 Z" 
              className="sword-blade-fill" 
            />

            {/* Central Fuller Line (adds high-fidelity detail) */}
            <path 
              d="M 52 40 L 245 40" 
              className="sword-fuller" 
            />

            {/* The Spark particle running along the blade */}
            <circle cx="0" cy="40" r="5" className="sword-spark" filter="url(#sword-glow)" />
          </svg>
        </div>

        <span className="preloader-status">Forging Portfolio...</span>
      </div>
    </div>
  );
}
