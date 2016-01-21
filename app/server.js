var express=require('express'),
	app=express(),
	path=require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000,function(){
	console.log('Listening ....');
});