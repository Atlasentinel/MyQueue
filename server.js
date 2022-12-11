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

// server-side
io.on("connection", (socket) => {
    console.log("connect");

    socket.on("ping", (count) => {
      console.log(count);
    });
  });


http.listen(port, function () {
    console.log(`Server lancer sur le port ${port}`);
})

