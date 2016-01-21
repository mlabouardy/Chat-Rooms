'use strict';

angular.module('myApp',[])
	.controller('MainCtrl',function($scope){
		$scope.currentUsers=0;

		$scope.messages=[];

		$scope.send=function(){
			$scope.messages.push("Me:"+$scope.msg);
			

			var chat_group=$('#scroll');
		    var height=chat_group[0].scrollHeight;
		    chat_group.scrollTop(height);

		    socket.emit('newMessage',{msg:$scope.msg});
		    $scope.msg="";
		}

		$scope.clean=function(){
			$scope.messages=[];
		}

		$scope.$watch('msg', function(){
	        socket.emit('startTyping',{});
    	});

		var socket = io.connect('http://localhost:8080');

		socket.on('newUser',function(data){
			$scope.$apply(function() {
			  $scope.currentUsers=data.count;
			  $scope.messages.push(data.msg);
			});
			
		});

		socket.on('startTyping',function(data){
			$scope.$apply(function() {
			  $scope.status=data.status;
			});
			
		});

		socket.on('userLeft',function(data){
			$scope.$apply(function() {
			  $scope.messages.push(data.msg);
			});
		});

		socket.on('newMessage',function(data){
			$scope.$apply(function() {
			  $scope.messages.push("Other:"+data.msg);
			});
		});

		socket.on('currentUsers',function(data){
			$scope.$apply(function() {
			  $scope.currentUsers=data.count;
			});
		});
	});