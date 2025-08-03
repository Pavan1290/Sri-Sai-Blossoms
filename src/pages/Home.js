import React, { useEffect, useState } from 'react';
import '../styles/Home.css';

// Use the actual video file available in public folder
const schoolVideo = "/WhatsApp Video 2025-02-26 at 23.43.29_dbb6d038.mp4";

const Home = () => {
  // Simplified status logic
  const getSchoolStatus = () => {
    const now = new Date();
    const istTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
    const currentDay = istTime.getDay(); // 0 = Sunday, 6 = Saturday
    const currentHour = istTime.getHours();
    
    // School hours: Mon-Fri 9AM-4PM, Sat 9AM-2PM, Sun Closed
    if (currentDay === 0) { // Sunday
      return { status: "Closed", message: "Closed today", isOpen: false };
    } else if (currentDay === 6) { // Saturday
      if (currentHour >= 9 && currentHour < 14) {
        return { status: "Open Now", message: "Open until 2:00 PM", isOpen: true };
      }
    } else { // Monday to Friday
      if (currentHour >= 9 && currentHour < 16) {
        return { status: "Open Now", message: "Open until 4:00 PM", isOpen: true };
      }
    }
    
    return { status: "Closed", message: "Closed now", isOpen: false };
  };

  // Helper function to highlight current day
  const getDayClassName = (dayNumber) => {
    const now = new Date();
    const istTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
    const currentDay = istTime.getDay();
    return currentDay === dayNumber ? 'day-schedule current-day' : 'day-schedule';
  };

  const [schoolStatus, setSchoolStatus] = useState(getSchoolStatus());

  useEffect(() => {
    // Simple fade-in animation
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('visible');
      }, 200 * index);
    });
    
    // Update status every 5 minutes
    const statusInterval = setInterval(() => {
      setSchoolStatus(getSchoolStatus());
    }, 300000); // Update every 5 minutes

    return () => clearInterval(statusInterval);
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
            
            <div className="school-status fade-in">
              <span className={`status-badge ${schoolStatus.isOpen ? 'open' : 'closed'}`}>
                {schoolStatus.status}
              </span>
              <span className="status-message">{schoolStatus.message}</span>
            </div>
            
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
              <p>+91 97403 72589</p>
            </div>
            <div className="contact-item">
              <i className="icon email-icon"></i>
              <p>srisaiblossoms@gmail.com</p>
            </div>
            <div className="contact-item">
              <i className="icon address-icon"></i>
              <p>Mysore, Karnataka</p>
            </div>
            <div className="contact-item hours-display">
              <i className="icon time-icon"></i>
              <div className="school-hours">
                <p><strong>Hours</strong></p>
                <div className="current-status">
                  <span className={`status-indicator ${schoolStatus.isOpen ? 'open' : 'closed'}`}>
                    {schoolStatus.isOpen ? 'Open now' : 'Closed now'}
                  </span>
                </div>
                <div className="weekly-schedule">
                  <div className={getDayClassName(1)}>
                    <span className="day">Monday</span>
                    <span className="hours">09:00 AM - 04:00 PM</span>
                  </div>
                  <div className={getDayClassName(2)}>
                    <span className="day">Tuesday</span>
                    <span className="hours">09:00 AM - 04:00 PM</span>
                  </div>
                  <div className={getDayClassName(3)}>
                    <span className="day">Wednesday</span>
                    <span className="hours">09:00 AM - 04:00 PM</span>
                  </div>
                  <div className={getDayClassName(4)}>
                    <span className="day">Thursday</span>
                    <span className="hours">09:00 AM - 04:00 PM</span>
                  </div>
                  <div className={getDayClassName(5)}>
                    <span className="day">Friday</span>
                    <span className="hours">09:00 AM - 04:00 PM</span>
                  </div>
                  <div className={getDayClassName(6)}>
                    <span className="day">Saturday</span>
                    <span className="hours">09:00 AM - 02:00 PM</span>
                  </div>
                  <div className={getDayClassName(0)}>
                    <span className="day">Sunday</span>
                    <span className="hours">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;