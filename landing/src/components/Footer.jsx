import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-text">
            © 2025 EY Technological Solution. All rights reserved. | 
            <Link to="/privacy-policy" className="footer-link">
              Privacy Policy
            </Link>
            |
            <Link to="/terms-of-service" className="footer-link">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
