const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');

const usersCollection = db.collection('users');
const tokensCollection = db.collection('tokens');

// Test connection
(async function testConnection() {
  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
})();

// User functions
async function createUser(user) {
  await usersCollection.insertOne(user);
}

async function getUserByEmail(email) {
  return usersCollection.findOne({ email });
}

async function updateUserScore(email, score, won) {
  const incFields = { score: score || 0, gamesPlayed: 1 };
  if (won) {
    incFields.wins = 1;
    incFields.streak = 1;
  }
  const update = { $inc: incFields, $max: { bestRoundScore: score || 0 } };
  if (!won) {
    update.$set = { streak: 0 };
  }
  return usersCollection.findOneAndUpdate({ email }, update, { returnDocument: 'after' });
}

async function getLeaderboard() {
  return usersCollection
    .find({}, { projection: { password: 0 } })
    .sort({ score: -1 })
    .toArray();
}

// Token functions
async function setToken(token, email) {
  await tokensCollection.updateOne(
    { token },
    { $set: { token, email } },
    { upsert: true }
  );
}

async function getEmailByToken(token) {
  const doc = await tokensCollection.findOne({ token });
  return doc ? doc.email : null;
}

async function deleteToken(token) {
  await tokensCollection.deleteOne({ token });
}

module.exports = {
  createUser,
  getUserByEmail,
  updateUserScore,
  getLeaderboard,
  setToken,
  getEmailByToken,
  deleteToken,
};
