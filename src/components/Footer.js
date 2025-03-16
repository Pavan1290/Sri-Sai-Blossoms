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
      </div>
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} Sri Sai Blossoms. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
