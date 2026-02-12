import React from 'react';
import { Table, Badge } from 'react-bootstrap';
import './scores.css';

export default function Scores() {
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
            <tr>
              <td>1</td>
              <td>MemeLord99</td>
              <td>4500</td>
              <td>12</td>
              <td><Badge bg="success">+5</Badge></td>
            </tr>
            <tr>
              <td>2</td>
              <td>GifMaster</td>
              <td>3200</td>
              <td>8</td>
              <td><Badge bg="success">+4</Badge></td>
            </tr>
            <tr>
              <td>3</td>
              <td>ReactionKing</td>
              <td>2800</td>
              <td>6</td>
              <td><Badge bg="success">+3</Badge></td>
            </tr>
            <tr>
              <td>4</td>
              <td>SarahSmile</td>
              <td>1500</td>
              <td>3</td>
              <td><Badge bg="secondary">0</Badge></td>
            </tr>
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
            <tr>
              <td>1</td>
              <td>James (jamesthenames)</td>
              <td>258</td>
              <td>3</td>
              <td><Badge bg="danger">-1</Badge></td>
            </tr>
            <tr>
              <td>2</td>
              <td><strong>You</strong></td>
              <td>196</td>
              <td>2</td>
              <td><Badge bg="success">+2</Badge></td>
            </tr>
          </tbody>
        </Table>
      </div>
    </main>
  );
}
