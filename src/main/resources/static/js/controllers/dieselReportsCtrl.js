'use strict';
/**
 * @name tayaniApp.controller:MainCtrl
 * Controller of the tayaniApp
 */

angular.module('tayaniApp')
	.controller('DieselReportController',['$rootScope', '$scope', 'dieselReportsService', 'toaster', 'APP_CONSTANTS', '$log', function($rootScope, $scope, dieselReportsService, toaster, APP_CONSTANTS, $log) {

	/*$scope.donut = {
		labels : [ "In Stock", "Tayani Consumption", "Third Party Consumption" ],
		data : [ stock, tayaniConsumption, thirdPartyConsumption ]
	};

	$scope.pie = {
		labels : [ "In Stock", "Tayani Consumption", "Third Party Consumption" ],
		data : [ stock, tayaniConsumption, thirdPartyConsumption ]
	};*/
	$log.log(APP_CONSTANTS.DATE_FORMAT);	
	$scope.convertDate = function(date){
			var d1 = Date.parse(date);
			var d2 = d1.toString(APP_CONSTANTS.DATE_FORMAT);
			return d2;
		}
	
	$scope.init = function(){
		$scope.lables = dieselReportsService.labelsForteenDays();
		$scope.purchaseData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		$scope.saleData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	}
	
	var data = dieselReportsService.getTotalDieselFlowFortnightly(function(status, data) {
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
	$scope.init();
}])
.controller('DieselSaleFirmReportCtrl',['$scope', '$window', 'FirmService', 'APP_CONSTANTS', '$log', function($scope, $window, FirmService, APP_CONSTANTS, $log) { //controller for firm wise diesel sale report
	$scope.firms = [];
	$scope.getAllFirms = function() {
		if ($window.sessionStorage["firms"]) {
			$scope.firms = JSON.parse($window.sessionStorage["firms"]);
		}else{
		FirmService.getAll(function(data, status) {
			if (status === 200) {
				console.log("Firms data successfully fetched.");
				$scope.firms = data;
				$window.sessionStorage["firms"] = JSON.stringify(data);
			} else {
				toaster.error("Couldn't get data!");
			}
		});
		}
	}
	
	$scope.generateDieselSaleReportFirm = function(selectedFirm){
		$log.log("firms selected to display transactions:: "+ selectedFirm);
		/*var data = dieselReportsService.getTotalDieselFlowFortnightly(function(status, data) {
		}*/
	}

	
	$scope.init = function(){
		$scope.getAllFirms();
	}
	$scope.init();
}]);