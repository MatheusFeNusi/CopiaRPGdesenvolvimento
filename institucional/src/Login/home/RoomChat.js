var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:3000")

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on("join room", room => {
      socket.join(room);
  }); 


   socket.on("message",({room,message}) => {
    socket.to(room).emit("message",{
        message,
        name:"Friend"
    });
   });

  
   socket.on("typing",({room})=>{
       socket.to(room).emit("typing","someone is typing")
   });
   

   socket.on("stopped_tying",({room})=>{
         socket.to(room).emit("stopped_tying");
   });

});

http.listen(6000, function(){
  console.log('listening on *:3000');
});