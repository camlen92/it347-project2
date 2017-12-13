var app = require('express')();
var express = require('express');
var serveIndex = require('serve-index');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nicknames = [];

app.use('/public', express.static('/public'));
app.use('/public', serveIndex('public', {'icons': true}));
app.get('/', function(req, res){
  	res.sendFile(__dirname + '/public/index.html');
});
app.get('/public/test.gif', function(req, res){
	res.sendFile(__dirname + '/public/test.gif');
});
app.get('/public/test.jpg', function(req, res){
	res.sendFile(__dirname + '/public/test.jpg');
});
app.get('/public/test.txt', function(req, res){
	res.sendFile(__dirname + '/public/test.txt');
});
app.get('/public/index.html', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});
app.get('/CHAT', function(req, res){
	//io.emit('<chat line>', msg);
	io.emit('chat line: ' + req.query.line);
});


io.on('connection', function(socket){
	socket.on('adduser', function(name) {
		socket.username = name;
		console.log(socket.username + ' connected');
	});
	
	socket.on('chat message', function(msg){
	//console.log('message: ' + msg);
	io.emit('chat message', socket.username + ": " + msg);
  });
});



http.listen(9020, function(){
  console.log('listening on *:9020');
});
