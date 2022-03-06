import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Chat from "./Components/Chat";
import { Home } from "./Components/Home";
// const socket = io.connect("https://obscure-fjord-30128.herokuapp.com/");
const socket = io.connect("http://localhost:3001");

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:room/:username" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
