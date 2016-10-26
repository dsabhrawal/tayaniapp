angular.module('tayaniApp').service('authService', function($rootScope, $window){

	  var user = {};
	  //user.role = 'mineUser';
	  user.username = '';
	  user.role = '';
	  
	  var getCurrentUser = function(){
		   var currentUser = null;
			 if ($window.sessionStorage["currentUser"]) {
				 currentUser = JSON.parse($window.sessionStorage["currentUser"]);
			}
		  return currentUser;
	  }
	  var login = function(loginForm, cbResult){
		  var logged = false;
		  if(loginForm.username === 'deepak'){
			   user.username = 'dsabhrawal';
				$rootScope.loggedInUser = user.username;
				user.role = 'admin';
				$window.sessionStorage["currentUser"] = JSON.stringify(user);
				console.log("done");
				logged = true;
			}
			else if(loginForm.username === 'adi')
				{
				 user.username = 'aditya';
				 $rootScope.loggedInUser = user.username;
				user.role = 'mineuser';
				$window.sessionStorage["currentUser"] = JSON.stringify(user);
				console.log("done");
				logged = true;
				}
		  return cbResult(logged);
	  }
	  
	  var logout = function(){
		  user = {username:'', role:''};
		  $rootScope.loggedInUser = null;
		  $window.sessionStorage["currentUser"] = null;
		  console.log("loggedout");
	  }
	  
	  var generateRoleData = function(){
	      /*this is resolved before the router loads the view and model*/
	      /*...*/
	    }
	  return{
		getCurrentUser: getCurrentUser,
	    login : login,
	    generateRoleData : generateRoleData,
	    logout : logout
	  }
	});

angular.module('tayaniApp').service('loginModal', function ($modal, $rootScope) {

	  function assignCurrentUser (user) {
	    $rootScope.loggedInUser = user;
	    return user;
	  }

	  return function() {
	    var instance = $modal.open({
	    	 templateUrl: 'templates/views/auth/login.html',
	         controller: 'LoginCtrl'
	    })

	    return instance.result.then(assignCurrentUser);
	  };

	});

