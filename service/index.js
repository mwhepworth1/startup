const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());

// Serve frontend static files in production
app.use(express.static('public'));

// API router
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Placeholder endpoint
apiRouter.get('/health', (_req, res) => {
  res.send({ status: 'ok' });
});

// Fallback to frontend for non-API routes
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
