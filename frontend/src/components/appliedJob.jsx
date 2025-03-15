import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";

const AppliedJob = () => {
  const [postedJobs, setPostedJobs] = useState([]);

  useEffect(() => {
    const fetchPostedJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/postedjobs'); // Assuming backend is running on port 5000
        const data = await response.json();
        console.log('Fetched jobs:', data);
        setPostedJobs(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPostedJobs();
  }, []);

  const handleRemoveJob = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:5000/myjobs/${jobId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Remove the job from the state
        setPostedJobs(postedJobs.filter(job => job._id !== jobId));
      } else {
        console.error('Failed to remove job');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="posted-jobs-container">
        <h2>My Jobs</h2>
        <ul>
          {postedJobs.map(job => (
            <li key={job._id}>
              <img src={job.image} alt={job.category} />
              <h3>{job.category}</h3>
              <p>{job.description}</p>
              <p>Willing to pay: {job.willingToPay}</p>
              <p>Location: {job.location}</p>
              <button onClick={() => handleRemoveJob(job._id)}>Remove/Cancel</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AppliedJob;
