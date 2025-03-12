import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const [job, setJob] = useState(null);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const jobDetails = JSON.parse(localStorage.getItem('jobDetails'));
    if (jobDetails) {
      setJob(jobDetails);
    } else {
      // Redirect to dashboard if no job details are found
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleConfirm = async () => {
    if (!email) {
      alert('Please enter your email address.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: job._id, // Assuming job object has an _id field
          applicantEmail: email,
        }),
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        navigate('/dashboard');
      } else {
        const data = await response.json();
        alert(`Application failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred while submitting the application.');
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <div className="confirmation-container">
        <div className="confirmation-content">
          <h2>{job.title}</h2>
          <img src={job.image} alt={job.title} />
          <p>{job.description}</p>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={handleConfirm} disabled={!email}>
            Confirm
          </button>
          <button onClick={handleBack}>Back</button>
        </div>
      </div>
    </>
  );
};

export default Confirmation;
