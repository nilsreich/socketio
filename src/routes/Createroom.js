import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { ReactSketchCanvas } from "react-sketch-canvas";
import SVGO from "https://unpkg.com/svgo@2.8.0/dist/svgo.browser.js";
import * as LZString from "lz-string";

function Createroom() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState();
  const [room, setRoom] = useState("");

  const person = {
    players: ["John", "Nils"],

    updatename: function (index, name) {
      return (this.players[index] = name);
    },
  };

  const canvas = useRef();

  function getImage() {
    canvas.current
      .exportSvg()
      .then((data) => {
        let result = SVGO.optimize(data, {
          floatPrecision: 0,
          plugins: [
            { name: "preset-default" },
            { name: "removeDimensions" }, // enable default preset
          ],
        });
        let compressed = LZString.compress(result.data);
        socket.emit("chat message", compressed, room);
        setDrawing(result.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  const [strokewidth, setStrokewidth] = useState(10);
  const [drawing, setDrawing] = useState();

  useEffect(() => {
    const newSocket = io(
      "https://nilsreich-socketio-x5qjg5g36wgv-5001.githubpreview.dev",
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
    if (socket) {
      socket.on("chat message", function (msg) {
        setMessage(LZString.decompress(msg));
      });
      socket.on("point update", function (index, name) {
        person.updatename(index, name);
        console.log(person.players);
      });
    }
  }, [socket]);

  function joinRoom() {
    if (socket) {
      socket.emit("join", room);
    }
  }

  const [name, setName] = useState("");

  const check = (event) => {
    event.preventDefault();
    socket.emit("point update", 0, name, room);
  };

  return (
    <div>
      <div className="flex h-screen flex-col">
        <div className="border-b">Nils Reich 43sek</div>
        <div className="flex flex-1 flex-col sm:flex-row">
          <div className="hidden sm:block">BESTENLISTE</div>
          <div className="flex flex-1 border-r border-l">
            <div className="m-auto aspect-square max-h-[90vh] w-full bg-gray-300">
              {name === "asd" ? (
                <ReactSketchCanvas
                  ref={canvas}
                  strokeWidth={strokewidth}
                  strokeColor="red"
                  onStroke={() => getImage()}
                />
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: message,
                  }}
                />
              )}
            </div>
          </div>
          <div className="flex flex-1 flex-col border-t sm:flex-initial sm:border-t-0">
            <div className="flex-1">MESSAGES</div>
            <div>
              <input type="text" className="border" /> <button>senden</button>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <input value={room} onChange={(e) => setRoom(e.target.value)} />
      <button onClick={() => joinRoom()}>Join</button>
      <form onSubmit={check}>
        <input
          name="word"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input type="submit" hidden />
      </form>
    </div>
  );
}

export default Createroom;
