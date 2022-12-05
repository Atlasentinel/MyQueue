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






io.on('connection', function (socket) {


    /* Reception du pseudo */
    socket.on('pseudo', function (pseudo) {
        console.log("pseudo recu : " + pseudo);
    })

    socket.on('create-room', function (idKey,pseudo) {
        roomName = idKey+pseudo;
        console.log(roomName);
        socket.join(roomName);
        socket.to(roomName).emit(`${pseudo} à rejoins la room ${roomName}`);

      });


    socket.on('disconnect', function () {
        console.log(`Un utilisateur vient de se deconnecter`);
    });


});


http.listen(port, function () {
    console.log(`Server lancer sur le port ${port}`);
})

