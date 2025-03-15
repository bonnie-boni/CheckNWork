import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(<span style={{ color: 'green', fontSize: '12px' }}>Registration successful</span>);
        // Redirect to the login page
        window.location.href = '/login';
      } else {
        setMessage(<span style={{ color: 'red', fontSize: '12px' }}>{'Registration failed. UserName is taken'}</span>);
      }
    } catch (error) {
      console.error('Error registering:', error);
      setMessage(<span style={{ color: 'red' }}>An error occurred while registering</span>);
    }
  };

  return (
    <div className="logins-container">
      <h2>Register</h2>
      {message}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label> <br />
          <input
            type="text"
            id='login-input'
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <br />

        <div className="mb-3">
          <label className="form-label">Email</label> <br />
          <input
            type="email"
            id='login-input'
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />

        <div className="mb-3">
          <label className="form-label">Password</label> <br />
          <input
            type="password"
            id='login-input'
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />

        <button type="submit" className="btn btn-primary">Register</button> <br />
        <label> I already have an account ... </label>
        <a href="/login" > Login </a>
        
      </form>
    </div>
  );
};

export default Register;
