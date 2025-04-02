import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JobCard from './jobCard';
import Confirmation from './confirmation';
import Navbar from './Navbar';

const Jobslist = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/postedjobs');
        const data = await response.json();
        setAppliedJobs(data);
        console.log('Fetched jobs:', data);
        console.log("Jobslist appliedJobs:", appliedJobs);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchAppliedJobs();
  }, []);

  const handleApplyJob = (job) => {
    setSelectedJob(job);
  };

  const handleCloseConfirmation = () => {
    setSelectedJob(null);
  };

  return (
    <>
     <Navbar />
      <div className="dashboard-jobs">
        <div className="dashboard-jobs-list">
          {appliedJobs.length > 0 ? (
            appliedJobs.map(job => (
              <JobCard
                key={job._id}
                image={job.image}
                category={job.category}
                description={job.description}
                amount={job.willingToPay}
                _id={job._id}
                userid={job.userid}
                handleApplyJob={handleApplyJob}
              />
            ))
          ) : (
            <div className="no-jobs-container">
              <p>No jobs found.</p>
              <Link to="/post-job" className="post-job-button">
                  <button className="bg-black rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {selectedJob && (
        <Confirmation
          job={selectedJob}
          onClose={handleCloseConfirmation}
        />
      )}
    </>
  );
};

export default Jobslist;
