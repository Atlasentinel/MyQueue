const path = require("path");
const express = require("express");

var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

const port = 3000;

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/");
  
  res.sendFile(__dirname + "/script.js");
  
});


app.get("/room", (req, res) => {
  res.sendFile(__dirname + "/public/room.html");
});



let pseudo;
// server-side
io.on("connection", (socket) => {
  console.log("connect");

  socket.on('pseudo', (data) => {
    console.log("pseudo recus : " + data);
    pseudo = data;
    
  });

  socket.emit('test', pseudo);
  socket.leaveAll();
  socket.join("Guest");
  io.to("Guest").emit("join", pseudo)



    socket.on('disconnect', () => {
      console.log("déconnecter");
    });
  });


http.listen(port, function () {
  console.log(`Server lancer sur le port ${port}`);
});
