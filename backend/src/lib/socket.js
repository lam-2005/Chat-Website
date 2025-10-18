import { Server } from "socket.io";
import http from "http";
import express from "express";
import env from "../configs/environment.config.js";
import socketAuthMiddleware from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [env.CLIENT_URL],
    credentials: true,
  },
});

io.use(socketAuthMiddleware);

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.user.userName);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // io.on() listen for events from clients
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.userName);
    delete userSocketMap[userId];

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
