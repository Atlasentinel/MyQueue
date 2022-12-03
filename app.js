const path = require("path");
const express = require("express");
const { message } = require("statuses");
const app = express();
const port = 3000;
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req,res) =>{
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/room", (req,res) =>{
    res.sendFile(__dirname + "/public/room.html");
});


io.on('connection',(socket) =>{



    socket.on('join_room', room =>{
        socket.join(room);
    });

    socket.on("pseudo", data =>{
        var pseudo = document.getElementById("psedo");
        if(pseudo.value == null){
            message.push("Vous devez entrer un pseudo");
        }
            
    });

});

app.listen(port, () =>{
    console.log(`Le serveur écoute sur le port : ${port}`);
});