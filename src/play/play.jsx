import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, InputGroup, Badge, Alert } from 'react-bootstrap';
import './play.css';

// Game prompts pool
const prompts = [
  "Your reaction when you get rickrolled on I-15",
  "Monday morning vibes",
  "When the final is harder than you expected",
  "Finding out there's free food at the event",
  "Your face when WiFi disconnects during online class",
  "Seeing your code work on the first try",
  "When you realize it's not actually due tonight",
  "Your reaction to parallel parking success"
];

export default function Play() {
  const navigate = useNavigate();
  
  // User and room state
  const [currentUser, setCurrentUser] = useState(null);
  const [roomCode, setRoomCode] = useState('');
  const [inRoom, setInRoom] = useState(false);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  
  // Game state
  const [gamePhase, setGamePhase] = useState('lobby'); // lobby, submission, voting, results
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [timer, setTimer] = useState(30);
  
  // GIF search state
  const [searchQuery, setSearchQuery] = useState('');
  const [gifGrid, setGifGrid] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  
  // Players and submissions
  const [players, setPlayers] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [votes, setVotes] = useState({});
  const [myVote, setMyVote] = useState(null);
  
  // Live events
  const [liveEvents, setLiveEvents] = useState([]);

  // Check authentication on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!user) {
      navigate('/');
      return;
    }
    setCurrentUser(user);

    // Check if user was in a room
    const savedRoom = localStorage.getItem('currentRoom');
    if (savedRoom) {
      setRoomCode(savedRoom);
      setInRoom(true);
      initializeGame();
    }
  }, [navigate]);

  // Timer countdown
  useEffect(() => {
    if (gamePhase !== 'lobby' && gamePhase !== 'results' && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            handlePhaseTransition();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gamePhase, timer]);

  // Simulate WebSocket events with setInterval
  useEffect(() => {
    if (!inRoom) return;

    const eventInterval = setInterval(() => {
      // Simulate random player events
      const eventTypes = [
        { type: 'join', username: `Player${Math.floor(Math.random() * 100)}` },
        { type: 'submit', username: `Player${Math.floor(Math.random() * 100)}` },
        { type: 'vote', username: `Player${Math.floor(Math.random() * 100)}` }
      ];
      
      const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      let message = '';
      if (randomEvent.type === 'join') {
        message = `${randomEvent.username} joined the room`;
      } else if (randomEvent.type === 'submit') {
        message = `${randomEvent.username} submitted a GIF`;
      } else {
        message = `${randomEvent.username} voted`;
      }

      setLiveEvents(prev => [...prev.slice(-9), { time: now, message }]);
    }, 5000); // New event every 5 seconds

    return () => clearInterval(eventInterval);
  }, [inRoom]);

  // Auto-submit mock player submissions during submission phase
  useEffect(() => {
    if (gamePhase === 'submission' && timer === 25 && submissions.length === 0) {
      // Create mock submissions from other players
      const mockSubmissions = players.slice(1, 4).map(player => ({
        player: player.username,
        gifUrl: `https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif?${Math.random()}`,
        votes: 0
      }));
      setSubmissions(mockSubmissions);
    }
  }, [gamePhase, timer, players, submissions.length]);

  const initializeGame = () => {
    // Initialize mock players
    const mockPlayers = [
      { username: currentUser?.username || 'You', isYou: true },
      { username: 'GifMaster', isYou: false },
      { username: 'MemeLord99', isYou: false },
      { username: 'ReactionKing', isYou: false }
    ];
    setPlayers(mockPlayers);

    // Add initial events
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLiveEvents([
      { time: now, message: 'Room created!' },
      { time: now, message: 'GifMaster joined' },
      { time: now, message: 'MemeLord99 joined' },
      { time: now, message: 'ReactionKing joined' }
    ]);
  };

  const createRoom = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
    setInRoom(true);
    localStorage.setItem('currentRoom', code);
    initializeGame();
    addLiveEvent('Room created!');
  };

  const joinRoom = () => {
    if (!roomCode.trim()) return;
    setInRoom(true);
    localStorage.setItem('currentRoom', roomCode);
    initializeGame();
    addLiveEvent(`Joined room ${roomCode}`);
  };

  const startGame = () => {
    setGamePhase('submission');
    setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
    setTimer(30);
    setHasSubmitted(false);
    setSelectedGif(null);
    setSubmissions([]);
    setVotes({});
    setMyVote(null);
    addLiveEvent('Round started!');
  };

  const handlePhaseTransition = () => {
    if (gamePhase === 'submission') {
      setGamePhase('voting');
      setTimer(20);
      addLiveEvent('Voting phase started!');
      
      // Auto-add my submission if I selected a GIF
      if (selectedGif && !hasSubmitted) {
        submitGif();
      }
    } else if (gamePhase === 'voting') {
      setGamePhase('results');
      calculateResults();
      addLiveEvent('Round ended!');
      
      // Auto-start next round after 5 seconds
      setTimeout(() => {
        startGame();
      }, 5000);
    }
  };

  const addLiveEvent = (message) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLiveEvents(prev => [...prev.slice(-9), { time: now, message }]);
  };

  const searchGiphy = () => {
    const apiKey = 'xy5U7pUUyNChw3G7AJXVBO6XaTZlB7bZ';
    
    if (!searchQuery) return;

    setGifGrid([{ loading: true }]);

    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchQuery)}&limit=50&rating=g`;

    fetch(url)
      .then(response => response.json())
      .then(content => {
        if (content.data.length === 0) {
          setGifGrid([{ error: 'No results found.' }]);
          return;
        }

        const gifs = content.data.map(gif => ({
          url: gif.images.fixed_width.url,
          alt: gif.title
        }));
        setGifGrid(gifs);
      })
      .catch(err => {
        console.error('Error fetching GIFs:', err);
        setGifGrid([{ error: 'Error loading GIFs.' }]);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchGiphy();
    }
  };

  const handleGifSelect = (url) => {
    if (gamePhase === 'submission' && !hasSubmitted) {
      setSelectedGif(url);
    }
  };

  const submitGif = () => {
    if (!selectedGif || hasSubmitted) return;
    
    const newSubmission = {
      player: currentUser.username,
      gifUrl: selectedGif,
      votes: 0
    };
    
    setSubmissions(prev => [...prev, newSubmission]);
    setHasSubmitted(true);
    addLiveEvent('You submitted your GIF!');
  };

  const handleVote = (index) => {
    if (gamePhase !== 'voting' || myVote !== null) return;
    
    setMyVote(index);
    setVotes(prev => ({
      ...prev,
      [index]: (prev[index] || 0) + 1
    }));
    addLiveEvent('You voted!');
  };

  const calculateResults = () => {
    // Simulate other players voting
    const updatedSubmissions = submissions.map((sub, idx) => ({
      ...sub,
      votes: (votes[idx] || 0) + Math.floor(Math.random() * 3)
    }));
    
    setSubmissions(updatedSubmissions);
  };

  const leaveRoom = () => {
    setInRoom(false);
    setGamePhase('lobby');
    localStorage.removeItem('currentRoom');
    setRoomCode('');
  };

  // Lobby view (create/join room)
  if (!inRoom) {
    return (
      <main className="container text-center d-flex flex-column justify-content-center flex-fill">
        <div className="row justify-content-center w-100">
          <div className="col-md-6">
            <h2 className="mb-4">Game Lobby</h2>
            <div className="card p-4 shadow-sm game-card">
              <div className="d-grid gap-3">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={createRoom}
                >
                  Create New Room
                </Button>
                
                <div className="text-muted">OR</div>
                
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Enter Room Code"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  />
                  <Button variant="secondary" onClick={joinRoom}>
                    Join Room
                  </Button>
                </InputGroup>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Waiting for game to start
  if (gamePhase === 'lobby') {
    return (
      <main className="container text-center d-flex flex-column justify-content-center flex-fill">
        <div className="row justify-content-center w-100">
          <div className="col-md-6">
            <h2 className="mb-4">Room: {roomCode}</h2>
            <div className="card p-4 shadow-sm game-card">
              <h4 className="mb-3">Players in Room</h4>
              <ul className="list-group mb-4">
                {players.map((player, idx) => (
                  <li key={idx} className="list-group-item bg-dark text-white">
                    {player.username} {player.isYou && '(You)'}
                  </li>
                ))}
              </ul>
              <div className="d-grid gap-2">
                <Button variant="success" size="lg" onClick={startGame}>
                  Start Game
                </Button>
                <Button variant="danger" onClick={leaveRoom}>
                  Leave Room
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Main game view
  return (
    <main className="container-fluid py-4 px-4 flex-fill d-flex flex-column gap-4 justify-content-center">
      <section className="card game-card prompt-card text-center p-4 shadow-sm border-0 flex-shrink-0 w-100">
        <h5 className="text-uppercase muted small fw-bold">
          Current Prompt - {gamePhase === 'submission' ? 'Find a GIF' : gamePhase === 'voting' ? 'Vote for Best' : 'Results'} - Time: {timer}s
        </h5>
        <h3 className="fw-bold mb-0">"{currentPrompt}"</h3>
      </section>

      <div className="row h-75 lower-game g-4">
        <div className="col-lg-2 d-flex flex-column gap-4 h-100">
          <section className="card game-card submissions-card p-3 shadow-sm border-0 d-flex flex-column h-auto">
            <h5 className="card-title border-bottom pb-2 flex-shrink-0">Players</h5>
            <div className="overflow-auto">
              <ul className="list-group list-group-flush">
                {players.map((player, idx) => (
                  <li key={idx} className="list-group-item bg-transparent d-flex justify-content-between align-items-center">
                    <span>{player.username}</span>
                    {gamePhase === 'submission' && (
                      <Badge bg={submissions.find(s => s.player === player.username) ? 'success' : 'secondary'}>
                        {submissions.find(s => s.player === player.username) ? 'Submitted' : 'Searching'}
                      </Badge>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <aside className="card game-card live-events-card p-3 shadow-sm border-0 flex-shrink-0">
            <h5 className="card-title border-bottom pb-2">Live Events</h5>
            <div className="overflow-auto">
              <ul className="list-unstyled small live-events-list">
                {liveEvents.map((event, idx) => (
                  <li key={idx} className="mb-2">
                    <span className="muted">{event.time}</span> {event.message}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className="col-lg-9 d-flex flex-column">
          {gamePhase === 'submission' && (
            <section className="gif-container game-area card game-card p-4 shadow-lg border-0 h-75 d-flex flex-column">
              <div className="player-hand-container text-center">
                <div className="flex-shrink-0 mb-4 w-100">
                  <h2 className="mb-4">Find your perfect GIF</h2>
                  {hasSubmitted && (
                    <Alert variant="success">GIF submitted! Waiting for others...</Alert>
                  )}
                  <InputGroup size="lg" className="shadow-sm gif-search-container mb-3">
                    <Form.Control
                      type="text"
                      id="searchInput"
                      placeholder="Search GIPHY..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={hasSubmitted}
                    />
                    <Button variant="primary" className="px-4 fw-bold" onClick={searchGiphy} disabled={hasSubmitted}>
                      SEARCH
                    </Button>
                  </InputGroup>
                  {selectedGif && !hasSubmitted && (
                    <Button variant="success" size="lg" onClick={submitGif}>
                      Submit Selected GIF
                    </Button>
                  )}
                </div>

                <div className="gif-grid" id="gifGrid">
                  {gifGrid.length > 0 && gifGrid[0].loading && (
                    <p className="text-center w-100 text-white">Loading...</p>
                  )}
                  {gifGrid.length > 0 && gifGrid[0].error && (
                    <p className="text-center w-100 text-white">{gifGrid[0].error}</p>
                  )}
                  {gifGrid.length > 0 && !gifGrid[0].loading && !gifGrid[0].error && gifGrid.map((gif, index) => (
                    <div key={index} className="gif-item" onClick={() => handleGifSelect(gif.url)}>
                      <img
                        src={gif.url}
                        alt={gif.alt}
                        className="img-fluid rounded shadow-sm w-100 mb-2"
                        style={selectedGif === gif.url ? { border: '4px solid #0d6efd' } : {}}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {(gamePhase === 'voting' || gamePhase === 'results') && (
            <section className="gif-container game-area card game-card p-4 shadow-lg border-0 h-75 d-flex flex-column">
              <h2 className="mb-4 text-center">
                {gamePhase === 'voting' ? 'Vote for the Best GIF!' : 'Round Results'}
              </h2>
              {myVote !== null && gamePhase === 'voting' && (
                <Alert variant="info">Vote submitted! Waiting for others...</Alert>
              )}
              <div className="gif-grid">
                {submissions.map((submission, idx) => (
                  <div 
                    key={idx} 
                    className="gif-item text-center" 
                    onClick={() => handleVote(idx)}
                    style={{ cursor: gamePhase === 'voting' && myVote === null ? 'pointer' : 'default' }}
                  >
                    <img
                      src={submission.gifUrl}
                      alt={`Submission by ${submission.player}`}
                      className="img-fluid rounded shadow-sm w-100 mb-2"
                      style={myVote === idx ? { border: '4px solid #198754' } : {}}
                    />
                    <div className="text-white">
                      <strong>{submission.player}</strong>
                      {gamePhase === 'results' && (
                        <div>
                          <Badge bg="primary">{submission.votes} votes</Badge>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}

