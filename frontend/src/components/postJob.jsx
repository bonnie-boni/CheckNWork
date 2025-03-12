import React from 'react'
import UploadImage from './uploadImage'
import Navbar from './Navbar'

const postJob = () => {
  return (
    <>
      <Navbar />
      <div className='job-card post-card'>
          <div>
              <UploadImage required/> <br />
          </div>

          <div className="job-description">
            
            <label> Category : <input type="" name="job-title" id="job-description-title" className="job-description-title" placeholder='dish washing/laundry/moping' required/> </label> <br /> <br />
            <label> Description : <textarea name="" id="job-description-description" className="job-description-description" cols="25" rows="5" maxLength={100} placeholder='whats should you carry / when should you carry'></textarea> </label> <br />
            <label> Willing To Pay : <input type="number" name="job-title" id="job-description-amount" className="job-description-amount" min={100} placeholder='min ksh 100' required/> </label> <br /> <br />
            <label> Location : <input type="text" id="" /> </label> <br /><br />
            <button type="submit" className='post-job'>Post</button>
          </div>
            
      </div>
    </>
  )
}

export default postJob