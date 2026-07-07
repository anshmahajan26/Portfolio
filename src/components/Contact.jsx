import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

// Inline Brand Icons (since brand icons are absent in this lucide version)
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6h-1.6c-.7 0-1.4.3-1.8.8l-1.4 1.8h-2.4l-1.4-1.8c-.4-.5-1.1-.8-1.8-.8H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h2c.8 0 1.5-.5 1.8-1.2L11 16h2l1.2 2.8c.3.7 1 1.2 1.8 1.2h2c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
    <circle cx="9" cy="11" r="1.5" fill="currentColor" />
    <circle cx="15" cy="11" r="1.5" fill="currentColor" />
  </svg>
);

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [messageFocused, setMessageFocused] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitStatus('submitting');
    
    // Simulate API delay for button morphing animations
    setTimeout(() => {
      setSubmitStatus('success');
      
      // Reset form after a feedback delay
      setTimeout(() => {
        setName('');
        setEmail('');
        setMessage('');
        setSubmitStatus('idle');
      }, 3000);
    }, 2000);
  };

  const socialSpring = { type: 'spring', stiffness: 300, damping: 12 };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container container">
        
        <div className="contact-header">
          <span className="section-label">Get In Touch</span>
          <h2 className="contact-title">Let's Connect</h2>
        </div>

        <div className="contact-grid">
          {/* Left Column: Social Connections */}
          <div className="contact-social-info">
            <h3 className="contact-subheading">Collaborations & Opportunities</h3>
            <p className="contact-desc">
              I am always open to exploring full-stack engineering roles, database pipelines optimization work, or participating in machine learning studies. Feel free to reach out directly via the form or my social profiles.
            </p>

            {/* Social Icons 44px circles */}
            <div className="contact-social-icons">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn neumorphic"
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={socialSpring}
                aria-label="GitHub Profile"
              >
                <GithubIcon />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn neumorphic"
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={socialSpring}
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn neumorphic"
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={socialSpring}
                aria-label="Twitter Profile"
              >
                <TwitterIcon />
              </motion.a>
              <motion.a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn neumorphic"
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={socialSpring}
                aria-label="Discord Server Link"
              >
                <DiscordIcon />
              </motion.a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit} className="contact-form glassmorphism-strong">
              
              {/* Name Input */}
              <div className={`input-group ${nameFocused || name ? 'filled' : ''}`}>
                <input
                  type="text"
                  required
                  value={name}
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                  onChange={(e) => setName(e.target.value)}
                  disabled={submitStatus !== 'idle'}
                  id="contact-name"
                />
                <label htmlFor="contact-name">Your Name</label>
                <span className="input-bar" />
              </div>

              {/* Email Input */}
              <div className={`input-group ${emailFocused || email ? 'filled' : ''}`}>
                <input
                  type="email"
                  required
                  value={email}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitStatus !== 'idle'}
                  id="contact-email"
                />
                <label htmlFor="contact-email">Email Address</label>
                <span className="input-bar" />
              </div>

              {/* Message TextArea */}
              <div className={`input-group ${messageFocused || message ? 'filled' : ''}`}>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onFocus={() => setMessageFocused(true)}
                  onBlur={() => setMessageFocused(false)}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={submitStatus !== 'idle'}
                  id="contact-message"
                />
                <label htmlFor="contact-message">How can I help you?</label>
                <span className="input-bar" />
              </div>

              {/* Submit Button Wrapper */}
              <div className="submit-btn-wrapper">
                <button
                  type="submit"
                  className={`submit-btn ${submitStatus === 'submitting' ? 'submitting' : ''} ${submitStatus === 'success' ? 'success' : ''}`}
                  disabled={submitStatus !== 'idle'}
                >
                  {submitStatus === 'idle' && <span>Send Message</span>}
                  
                  {submitStatus === 'submitting' && (
                    <div className="btn-spinner" />
                  )}
                  
                  {submitStatus === 'success' && (
                    <svg className="success-checkmark" viewBox="0 0 52 52">
                      <path d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
