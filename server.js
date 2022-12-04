const path = require("path");
const express = require("express");


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./user');


app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req,res) =>{
    res.sendFile(__dirname + "/public/");
});

app.get("/room", (req,res) =>{
    res.sendFile(__dirname + "/public/room.html");
});






io.on('connection', function(socket){
    
    
 
    /* Reception du pseudo */
    socket.on('pseudo', function(pseudo){
        console.log("pseudo recu " + pseudo);
        socket.broadcast.emit('con', pseudo + ' est connecté sur la room');
    })

    socket.on('joinRoom',({pseudo, room}) => {
        const user = userJoin(socket.id, pseudo, room);

        socket.join(user.room);
        
        socket.broadcast.to(user.room).emit('connexion',(pseudo + "a rejoins la room"));
        console.log(pseudo + "a rejoins la room");
    });

    socket.on('message', msg =>{
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', msg);
    });


    socket.on('disconnect', function(){
        const user = userLeave(socket.id);

        if(user){  
            io.to(user.room).emit('message', `${user.pseudo} has left the room`);
        }

    });
    

});

/*const { pseudo, room} = Qs.parse(localtion.search, {
    ignoreQueryPrefix: true
  })
  console.log(pseudo, room);
  socket.emit('joinRoom', {pseudo, room});*/


http.listen(3000, function(){
    console.log("Server lancer sur le port 3000");
})