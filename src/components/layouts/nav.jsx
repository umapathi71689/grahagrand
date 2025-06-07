import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar glassy-black ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="mobile-menu-btn" onClick={toggleMenu}>
          <div className={`hamburger ${isOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        {/* Navigation links */}
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li>
            <Link to="/" className="nav-link" onClick={() => scrollToSection('home')}>Home</Link>
          </li>
          <li>
            <Link to="/" className="nav-link" onClick={() => scrollToSection('about')}>About</Link>
          </li>
          <li>
            <Link to="/" className="nav-link" onClick={() => scrollToSection('properties')}>Properties</Link>
          </li>
          <li>
            <Link to="/" className="nav-link" onClick={() => scrollToSection('why-choose-us')}>WhyChooseUs</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;