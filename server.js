const express = require('express');
const socket = require('socket.io');
// initiallize app
const app = express();

// serve static files
app.use(express.static('public'));

// assigning a port
var PORT = process.env.PORT || 3000;

// assign a server to the port
var server = app.listen(PORT, () => console.log(`server listening to localhost:${PORT}`));

// wrap the socket to listen to the server port
var io = socket(server);

// listen for a connection from client
io.on('connection',(socket) => {
    console.log('Made a connection with', socket.id);
    socket.on('chat', (data) => {
        // console.log(data.message);
        io.sockets.emit('chat',data);
    });
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })
});
