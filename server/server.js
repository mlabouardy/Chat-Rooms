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
	socket.broadcast.emit('newUser',{count:nbrOfUsers, msg:"User join room", type:"Info"});
	
	socket.on('newMessage',function(data){
		data.type="Friend";
		socket.broadcast.emit('newMessage',data);
	});

	socket.on('startTyping',function(data){
		socket.broadcast.emit('startTyping',{status:"User is typing"});
	});

	socket.on('stopTyping',function(data){
		socket.broadcast.emit('startTyping',{status:"", type:"Server"});
	});

	io.on('disconnect',function(){	
		console.log('User left room');
		nbrOfUsers--;
		socket.broadcast.emit('userLeft',{msg:"User left room", type:"Info"});
	})
});

server.listen(8080,function(){
	console.log('Server listening ...');
});