import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

import Loading from '../components/Loading';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

import './Dev.css';

const Dev = ({ match }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await api.get('/devs', {
        headers: {
          user: match.params.id,
        },
      });

      setUsers(response.data);
      setIsLoading(false);
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
      { isLoading
          ? <div className="loading"><Loading /></div>
          : users.length ? (
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
          ) : (
            <div className="empty">Come back later.</div>
          ) 
      }
    </div>
  );
};

export default Dev;
