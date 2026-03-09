import { createServer } from 'http';
import { Server } from 'socket.io';

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

let onlineUsers = 0;

io.on('connection', (socket) => {
  onlineUsers++;
  console.log(`User connected. Online users: ${onlineUsers}`);
  
  // Send current online count to all clients
  io.emit('online_users', { count: onlineUsers });
  
  socket.on('disconnect', () => {
    onlineUsers--;
    console.log(`User disconnected. Online users: ${onlineUsers}`);
    
    // Send updated online count to all clients
    io.emit('online_users', { count: onlineUsers });
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});
