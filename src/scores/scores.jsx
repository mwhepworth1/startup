import React, { useState, useEffect } from 'react';
import { Table, Badge } from 'react-bootstrap';
import './scores.css';

export default function Scores() {
  const [globalLeaderboard, setGlobalLeaderboard] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get current user
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    setCurrentUser(user);

    // Fetch scores from backend
    fetch('/api/scores')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setGlobalLeaderboard(data);
        } else {
          // Fallback mock data if no users registered yet
          setGlobalLeaderboard([
            { username: 'MemeLord99', email: 'meme@example.com', score: 4500, wins: 12, streak: 5 },
            { username: 'GifMaster', email: 'gif@example.com', score: 3200, wins: 8, streak: 4 },
            { username: 'ReactionKing', email: 'reaction@example.com', score: 2800, wins: 6, streak: 3 },
            { username: 'SarahSmile', email: 'sarah@example.com', score: 1500, wins: 3, streak: 0 }
          ]);
        }
      })
      .catch(() => {
        // If backend is down, show mock data
        setGlobalLeaderboard([
          { username: 'MemeLord99', email: 'meme@example.com', score: 4500, wins: 12, streak: 5 },
          { username: 'GifMaster', email: 'gif@example.com', score: 3200, wins: 8, streak: 4 },
          { username: 'ReactionKing', email: 'reaction@example.com', score: 2800, wins: 6, streak: 3 },
          { username: 'SarahSmile', email: 'sarah@example.com', score: 1500, wins: 3, streak: 0 }
        ]);
      });
  }, []);

  const getFriendsLeaderboard = () => {
    const friends = globalLeaderboard.filter((user, idx) => idx < 5);
    return friends;
  };

  return (
    <main className="container">
      <h2 className="mb-4">Global Leaderboard</h2>

      <div className="table-responsive mb-5">
        <Table hover className="table-custom">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
              <th>Wins</th>
              <th>Streak</th>
            </tr>
          </thead>
          <tbody>
            {globalLeaderboard.map((user, idx) => (
              <tr key={idx} className={currentUser && user.email === currentUser.email ? 'table-primary' : ''}>
                <td>{idx + 1}</td>
                <td>
                  {user.username}
                  {currentUser && user.email === currentUser.email && <strong> (You)</strong>}
                </td>
                <td>{user.score || 0}</td>
                <td>{user.wins || 0}</td>
                <td>
                  <Badge bg={user.streak > 0 ? 'success' : user.streak < 0 ? 'danger' : 'secondary'}>
                    {user.streak > 0 ? `+${user.streak}` : user.streak || 0}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <h2 className="mb-4">Friends</h2>
      <div className="table-responsive">
        <Table hover className="table-custom">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
              <th>Wins</th>
              <th>Streak</th>
            </tr>
          </thead>
          <tbody>
            {getFriendsLeaderboard().map((user, idx) => (
              <tr key={idx} className={currentUser && user.email === currentUser.email ? 'table-primary' : ''}>
                <td>{idx + 1}</td>
                <td>
                  {user.username}
                  {currentUser && user.email === currentUser.email && <strong> (You)</strong>}
                </td>
                <td>{user.score || 0}</td>
                <td>{user.wins || 0}</td>
                <td>
                  <Badge bg={user.streak > 0 ? 'success' : user.streak < 0 ? 'danger' : 'secondary'}>
                    {user.streak > 0 ? `+${user.streak}` : user.streak || 0}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </main>
  );
}
