import React from 'react';
import '../styles/Footer.css'; // You'll need to create this CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Sri Sai Blossoms</h3>
          <p>Nurturing minds, Building futures</p>
        </div>
        <div className="footer-section">
          <h3>Contact Information</h3>
          <p>Address: Your School Address</p>
          <p>Phone: +91 1234567890</p>
          <p>Email: info@srisaiblossoms.edu</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/admissions">Admissions</a></li>
            <li><a href="/facilities">Facilities</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} Sri Sai Blossoms. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
