import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  
  // Storing positions in refs to prevent React re-renders at 60fps
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (prefersReduced || isTouch) return;

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!visible) setVisible(true);
      
      // Move inner dot instantly (offset 4px for center of 8px dot)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }
    };

    const onMouseEnterWindow = () => setVisible(true);
    const onMouseLeaveWindow = () => setVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnterWindow);
    document.addEventListener('mouseleave', onMouseLeaveWindow);

    // Hover detection for interactive items
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const interactive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.hasAttribute('data-cursor-hover') ||
        target.closest('[data-cursor-hover]');
        
      setHovered(!!interactive);
    };

    window.addEventListener('mouseover', handleMouseOver);

    // LERP ring follow loop
    let rAF;
    const tick = () => {
      const lerpFactor = 0.15;
      
      const dx = mouse.current.x - ringPos.current.x;
      const dy = mouse.current.y - ringPos.current.y;
      
      ringPos.current.x += dx * lerpFactor;
      ringPos.current.y += dy * lerpFactor;
      
      // Move outer ring (offset 18px for center of 36px ring)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px, 0)`;
      }
      
      rAF = requestAnimationFrame(tick);
    };
    
    rAF = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnterWindow);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rAF);
    };
  }, [visible]);

  return (
    <>
      <div 
        ref={dotRef} 
        className={`custom-cursor-dot ${visible ? 'visible' : ''}`} 
      />
      <div 
        ref={ringRef} 
        className={`custom-cursor-ring ${visible ? 'visible' : ''} ${hovered ? 'hovered' : ''}`} 
      />
    </>
  );
}
