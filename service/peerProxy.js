const { WebSocketServer, WebSocket } = require('ws');

function peerProxy(httpServer) {
  const socketServer = new WebSocketServer({ server: httpServer, path: '/ws' });

  // Track connections by room
  const rooms = new Map();

  socketServer.on('connection', (socket) => {
    socket.isAlive = true;
    socket.room = null;
    socket.username = null;

    socket.on('message', (data) => {
      try {
        const msg = JSON.parse(data);

        // Handle room join
        if (msg.type === 'join') {
          socket.room = msg.room;
          socket.username = msg.from;

          if (!rooms.has(msg.room)) {
            rooms.set(msg.room, new Set());
          }
          rooms.get(msg.room).add(socket);

          // Send current player list to the new joiner
          const playerList = [];
          rooms.get(msg.room).forEach((client) => {
            if (client.username) {
              playerList.push(client.username);
            }
          });
          socket.send(JSON.stringify({ type: 'playerList', value: { players: playerList } }));

          // Broadcast join to others in room
          broadcastToRoom(msg.room, socket, msg);
          return;
        }

        // Handle room leave
        if (msg.type === 'leave') {
          removeFromRoom(socket);
          broadcastToRoom(msg.room, socket, msg);
          return;
        }

        // Broadcast all other messages to room
        if (socket.room) {
          broadcastToRoom(socket.room, socket, msg);
        }
      } catch (err) {
        console.error('WebSocket message error:', err);
      }
    });

    socket.on('pong', () => {
      socket.isAlive = true;
    });

    socket.on('close', () => {
      if (socket.room && socket.username) {
        const leaveMsg = { type: 'leave', from: socket.username, room: socket.room, value: {} };
        broadcastToRoom(socket.room, socket, leaveMsg);
      }
      removeFromRoom(socket);
    });
  });

  function broadcastToRoom(room, sender, message) {
    const clients = rooms.get(room);
    if (!clients) return;

    const data = JSON.stringify(message);
    clients.forEach((client) => {
      if (client !== sender && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }

  function removeFromRoom(socket) {
    if (socket.room && rooms.has(socket.room)) {
      rooms.get(socket.room).delete(socket);
      if (rooms.get(socket.room).size === 0) {
        rooms.delete(socket.room);
      }
    }
    socket.room = null;
  }

  // Ping/pong heartbeat to detect dead connections
  setInterval(() => {
    socketServer.clients.forEach((client) => {
      if (client.isAlive === false) return client.terminate();
      client.isAlive = false;
      client.ping();
    });
  }, 10000);
}

module.exports = peerProxy;
