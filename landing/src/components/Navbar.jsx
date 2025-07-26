import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <Link to="/">
            <img 
              src="/images/imgbin_4a90910c19574989465168b591f3026b.png" 
              alt="Ernst & Young Logo" 
              className="logo-img"
            />
          </Link>
        </div>

        {/* Navigation Buttons */}
        <div className="navbar-buttons">
          <button className="navbar-btn login-btn">
            Login
          </button>
          <button className="navbar-btn signup-btn">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
