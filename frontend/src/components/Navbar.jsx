import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link className='logo' to="/"> <span>C</span>heck<span>NW</span>ork</Link> {/* Link to the home page */}
        </div>
        <div className="navbar-links">
          <Link to="/business-verification">B/S Verification</Link> {/* Link to the post job page */}
          <Link to="/post">Post Job</Link> {/* Link to the post job page */}
          <Link to="/myjobs">My Jobs</Link> {/* Link to the applied jobs page */}
          <Link to="/about">About</Link> {/* Link to the about page */}
        </div>
       

        <div className="navbar-profile">
          {/* Conditionally render either the user's name or a "Sign In" link */}
          {localStorage.getItem('token') ? (
            <label> Hello {localStorage.getItem('username')} </label>
          ) : (
            <Link to="/login">
              <img src="src/assets/profile.png" alt="USER-PROFILE" className="profile-image" />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
