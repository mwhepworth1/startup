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

    // Get all users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // If no users exist, create mock data
    if (users.length === 0) {
      const mockUsers = [
        { username: 'MemeLord99', email: 'meme@example.com', score: 4500, wins: 12, streak: 5 },
        { username: 'GifMaster', email: 'gif@example.com', score: 3200, wins: 8, streak: 4 },
        { username: 'ReactionKing', email: 'reaction@example.com', score: 2800, wins: 6, streak: 3 },
        { username: 'SarahSmile', email: 'sarah@example.com', score: 1500, wins: 3, streak: 0 }
      ];
      
      // Add current user if logged in
      if (user) {
        const currentUserData = users.find(u => u.email === user.email) || {
          username: user.username,
          email: user.email,
          score: Math.floor(Math.random() * 1000) + 100,
          wins: Math.floor(Math.random() * 5),
          streak: Math.floor(Math.random() * 3)
        };
        mockUsers.push(currentUserData);
      }

      setGlobalLeaderboard(mockUsers.sort((a, b) => b.score - a.score));
    } else {
      // Use real user data, sorted by score
      setGlobalLeaderboard(users.sort((a, b) => (b.score || 0) - (a.score || 0)));
    }
  }, []);

  // Simulate real-time score updates using setInterval
  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalLeaderboard(prev => {
        const updated = [...prev];
        // Randomly update one player's score
        const randomIndex = Math.floor(Math.random() * updated.length);
        const change = Math.floor(Math.random() * 100) - 50; // -50 to +50
        updated[randomIndex] = {
          ...updated[randomIndex],
          score: Math.max(0, (updated[randomIndex].score || 0) + change)
        };
        return updated.sort((a, b) => (b.score || 0) - (a.score || 0));
      });
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const getFriendsLeaderboard = () => {
    // Mock friends list - in a real app, this would come from the database
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
