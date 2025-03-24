import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="notfound">
      <div className='notfound-container'>
        <h2>404 - Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <Link to="/">Go to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
