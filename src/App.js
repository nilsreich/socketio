import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);
  return (
    <div className="App">
      <ul id="messages"></ul>
      <form id="form" action="">
        <input id="input" autoComplete="off" />
        <button onClick={()=>{console.log('hi')}}>Send</button>
      </form>
    </div>
  );
}

export default App;
