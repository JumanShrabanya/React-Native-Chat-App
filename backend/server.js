const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const connectDB = require("./config/mongodb.js");
const { Server } = require("socket.io");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://192.168.153.21:3000",
    methods: ["GET", "POST"],
  },
});

const users = {}; // To store user ID to socket ID mapping

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("setUser", (userId) => {
    users[userId] = socket.id;
    console.log(`User ${userId} connected with socket ${socket.id}`);
  });

  socket.on("startPrivateChat", (recipientId, senderId) => {
    // Generate a unique room ID by combining and sorting user IDs
    const roomID = [senderId, recipientId].sort().join("-");
    socket.join(roomID);

    const recipientSocketId = users[recipientId];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("joinPrivateChatRoom", roomID);
    }

    console.log(
      `Private chat started between ${senderId} and ${recipientId} in room ${roomID}`
    );
  });

  socket.on("joinPrivateChatRoom", (roomID) => {
    socket.join(roomID);
    console.log(`User ${socket.id} joined private chat room: ${roomID}`);
  });

  socket.on("sendMessage", (messageData) => {
    io.to(messageData.room).emit("receiveMessage", messageData);
    console.log("Message received in room:", messageData.room, messageData);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    // Clean up user mappings
    for (const userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }
  });
});

connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
