import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link className='logo' to="/"> <span>G</span>igs<span>L</span>ist</Link> {/* Link to the home page */}
        </div>
        <div className="navbar-links">
          <Link to="/post">Post Job</Link> {/* Link to the post job page */}
          <Link to="/applied">Applied Jobs</Link> {/* Link to the applied jobs page */}
          <Link to="/about">About</Link> {/* Link to the about page */}
        </div>
       
        <div className="navbar-profile">
          <a href="#">
            <img src="src/assets/profile.png" alt="USER-PROFILE" className="profile-image" />
          </a>
          <a href="#">Sign Out</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
