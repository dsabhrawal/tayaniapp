'use strict';
/**
 * @name tayaniApp.controller:MainCtrl
 * Controller of the tayaniApp
 */

angular.module('tayaniApp')
	.controller('DieselReportController',['$rootScope', '$scope', 'dieselReportsService', 'toaster', 'APP_CONSTANTS', '$log', 'TransportService', '$window', 'FirmService', function($rootScope, $scope, dieselReportsService, toaster, APP_CONSTANTS, $log, TransportService, $window, FirmService) {

	/*$scope.donut = {
		labels : [ "In Stock", "Tayani Consumption", "Third Party Consumption" ],
		data : [ stock, tayaniConsumption, thirdPartyConsumption ]
	};

	$scope.pie = {
		labels : [ "In Stock", "Tayani Consumption", "Third Party Consumption" ],
		data : [ stock, tayaniConsumption, thirdPartyConsumption ]
	};*/
		
	$scope.activeTab = 1;
	$scope.setActiveTab = function(activeTab){
		$scope.activeTab = activeTab;
	}
		 
	$log.log(APP_CONSTANTS.DATE_FORMAT);	
	$scope.convertDate = function(date){
			var d1 = Date.parse(date);
			var d2 = d1.toString(APP_CONSTANTS.DATE_FORMAT);
			return d2;
		}
	
	$scope.firms = [];
	$scope.vehicles = [];
	
	$scope.getAllFirms = function() {
		FirmService.getAll(function(data, status) {
			if (status === 200) {
				console.log("Firms data successfully fetched.");
				$scope.firms = data;
			} else {
				toaster.error("Couldn't get data!");
			}
		});
	}
	
	$scope.getAllTransport = function() {
		TransportService.getVehicleData(function(status, data) {
			if (status === 200) {
				console.log("Vehicles data successfully fetched.");
				$scope.vehicles = data
				$log.log(data);
			} else {
				toaster.error("Couldn't get Data!");
			}
		});
	}
	
	$scope.generateDieselSaleFortnightlyReport = function(selectedFirm, scope){
		$log.log("firms selected to display transactions:: "+ selectedFirm);
		$log.log("reprot scope : "+ scope);
		$scope.firmSaleData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		dieselReportsService.dieselSaleFortnightlyReport(selectedFirm, scope, function(data, status){
			if(status === 200){
			 $log.log("reproted fetched success.");
			 var transactions = JSON.parse(JSON.stringify(data));
			   $log.log("Transactions::: " + transactions);
			  
				transactions.forEach(function(element){
					var date = $scope.convertDate(element.date);
					var index = $scope.lables.indexOf(date);
					console.log("date and index "+ date + "   "+ index);
					$scope.firmSaleData.splice(index, 0, element.quantity);
				})
				
				$scope.barFirmVehicle = {
					labels : $scope.lables,
					series : [ 'Sale' ],

					data : [
						$scope.firmSaleData,
					]
				};
			}
			else{
				$log.log("error status: "+ JSON.stringify(status));
			}
		});
		
	}

	$scope.dieselFlowData = function(){
		dieselReportsService.getTotalDieselFlowFortnightly(function(status, data) {
		if (status === 200) {
			   var transactions = JSON.parse(JSON.stringify(data));
			   console.log("Transactions::: " + transactions);
			  
				transactions.forEach(function(element){
					var date = $scope.convertDate(element.date);
					var index = $scope.lables.indexOf(date);
					console.log("date and index "+ date + "   "+ index);
					$scope.saleData.splice(index, 0, element.sale);
					$scope.purchaseData.splice(index, 0, element.purchase);
				})
				
				$scope.bar = {
						labels : $scope.lables,
						series : [ 'Purchase', 'Sale' ],

						data : [
							$scope.purchaseData,
							$scope.saleData
						]
					};
				//toString('dd MMM')
			toaster.info("Transaction remove success!");

		} else {
			toaster.error("Couldn't get transaction!");
		}
		});
	}
		
		$scope.init = function(){
			$scope.lables = dieselReportsService.labelsForteenDays();
			$scope.getAllFirms();
			$scope.getAllTransport();
			$scope.firmSaleData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
			$scope.purchaseData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
			$scope.saleData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
			$scope.dieselFlowData();
		}
		

	$scope.init();
}])
.controller('DieselSaleFirmReportCtrl',['$scope', '$window', 'FirmService', 'APP_CONSTANTS', '$log', 'dieselReportsService', 'TransportService', function($scope, $window, FirmService, APP_CONSTANTS, $log, dieselReportsService, TransportService) { //controller for firm wise diesel sale report
	$scope.firms = [];
	$scope.vehicles = [];
	
	$scope.getAllFirms = function() {
		FirmService.getAll(function(data, status) {
			if (status === 200) {
				console.log("Firms data successfully fetched.");
				$scope.firms = data;
			} else {
				toaster.error("Couldn't get data!");
			}
		});
	}
	
	$scope.getAllTransport = function() {
		TransportService.getVehicleData(function(status, data) {
			if (status === 200) {
				console.log("Vehicles data successfully fetched.");
				$scope.vehicles = data
				$log.log(data);
			} else {
				toaster.error("Couldn't get Data!");
			}
		});
	}
	
	$scope.generateDieselSaleFortnightlyReport = function(selectedFirm, scope){
		$log.log("firms selected to display transactions:: "+ selectedFirm);
		$log.log("reprot scope : "+ scope);
		$scope.firmSaleData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		dieselReportsService.dieselSaleFortnightlyReport(selectedFirm, scope, function(data, status){
			if(status === 200){
			 $log.log("reproted fetched success.");
			 var transactions = JSON.parse(JSON.stringify(data));
			   $log.log("Transactions::: " + transactions);
			  
				transactions.forEach(function(element){
					var date = $scope.convertDate(element.date);
					var index = $scope.lables.indexOf(date);
					console.log("date and index "+ date + "   "+ index);
					$scope.firmSaleData.splice(index, 0, element.quantity);
				})
				
				$scope.bar = {
					labels : $scope.lables,
					series : [ 'Sale' ],

					data : [
						$scope.firmSaleData,
					]
				};
			}
			else{
				$log.log("error status: "+ JSON.stringify(status));
			}
		});
		
	}

	$scope.convertDate = function(date){
		var d1 = Date.parse(date);
		var d2 = d1.toString(APP_CONSTANTS.DATE_FORMAT);
		return d2;
	}
	
	$scope.init = function(){
		$scope.getAllFirms();
		$scope.getAllTransport();
		$scope.firmSaleData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		$scope.lables = dieselReportsService.labelsForteenDays();
	}
	$scope.init();
}]);