import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './posted_jobs.css';
import Navbar from './Navbar';

const AppliedJob = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/appliedjobs`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log('Fetched applied jobs:', data);
        setAppliedJobs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  const handleCancelApplication = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/appliedjobs/${jobId}/hide`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        // Remove the job from the state
        setAppliedJobs(appliedJobs.filter(job => job._id !== jobId));
      } else {
        console.error('Failed to cancel application');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="posted-jobs-container">
        <h2>Jobs You've Applied For</h2>

        {loading ? (
          <div className="loading-message">Loading your applications...</div>
        ) : appliedJobs.length === 0 ? (
          <div className="no-jobs-message">
            <p>You haven't applied for any jobs yet</p>
            <Link to="/jobs" className="post-job-link">Browse Jobs</Link>
          </div>
        ) : (
          <div className="applied-jobs-list">
            {appliedJobs.map((job) => (
              <div key={job._id} className="job-card">
                <div className="job-image">
                  <img src={job.image} alt={job.category} />
                </div>
                <div className="job-info">
                  <h3>{job.category}</h3>
                  <p className="job-description">{job.description}</p>
                  <div className="job-details">
                    <p><strong>Payment:</strong> ${job.willingToPay}</p>
                    <p><strong>Location:</strong> {job.location}</p>
                    <p><strong>Status:</strong> <span className="application-status">{job.status || 'Pending'}</span></p>
                  </div>
                  <div className="job-actions">
                    <button className="view-details-btn">View Details</button>
                    <button
                      className="cancel-application-btn"
                      onClick={() => handleCancelApplication(job._id)}
                    >
                      Cancel Application
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AppliedJob;
