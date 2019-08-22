import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

import './Dev.css';

const Dev = ({ match }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await api.get('/devs', {
        headers: {
          user: match.params.id,
        },
      });

      setUsers(response.data);
    };

    loadUsers();
  }, [match.params.id]);

  const handleLike = async id => {
    await api.post(`/devs/${id}/likes`, null, {
      headers: {
        user: match.params.id
      },
    });

    setUsers(users.filter(user => user._id !== id));
  };

  const handleDislike = async id => {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: {
        user: match.params.id
      },
    });

    setUsers(users.filter(user => user._id !== id));
  };

  return (
    <div className="dev-container">
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <img src={user.avatar} alt={user.name} />
            <footer>
              <strong>{user.name}</strong>
              <p>{user.bio}</p>
            </footer>
            <div className="buttons">
              <button type="button" onClick={() => handleDislike(user._id)}>
                <img src={dislike} alt="Dislike" />
              </button>
              <button type="button" onClick={() => handleLike(user._id)}>
                <img src={like} alt="Like" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dev;
