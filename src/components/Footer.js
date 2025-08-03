import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Sri Sai Blossoms</h4>
          <p>Nurturing minds, Building futures</p>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>📍 Allanahalli Layout, Mysuru</p>
          <p>📞 +91 97403 72589</p>
          <p>✉️ srisaiblossoms@gmail.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Sri Sai Blossoms. All Rights Reserved.</p>
        <Link to="/admin" className="admin-access" title="Admin Access">⚙️</Link>
      </div>
    </footer>
  );
};

export default Footer;
