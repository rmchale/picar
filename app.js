var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var piblaster = require('pi-blaster.js');

app.use(express.static('public'))

io.on('connection', function(socket) {
    console.log('A new WebSocket connection has been established');

    socket.on ('send tilt', function (tilt) {
        console.log(tilt)
    });

    socket.on('stop', function (value) {
        piblaster.setPwm(18, 0); //# 100% brightness
        piblaster.setPwm(23, 0)

    })

    socket.on ('fromdevice', function (tilt) {
        piblaster.setPwm(18, tilt.forward); //# 100% brightness
        piblaster.setPwm(23, tilt.reverse)

       // console.log(tilt)
    });
});



setInterval(function() {
    var millis = Date.now()
    io.emit('millis update', millis);
}, 50);

http.listen(8000, function() {
    console.log('Listening on *:8000');
});