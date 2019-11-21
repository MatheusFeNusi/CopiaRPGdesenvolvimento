var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

const getVisitors = () => {
     let client = io.sockets.clients.connected;
     let sockets = Object.values(clients);
     let users = sockets.map(s => s.user);
     return users;     
};


const emitVisitors = () => {
    io.emit("visitors",getVisitors());
}


io.on('connection', function(socket){
  console.log('a user connected');
   
  socket.on("new_visitor",user=>{
    console.log("new_visitor",user);
    socket.user  = user;
  });
   
  socket.on("disconnect", function(){
      console.log("user a disconnected");
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});