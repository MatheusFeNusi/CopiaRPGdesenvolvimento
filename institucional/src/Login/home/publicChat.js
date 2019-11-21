var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:3000")

const webSite = "RadixCode";

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on("add_user", user => {
   
    socket.emit("server_message",{
        name:webSite,
        message:`Welcome to ${webSite}`
    })
    socket.user = user; 
  });

    socket.broadcast.emit("server_message",{  
        name:webSite,
        message:`${user.name} entrou no chat`
  }); 
  
});

http.listen(6900, function(){
  console.log('listening on *:3000');
});