import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Login from './components/login/login';
import Play from './components/play/play';
import Scores from './components/scores/scores';
import About from './components/about/about';
import NotFound from './components/notfound/notfound';
import './app.css';

function App() {
  return (
    <BrowserRouter>
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
                  <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="/play">Play</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="/scores">Scores</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
                </ul>
              </div>
              <span className="navbar-game-room">Room Code: <strong>N/A</strong></span>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Login />} />
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
    </BrowserRouter>
  );
}

export default App;
