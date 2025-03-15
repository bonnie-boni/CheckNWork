import React from 'react';

const CompletedTaskCard = ({ job }) => {
  return (
    
      <div className="completed-task-card">
        <div className="dashboard-jobs-list">
        <img src={job.image} alt={job.category} />
        {/* <h3>{job.category}</h3> */}
        <p>{job.description} <br />
        Paid : {job.willingToPay} <br />
        Location: {job.location} <br />
        Posted on: {new Date(job.datePosted).toLocaleDateString()} <br />
        Completed by: {job.completedBy} </p>
        <span className="completed-tag">Completed</span>
      </div>
    </div>
  );
};

export default CompletedTaskCard;
