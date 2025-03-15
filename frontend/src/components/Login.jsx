import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in local storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username);
        // Redirect to the dashboard or home page
        window.location.href = '/';
      } else {
        setMessage(<span style={{ color: 'red', fontSize: '12px' }}>Username or password is incorrect</span>);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage(<span style={{ color: 'red' }}>An error occurred while logging in</span>);
    }
  };

  return (
    <div className="logins-container">
      <h2>Login</h2>
      {message}
      <form onSubmit={handleSubmit}>
        <div className="login-username">
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
        <div className="login-password">
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
        <button type="submit" className="btn btn-primary">Login</button>  <br /> <br />

        <label> I dont have an account ... </label><a href="/register" > Register </a>
        
      </form>
    </div>
  );
};

export default Login;
