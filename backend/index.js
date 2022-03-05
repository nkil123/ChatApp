const express = require ('express');
const app = express ();
const http = require ('http');
const cors = require ('cors');
const socketio = require ('socket.io');
require ('dotenv').config ();
app.use (cors ());

const server = http.createServer (app);

//connecting socket to our server
const io = socketio (server);

io.on ('connection', socket => {
  console.log (`User Connected: ${socket.id}`);

  socket.on ('join_room', data => {
    socket.join (data);
    console.log (`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on ('send_message', data => {
    socket.to (data.room).emit ('receive_message', data);
  });

  socket.on ('disconnect', () => {
    console.log ('User Disconnected', socket.id);
  });
});
const port = process.env.PORT || 3001;
server.listen (port, () => {
  console.log ('listening to port 3001');
});
