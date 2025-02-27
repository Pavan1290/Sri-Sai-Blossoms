import React, { useEffect } from 'react';
import '../styles/Common.css';
import '../styles/Events.css';

const Events = () => {
  useEffect(() => {
    // Animation for fade-in elements
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('visible');
      }, 300 * index);
    });
  }, []);

  return (
    <div className="events-container">
      <header className="page-header">
        <div className="container">
          <h1 className="fade-in">Our Colorful Events</h1>
          <p className="fade-in">Join us for exciting celebrations, learning activities, and special occasions that make our kindergarten a joyful place!</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2 className="fade-in">Upcoming Events</h2>
          </div>

          <div className="upcoming-events">
            <div className="event-card fade-in">
              <div className="event-date">
                <span className="event-month">May</span>
                <span className="event-day">15</span>
              </div>
              <h3 className="event-title">Annual Day Celebration</h3>
              <span className="event-time">9:00 AM - 1:00 PM</span>
              <span className="event-tag tag-important">Don't Miss!</span>
              <p className="event-description">Join us for a spectacular showcase of our children's talents! Dance performances, music, drama, and so much more await you at our Annual Day extravaganza.</p>
            </div>

            <div className="event-card fade-in">
              <div className="event-date">
                <span className="event-month">Jun</span>
                <span className="event-day">5</span>
              </div>
              <h3 className="event-title">World Environment Day</h3>
              <span className="event-time">10:30 AM - 12:00 PM</span>
              <span className="event-tag tag-celebration">Celebration</span>
              <p className="event-description">A special day where our little ones learn about planting trees and caring for our planet through fun activities and storytelling.</p>
            </div>

            <div className="event-card fade-in">
              <div className="event-date">
                <span className="event-month">Jun</span>
                <span className="event-day">20</span>
              </div>
              <h3 className="event-title">Parent-Teacher Meeting</h3>
              <span className="event-time">4:00 PM - 6:30 PM</span>
              <span className="event-tag tag-important">Important</span>
              <p className="event-description">Discuss your child's progress and development with our experienced teachers. Individual time slots will be assigned to each parent.</p>
            </div>
          </div>

          <div className="section-title">
            <h2 className="fade-in">Past Events</h2>
          </div>

          <div className="past-events">
            <div className="event-card fade-in">
              <div className="event-date">
                <span className="event-month">Apr</span>
                <span className="event-day">2</span>
              </div>
              <h3 className="event-title">Spring Festival</h3>
              <span className="event-time">10:00 AM - 1:00 PM</span>
              <p className="event-description">Our little ones celebrated the arrival of spring with flower crafts, nature walks, and colorful activities.</p>
            </div>

            <div className="event-card fade-in">
              <div className="event-date">
                <span className="event-month">Mar</span>
                <span className="event-day">21</span>
              </div>
              <h3 className="event-title">Puppet Show: Forest Friends</h3>
              <span className="event-time">11:00 AM - 12:00 PM</span>
              <p className="event-description">The children enjoyed an interactive puppet show that taught them about wildlife conservation and friendship.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
