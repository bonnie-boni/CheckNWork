import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

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
          {/* Updated image path - Make sure the path is correct */}
          <Link className='logo' to="/">
            <img src="/src/assets/checknworklogo.png" alt="Logo" className='logo' />
          </Link>
        </div>
        <div className="navbar-links">
          <Link to="/business-verifier">B/S Verification</Link>
          <Link to="/post-job">Post Job</Link>
          {/* <Link to="/applied-jobs">Applied Jobs</Link> */}
          <Link to="/myjobs">My Jobs</Link>
          <Link to="/about">About</Link>
        </div>

        <div className="navbar-profile">
          {localStorage.getItem('token') ? (
            <>
              <label> Hello {localStorage.getItem('username')} </label>
              <button className="sign-out-button" onClick={handleSignOut}>
                <FiLogOut /> Sign Out
              </button>
            </>
          ) : (
            <Link to="/login">
              {/* Updated image path */}
              <img src="/src/assets/profile.png" alt="USER-PROFILE" className="profile-image" />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;