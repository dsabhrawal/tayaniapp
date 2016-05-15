'use strict';

/* Services */

var AppServices = angular.module('TayaniApp.services', []);

AppServices.value('version', '0.1');


AppServices.factory('FirmService', [ '$http', function($http) {
	var urlBase = '/rest/firm';
	return {
		getAllFirms : function() {
			return $http.get(urlBase+'/all');
		},
		addNewFirm : function(firmName){
			return $http.post(urlBase+'/add/'+firmName);
		},
		deleteFirm : function(id){
			return $http.delete(urlBase+'/remove/'+id);
		},
		deleteAllFirms : function(){
			return $http.delete(urlBase+'/all');
		}
	
	}
}]);
