import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Login from './login/login';
import Play from './play/play';
import Scores from './scores/scores';
import About from './about/about';
import NotFound from './notfound/notfound';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function AppContent() {
  const [currentUser, setCurrentUser] = useState(null);
  const [roomCode, setRoomCode] = useState('N/A');
  const navigate = useNavigate();

  useEffect(() => {
    // Check for current user
    const checkUser = () => {
      const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
      setCurrentUser(user);
    };

    // Check for current room
    const checkRoom = () => {
      const room = localStorage.getItem('currentRoom');
      setRoomCode(room || 'N/A');
    };

    checkUser();
    checkRoom();

    // Listen for storage changes
    const interval = setInterval(() => {
      checkUser();
      checkRoom();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentRoom');
    setCurrentUser(null);
    setRoomCode('N/A');
    navigate('/');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid position-relative">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <NavLink className="navbar-brand position-absolute top-50 start-50 translate-middle" to="/">Top Comment</NavLink>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item"><NavLink className="nav-link" to="">Home</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="play">Play</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="scores">Scores</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="about">About</NavLink></li>
                {currentUser && (
                  <li className="nav-item">
                    <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                  </li>
                )}
              </ul>
            </div>
            <span className="navbar-game-room">
              {currentUser && <span className="me-3">User: <strong>{currentUser.username}</strong></span>}
              Room: <strong>{roomCode}</strong>
            </span>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/play" element={<Play />} />
        <Route path="/scores" element={<Scores />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <footer className="mt-auto">
        <div className="container">
          <p>Created by Matthew</p>
          <p><a href="https://github.com/mwhepworth1/startup">GitHub</a></p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}