import React, { useState } from 'react';
import '../styles/Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    childName: '',
    dateOfBirth: '',
    classToJoin: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          childName: '',
          dateOfBirth: '',
          classToJoin: '',
          email: '',
          phone: '',
          message: ''
        });
        alert('Your message has been sent successfully! We will get back to you shortly.');
      } else {
        setSubmitStatus('error');
        alert(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      alert('Failed to send message. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>We'd love to hear from you! Reach out to us using any of the methods below.</p>
      
      <div className="contact-content">
        <div className="contact-info">
          <div className="info-block">
            <h2>Address</h2>
            <p>Sri Sai Blossoms</p>
            <p>Allanahalli Layout, Alanahalli Village</p>
            <p>Mysuru, Karnataka 570029</p>
          </div>
          
          <div className="info-block">
            <h2>Phone Numbers</h2>
            <p>Main Office: +91 97403 72589</p>
            <p>Admissions: +91 97403 72589</p>
          </div>
          
          <div className="info-block">
            <h2>Email</h2>
            <p>General Inquiries: srisaiblossoms@gmail.com</p>
            <p>Admissions: srisaiblossoms@gmail.com</p>
          </div>
          
          <div className="info-block">
            <h2>Office Hours</h2>
            <p>Monday - Friday: 9:00 AM - 4:00 PM</p>
            <p>Saturday: 9:00 AM - 1:00 PM</p>
            <p>Sunday & Holidays: Closed</p>
          </div>
        </div>
        
        <div className="contact-form">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Parent/Guardian Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
                placeholder="Enter parent/guardian name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="childName">Child's Name</label>
              <input 
                type="text" 
                id="childName" 
                name="childName" 
                value={formData.childName}
                onChange={handleChange}
                required 
                placeholder="Enter child's name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Child's Date of Birth</label>
              <input 
                type="date" 
                id="dateOfBirth" 
                name="dateOfBirth" 
                value={formData.dateOfBirth}
                onChange={handleChange}
                required 
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="classToJoin">Class to Join</label>
              <select 
                id="classToJoin" 
                name="classToJoin" 
                value={formData.classToJoin}
                onChange={handleChange}
                required
              >
                <option value="">Select a class</option>
                <option value="Pre-KG">Pre-KG (Pre-Nursery)</option>
                <option value="LKG">LKG (Lower Kindergarten)</option>
                <option value="UKG">UKG (Upper Kindergarten)</option>
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email (Optional)</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address (optional)"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Please provide details about your inquiry or any specific questions you have"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            
            {submitStatus === 'success' && (
              <div className="submit-status success">
                ✅ Message sent successfully!
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="submit-status error">
                ❌ Failed to send message. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
      
      <div className="map-location">
        <h2>Find Us</h2>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.4!2d76.6394!3d12.2958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDE3JzQ0LjkiTiA3NsKwMzgnMjEuOCJF!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sri Sai Blossoms Location - Allanahalli Layout, Mysuru"
          ></iframe>
        </div>
        <div className="location-note">
          <p>📍 Located in Allanahalli Layout, easily accessible from main Mysuru roads</p>
          <p>🚗 Parking available on premises</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
