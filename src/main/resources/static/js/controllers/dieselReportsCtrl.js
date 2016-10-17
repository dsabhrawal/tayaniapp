'use strict';
/**
 * @name tayaniApp.controller:MainCtrl
 * Controller of the tayaniApp
 */

angular.module('tayaniApp')
	.controller('DieselReportController', function($rootScope, $scope, dieselService, toaster) {

	/*$scope.donut = {
		labels : [ "In Stock", "Tayani Consumption", "Third Party Consumption" ],
		data : [ stock, tayaniConsumption, thirdPartyConsumption ]
	};

	$scope.pie = {
		labels : [ "In Stock", "Tayani Consumption", "Third Party Consumption" ],
		data : [ stock, tayaniConsumption, thirdPartyConsumption ]
	};*/
		$scope.dateFormat = 'dd MMM yyyy';
		$scope.addLabels = function(){
			$scope.lables.push(Date.today().toString($scope.dateFormat));
			$scope.lables.push(Date.today().addDays(-1).toString($scope.dateFormat));
			$scope.lables.push(Date.today().addDays(-2).toString($scope.dateFormat));
			$scope.lables.push(Date.today().addDays(-3).toString($scope.dateFormat));
			$scope.lables.push(Date.today().addDays(-4).toString($scope.dateFormat));
			$scope.lables.push(Date.today().addDays(-5).toString($scope.dateFormat));
			$scope.lables.push(Date.today().addDays(-6).toString($scope.dateFormat));
			$scope.lables.push(Date.today().addDays(-7).toString($scope.dateFormat));
			$scope.lables.push(Date.today().addDays(-8).toString($scope.dateFormat));
			$scope.lables.push(Date.today().addDays(-9).toString($scope.dateFormat));
			$scope.lables.push(Date.today().addDays(-10).toString($scope.dateFormat));
			$scope.lables.push(Date.today().addDays(-11).toString($scope.dateFormat));
			$scope.lables.push(Date.today().addDays(-12).toString($scope.dateFormat));
			$scope.lables.push(Date.today().addDays(-13).toString($scope.dateFormat));
		}
		
		$scope.convertDate = function(date){
			var d1 = Date.parse(date);
			var d2 = d1.toString($scope.dateFormat);
			return d2;
		}
	$scope.lables = new Array();
	$scope.purchaseData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	$scope.saleData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	
	$scope.addLabels();
	
	var data = dieselService.getTotalDieselFlowFortnightly(function(status, data) {
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
});