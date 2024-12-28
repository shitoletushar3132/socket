import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
const App = () => {
  const [message, setMessage] = useState("");

  const socket = useMemo(() => io("http://localhost:3000"), []);

  const handleSubmit = () => {
    console.log(message);
    socket.emit("message", message);
  };

  const handleOnchange = (e) => {
    setMessage(e.target.value);
    console.log(message);
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    socket.on("welcome", (msg) => {
      console.log(msg);
    });
    socket.on("received-messege", (data) => {
      console.log("received the message", data);
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
          <div>
            <input
              type="text"
              placeholder="Type here"
              className="input outline-none px-2 py-1 input-bordered input-primary w-full max-w-xs"
              value={message}
              onChange={handleOnchange}
            />
          </div>
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default App;
