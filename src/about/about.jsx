import React, { useState, useEffect } from 'react';
import './about.css';

export default function About() {
  const [featuredGif, setFeaturedGif] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch a trending GIF from Giphy as the daily featured GIF
    const apiKey = 'xy5U7pUUyNChw3G7AJXVBO6XaTZlB7bZ';
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=1&rating=g`;

    fetch(url)
      .then(response => response.json())
      .then(content => {
        if (content.data && content.data.length > 0) {
          setFeaturedGif({
            url: content.data[0].images.fixed_height.url,
            title: content.data[0].title
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching featured GIF:', err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="container content-scrollable">
      <div className="p-5 mb-4 about-card rounded-3 shadow-sm">
        <h1 className="display-5 fw-bold">About Top Comment</h1>
        <p className="col-md-8 fs-4">Top Comment is a fast-paced, real-time multiplayer party game inspired by the chaotic and hilarious world of comment sections on social media.</p>
        <p className="fs-5">Players are given a situational prompt and tasked with finding the ultimate visual comeback (GIF) to win the most 'likes' from their friends.</p>
      </div>

      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <div className="image-container text-center">
            <img src="/image.png" alt="Game Screenshot Placeholder" className="img-fluid rounded shadow-lg" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="daily-featured p-4 border rounded about-card mt-4 mt-md-0">
            <h3>Daily Featured GIF</h3>
            <div id="daily-gif">
              {loading ? (
                <figure className="text-center">
                  <blockquote className="blockquote">
                    <p>Loading trending GIF from Giphy...</p>
                  </blockquote>
                </figure>
              ) : featuredGif ? (
                <figure className="text-center">
                  <img 
                    src={featuredGif.url} 
                    alt={featuredGif.title}
                    className="img-fluid rounded shadow-sm mb-3"
                  />
                  <figcaption className="blockquote-footer">
                    {featuredGif.title} - Powered by <cite title="Giphy">Giphy</cite>
                  </figcaption>
                </figure>
              ) : (
                <figure className="text-center">
                  <blockquote className="blockquote">
                    <p>Failed to load GIF</p>
                  </blockquote>
                  <figcaption className="blockquote-footer">
                    Powered by <cite title="Giphy">Giphy</cite>
                  </figcaption>
                </figure>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}