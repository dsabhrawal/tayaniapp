'use strict';

var AppControllers = angular.module('TayaniApp.controllers', []);

AppControllers.controller('FirmController', ['$scope', 'FirmService', function($scope, FirmService){
	$scope.headingTitle = "Firms Fetched From Server:";
	
	$scope.getAllFirms = function getFirms() {
		FirmService.getAllFirms()
            .then(function (response) {
                $scope.firms = response.data;
            }, function (error) {
                console.log('Unable to load firms data: ' + error.message);
            });
    }
	
	$scope.addNewFirm = function(firmName){
		FirmService.addNewFirm(firmName)
        .then(function (response) {
           console.log("Firm saved success.");
           $scope.getAllFirms();
        }, function (error) {
            console.log('Unable to add firm: ' + error.message);
        });
		
		 $scope.firmName = '';
	}
	
	$scope.removeFirm = function(id){
		FirmService.deleteFirm(id)
        .then(function (response) {
           console.log("Firm deleted success. ID: "+ id)
           $scope.getAllFirms();
        }, function (error) {
            console.log('Unable to remove firm: ' + error.message);
        });
	}
	
	$scope.removeAllFirms = function(){
		FirmService.deleteAllFirms()
        .then(function (response) {
           console.log("Firms deleted success.")
        }, function (error) {
            console.log('Unable to delete firms: ' + error.message);
        });
		
		$scope.getAllFirms();
	}
	
	$scope.getAllFirms(); // getting all firms on first load.
}]);



AppControllers.controller('usersController', function($scope) {
	$scope.headingTitle = "User List";
});