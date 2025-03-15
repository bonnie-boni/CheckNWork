import React from 'react';

const CompletedTaskCard = ({ job }) => {
  return (
    <div className="completed-task-card">
      <img src={job.image} alt={job.category} />
      <h3>{job.category}</h3>
      <p>{job.description}</p>
      <p>Willing to pay: {job.willingToPay}</p>
      <p>Location: {job.location}</p>
      <p>Posted on: {new Date(job.datePosted).toLocaleDateString()}</p>
      <p>Completed by: {job.completedBy}</p>
      <span className="completed-tag">Completed</span>
    </div>
  );
};

export default CompletedTaskCard;
