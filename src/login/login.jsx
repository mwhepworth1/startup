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
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      navigate('/play');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Get stored users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // Store current user
      localStorage.setItem('currentUser', JSON.stringify({
        email: user.email,
        username: user.username
      }));
      navigate('/play');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    // Get stored users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
      setError('An account with this email already exists');
      return;
    }

    // Create new user
    const newUser = {
      email,
      password,
      username,
      score: 0,
      wins: 0,
      streak: 0
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Log in the new user
    localStorage.setItem('currentUser', JSON.stringify({
      email: newUser.email,
      username: newUser.username
    }));

    navigate('/play');
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

