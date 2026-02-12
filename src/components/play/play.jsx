import React, { useState } from 'react';
import { Button, Form, InputGroup, Badge } from 'react-bootstrap';
import './play.css';

function Play() {
  const [searchQuery, setSearchQuery] = useState('');
  const [gifGrid, setGifGrid] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);

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
    setSelectedGif(url);
    console.log('Selected GIF:', url);
  };

  return (
    <main className="container-fluid py-4 px-4 flex-fill d-flex flex-column gap-4 justify-content-center">
      <section className="card game-card prompt-card text-center p-4 shadow-sm border-0 flex-shrink-0 w-100">
        <h5 className="text-uppercase muted small fw-bold">Current Prompt</h5>
        <h3 className="fw-bold mb-0">"Your reaction when you get rickrolled on I-15"</h3>
      </section>

      <div className="row h-75 lower-game g-4">
        <div className="col-lg-2 d-flex flex-column gap-4 h-100">
          <section className="card game-card submissions-card p-3 shadow-sm border-0 d-flex flex-column h-auto">
            <h5 className="card-title border-bottom pb-2 flex-shrink-0">Current Submissions</h5>
            <div className="overflow-auto">
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-transparent d-flex justify-content-between align-items-center">
                  <span>Player 2</span>
                  <Badge bg="secondary">Waiting to Vote</Badge>
                </li>
                <li className="list-group-item bg-transparent d-flex justify-content-between align-items-center">
                  <span>Player 3</span>
                  <Badge bg="success">Submitted</Badge>
                </li>
              </ul>
            </div>
          </section>

          <aside className="card game-card live-events-card p-3 shadow-sm border-0 flex-shrink-0">
            <h5 className="card-title border-bottom pb-2">Live Events</h5>
            <div className="overflow-auto">
              <ul className="list-unstyled small live-events-list">
                <li className="mb-2"><span className="muted">10:02 AM</span> Player 2 joined</li>
                <li className="mb-2"><span className="muted">10:03 AM</span> Player 3 joined</li>
                <li className="mb-2 text-primary fw-bold">Round started!</li>
              </ul>
            </div>
          </aside>
        </div>

        <div className="col-lg-9 d-flex flex-column">
          <section className="gif-container game-area card game-card p-4 shadow-lg border-0 h-75 d-flex flex-column">
            <div className="player-hand-container text-center">
              <div className="flex-shrink-0 mb-4 w-100">
                <h2 className="mb-4">Find your perfect GIF</h2>
                <InputGroup size="lg" className="shadow-sm gif-search-container">
                  <Form.Control
                    type="text"
                    id="searchInput"
                    placeholder="Search GIPHY..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <Button variant="primary" className="px-4 fw-bold" onClick={searchGiphy}>
                    SEARCH
                  </Button>
                </InputGroup>
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
                      style={selectedGif === gif.url ? { border: '4px solid var(--primary-color)' } : {}}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Play;
