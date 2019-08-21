import React, { useState } from 'react';
import api from '../services/api';
import logo from "../assets/logo.svg";
import './Login.css';

const Login = () => {
  const [ username, setUsername ] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await api.post('/devs', {
      username,
    });

    console.log(response.data);
  };

  const handleInputUsername = event => setUsername(event.target.value);

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev" />
        <input
          type="text"
          placeholder="Github username"
          value={username}
          onChange={handleInputUsername}/>
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
