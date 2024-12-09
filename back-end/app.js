const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const io = socket(server, {
  cors: {
    origin: ["http://localhost:3000", "https://group-chatly.vercel.app"],
    credentials: true,
  },
});

// This variable help me to get all connected online users
// Now we can maintain, how many users are currently online
// Used map for efficiency.
global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    // Add user to our online users map when a user arrived.
    
    onlineUsers.set(userId, socket.id);
    
    // In frontend to maintain/update the online user list - we will emit a event
    io.emit("user-added");
  });
  

  socket.on("send-msg", (data) => {
    // Here on getting msgs - we have to broadcast it except the sender
    // Msg recieve / broadcast event help in frontend to update the chat list - real time
    socket.broadcast.emit("msg-recieve", {
      message: data.message,
      from: data.from,  
    });
  });

  socket.on('disconnect', () => {
    // Remove from the map, when disconnect
    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    // Again, to maintain/update the online users list
    io.emit("user-removed");
  });
});
