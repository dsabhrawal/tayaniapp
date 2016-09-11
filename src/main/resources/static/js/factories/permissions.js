angular.module('tayaniApp').service('authService', function(){

	  var user = {};
	  //user.role = 'mineUser';
	 //user.role = 'officeUser';
	  user.role = 'admin';
	  return{
	    getUser: function(){
	      return user;
	    },
	    generateRoleData: function(){
	      /*this is resolved before the router loads the view and model*/
	      /*...*/
	    }
	  }
	});

