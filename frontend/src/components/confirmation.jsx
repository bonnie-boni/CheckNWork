import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Confirmation = () => {
  const [email, setEmail] = useState('');
  const [termsAndConditions, setTermsAndConditions] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const job = location.state?.job;

  useEffect(() => {
    const fetchTermsAndConditions = async () => {
      try {
        const response = await fetch('http://localhost:5000/termsAndConditions');
        if (response.ok) {
          const data = await response.text();
          setTermsAndConditions(data);
        } else {
          setTermsAndConditions('Failed to load terms and conditions.');
        }
      } catch (error) {
        console.error('Error fetching terms and conditions:', error);
        setTermsAndConditions('Error loading terms and conditions.');
      }
    };

    fetchTermsAndConditions();
  }, []);

  const handleConfirm = async () => {
    if (!email) {
      alert('Please enter your email address.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
       if (!token) {
        navigate('/login');
        return;
      }
      // Send job details and terms and conditions to the backend
      const response = await fetch('http://localhost:5000/sendJobDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          applicantEmail: email,
          jobDetails: job,
          termsAndConditions: termsAndConditions,
        }),
      });

      if (response.ok) {
        alert('Job details sent successfully!');
      } else {
        alert('Failed to send job details.');
      }

      navigate('/');
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

        <label>
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
          />
          I agree to the <a href="/about#terms-and-conditions">Terms and Conditions</a>
        </label>
        <br />

        <button onClick={handleConfirm} disabled={!email || !agreeToTerms}> Confirm </button>
        <br />
        <button onClick={handleClose}>Back</button>
      </div>
    </>
  );
};

export default Confirmation;
