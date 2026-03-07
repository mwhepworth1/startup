const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());

// Serve frontend static files in production
app.use(express.static('public'));

// In-memory data stores
let users = [];
let tokens = {}; // token -> email

// API router
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Register
apiRouter.post('/auth/register', async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).send({ msg: 'Missing fields' });
  }

  if (users.find(u => u.email === email)) {
    return res.status(409).send({ msg: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { email, password: hashedPassword, username, score: 0, wins: 0, streak: 0 };
  users.push(user);

  const token = uuid();
  tokens[token] = user.email;
  res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
  res.send({ email: user.email, username: user.username });
});

// Login
apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send({ msg: 'Invalid credentials' });
  }

  const token = uuid();
  tokens[token] = user.email;
  res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
  res.send({ email: user.email, username: user.username });
});

// Logout
apiRouter.delete('/auth/logout', (req, res) => {
  const token = req.cookies.token;
  if (token) {
    delete tokens[token];
  }
  res.clearCookie('token');
  res.send({ msg: 'Logged out' });
});

// Check if logged in
apiRouter.get('/auth/me', (req, res) => {
  const token = req.cookies.token;
  const email = tokens[token];
  if (!email) {
    return res.status(401).send({ msg: 'Not authenticated' });
  }
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).send({ msg: 'Not authenticated' });
  }
  res.send({ email: user.email, username: user.username });
});

// Auth middleware for protected routes
function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  const email = tokens[token];
  if (!email) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }
  req.userEmail = email;
  next();
}

// Get scores (leaderboard)
apiRouter.get('/scores', (_req, res) => {
  const leaderboard = users.map(u => ({
    username: u.username,
    email: u.email,
    score: u.score,
    wins: u.wins,
    streak: u.streak,
  }));
  leaderboard.sort((a, b) => b.score - a.score);
  res.send(leaderboard);
});

// Submit a score update (protected)
apiRouter.post('/scores', authMiddleware, (req, res) => {
  const { score, won } = req.body;
  const user = users.find(u => u.email === req.userEmail);
  if (!user) {
    return res.status(404).send({ msg: 'User not found' });
  }

  user.score += score || 0;
  if (won) {
    user.wins += 1;
    user.streak += 1;
  } else {
    user.streak = 0;
  }

  res.send({ score: user.score, wins: user.wins, streak: user.streak });
});

// Fallback to frontend for non-API routes
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
