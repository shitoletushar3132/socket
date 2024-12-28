import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();
const PORT = 3000;

// server creation
const server = new createServer(app);
app.use(cors({
  origin: "https://chat-app12-nu.vercel.app",
  credentials: true,

}))
// socket  created /also cors because server and client on different origin
const io = new Server(server, {
  cors: {
    origin: "https://chat-app12-nu.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// socket connection created
io.on("connection", (socket) => {
  console.log("user connected" + socket.id);
  // just take name from frontend and create room
  socket.on("join-room", (room) => {
    socket.join(room);
    console.log("user joined room" + room);
  });
  // take room and message and send to all which are in room
  socket.on("message", ({ message, room }) => {
    console.log({ message, room });
    // socket.broadcast.emit("received-messege",data)
    io.to(room).emit("received-messege", message);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
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
