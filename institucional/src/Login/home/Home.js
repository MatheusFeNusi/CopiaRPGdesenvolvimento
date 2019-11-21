import React, { Component } from 'react';
import './Home.css';
import Navbar from '../common/AppHeader';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Col';
import ImagemLateral from '../img/homeAcesso.jpg'
import Axios from 'axios';

import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:3000")

    var app = require('express')();
    var http = require('http').createServer(app);
    var io = require('socket.io')(http);
    

class Home extends Component {

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
   
    render() {
        return (
            <div style={{backgroundImage: `url(${ImagemLateral})`, backgroundSize: 'cover', backgroundRepeat:'no-repeat', height: '615px'}}>
                <Navbar />
                

                    <Col md={4} style={{left: '410px', top: '100px'}}>
                        <div className="form-item">
                            <h1 className="home-title"></h1>
                            <h1 className="home-title">              </h1>
                            <h1 className="home-title">              </h1>
                            <div style={{ height: '40px' }}>
                                <div className="graf-circle"></div>
                                <div className="graf-circle"></div>
                                <div className="graf-circle"></div>
                                <div className="graf-circle"></div>
                                <div className="graf-circle"></div>
                                <div className="graf-circle"></div>
                            </div>

                            <h1 className="home-title">              </h1>
                            <h1 className="home-title">              </h1>
                            <h1 className="home-title">              </h1>
                            <h1 className="home-title">              </h1>



                        </div>
                    </Col>

                    <Col md={4} style={{left: '410px', top: '220px'}}>
                        <input type="link" id="link" name="link"
                            className="form-control" placeholder="Inserir Link"
                            onChange={this.handleInputChange} required />
                        <br />
                        <br />
                        <div className="form-item">
                            <button onClick={this.logar} type="button" className="btn btn-block btn-primary">Usar Link</button>
                        </div>
                        <div className="form-item">
                            <button onClick={this.logar} type="button" className="btn btn-block btn-primary">Criar sala</button>
                        </div>
                    </Col>
                    <br />
            </div>
        )
    }
}

export default Home;