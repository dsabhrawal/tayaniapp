'use strict';
/**
 * @name tayaniApp.controller:MainCtrl
 * Controller of the tayaniApp
 */

angular.module('tayaniApp')
	.controller('LoginCtrl', function($rootScope, $scope,$window, $state, authService, toaster) {
		$scope.loginForm = {
			username : '',
			password : ''
		}
		$scope.login = function(loginForm) {
			$scope.loginFrom = loginForm;
			authService.login(loginForm, function(result){
				if(true === result){
					console.log("logged IN: " + result);
					$scope.changeState('dashboard.home');
				}
				else{
					console.log("logged IN: " + result);
					toaster.error('Invalid Details!');
					//$scope.changeState('login');
					
				}
			});
			
		}
		
		$scope.logout = function(){
			console.log('in logout ctrl');
			authService.logout();
		}
		
		$scope.changeState = function (state) {
		    $state.go(state);
		};
		
		$scope.init = function(){
			$scope.logout();
		}
		$scope.init();
	});