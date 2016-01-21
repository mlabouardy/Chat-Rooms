var express=require('express'),
	app=express(),
	server=require('http').Server(express),
	io=require('socket.io')(server);

io.set('origins', 'http://localhost:3000');

var nbrOfUsers=0;

io.on('connection',function(socket){
	console.log('User join room');
	nbrOfUsers++;
	socket.emit('currentUsers',{count:nbrOfUsers});
	socket.broadcast.emit('newUser',{count:nbrOfUsers, msg:"User join room"});
	
	socket.on('newMessage',function(data){
		socket.broadcast.emit('newMessage',data);
		console.log('new message: '+data.msg);
	});

	socket.on('startTyping',function(data){
		socket.broadcast.emit('startTyping',{status:"User is typing"});
	});

	io.on('disconnect',function(){	
		console.log('User left room');
		nbrOfUsers--;
		socket.broadcast.emit('userLeft',{msg:"User left room"});
	})
});

server.listen(8080,function(){
	console.log('Server listening ...');
});