import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import './login.css';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/play');
  };

  return (
    <main className="container text-center d-flex flex-column justify-content-center">
      <div className="row justify-content-center w-100">
        <div className="col-md-6 col-lg-4 align-items-center">
          <h2 className="mb-4">Login</h2>
          <div className="card p-4 shadow-sm login">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 text-start">
                <Form.Label htmlFor="email">Email:</Form.Label>
                <Form.Control type="email" id="email" name="email" placeholder="your@email.com" required />
              </Form.Group>
              <Form.Group className="mb-3 text-start">
                <Form.Label htmlFor="password">Password:</Form.Label>
                <Form.Control type="password" id="password" name="password" placeholder="password" required />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="primary">Login</Button>
                <Button type="submit" variant="secondary">Create An Account</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
}

