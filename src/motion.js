import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Global Motion Tokens
export const EASE_STANDARD = [0.22, 1, 0.36, 1];      // custom cubic-bezier, GSAP: "power3.out"
export const EASE_SNAPPY   = [0.16, 1, 0.3, 1];        // for hover/tap
export const DURATION = { fast: 0.25, base: 0.5, slow: 0.8, section: 1.1 };
export const STAGGER = { tight: 0.05, base: 0.09, loose: 0.15 };

// Determine if reduced motion is preferred
export const isReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Configure GSAP defaults
if (!isReducedMotion()) {
  ScrollTrigger.defaults({
    toggleActions: "play reverse play reverse",
    start: "top 80%",
    end: "bottom 20%",
  });
} else {
  // If reduced motion is preferred, simplify transitions/scroll animation setups
  ScrollTrigger.defaults({
    toggleActions: "play none none none",
    start: "top 100%",
    end: "bottom 0%",
  });
}

// Lenis initialization helper
export const initLenis = () => {
  if (typeof window === 'undefined' || isReducedMotion()) {
    return null;
  }
  
  const lenis = new Lenis({ 
    duration: 1.2, 
    easing: (t) => 1 - Math.pow(1 - t, 3), 
    smoothWheel: true 
  });

  // Sync Lenis with GSAP ScrollTrigger & Ticker
  lenis.on('scroll', ScrollTrigger.update);
  
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  
  return lenis;
};

// Framer Motion helper variants that respect prefers-reduced-motion
export const getFadeInVariant = (direction = 'up', distance = 40) => {
  const reduced = isReducedMotion();
  
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: 0.2 }
      }
    };
  }

  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance }
  };

  return {
    hidden: { 
      opacity: 0, 
      ...directions[direction] 
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: { 
        duration: DURATION.base,
        ease: EASE_STANDARD
      }
    }
  };
};

export const getStaggerContainer = (staggerChildren = STAGGER.base) => {
  const reduced = isReducedMotion();
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : staggerChildren
      }
    }
  };
};
