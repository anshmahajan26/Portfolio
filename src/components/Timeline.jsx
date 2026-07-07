import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, GraduationCap } from 'lucide-react';
import './Timeline.css';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    id: 1,
    type: "experience",
    date: "2024 - Present",
    title: "Software Engineer Intern",
    company: "Hexa Systems Inc.",
    description: "Developing responsive frontend interfaces using React.js and engineering Spring Boot backend microservices. Refactored database indexes to reduce read latencies by 30%.",
    side: "left"
  },
  {
    id: 2,
    type: "education",
    date: "2023 - 2025 (Expected)",
    title: "M.Sc. Artificial Intelligence & Data Science",
    company: "Apex Tech University",
    description: "Deep dive into artificial neural networks, deep learning systems, predictive algorithms, and statistical analysis models.",
    side: "right"
  },
  {
    id: 3,
    type: "experience",
    date: "2021 - 2023",
    title: "Junior Data Analyst",
    company: "DataMetrics Solutions",
    description: "Constructed Python pipelines for database extraction, compiled monthly reports with Seaborn, and designed automated ETL procedures.",
    side: "left"
  },
  {
    id: 4,
    type: "education",
    date: "2018 - 2021",
    title: "B.Sc. Computer Science",
    company: "State Science Institute",
    description: "Acquired core engineering foundations: Java OOP, database design, computer networks, and advanced data structures.",
    side: "right"
  }
];

export default function Timeline() {
  const lineRef = useRef(null);
  const timelineRef = useRef(null);

  // GSAP ScrollTrigger for vertical timeline line drawing
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const anim = gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: 0.5
        }
      }
    );

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, []);

  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Generate card slide-in variants based on alternating side
  const getCardVariants = (side) => {
    const startX = side === 'left' ? -40 : 40;
    return {
      hidden: {
        x: prefersReduced ? 0 : startX,
        opacity: 0
      },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.5, // DURATION.base
          ease: [0.22, 1, 0.36, 1] // EASE_STANDARD
        }
      }
    };
  };

  return (
    <section ref={timelineRef} id="timeline" className="timeline-section">
      <div className="timeline-container container">
        
        {/* Title */}
        <div className="timeline-header">
          <span className="section-label">My Path</span>
          <h2 className="timeline-title">Experience & Education</h2>
        </div>

        {/* Timeline Layout */}
        <div className="timeline-layout">
          
          {/* Drawing Vertical Line */}
          <div ref={lineRef} className="timeline-line" />

          {/* Timeline Items */}
          {timelineData.map((item) => {
            const isLeft = item.side === 'left';
            
            return (
              <div 
                key={item.id} 
                className={`timeline-item ${isLeft ? 'left' : 'right'}`}
              >
                {/* Neumorphic Pulsing Node */}
                <div className="timeline-node" />

                {/* Card Container with slide in animation on scroll */}
                <motion.div
                  className="timeline-card glassmorphism"
                  variants={getCardVariants(item.side)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <div className="timeline-card-header">
                    <span className="timeline-date">{item.date}</span>
                    <div className="timeline-icon-badge glassmorphism">
                      {item.type === 'experience' ? (
                        <Briefcase size={16} className="icon-exp" />
                      ) : (
                        <GraduationCap size={16} className="icon-edu" />
                      )}
                    </div>
                  </div>

                  <h3 className="timeline-item-title">{item.title}</h3>
                  <h4 className="timeline-item-company">{item.company}</h4>
                  <p className="timeline-item-desc">{item.description}</p>
                </motion.div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
