import React, { useEffect } from 'react';
import schoolVideo from 'C:/Users/Pavan/sri-sai-blossoms/src/components/WhatsApp Video 2025-02-26 at 23.43.29_dbb6d038.mp4';
import '../styles/Home.css';

const Home = () => {
  useEffect(() => {
    // Animate elements when page loads
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('visible');
      }, 300 * index);
    });
  }, []);

  return (
    <div className="home-container">
      <section className="hero-section">
        {/* Video background with overlay */}
        <div className="video-wrapper">
          <video autoPlay loop muted playsInline className="background-video">
            <source src={schoolVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay"></div>
        </div>
        
        {/* Hero content */}
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="fade-in">Welcome to <span className="highlight">Sri Sai Blossoms</span></h1>
            <h2 className="fade-in">Early Childhood Learning Center</h2>
            <p className="tagline fade-in">Pre-KG | LKG | UKG</p>
            <p className="sub-tagline fade-in">Where Little Minds Bloom and Grow</p>
            
            <div className="cta-buttons fade-in">
              <a href="#about" className="btn btn-primary">Discover Our School</a>
              <a href="#contact" className="btn btn-secondary">Enroll Now</a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="container">
          <div className="row">
            <div className="col fade-in">
              <h3>Our Little Stars</h3>
              <p>We offer three specialized programs designed for young learners:</p>
              <ul className="program-list">
                <li><span className="program-name">Pre-KG (Ages 2.5-3.5):</span> Playful introduction to learning</li>
                <li><span className="program-name">LKG (Ages 3.5-4.5):</span> Foundation building with fun activities</li>
                <li><span className="program-name">UKG (Ages 4.5-5.5):</span> Preparation for primary education</li>
              </ul>
            </div>
            <div className="col fade-in">
              <h3>Our Approach</h3>
              <p>At Sri Sai Blossoms, we believe in nurturing curious minds through play-based learning. Our curriculum 
              focuses on developing social skills, emotional intelligence, and basic academic concepts in a safe, 
              colorful, and stimulating environment.</p>
            </div>
            <div className="col fade-in">
              <h3>We Provide</h3>
              <p>Our kindergarten offers:</p>
              <ul className="features-list">
                <li>Child-friendly classrooms with colorful learning materials</li>
                <li>Qualified teachers specialized in early childhood education</li>
                <li>Indoor and outdoor play areas</li>
                <li>Age-appropriate activities for holistic development</li>
                <li>Regular parent-teacher interactions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section fade-in">
        <div className="container">
          <h3>Visit Our Little Paradise</h3>
          <div className="contact-info">
            <div className="contact-item">
              <i className="icon phone-icon"></i>
              <p>Call Us: +91 97403 72589</p>
            </div>
            <div className="contact-item">
              <i className="icon email-icon"></i>
              <p>Email: srisaiblossoms@gmail.com</p>
            </div>
            <div className="contact-item">
              <i className="icon address-icon"></i>
              <p>Location: 98/o, Mysore, India, Karnataka</p>
            </div>
            <div className="contact-item">
              <i className="icon time-icon"></i>
              <p>Visiting Hours: Mon-Fri,_:00 AM - __:00 PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;