import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import { initLenis } from './motion';
import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = initLenis();
    if (lenis) {
      window.lenis = lenis;
    }

    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoaded(true);
  };

  return (
    <>
      {/* 1. Page Preloader Overlay */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* 2. Custom LERP Cursor Follower */}
      <CustomCursor />

      {/* 3. Navigation Bar */}
      <Navbar />

      {/* Main Content Layout */}
      <main>
        {/* Pass loader status to synchronize Hero entrance timeline */}
        <Hero isLoaded={isLoaded} />
        
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Certifications />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;
