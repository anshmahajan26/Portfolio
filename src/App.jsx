import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Certifications from './components/Certifications';
import { initLenis } from './motion';
import './App.css';

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = initLenis();

    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Certifications />
        
        {/* Placeholder section for Contact to allow scrolling */}
        <section id="contact" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '1px solid var(--border-glass)', paddingBlock: '8rem' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <span className="section-label">Get in Touch</span>
            <h2 style={{ marginTop: '16px' }}>Let's Create Something Exceptional</h2>
            <p style={{ marginTop: '16px', color: 'var(--text-secondary)', maxWidth: '600px', marginInline: 'auto' }}>
              Always open to discussing new opportunities, full-stack roles, or interesting collaborations.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
