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

  socket.on("register", (userId) => {
    users[userId] = socket.id;
    console.log(`${userId} registered with socket ID ${socket.id}`);
  });

  socket.on("send_message", ({ to, message, from }) => {
    const targetSocket = users[to];
    if (targetSocket) {
      io.to(targetSocket).emit("receive_message", { message, from });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    for (let key in users) {
      if (users[key] === socket.id) delete users[key];
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
