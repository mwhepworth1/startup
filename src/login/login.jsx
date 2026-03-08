import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Alert } from 'react-bootstrap';
import './login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [error, setError] = useState('');

  // Check if user is already logged in
  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Not logged in');
      })
      .then(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate('/play');
      })
      .catch(() => {});
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const user = await res.json();
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/play');
    } else {
      const body = await res.json();
      setError(body.msg || 'Invalid email or password');
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username }),
    });

    if (res.ok) {
      const user = await res.json();
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/play');
    } else {
      const body = await res.json();
      setError(body.msg || 'Failed to create account');
    }
  };

  return (
    <main className="container text-center d-flex flex-column justify-content-center">
      <div className="row justify-content-center w-100">
        <div className="col-md-6 col-lg-4 align-items-center">
          <h2 className="mb-4">{isCreatingAccount ? 'Create Account' : 'Login'}</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="card p-4 shadow-sm login">
            <Form onSubmit={isCreatingAccount ? handleCreateAccount : handleLogin}>
              {isCreatingAccount && (
                <Form.Group className="mb-3 text-start">
                  <Form.Label htmlFor="username">Username:</Form.Label>
                  <Form.Control
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
              )}
              <Form.Group className="mb-3 text-start">
                <Form.Label htmlFor="email">Email:</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 text-start">
                <Form.Label htmlFor="password">Password:</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="d-grid gap-2">
                {isCreatingAccount ? (
                  <>
                    <Button type="submit" variant="primary">Create Account</Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setIsCreatingAccount(false);
                        setError('');
                      }}
                    >
                      Back to Login
                    </Button>
                  </>
                ) : (
                  <>
                    <Button type="submit" variant="primary">Login</Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setIsCreatingAccount(true);
                        setError('');
                      }}
                    >
                      Create An Account
                    </Button>
                  </>
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
}
