import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Enhanced mobile menu toggle with body scroll prevention
  const toggleMenu = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    
    // Prevent body scroll when mobile menu is open
    if (newIsOpen) {
      document.body.classList.add('mobile-menu-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('mobile-menu-open');
      document.body.style.overflow = 'unset';
    }
  };

  // Close menu when clicking on links (mobile)
  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
      document.body.classList.remove('mobile-menu-open');
      document.body.style.overflow = 'unset';
    }
  };

  // Close menu on escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        document.body.classList.remove('mobile-menu-open');
        document.body.style.overflow = 'unset';
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('mobile-menu-open');
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Sri Sai Blossoms
        </Link>
        
        <div className="navbar-right">
          <ThemeToggle />
          <div className="menu-icon" onClick={toggleMenu}>
            <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>
        </div>
        
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links" onClick={handleLinkClick}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/academics" className="nav-links" onClick={handleLinkClick}>
              Academics
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/activities" className="nav-links" onClick={handleLinkClick}>
              Activities
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/events" className="nav-links" onClick={handleLinkClick}>
              Events
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admissions" className="nav-links" onClick={handleLinkClick}>
              Admissions
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-links" onClick={handleLinkClick}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;