import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ _id, image, category, description, amount }) => {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate('/confirmation', { state: { job: { _id, image, category, description, amount } } });
  };

  return (
    <div className="job-card container">
      <div className="card-image">
        <img src={image} alt="Image" />
      </div>
      <div className="job-card-content">
        <div>
          <h3 className="job-card-content-title">{category}</h3>
          <p className="job-card-content-description">{description}</p>
          <p className="job-card-content-price">ksh {amount}</p>
          <button onClick={handleApply}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
