import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(
      "https://nilsreich-socketio-x5qjg5g36wgv-5000.githubpreview.dev",
      {
        withCredentials: true,
        extraHeaders: {
          "my-custom-header": "abcd",
        },
      }
    );
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    if(socket){
      socket.on("chat message", function (msg) {
        console.log(msg);
      });
    }
  }, [socket]);

  const [eingabe, setEingabe] = useState("");

  return (
    <div className="App">
      <ul id="messages"></ul>
      <input value={eingabe} onChange={(e) => setEingabe(e.target.value)} />
      <button
        onClick={() => {
          socket.emit("chat message", eingabe);
        }}
      >
        Send
      </button>
    </div>
  );
}

export default App;
