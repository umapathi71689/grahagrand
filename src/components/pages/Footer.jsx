import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info */}
        <div className="footer-section">
          <h3 className="footer-heading">Graha Grand Properties</h3>
          <p className="footer-text">
            Building dreams and nurturing relationships through exceptional real estate services.
          </p>
          <div className="social-icons">
            <a href="https://facebook.com" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://twitter.com" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/about" className="footer-link">About Us</Link></li>
            <li><Link to="/properties" className="footer-link">Properties</Link></li>
            <li><Link to="/why-choose-us" className="footer-link">Why Choose Us</Link></li>
            <li><Link to="/contact" className="footer-link">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <ul className="contact-info">
            <li>
              <FaMapMarkerAlt className="contact-icon" />
              <span>123 Luxury Avenue, Beverly Hills, CA 90210</span>
            </li>
            <li>
              <FaPhone className="contact-icon" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li>
              <FaEnvelope className="contact-icon" />
              <span>info@grahagrand.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h3 className="footer-heading">Newsletter</h3>
          <p className="footer-text">Subscribe to get updates on new properties</p>
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="newsletter-input" 
              required 
            />
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Graha Grand Properties. All Rights Reserved.</p>
        <div className="legal-links">
          <Link to="/privacy-policy" className="legal-link">Privacy Policy</Link>
          <Link to="/terms-of-service" className="legal-link">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;