import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom'; // Import the Link component from react-router-dom
import { FiLogOut } from 'react-icons/fi'; // Import the sign-out icon

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link className='logo' to="/"> <span>C</span>heck<span>NW</span>ork</Link> {/* Link to the home page */}
        </div>
        <div className="navbar-links">
          <Link to="/business-verifier">B/S Verification</Link> {/* Link to the post job page */}
          <Link to="/post">Post Job</Link> {/* Link to the post job page */}
          <Link to="/myjobs">My Jobs</Link> {/* Link to the applied jobs page */}
          <Link to="/about">About</Link> {/* Link to the about page */}
        </div>

        <div className="navbar-profile">
          {/* Conditionally render either the user's name or a "Sign In" link */}
          {localStorage.getItem('token') ? (
            <>
              <label> Hello {localStorage.getItem('username')} </label>
              <button className="sign-out-button" onClick={handleSignOut}>
                <FiLogOut /> Sign Out
              </button>
            </>
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
