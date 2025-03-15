import React, { useState, useEffect } from 'react';
import CompletedTaskCard from './completed_task_card';
import OngoingTaskCard from './Ongoing_task_card';
import './posted_jobs.css';
import Navbar from './Navbar';

const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const username = localStorage.getItem('username'); // Get the username from local storage

  useEffect(() => {
    const fetchPostedJobs = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage
        const response = await fetch(`http://localhost:5000/postedjobs/${username}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the header
          },
        });
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching posted jobs:', error);
      }
    };

    fetchPostedJobs();
  }, [username]);

  return (
    <>
      <Navbar />
      <div className="posted-jobs-container">
        <h2>Posted Jobs</h2>
        {jobs.map((job) =>
          job.completed ? (
            <CompletedTaskCard key={job._id} job={job} />
          ) : (
            <OngoingTaskCard key={job._id} job={job} />
          )
        )}
      </div>
    </>
  );
};

export default PostedJobs;
