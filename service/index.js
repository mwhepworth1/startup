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

// Fallback to frontend for non-API routes
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
