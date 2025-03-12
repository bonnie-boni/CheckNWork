import React from 'react'
import JobCard from './jobCard';
import Navbar from './Navbar';

const jobslist = ({jobs}) => {
  return (
    <>
     <Navbar />
      <div className="dashboard-jobs">
          <div className="dashboard-jobs-list">
              {jobs.map((job) => 
                   <JobCard image={job.image} category={job.category} description={job.description} amount={job.amount} />
              )}
          </div>
        </div>
    </>
  )
}

export default jobslist
