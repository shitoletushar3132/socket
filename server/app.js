import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();
const PORT = 3000;

// server creation
const server = new createServer(app);

// socket  created /also cors because server and client on different origin
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// socket connection created
io.on("connection", (socket) => {
  console.log("user connected");
  console.log("Id", socket.id);
  
//   socket.emit("welcome", `Welcome to the server`);
//   socket.broadcast.emit("welcome", `${socket.id} joined the server`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});


// this will create only http instance we need to listent on server
// app.listen(PORT, () => {
//   console.log(`server is listening on ${PORT}`);
// });


server.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
