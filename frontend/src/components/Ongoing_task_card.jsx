import React from 'react';

const OngoingTaskCard = ({ job }) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/myjobs/${job._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Job deleted successfully');
        // Refresh the posted jobs list
        window.location.reload();
      } else {
        alert('Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('An error occurred while deleting the job');
    }
  };

  const handleComplete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/myjobs/${job._id}/complete`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Job marked as completed');
        // Refresh the posted jobs list
        window.location.reload();
      } else {
        alert('Failed to mark job as completed');
      }
    } catch (error) {
      console.error('Error marking job as completed:', error);
      alert('An error occurred while marking the job as completed');
    }
  };

  return (
    <div className="ongoing-task-card">
      <img src={job.image} alt={job.category} />
      <h3>{job.category}</h3>
      <p>{job.description}</p>
      <p>Willing to pay: {job.willingToPay}</p>
      <p>Location: {job.location}</p>
      <p>Posted on: {new Date(job.datePosted).toLocaleDateString()}</p>
      <span className="ongoing-tag">Ongoing</span> <br /><br />
      <div className="buttons">
      <button className="completed-button" onClick={handleComplete}>Completed</button>
        <button className="remove-button" onClick={handleDelete}>Remove</button>
      </div>
    </div>
  );
};

export default OngoingTaskCard;
