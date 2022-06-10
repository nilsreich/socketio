const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "https://nilsreich-socketio-x5qjg5g36wgv-3000.githubpreview.dev",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
const PORT = process.env.PORT || 5001;

io.on("connection", (socket) => {
  socket.on("join", (room2) => {
    const lastValue = [...socket.rooms].pop();
    socket.leave(lastValue);
    socket.join(room2);

    console.log(socket.rooms);
  });
  socket.on("chat message", (msg, room) => {
    io.to(room).emit("chat message", msg);
  });

  socket.on("point update", (index, name, room) => {
    io.to(room).emit("point update", index, name);
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
