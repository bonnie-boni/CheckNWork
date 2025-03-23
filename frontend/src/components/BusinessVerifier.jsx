import React from 'react';
import Navbar from './Navbar';

const BusinessVerifier = () => {
  return (
    <div>
        <Navbar />
      <iframe
        src="https://www.scamvoid.net/"
        title="Business Verification"
        width="100%"
        height="600px"
        className='hidden'
      />
      <iframe
        src="https://www.scamadviser.com/"
        title="Business Verification"
        width="100%"
        height="600px"
      />
    </div>
  );
};

export default BusinessVerifier;
