'use strict';

angular.module('myApp',[])
	.controller('MainCtrl',function($scope){
		$scope.currentUsers=0;

		$scope.messages=[];

		$scope.send=function(){
			var data={};
			data.msg="Me:"+$scope.msg;
			data.type="User";
			data.date=new Date();
			$scope.messages.push(data);

			var chat_group=$('#scroll');
		    var height=chat_group[0].scrollHeight;
		    chat_group.scrollTop(height);

		    socket.emit('newMessage', data);
		    $scope.msg="";
		}

		$scope.clean=function(){
			$scope.messages=[];
		}

		$scope.startTyping=function(){
			socket.emit('startTyping',{});
		}

		$scope.stopTyping=function(){
			socket.emit('stopTyping',{});
		}

		var socket = io.connect('http://localhost:8080');

		socket.on('newUser',function(data){
			$scope.$apply(function() {
			  $scope.currentUsers=data.count;
			  $scope.messages.push(data);
			});
			
		});

		socket.on('startTyping',function(data){
			$scope.$apply(function() {
			  $scope.status=data.status;
			});
			
		});

		socket.on('userLeft',function(data){
			$scope.$apply(function() {
			  $scope.messages.push(data);
			});
		});

		socket.on('newMessage',function(data){
			$scope.$apply(function() {
			  data.msg="Other:"+data.msg;
			  $scope.messages.push(data);
			});
		});

		socket.on('currentUsers',function(data){
			$scope.$apply(function() {
			  $scope.currentUsers=data.count;
			});
		});
	});