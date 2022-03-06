import { useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Chat from "./Chat";
// const socket = io.connect("https://obscure-fjord-30128.herokuapp.com/");
const socket = io.connect("http://localhost:3001");
export const Home = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);

      setShowChat(true);
    }
  };

  return (
    <>
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </>
  );
};
