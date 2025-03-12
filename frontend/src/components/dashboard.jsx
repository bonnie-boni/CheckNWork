import React, { useState } from 'react'
import Jobslist from './jobslist';
import {nanoid} from 'nanoid'

const Dashboard = () => {
  const [jobs, postjob] = useState([
    {
      id:nanoid(),
      image:'src/assets/bag.jpeg',
      category:'Moping',
      description:'lorem',
      amount:'400',
    },
    {
      id:nanoid(),
      image:'src/assets/bag.jpeg',
      category:'Moping',
      description:'lorem',
      amount:'400',
    },
    {
      id:nanoid(),
      image:'src/assets/bag.jpeg',
      category:'Moping',
      description:'lorem',
      amount:'400',
    },
    {
      id:nanoid(),
      image:'src/assets/services/moping.jpg',
      category:'Moping',
      description:'moping',
      amount:'400',
    }
  ])
  return (
    <div className="dashboard">

      <Jobslist jobs={jobs} />
     
    </div>
  );
}

export default Dashboard
