//import express frmework 
const express = require('express');

//Setting up the server by using express
const application = express();

//Making a server app run through http 
const server = require('http').Server(application);

//Giving public folder to my express application
application.use(express.static('public'));


//importing socket.io and linking it with server
const io= require('socket.io')(server);

io.on('connection',(socket)=>{
    console.log("Connection established",socket.id);

    //triggering on 'message1' event
    socket.on('message1',(data)=>{
        //user is sending message and giving that message to io
        io.emit('message1',data); //emitting this message to all other sockets
    })

    socket.on('disconnect',()=> {
        console.log("user left the chat")
    })
})

//Creating port to run the server
const PORT = 9000;  //this is inbuilt keyword
server.listen(PORT,()=>{
  console.log(`Server is on Port ${PORT}`);
})
