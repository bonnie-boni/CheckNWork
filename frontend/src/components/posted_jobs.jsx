import React, { useState, useEffect } from 'react';
import CompletedTaskCard from './completed_task_card';
import OngoingTaskCard from './Ongoing_task_card';
import './posted_jobs.css';
import Navbar from './Navbar';
import Footer from './footer';

const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchPostedJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/postedjobs');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching posted jobs:', error);
      }
    };

    fetchPostedJobs();
  }, []);

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
      <Footer />
    </>
  );
};

export default PostedJobs;
