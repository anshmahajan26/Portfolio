import React, { useEffect, useRef, useState } from 'react';
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
    date: "Apr 2025 – Oct 2025",
    title: "React Developer Intern",
    company: "JP Technology",
    description: "Built responsive React.js UI components with Tailwind CSS and integrated backend REST APIs. Optimized frontend performance with debouncing and throttling for search and high-frequency UI events to minimize renders. Leveraged GitHub Copilot and ChatGPT for boilerplate acceleration, manually validating and integrating the code.",
    side: "left"
  },
  {
    id: 2,
    type: "experience",
    date: "Dec 2024 – Jan 2025",
    title: "Web Development Intern",
    company: "NewAI Lab",
    description: "Developed a web-based Expense Tracker application. Prompted ChatGPT to draft edge-case test scenarios for calculation logic, and manually validated and extended them to resolve rounding and negative-value bugs. Integrated frontend modules with backend APIs for database storage.",
    side: "right"
  },
  {
    id: 3,
    type: "education",
    date: "2022 – 2026",
    title: "B.E. in Artificial Intelligence & Data Science",
    company: "G.S.M. College of Engineering, Pune (SPPU)",
    description: "Maintained a strong CGPA of 9.50. Focus on deep neural networks, machine learning algorithms, database management, and building intelligent web systems.",
    side: "left"
  },
  {
    id: 4,
    type: "education",
    date: "2021 – 2022",
    title: "Higher Secondary Certificate (Class 12)",
    company: "Nutan Vidyalaya Malkapur",
    description: "Completed higher secondary education with a final score of 89.83%.",
    side: "right"
  },
  {
    id: 5,
    type: "education",
    date: "2019 – 2020",
    title: "Secondary School Certificate (Class 10)",
    company: "D.E.S Highschool Datala",
    description: "Graduated secondary school with a final score of 96.40%.",
    side: "left"
  }
];

export default function Timeline() {
  const lineRef = useRef(null);
  const progressDotRef = useRef(null);
  const timelineRef = useRef(null);
  const [activeCardId, setActiveCardId] = useState(null);

  // GSAP ScrollTrigger for vertical timeline line drawing & moving progress dot
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Draw line
      gsap.fromTo(lineRef.current,
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

      // 2. Animate tracker dot along the line
      gsap.fromTo(progressDotRef.current,
        { 
          y: 0,
          xPercent: -50,
          yPercent: -50
        },
        {
          y: () => {
            const layout = timelineRef.current?.querySelector('.timeline-layout');
            return layout ? layout.offsetHeight : 0;
          },
          xPercent: -50,
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const layout = timelineRef.current?.querySelector('.timeline-layout');
              const totalHeight = layout ? layout.offsetHeight : 0;
              const dotY = progress * totalHeight;

              const items = timelineRef.current?.querySelectorAll('.timeline-item');
              let currentActiveId = null;

              if (items) {
                items.forEach((itemNode) => {
                  const id = parseInt(itemNode.getAttribute('data-id'));
                  const nodeElement = itemNode.querySelector('.timeline-node');
                  if (!nodeElement) return;

                  // offsetTop relative to parent (.timeline-layout)
                  const nodeY = itemNode.offsetTop + nodeElement.offsetTop + (nodeElement.offsetHeight / 2);

                  if (Math.abs(dotY - nodeY) <= 30) {
                    currentActiveId = id;
                  }
                });
              }
              setActiveCardId(currentActiveId);
            }
          }
        }
      );
    }, timelineRef);

    return () => ctx.revert();
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

          {/* Moving progress dot on scroll */}
          <div ref={progressDotRef} className="timeline-progress-dot" />

           {/* Timeline Items */}
          {timelineData.map((item) => {
            const isLeft = item.side === 'left';
            
            return (
              <div 
                key={item.id} 
                data-id={item.id}
                className={`timeline-item ${isLeft ? 'left' : 'right'}`}
              >
                {/* Neumorphic Pulsing Node */}
                <div className="timeline-node" />

                {/* Card Container with slide in animation on scroll */}
                <motion.div
                  className={`timeline-card glassmorphism ${activeCardId === item.id ? 'highlighted' : ''}`}
                  variants={getCardVariants(item.side)}
                  initial="hidden"
                  whileInView="visible"
                  exit="hidden"
                  viewport={{ once: false, amount: 0.4, margin: "0px 0px -10% 0px" }}
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
