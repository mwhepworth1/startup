const GameEvent = {
  System: 'system',
  Join: 'join',
  Leave: 'leave',
  Submit: 'submit',
  Vote: 'vote',
  GameStart: 'gameStart',
  GameEnd: 'gameEnd',
};

class GameEventNotifier {
  events = [];
  handlers = [];

  constructor() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const host = window.location.hostname;
    const port = window.location.port;
    this.socket = new WebSocket(`${protocol}://${host}:${port}/ws`);

    this.socket.onopen = () => {
      this.receiveEvent({ type: GameEvent.System, from: 'system', value: { msg: 'connected' } });
    };

    this.socket.onclose = () => {
      this.receiveEvent({ type: GameEvent.System, from: 'system', value: { msg: 'disconnected' } });
    };

    this.socket.onmessage = async (msg) => {
      try {
        const event = JSON.parse(typeof msg.data === 'string' ? msg.data : await msg.data.text());
        this.receiveEvent(event);
      } catch (err) {
        console.error('Failed to parse WS message:', err);
      }
    };
  }

  broadcastEvent(from, type, value, room) {
    const event = { from, type, value, room };
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(event));
    }
  }

  joinRoom(from, room) {
    this.broadcastEvent(from, GameEvent.Join, {}, room);
  }

  leaveRoom(from, room) {
    this.broadcastEvent(from, GameEvent.Leave, {}, room);
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    this.events.push(event);
    this.handlers.forEach((handler) => handler(event));
  }
}

const GameNotifier = new GameEventNotifier();
export { GameEvent, GameNotifier };
