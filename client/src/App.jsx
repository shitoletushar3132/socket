import React, { useEffect, useMemo, useState } from "react";

import { io } from "socket.io-client";
const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState("");
  const [room, setRoom] = useState("");
  const [roomName, setRoomName] = useState("");
  const [socketId, setSocketId] = useState("");

  const socket = useMemo(() => io("https://socket3-8cpc.onrender.com/"), []);

  const handleSubmit = () => {
    console.log(message);
    socket.emit("message", { message, room });
    setMessage("");
  };

  const joinRoom = () => {
    socket.emit("join-room", roomName);
    console.log(roomName);
  };

  const handleMessagechange = (e) => {
    setMessage(e.target.value);
    console.log(message);
  };
  const handleRoomchange = (e) => {
    setRoom(e.target.value);
    console.log(message);
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
      setSocketId(socket.id);
    });

    socket.on("welcome", (msg) => {
      console.log(msg);
    });
    socket.on("received-messege", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div data-theme="dark" className="flex h-[100vh] justify-center">
      <div className="card bg-base-300 my-10 h-fit w-96 shadow-xl">
        <h1 className="text-center text-3xl font-bold">CHAT APP</h1>
        <div className="card-body">
          <h1>socket ID {socketId}</h1>
          <div>
            <div>
              <label className="text-xl" htmlFor="message">
                {" "}
                Join Room{" "}
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input outline-none px-2 py-1 mt-2 mb-2 input-bordered input-primary w-full max-w-xs"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
              <button className="px-2 py-2 bg-blue-800" onClick={joinRoom}>
                JOIN ROOM
              </button>
            </div>
            <label className="text-xl" htmlFor="message">
              {" "}
              Message{" "}
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input outline-none px-2 py-1 mt-2 mb-2 input-bordered input-primary w-full max-w-xs"
              value={message}
              onChange={handleMessagechange}
            />
            <label className="text-xl" htmlFor="message">
              {" "}
              Id{" "}
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input outline-none px-2 py-1 input-bordered input-primary w-full max-w-xs"
              value={room}
              onChange={handleRoomchange}
            />
          </div>
          <button onClick={handleSubmit}>Send</button>
        </div>
        {messages && messages?.map((data) => <p>{data}</p>)}
      </div>
    </div>
  );
};

export default App;
