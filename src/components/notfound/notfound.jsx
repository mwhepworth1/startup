import React from 'react';
import { Link } from 'react-router-dom';
import './notfound.css';

function NotFound() {
  return (
    <main className="container text-center d-flex flex-column justify-content-center">
      <h1 className="display-1">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <p className="mb-4">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </main>
  );
}

export default NotFound;
