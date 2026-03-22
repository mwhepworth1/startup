const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');
const db = require('./database.js');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());

// Serve frontend static files in production
app.use(express.static('public'));

// API router
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Register
apiRouter.post('/auth/register', async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).send({ msg: 'Missing fields' });
  }

  const existing = await db.getUserByEmail(email);
  if (existing) {
    return res.status(409).send({ msg: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { email, password: hashedPassword, username, score: 0, wins: 0, streak: 0, gamesPlayed: 0, bestRoundScore: 0, createdAt: new Date() };
  await db.createUser(user);

  const token = uuid();
  await db.setToken(token, user.email);
  res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
  res.send({ email: user.email, username: user.username });
});

// Login
apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await db.getUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send({ msg: 'Invalid credentials' });
  }

  const token = uuid();
  await db.setToken(token, user.email);
  res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
  res.send({ email: user.email, username: user.username });
});

// Logout
apiRouter.delete('/auth/logout', async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    await db.deleteToken(token);
  }
  res.clearCookie('token');
  res.send({ msg: 'Logged out' });
});

// Check if logged in
apiRouter.get('/auth/me', async (req, res) => {
  const token = req.cookies.token;
  const email = await db.getEmailByToken(token);
  if (!email) {
    return res.status(401).send({ msg: 'Not authenticated' });
  }
  const user = await db.getUserByEmail(email);
  if (!user) {
    return res.status(401).send({ msg: 'Not authenticated' });
  }
  res.send({ email: user.email, username: user.username });
});

// Auth middleware for protected routes
async function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  const email = await db.getEmailByToken(token);
  if (!email) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }
  req.userEmail = email;
  next();
}

// Get scores (leaderboard)
apiRouter.get('/scores', async (_req, res) => {
  const leaderboard = await db.getLeaderboard();
  res.send(leaderboard);
});

// Submit a score update (protected)
apiRouter.post('/scores', authMiddleware, async (req, res) => {
  const { score, won } = req.body;
  const user = await db.updateUserScore(req.userEmail, score, won);
  if (!user) {
    return res.status(404).send({ msg: 'User not found' });
  }
  res.send({ score: user.score, wins: user.wins, streak: user.streak });
});

// Get list of already-used prompts
apiRouter.get('/prompts/used', async (_req, res) => {
  const prompts = await db.getUsedPrompts();
  res.send(prompts);
});

// Mark a prompt as used (protected)
apiRouter.post('/prompts/use', authMiddleware, async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).send({ msg: 'Missing prompt' });
  await db.markPromptUsed(prompt);
  res.status(201).send({ msg: 'Prompt recorded' });
});

// Record a round result (protected)
apiRouter.post('/game/result', authMiddleware, async (req, res) => {
  const { prompt, winner, scores } = req.body;
  if (!prompt || !winner) {
    return res.status(400).send({ msg: 'Missing prompt or winner' });
  }
  await db.addGameResult({ prompt, winner, scores: scores || [], playedAt: new Date(), recordedBy: req.userEmail });
  res.status(201).send({ msg: 'Result recorded' });
});

// Get recent round results
apiRouter.get('/game/results', async (_req, res) => {
  const results = await db.getRecentResults(10);
  res.send(results);
});

// Fallback to frontend for non-API routes
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
