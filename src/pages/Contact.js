import React from 'react';
import '../styles/Contact.css'
const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
    alert('Your message has been sent. We will get back to you shortly!');
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>We'd love to hear from you! Reach out to us using any of the methods below.</p>
      
      <div className="contact-content">
        <div className="contact-info">
          <div className="info-block">
            <h2>Address</h2>
            <p>Sri Sai Blossoms School</p>
            <p>123 Education Lane</p>
            <p>Knowledge City, State - 500001</p>
          </div>
          
          <div className="info-block">
            <h2>Phone Numbers</h2>
            <p>Main Office: +91 98765 43210</p>
            <p>Admissions: +91 98765 43211</p>
            <p>Transport: +91 98765 43212</p>
          </div>
          
          <div className="info-block">
            <h2>Email</h2>
            <p>General Inquiries: info@srisaiblossoms.edu</p>
            <p>Admissions: admissions@srisaiblossoms.edu</p>
            <p>Principal: principal@srisaiblossoms.edu</p>
          </div>
          
          <div className="info-block">
            <h2>Office Hours</h2>
            <p>Monday - Friday: 8:00 AM - 4:00 PM</p>
            <p>Saturday: 9:00 AM - 12:00 PM</p>
            <p>Sunday & Holidays: Closed</p>
          </div>
        </div>
        
        <div className="contact-form">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </div>
      
      <div className="map-location">
        <h2>Map Location</h2>
        <div className="map">
          {/* You would add your Google Maps or other map integration here */}
          <p>Map will be displayed here. Please integrate Google Maps or another map service.</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
