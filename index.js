const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const port = 5000;


const app = express();

app.set('view engine', 'ejs');

const server = http.createServer(app);

const io = socketIO(server);

io.on('connection', (socket) => {
    const number = Math.floor(Math.random() * 2);
   // const arr = await io.fetchSockets();
    //console.log(number);
    socket.join(number);
    socket.on('send_message', (data) => {
        //io.sockets.emit('server_send_msg', data);
        socket.broadcast.to(number).emit('server_send_msg', data);
    })


    socket.on('disconnect', (data) => {
        console.log(data);
    })
})

app.get('/', (req, res)=> {
    res.render('index');
})

server.listen(port, console.log(`Listen: http://localhost:${port}`));