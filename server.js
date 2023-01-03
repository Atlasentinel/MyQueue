const path = require("path");
const express = require("express");

var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var apiKey = "AIzaSyCwwDOBMtEaj1AoteAYjLJ-DDHRxsebzLw";
var baseApiUrl = "https://www.googleapis.com/youtube/v3/ ";



const port = 3000;



app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/");

  res.sendFile(__dirname + "/script.js");
});

app.get("/room", async(req, res) => {
  res.sendFile(__dirname + "/public/room.html");
});




//MYSQL CON
const mysql = require('mysql');

// Création de la connexion à la base de données
const connection = mysql.createConnection({
  host: 'localhost', // adresse de l'hôte où se trouve la base de données
  user: 'root', // nom d'utilisateur de la base de données
  password: '', // mot de passe de la base de données
  database: 'myqueue' // nom de la base de données
});

// On se connecte à la base de données
connection.connect((error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log('Connecté à la base de données');
});




let users = [];
let pseudo;
// server-side
io.on('connection', (socket) => {

  console.log("user connected");

  socket.on("pseudo", (data) => {
    console.log("pseudo recus : " + data);
    pseudo = data;
    users.push(pseudo);
    console.log(users);
    
    
  });
  
  socket.emit("users", users); 
  socket.emit("test", pseudo);

  socket.on('add-music', (data) => {
    const music = data.music;
    const query = `INSERT INTO music (urlMusic) VALUES ('${music}')`;
    connection.query(query, (error, results) => {
      if (error) {
        console.error(error);
        socket.emit('music-added', { message: 'Erreur lors de l\'insertion de la musique dans la room' });
      } else {
        socket.emit('music-added', { message: 'Musique ajoutée avec succès dans la room' });
      }
    });
  });


    const query = `SELECT * FROM music`;
    connection.query(query, (error, results) => {
      if (error) {
        console.error(error);
        socket.emit('music-list', { musicList: [] });
      } else {
        socket.emit('music-list', { musicList: results });
      }
    });


  socket.on("disconnect", () => {
    console.log("déconnecter"); 
  });
});





http.listen(port, function () {
  console.log(`Server lancer sur le port ${port}`);

});
