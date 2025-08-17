import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import image from './assets/vysakh.png';
import emailjs from '@emailjs/browser';

// --- IMPORT YOUR LOCAL IMAGES ---
import ulsavamImage from './assets/ulsavam.jpeg';
import lakeImage from './assets/lake.jpeg';
import mudiyettImage from './assets/mudiyett.jpeg';
import portrait1Image from './assets/portrait1.jpeg';
import portrait2Image from './assets/portrait2.jpeg';
import portrait3Image from './assets/portrait3.jpeg';
import portrait4Image from './assets/portrait4.jpeg';
/* import portrait5Image from './assets/portrait5.jpeg';
import portrait6Image from './assets/portrait6.jpeg';
import portrait7Image from './assets/portrait7.jpeg';
import portrait8Image from './assets/portrait8.jpeg';
import portrait9Image from './assets/portrait9.jpeg';
import portrait10Image from './assets/portrait10.jpeg';
import portrait11Image from './assets/portrait11.jpeg';
import portrait12Image from './assets/portrait12.jpeg';
import portrait13Image from './assets/portrait13.jpeg'; */
import streetImage from './assets/street.jpeg';
import theyyamImage from './assets/theyyam.jpeg';

// Initialize EmailJS with environment variable
emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);

// --------- HELPER HOOK for Scroll Animations ---------
const useIntersectionObserver = (options) => {
  const [node, setNode] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const observer = useRef(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.current.unobserve(entry.target);
      }
    }, options);
    const { current: currentObserver } = observer;
    if (node) currentObserver.observe(node);
    return () => currentObserver.disconnect();
  }, [node, options]);
  return [setNode, isVisible];
};

// --------- SVG ICONS ---------
const InstagramIcon = () => (<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>);
const LinkedInIcon = () => (<svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>);
const WhatsAppIcon = () => (<svg viewBox="0 0 24 24"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.23-1.237a9.983 9.983 0 004.782 1.22c5.506 0 9.989-4.478 9.989-9.985C22.001 6.492 17.518 2.004 12.012 2zm4.65 14.24c-.277.78-1.641 1.48-2.402 1.614-.75.133-1.668.12-2.725-.302-.635-.253-1.448-.589-2.48-1.092-4.336-2.117-7.156-6.604-7.373-6.91-.216-.304-1.756-2.324-1.756-4.435s1.108-3.146 1.501-3.576c.392-.431.856-.539 1.142-.539.285 0 .57.001.82.015.263.014.613-.1.958.731.353.851 1.204 2.936 1.311 3.146s.179.486.037.784-.214.499-.428.784-.428.499-.612.784c-.179.285-.365.593-.156.964.209.372.931 1.537 2 2.489 1.385 1.201 2.521 1.614 2.892 1.792s.599.149.82-.09.936-1.09 1.184-1.462.499-.372.82-.223 2.073.978 2.427 1.156.599.267.695.417-.107.958-.384 1.738z"/></svg>);
const PhoneIcon = () => (<svg viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27 11.17 11.17 0 003.48.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.17 11.17 0 00.57 3.48 1 1 0 01-.27 1.11z"/></svg>);
const SunIcon = () => (<svg viewBox="0 0 24 24"><path d="M12 9c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 1c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zm0-7c.552 0 1 .448 1 1v2c0 .552-.448 1-1 1s-1-.448-1-1v-2c0-.552.448-1 1-1zm0 14c.552 0 1 .448 1 1v2c0 .552-.448 1-1 1s-1-.448-1-1v-2c0-.552.448-1 1-1zm-7-6c.552 0 1 .448 1 1h2c0 .552-.448 1-1 1s-1-.448-1-1h-2c0-.552.448-1 1-1zm14 0c.552 0 1 .448 1 1h2c0 .552-.448 1-1 1s-1-.448-1-1h-2c0-.552.448-1 1-1zm-9.778-5.778c.391-.391 1.023-.391 1.414 0l1.414 1.414c.391.391.391 1.023 0 1.414-.391.391-1.023.391-1.414 0l-1.414-1.414c-.391-.391-.391-1.023 0-1.414zm11.164 11.164c.391-.391 1.023-.391 1.414 0l1.414 1.414c.391.391.391 1.023 0 1.414-.391.391-1.023.391-1.414 0l-1.414-1.414c-.391-.391-.391-1.023 0-1.414zm-1.414-9.75c.391.391.391 1.023 0 1.414l-1.414 1.414c-.391.391-1.023.391-1.414 0-.391-.391-.391-1.023 0-1.414l1.414-1.414c.391-.391 1.023-.391 1.414 0zm-11.164 11.164c.391-.391 1.023-.391 1.414 0l1.414 1.414c.391.391.391 1.023 0 1.414s-1.023.391-1.414 0l-1.414-1.414c-.39-.391-.39-1.023 0-1.414z"/></svg>);
const MoonIcon = () => (<svg viewBox="0 0 24 24"><path d="M12 11.25c1.928 0 3.614 1.04 4.5 2.639-2.294.527-4 2.555-4 4.861 0 .504.084.99.233 1.451-2.399-.493-4.233-2.521-4.233-4.851 0-2.761 2.239-5 5-5zm-4.009 2.191c-2.859.459-5.012 2.87-5.012 5.809 0 3.195 2.582 5.75 5.76 5.75 3.039 0 5.539-2.321 5.75-5.305-1.921 1.517-4.322 2.305-6.741 2.305-2.859 0-5.467-1.126-7.382-3.042.434-3.528 3.393-6.267 6.951-6.267.383 0 .762.035 1.134.101-1.412.863-2.328 2.365-2.5 4.099z"/></svg>);
const SystemIcon = () => (<svg viewBox="0 0 24 24"><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/></svg>);

// --------- NAVBAR COMPONENT ---------
const Navbar = ({ activeSection, sections, onNavClick, cycleTheme, theme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shuttleStyle, setShuttleStyle] = useState({});
  const navLinksRef = useRef({});

  useEffect(() => {
    const activeLinkEl = navLinksRef.current[activeSection];
    if (activeLinkEl) {
      setShuttleStyle({
        width: `${activeLinkEl.offsetWidth}px`,
        left: `${activeLinkEl.offsetLeft}px`,
      });
    }
  }, [activeSection]);

  const handleLinkClick = (ref) => {
    onNavClick(ref);
    setIsMenuOpen(false);
  };
  
  const navLinks = ['Home', 'Portfolio', 'About', 'Contact'];

  return (
    <>
      <header className="weaver-nav">
        <div className="nav-container">
          <div className="nav-brand" onClick={() => onNavClick(sections.home)}>VR</div>
          <div className="nav-links-desktop">
            <div className="nav-shuttle" style={shuttleStyle}></div>
            {navLinks.map(link => (
              <button
                key={link}
                ref={el => navLinksRef.current[link.toLowerCase()] = el}
                className={activeSection === link.toLowerCase() ? 'active' : ''}
                onClick={() => onNavClick(sections[link.toLowerCase()])}
              >
                {link}
              </button>
            ))}
          </div>
          <div className="nav-actions">
            <button className="theme-toggle" onClick={cycleTheme} title={`Current: ${theme}. Switch to next.`}>
              {theme === 'light' && <SunIcon />}
              {theme === 'dark' && <MoonIcon />}
              {theme === 'system' && <SystemIcon />}
            </button>
            <button className="menu-toggle-mobile" onClick={() => setIsMenuOpen(true)}>Menu</button>
          </div>
        </div>
      </header>
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'is-open' : ''}`}>
        <button className="menu-close-btn" onClick={() => setIsMenuOpen(false)}>&times;</button>
        <div className="mobile-nav-links">
          {navLinks.map((link, index) => (
            <button key={link} onClick={() => handleLinkClick(sections[link.toLowerCase()])} style={{ animationDelay: `${0.1 + index * 0.07}s` }}>
              {link}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

// --------- CURSOR COMPONENT ---------
const Cursor = () => {
  const cursorRef = useRef(null);
  useEffect(() => {
    const moveCursor = (e) => {
      cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);
  return <div ref={cursorRef} className="custom-cursor"></div>;
};

// --------- HERO SECTION COMPONENT ---------
const Hero = ({ innerRef }) => (
  <section ref={innerRef} id="home" className="hero-section">
    <div className="hero-background">
      <img src={lakeImage} alt="Serene Kerala backwaters" />
    </div>
    <div className="hero-overlay"></div>
    <div className="hero-content">
      <h1 className="hero-name">
        {'Vysakh R'.split('').map((char, i) => <span key={i} style={{ animationDelay: `${0.1 + i * 0.05}s` }}>{char === ' ' ? '\u00A0' : char}</span>)}
      </h1>
      <p className="hero-tagline">Visual Storyteller from God's Own Country</p>
    </div>
    <div className="scroll-indicator"><div className="scroll-line"></div></div>
  </section>
);

// --------- STAGGERED PARALLAX PORTFOLIO ---------
const Portfolio = ({ innerRef }) => {
  const [setNode, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const gridRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Check for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Parallax scroll effect (desktop only)
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) return; // Disable on mobile
      const columns = gridRef.current.children;
      const scrollY = window.scrollY;
      // Apply different speeds to different columns
      columns[0].style.transform = `translateY(${scrollY * 0.05}px)`;
      columns[1].style.transform = `translateY(${scrollY * 0.12}px)`;
      columns[2].style.transform = `translateY(${scrollY * 0.03}px)`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allImages = [
    { id: 1, src: theyyamImage, title: 'Theyyam Ritual' },
    { id: 6, src: portrait1Image, title: 'The Gaze' },
    { id: 3, src: mudiyettImage, title: 'Mudiyettu Performer' },
    { id: 4, src: lakeImage, title: 'Serene Backwaters' },
    { id: 7, src: portrait2Image, title: 'Contemplation' },
    { id: 2, src: ulsavamImage, title: 'Temple Festival' },
    { id: 8, src: portrait3Image, title: 'Elder Wisdom' },
    { id: 5, src: streetImage, title: 'Street Moments' },
    { id: 9, src: portrait4Image, title: 'Quiet Strength' },
  ];

  // Distribute images into three columns for desktop
  const columns = [[], [], []];
  allImages.forEach((image, index) => {
    columns[index % 3].push(image);
  });

  return (
    <section ref={innerRef} id="portfolio">
      <div ref={setNode} className={`section-header ${isVisible ? 'visible' : ''}`}>
        <h2>Portfolio</h2>
      </div>
      
      {/* Desktop View - 3 Column Grid */}
      {!isMobile && (
        <div className="portfolio-grid desktop-grid" ref={gridRef}>
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="portfolio-column">
              {column.map((img, imgIndex) => (
                <div key={img.id} className={`portfolio-item ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${0.1 + (colIndex * 0.05 + imgIndex * 0.1)}s` }}>
                  <img src={img.src} alt={img.title} className="portfolio-image" loading="lazy" />
                  <div className="portfolio-overlay">
                    <h3>{img.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Mobile View - Innovative Carousel */}
      {isMobile && (
        <div className="portfolio-mobile">
          <div className="portfolio-carousel">
            {allImages.map((img, index) => (
              <div 
                key={img.id} 
                className={`portfolio-card-mobile ${isVisible ? 'visible' : ''}`} 
                style={{ 
                  animationDelay: `${0.1 + index * 0.08}s`,
                  '--card-index': index 
                }}
              >
                <div className="card-inner">
                  <div className="card-front">
                    <img src={img.src} alt={img.title} loading="lazy" />
                    <div className="card-gradient"></div>
                    <div className="card-title">
                      <h3>{img.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

// --------- ABOUT SECTION COMPONENT ---------
const About = ({ innerRef }) => {
  const [setNode, isVisible] = useIntersectionObserver({ threshold: 0.3 });
  return (
    <section ref={innerRef} id="about">
      <div ref={setNode} className={`about-container ${isVisible ? 'visible' : ''}`}>
        <div className="about-photo-wrapper">
          <div className="abstract-background">
            <div className="abstract-shape shape-1"></div>
            <div className="abstract-shape shape-2"></div>
            <div className="abstract-shape shape-3"></div>
            <div className="abstract-shape shape-4"></div>
          </div>
          <div className="about-photo">
            <img src={image} alt="Vysakh R, photographer" />
          </div>
        </div>
        <div className="about-text">
          <h2 className="about-title">Vysakh R</h2>
          <p className="about-philosophy">My lens is a bridge between the timeless traditions of Kerala and the pulse of modern life. I seek the stories whispered by the monsoon rains and painted in the vibrant hues of our festivals and traditions.</p>
          <p>This is more than a profession; it's my language. Let's collaborate and translate your story into something unforgettable.</p>
          <a href="mailto:rvysakh96@gmail.com" className="contact-link-button">Start a Conversation</a>
        </div>
      </div>
    </section>
  );
};

// --------- CONTACT SECTION COMPONENT ---------
const Contact = ({ innerRef }) => {
  const [setNode, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [messageState, setMessageState] = useState({ type: '', text: '', visible: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  
  const showMessage = (type, text) => {
    setMessageState({ type, text, visible: true });
    setTimeout(() => {
      setMessageState(prev => ({ ...prev, visible: false }));
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check if environment variables are available
    if (!process.env.REACT_APP_EMAILJS_SERVICE_ID || 
        !process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 
        !process.env.REACT_APP_EMAILJS_PUBLIC_KEY) {
      console.error('EmailJS environment variables are not configured properly');
      showMessage('error', 'Email service is not configured. Please contact me directly at rvysakh96@gmail.com');
      setIsSubmitting(false);
      return;
    }

    try {
      // Create template parameters object
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Vysakh R', // Your name
      };

      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      
      showMessage('success', `Thank you, ${formData.name}! Your message has been sent successfully.`);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      showMessage('error', 'Sorry, there was an error sending your message. Please try again or contact me directly at rvysakh96@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={innerRef} id="contact">
      <div ref={setNode} className={`section-header ${isVisible ? 'visible' : ''}`}><h2>Get In Touch</h2></div>
      <div className={`contact-container ${isVisible ? 'visible' : ''}`}>
        <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder=" " 
              disabled={isSubmitting}
            />
            <label htmlFor="name">Your Name</label>
          </div>
          <div className="form-group">
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder=" " 
              disabled={isSubmitting}
            />
            <label htmlFor="email">Your Email</label>
          </div>
          <div className="form-group">
            <textarea 
              id="message" 
              name="message" 
              rows="5" 
              value={formData.message} 
              onChange={handleChange} 
              required 
              placeholder=" "
              disabled={isSubmitting}
            ></textarea>
            <label htmlFor="message">Your Message</label>
          </div>
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          
          {/* Message Display */}
          <div className={`form-message ${messageState.type} ${messageState.visible ? 'visible' : ''}`}>
            {messageState.text}
          </div>
        </form>
        <div className="contact-info">
          <div className="contact-details">
            <div className="phone-contact">
              <PhoneIcon />
              <div className="contact-text">
                <span className="contact-label">Phone</span>
                <a href="tel:+919567890123" className="contact-value">+91 95678 90123</a>
              </div>
            </div>
            <div className="whatsapp-contact">
              <WhatsAppIcon />
              <div className="contact-text">
                <span className="contact-label">WhatsApp</span>
                <a 
                  href="https://wa.me/919249876203?text=Hi%20Vysakh,%20I'd%20like%20to%20discuss%20a%20photography%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-value"
                >
                  Chat with me
                </a>
              </div>
            </div>
          </div>
          <div className="social-links">
            <a href="https://www.instagram.com/wanderlust_lens_stories/" target="_blank" rel="noopener noreferrer">
              <InstagramIcon /> Instagram
            </a>
            <a href="https://www.linkedin.com/in/vysakh-r/" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// --------- FOOTER COMPONENT ---------
const Footer = ({ showBackToTop }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-socials">
          <a href="https://www.instagram.com/wanderlust_lens_stories/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
          <a href="https://www.linkedin.com/in/vysakh-r/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
          <a href="https://wa.me/919567890123" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WhatsAppIcon /></a>
        </div>
        <p className="footer-copyright">
          © {new Date().getFullYear()} Vysakh R. All Rights Reserved.
        </p>
        <p className="footer-credit">
          A Visionary Portfolio Concept by <a href="https://github.com/kannan2004-cre/vysakhr" target="_blank" rel="noopener noreferrer" aria-label="Parthiv"> Parthiv M</a>
        </p>
      </div>
      <button 
        className={`back-to-top-btn ${showBackToTop ? 'visible' : ''}`} 
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l8 8h-6v8h-4v-8H4l8-8z"/></svg>
      </button>
    </footer>
  );
};

// --------- MAIN APP COMPONENT ---------
export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Manage Theme with System Preference
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e) => {
      if (theme === 'system') {
        root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    };

    if (theme === 'system') {
      localStorage.removeItem('theme');
      root.setAttribute('data-theme', mediaQuery.matches ? 'dark' : 'light');
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else {
      root.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }

    setTimeout(() => setIsLoaded(true), 100);

    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme]);
  
  const cycleTheme = () => {
    const themes = ['dark', 'light', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  // Manage Active Section and Back to Top Button
  const sectionRefs = {
    home: useRef(null),
    portfolio: useRef(null),
    about: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    const checkScrollTop = () => {
      if (!showBackToTop && window.pageYOffset > 400) {
        setShowBackToTop(true);
      } else if (showBackToTop && window.pageYOffset <= 400) {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [showBackToTop]);

  const handleNavClick = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  return (
    <div className={`app-container ${isLoaded ? 'loaded' : ''}`}>
      <Cursor />
      <Navbar activeSection={activeSection} sections={sectionRefs} onNavClick={handleNavClick} cycleTheme={cycleTheme} theme={theme} />
      <main>
        <Hero innerRef={sectionRefs.home} />
        <Portfolio innerRef={sectionRefs.portfolio} />
        <About innerRef={sectionRefs.about} />
        <Contact innerRef={sectionRefs.contact} />
      </main>
      <Footer showBackToTop={showBackToTop} />
    </div>
  );
}