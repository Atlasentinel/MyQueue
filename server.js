const path = require("path");
const express = require("express");


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = 3000;


app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/");
});

app.get("/room", (req, res) => {
    res.sendFile(__dirname + "/public/room.html");
});




let users = [];

io.on('connection',  socket => {


    
        socket.join("room1");
        socket.to("room1").emit("azeazeazeazeaz");
        


    /* Reception du pseudo */
    socket.on('pseudo', function (pseudo) {
        console.log("pseudo recu : " + pseudo);
    })

   
    /* Création de la room 
    let rooms = [];
    socket.on("create-room", ({ id, name }) => {
      console.log("test");
      roomName = id + name;
      for (room in rooms) {
        if (roomName !== rooms[room]) {
          rooms.push(roomName);
          console.log(rooms);
        } else {
          console.log("deja dans la room");
        }
      }
      console.log("Nom de la room: " + roomName);
      socket.join(roomName);
      socket.emit("create-room  ", roomName);
    });*/




    socket.on('disconnect', function () {
        console.log(`Un utilisateur vient de se deconnecter`);
    });


});


http.listen(port, function () {
    console.log(`Server lancer sur le port ${port}`);
})

