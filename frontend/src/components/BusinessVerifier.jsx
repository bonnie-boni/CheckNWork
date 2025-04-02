import React from 'react';
import Navbar from './Navbar';

const BusinessVerifier = () => {
  return (
    <div style={{height: '100vh', overflow: 'hidden'}}>
      <Navbar />
      <iframe
        src="https://www.scamvoid.net/"
        title="Business Verification"
        width="100%"
        height="100%"
        style={{height: '40vh'}}
        className='hidden'
      />
      <iframe
        src="https://www.scamadviser.com/"
        title="Business Verification"
        width="100%"
        height="100%"
        style={{height: '100vh', border: 'none'}}
      />
    </div>
  );
};

export default BusinessVerifier;
