const express= require ('express');
const socket= require('socket.io');
const logger= require('./helper/logger');
const app=express();

const port = process.env.PORT||9000;
app.listen(port, logger.log("Dev-connector server is running on ", port));

//static files
app.use(express.static('public'));

//socket setup
const io =socket(port);

io.on('connection',function (socket) {
    logger.log('made socket connection',socket.id);
    socket.on('chat',function (data) {
        io.sockets.emit('chat',data);
    });
    socket.on('typing',function (data) {
       socket.broadcast.emit('typing',data)
    });

});