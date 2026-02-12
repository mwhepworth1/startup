import React from 'react';
import './about.css';

function About() {
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
              <figure className="text-center">
                <blockquote className="blockquote">
                  <p>Loading random trending GIF from Giphy...</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  Powered by <cite title="Giphy">Giphy</cite>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default About;
