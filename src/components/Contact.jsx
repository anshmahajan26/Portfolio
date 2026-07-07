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

const LeetcodeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M16.102 17.93l-2.69 2.607c-.466.451-1.211.451-1.677 0l-4.51-4.37c-.467-.453-.467-1.188 0-1.64l8.877-8.61c.466-.452 1.212-.452 1.678 0 .466.452.466 1.188 0 1.641l-8.038 7.79 3.325 3.22 3.035-2.937c.346-.334.908-.334 1.254 0 .346.335.346.878 0 1.213l-3.254 3.15c-.173.167-.402.25-.631.25-.229 0-.458-.083-.631-.25l-2.062-2-3.325-3.22 8.038-7.79c.173-.168.454-.168.627 0 .173.168.173.442 0 .61L16.102 17.93zM5.787 5.856c-.346-.335-.908-.335-1.254 0l-3.254 3.15a.812.812 0 0 0 0 1.213l4.51 4.37c.346.335.908.335 1.254 0a.885.885 0 0 0 0-1.213l-3.883-3.764 2.627-2.543a.885.885 0 0 0 0-1.213z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
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
                href="https://github.com/anshmahajan26"
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
                href="https://www.linkedin.com/in/ansh-mahajan26052004b"
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
                href="https://leetcode.com/u/anshmahajan345/"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn neumorphic"
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={socialSpring}
                aria-label="LeetCode Profile"
              >
                <LeetcodeIcon />
              </motion.a>
              <motion.a
                href="mailto:anshmahajan345@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn neumorphic"
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={socialSpring}
                aria-label="Email Address"
              >
                <MailIcon />
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
