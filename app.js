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



app.on('connection', function(socket){
    console.log("Un utilisateur est connecté");
    socket.on('disconnect', function(){
        console.log("Un utilisateur s'est deconnecte");
    })
    socket.on('pseudo', function(pseudo){
        console.log("pseudo recu" + pseudo);
    })
})

app.listen(port, () =>{
    console.log(`Le serveur écoute sur le port : ${port}`);
});