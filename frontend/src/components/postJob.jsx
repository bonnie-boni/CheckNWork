import React, { useState } from 'react';
import UploadImage from './uploadImage';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './footer';

const PostJob = () => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [willingToPay, setWillingToPay] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (newImage) => {
    setImage(newImage);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('handleSubmit called');

    if (!localStorage.getItem('token')) {
      setErrorMessage("You need to login first");
      return;
    } else {
      setErrorMessage("");
    }

    const jobData = {
      category: category,
      description: description,
      willingToPay: parseInt(willingToPay),
      location: location,
      image: image,
      username: localStorage.getItem('username')
    };

    console.log("Job data being sent:", jobData);

    console.log("userid:", localStorage.getItem('userid'));
    console.log("username:", localStorage.getItem('username'));

    console.log('Job data:', jobData);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/myjobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jobData)
      });

      if (response.ok) {
        console.log('Response status:', response.status);
        const responseData = await response.json();
        console.log('Job saved successfully:', responseData);
        navigate('/');
      } else {
        console.error('Failed to save job');
        console.log('Response status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="post-job"> 
      <Navbar />
      <div className='job-card post-card'>
       
              <UploadImage onImageChange={handleImageChange} required className="card-image-image" /> <br />
                <form onSubmit={handleSubmit}>
                  <label>
                    Category :
                    <input
                      type="text"
                      name="job-title"
                      id="job-description-title"
                      className="job-description-title"
                      placeholder="dish washing/laundry/moping"
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </label>
                  <br /> <br />
                  <label>
                    Description :
                    <textarea
                      name=""
                      id="job-description-description"
                      className="job-description-description"
                      cols="25"
                      rows="5"
                      maxLength={150}
                      placeholder="whats should you carry / when should you carry"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </label>
                  <br />
                  <label>
                    Willing To Pay :
                    <input
                      type="number"
                      name="job-title"
                      id="job-description-amount"
                      className="job-description-amount"
                      min={100}
                      placeholder="min ksh 100"
                      required
                      value={willingToPay}
                      onChange={(e) => setWillingToPay(e.target.value)}
                    />
                  </label>
                  <br /> <br />
                  <label>
                    Location :
                    <input type="text" id="" value={location} onChange={(e) => setLocation(e.target.value)} />
                  </label>
                  <br /><br />
                  <button type="submit" className='post-job-button'>
                    Post
                  </button>
                  <br /> <br />
                  <div style={{ color: 'maroon', fontWeight: 'bolder' }}>{errorMessage}</div>
                </form>
          </div>
      </div>
      <Footer />
    </>
  );
};

export default PostJob;
