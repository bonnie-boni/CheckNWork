import React, { useState } from 'react';
import Navbar from './Navbar';
import { useNavigate, useLocation } from 'react-router-dom';

const Confirmation = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const job = location.state?.job;

  const handleConfirm = async () => {
    if (!email) {
      alert('Please enter your email address.');
      return;
    }

    try {
      // Send email to applicant
      const emailResponse = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: `Job Application Confirmation: ${job.category}`,
          text: `Dear Applicant,\n\nYou have successfully applied for the following job:\n\nCategory: ${job.category}\nDescription: ${job.description}\nWilling to pay: ${job.amount}\nLocation: ${job.location}\n\nThank you for your interest!\n\nSincerely,\nThe Job Board Team`,
        }),
      });

      if (emailResponse.ok) {
        alert('Email sent successfully!');
      } else {
        alert('Failed to send email.');
      }

      // Store application details (optional)
      const applicationResponse = await fetch('http://localhost:5000/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: job._id, // Assuming job object has an _id field
          applicantEmail: email,
        }),
      });

      if (applicationResponse.ok) {
        alert('Application submitted successfully!');
      } else {
        const data = await applicationResponse.json();
        alert(`Application failed: ${data.error}`);
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred while submitting the application.');
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <div className="job-card confirmation-content">
        <h2>{job.category}</h2>
        <img className="card-image" src={job.image} alt={job.category} />
        <p>{job.description}</p>
        <p>Willing to pay: {job.amount}</p>
        <p>Location: {job.location}</p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <button onClick={handleConfirm} disabled={!email}> Confirm </button>
        <br />
        <button onClick={handleClose}>Back</button>
      </div>
    </>
  );
};

export default Confirmation;
