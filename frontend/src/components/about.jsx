import React from 'react';
import Navbar from './Navbar';
import './about.css';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <h1>About CheckNWork</h1>
        <p>
          CheckNWork is a platform designed to connect individuals with reliable service providers. Our mission is to simplify the process of finding and hiring trusted professionals for various tasks, ensuring quality and convenience for our users.
        </p>
        <h2>Our Team</h2>
        <ul>
          <li>MBONI GEORGE NYAMBURA</li>
          <li>CHARITY JEROTICH TANUI</li>
          <li>ROSELYNE VENNESSA ACHIENG</li>
        </ul>
        <h2>Technologies Used</h2>
        <ul>
          <li>React</li>
          <li>Node.js</li>
          <li>Express.js</li>
          <li>MongoDB</li>
        </ul>
        <p>
          Thank you for using CheckNWork!
        </p>
      </div>
    </>
  );
};

export default About;
