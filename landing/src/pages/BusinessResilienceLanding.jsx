import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100
    }
  }
};

const heroVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut"
    }
  }
};

const LoadingSpinner = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    className="loading-spinner"
  >
    ⚡
  </motion.div>
);

const RippleButton = ({ children, onClick, className, disabled }) => {
  const [ripples, setRipples] = useState([]);

  const createRipple = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = {
      x,
      y,
      size,
      id: Date.now()
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 1000);
    
    if (onClick) onClick(event);
  };

  return (
    <motion.button
      className={`ripple-button ${className}`}
      onClick={createRipple}
      disabled={disabled}
      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(250, 204, 21, 0.3)" }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size
          }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </motion.button>
  );
};

export default function BusinessResilienceLanding() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [buttonRipple, setButtonRipple] = useState(false);

  // Intersection Observer hooks for scroll animations
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [benefitsRef, benefitsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [objectivesRef, objectivesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [commitmentRef, commitmentInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [assumptionsRef, assumptionsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [lifecycleRef, lifecycleInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [contactRef, contactInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [footerRef, footerInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const testimonials = [
    {
      quote: "BCMP transformed our organization's resilience. We're now prepared for any disruption.",
      author: "Sarah Johnson",
      title: "CEO, TechCorp Solutions",
      company: "Fortune 500 Company"
    },
    {
      quote: "The comprehensive approach to business continuity gave us confidence during the pandemic.",
      author: "Michael Chen",
      title: "Risk Manager",
      company: "Global Financial Services"
    },
    {
      quote: "Our downtime reduced by 90% after implementing BCMP strategies.",
      author: "Emma Rodriguez",
      title: "Operations Director",
      company: "Manufacturing Leader"
    }
  ];

  const lifecycleSteps = [
    { title: "Risk Assessment", icon: "🔍", description: "Identify and analyze potential threats" },
    { title: "Business Impact Analysis", icon: "📊", description: "Evaluate critical business functions" },
    { title: "Strategy Development", icon: "🎯", description: "Create comprehensive continuity strategies" },
    { title: "Plan Implementation", icon: "📋", description: "Execute detailed response procedures" },
    { title: "Testing & Validation", icon: "🧪", description: "Regular drills and scenario testing" },
    { title: "Maintenance & Review", icon: "🔄", description: "Continuous improvement and updates" }
  ];

  const benefits = [
    { icon: "🛡️", title: "Risk Reduction", description: "Minimize exposure to operational threats" },
    { icon: "⚡", title: "Rapid Recovery", description: "Quick restoration of critical services" },
    { icon: "🤝", title: "Stakeholder Confidence", description: "Maintain trust during disruptions" },
    { icon: "📈", title: "Business Continuity", description: "Ensure uninterrupted operations" },
    { icon: "💰", title: "Cost Savings", description: "Reduce financial impact of incidents" },
    { icon: "📜", title: "Compliance", description: "Meet regulatory requirements" }
  ];

  const objectives = [
    "Minimize operational downtime and service interruptions",
    "Maintain critical business functions during disruptions",
    "Ensure regulatory compliance and governance standards",
    "Protect sensitive data and information assets",
    "Preserve brand reputation and customer trust",
    "Enable rapid recovery and restoration processes"
  ];

  const assumptions = [
    { icon: "🏢", text: "Critical resources and infrastructure are available" },
    { icon: "👥", text: "Trained response teams are accessible" },
    { icon: "🔄", text: "Regular audits and updates are conducted" },
    { icon: "📱", text: "Communication systems remain operational" },
    { icon: "💾", text: "Data backup and recovery systems function properly" },
    { icon: "🤝", text: "Vendor and supplier partnerships are maintained" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We\'ll contact you soon.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Particles configuration
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    console.log(container);
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = true;
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = true;
    if (!formData.company.trim()) errors.company = true;
    if (!formData.message.trim()) errors.message = true;
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmitWithValidation = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Shake animation for invalid fields
      Object.keys(formErrors).forEach(field => {
        const element = document.querySelector(`[name="${field}"]`);
        if (element) {
          element.classList.add('shake');
          setTimeout(() => element.classList.remove('shake'), 500);
        }
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    alert('Thank you for your inquiry! We\'ll contact you soon.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <motion.div 
      className="landing"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#facc15",
            },
            links: {
              color: "#facc15",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              directions: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />

      {/* Hero Section */}
      <motion.header 
        ref={heroRef}
        className="hero"
        variants={heroVariants}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
      >
        <div className="hero-background"></div>
        <motion.div className="hero-content">
          <motion.h1 
            className="hero-title"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1, type: "spring" }}
          >
            <motion.span
              initial={{ display: "inline-block", opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              EY Resilience Automation
            </motion.span>
            <br />
            <motion.span
              initial={{ display: "inline-block", opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              ERA
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Comprehensive End-to-End Automation of the Business Continuity Management System (BCMS) to ensure seamless resilience, rapid recovery, and uninterrupted operations.</motion.p>
          
          <motion.div 
            className="hero-image"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1, type: "spring" }}
          >
            <motion.div 
              className="shield-icon"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              🛡️
            </motion.div>
            <div className="pulse-ring"></div>
          </motion.div>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <RippleButton 
              className="cta-button primary" 
              onClick={() => document.getElementById('contact').scrollIntoView()}
            >
              Get your company's BCMS redefined
            </RippleButton>
          </motion.div>
        </motion.div>
      </motion.header>

      {/* Why BCMP is Important */}
      <section className="importance-section">
        <div className="container">
          <h2 className="section-title">Why BCMS is Critical for Your Business</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card hover-lift">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Objectives */}
      <section className="objectives-section">
        <div className="container">
          <h2 className="section-title">Program Objectives</h2>
          <div className="objectives-grid">
            {objectives.map((objective, index) => (
              <div key={index} className="objective-item slide-in">
                <div className="objective-number">{String(index + 1).padStart(2, '0')}</div>
                <p>{objective}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizational Commitment */}
      <section className="commitment-section">
        <div className="container">
          <div className="commitment-content">
            <div className="commitment-text">
              <h2 className="section-title">Organizational Commitment</h2>
              <p>
                Our leadership team is fully committed to implementing and maintaining robust 
                business continuity practices. We allocate dedicated resources, provide ongoing 
                training, and ensure continuous improvement of our resilience capabilities.
              </p>
              <div className="commitment-stats">
                <div className="stat">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Monitoring</span>
                </div>
                <div className="stat">
                  <span className="stat-number">99.9%</span>
                  <span className="stat-label">Uptime</span>
                </div>
                <div className="stat">
                  <span className="stat-number">&lt; 4hrs</span>
                  <span className="stat-label">Recovery Time</span>
                </div>
              </div>
            </div>
            <div className="commitment-visual">
              <div className="leadership-icon">👥</div>
              <div className="commitment-rings">
                <div className="ring ring-1"></div>
                <div className="ring ring-2"></div>
                <div className="ring ring-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assumptions and Planning Factors */}
      <section className="assumptions-section">
        <div className="container">
          <h2 className="section-title">Key Assumptions & Planning Factors</h2>
          <div className="assumptions-grid">
            {assumptions.map((assumption, index) => (
              <div key={index} className="assumption-card">
                <div className="assumption-icon">{assumption.icon}</div>
                <p>{assumption.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BCMP Lifecycle */}
      <section className="lifecycle-section">
        <div className="container">
          <h2 className="section-title">BCMP Lifecycle Process</h2>
          <div className="lifecycle-container">
            <div className="lifecycle-center">
              <div className="center-icon">🔄</div>
              <span>Continuous Improvement</span>
            </div>
            {lifecycleSteps.map((step, index) => (
              <div 
                key={index} 
                className={`lifecycle-step step-${index + 1}`}
                style={{ '--step-delay': `${index * 0.2}s` }}
              >
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div className="step-connector"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">Success Stories</h2>
          <div className="testimonial-carousel">
            <div className="testimonial-slide">
              <div className="testimonial-content">
                <div className="quote-icon">"</div>
                <p className="testimonial-quote">{testimonials[currentTestimonial].quote}</p>
                <div className="testimonial-author">
                  <strong>{testimonials[currentTestimonial].author}</strong>
                  <span>{testimonials[currentTestimonial].title}</span>
                  <span className="company">{testimonials[currentTestimonial].company}</span>
                </div>
              </div>
            </div>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form / CTA */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2 className="section-title">Ready to Strengthen Your Business Resilience?</h2>
              <p>
                Don't wait for the next disruption. Contact our BCM experts today to develop 
                a comprehensive continuity plan tailored to your organization's needs.
              </p>
              <div className="contact-features">
                <div className="feature">
                  <span className="feature-icon">✅</span>
                  <span>Free initial consultation</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✅</span>
                  <span>Customized solutions</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✅</span>
                  <span>Expert guidance</span>
                </div>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  name="company" 
                  placeholder="Company Name" 
                  value={formData.company}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <textarea 
                  name="message" 
                  placeholder="Tell us about your business continuity needs..." 
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <a
  href="mailto:Saraansh.Agarwal@in.ey.com?subject=BCM%20Expert%20Consultation%20Request"
  className="cta-button secondary inline-block text-white bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded"
>
  Contact Our BCM Experts
</a>

            </form>
          </div>
        </div>
      </section>

    </motion.div>
  );
}
