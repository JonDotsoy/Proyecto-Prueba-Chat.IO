var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

app.use('/', express.static(__dirname + '/public'));

app.use('/comp/bootstrap', express.static(__dirname + '/bower_components/bootstrap/dist'))

app.use('/comp/jquery', express.static(__dirname + '/bower_components/jquery/dist'))

var usersConects = 0

io.on('connection', function (socket) {

	usersConects++
	io.emit('connets', {usersOnline: usersConects})
	console.log(usersConects)

	socket.on('disconnect', function(){
		usersConects--
		io.emit('connets', {usersOnline: usersConects})
		console.log(usersConects)
	})

  socket.on('recive mensaje', function(data) {

  	data.ip = socket.handshake.address

  	io.emit('nuevo mensaje', data)
  })
});