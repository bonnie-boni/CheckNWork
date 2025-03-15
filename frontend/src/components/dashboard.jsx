import React from 'react';
import Jobslist from './jobslist';
import Navbar from './Navbar';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div>
        <Jobslist />
      </div>
    </>
  );
};

export default Dashboard;
