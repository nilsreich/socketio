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
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("join", (room) => {
    socket.join(room);
  });
  socket.on("chat message", (msg, room) => {
    io.to(room).emit("chat message", msg);
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
