const express = require("express");
require("dotenv").config();
const cors = require("cors");
const socket = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());
const connect = require('./config/db');

const userController = require("./controllers/user.controller");
const chatController = require('./controllers/chat.controller');
const messageController = require('./controllers/message.controller');

app.use('/auth', userController);
app.use('/chat', chatController);
app.use('/message', messageController);

const PORT = process.env.PORT || 7000;
let server = app.listen(PORT, async (req, res) => {
    try {
        await connect();
    } catch (error) {
        console.log(error.message)
    }
    console.log("Listenning on Port 7000");
});


const io = socket(server, {
    pingTimeout: 6000,
    cors: {
      "Access-Control-Allow-Origin": "*",
      origin: "https://mateed-a15v.vercel.app",
    },
  });

io.on("connection", (socket) => {
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");

    })

    socket.on("join chat", (room) => {
        socket.join(room);
    })

    socket.on("new message", (recievedMessage) => {
        var chat = recievedMessage.chat;
        chat.users.forEach((user) => {
            if(user == recievedMessage.sender._id) return;
            socket.in(user).emit("message recieved", recievedMessage);
        })
    })
    socket.off("setup", () => {
        socket.leave(userData._id)
    })
})