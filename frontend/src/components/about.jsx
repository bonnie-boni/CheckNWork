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
        <div id="terms-and-conditions">
          <h3 id="terms-and-conditions">Terms and Conditions</h3>
          <p>
            <strong>1. User Accounts:</strong>
            <ul>
              <li>Users must provide accurate and complete information when creating an account.</li>
              <li>Users are responsible for maintaining the confidentiality of their account credentials.</li>
              <li>Users are prohibited from creating multiple accounts or using another person's account without permission.</li>
            </ul>
            <strong>2. Job Postings:</strong>
            <ul>
              <li>Job posters are responsible for the accuracy and legality of their job postings.</li>
              <li>Job postings must not be discriminatory, misleading, or offensive.</li>
              <li>Job posters must not request upfront payments or sensitive personal information from applicants.</li>
            </ul>
            <strong>3. Job Applications:</strong>
            <ul>
              <li>Job applicants must provide accurate and truthful information in their applications.</li>
              <li>Job applicants must not misrepresent their qualifications or experience.</li>
              <li>Job applicants must not engage in any fraudulent or unethical activities.</li>
            </ul>
            <strong>4. Prohibited Activities:</strong>
            <ul>
              <li>Users are prohibited from using the platform for any illegal or unauthorized purpose.</li>
              <li>Users are prohibited from interfering with the operation of the platform or attempting to gain unauthorized access to other users' accounts or data.</li>
              <li>Users are prohibited from spamming or harassing other users.</li>
            </ul>
            <strong>5. Disclaimer of Liability:</strong>
            <ul>
              <li>The platform is not responsible for the actions of its users.</li>
              <li>The platform does not guarantee the accuracy or reliability of job postings or applications.</li>
              <li>The platform is not liable for any damages arising from the use of the platform.</li>
            </ul>
            <strong>6. Terms and Conditions Updates:</strong>
            <ul>
              <li>The platform reserves the right to modify these terms and conditions at any time.</li>
              <li>Users will be notified of any changes to these terms and conditions.</li>
            </ul>
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
