'use strict';
/**
 * @ngdoc function
 * @name tayaniApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tayaniApp
 */

angular.module('tayaniApp')
	.controller('DieselCtrl', function($rootScope, $scope, $position, $http, dieselService, vehicleService) {
	
		$scope.dieselTransactionForm = {
				dealTypeSelected : 'NONE',
				selectedCompany: '',
				selectedVehicle:'',
				quantity:'',
				transactionDate:''
		}
		$scope.dieselTransaction = {};
		$scope.inflow = {};
		$scope.editMode = false;
		$scope.predicate = 'id';
		$scope.inflowTransactions = [];
		$rootScope.dieselInStock = '';
		$scope.dealSelected = 'NONE';
		
		$rootScope.dieselInflowPrice = '45';
		$rootScope.dieselOutflowPrice = '50';
		
		$scope.dieselTransactionForm = {
				name : "deepak"
		}

		$scope.deaselDealers = [ {
			id : 1,
			name : "BPL Ltd"
		}, {
			id : 2,
			name : "NCP Limited"
		}
		];

		$scope.owners = vehicleService.getOwners();
		$scope.vehicles = vehicleService.getVehicleData();
		console.log($scope.vehicles);
		
		/* Diesel Price configuration start*/
		
		$scope.saveDieselPrices = function(dieselInflowPrice, dieselOutflowPrice){
			console.log("diesel prices:::: "+ dieselInflowPrice  + "    "+ dieselOutflowPrice);
		}
		$scope.resetDieselPrices = function(){
			$scope.dieselInflowPrice = '';
			$scope.dieselOutflowPrice = '';
		}
		
		/* Diesel Price Configuration end*/
		
		$scope.fetchAllInflowTransactions = function() {
			/* $http.get('/rest/orders').success(function(rsList){
			 $scope.orders = rsList;
			 });*/
			$scope.inflowTransactions = dieselService.getInflowData();
		};
		
		$scope.fetchDieselTransactions = function() {
			/* $http.get('/rest/orders').success(function(rsList){
			 $scope.orders = rsList;
			 });*/
			$scope.dieselTransactions = dieselService.getDieselTransaction();
		};

		$scope.saveDieselTransaction = function(dieselTransactionForm) {

			$scope.resetError();

			/*  $http.post('/rest/order/add', order).success(function() {
			 $scope.fetchAllOrders();
			 $scope.order.productName = '';
			 $scope.order.buyer = '';
			 $scope.order.quantity = '';
			 $scope.order.delivered = false;
			 $scope.order = {};
			 }).error(function() {
			 $scope.setError('Could not add a new order');
			 });*/
			dieselTransactionForm.id = '3';
			dieselService.addDieselTransaction(dieselTransactionForm);
			$scope.fetchAllInflowTransactions();
			$scope.dieselTransactionForm = {};
			
			console.log("inflow.quantity    " + dieselTransactionForm.quantity);
			console.log("inflow.transactionDate      " +dieselTransactionForm.transactionDate);
			console.log("dealSelected   "+  dieselTransactionForm.dealTypeSelected);
			console.log("selectedCompany     "+ dieselTransactionForm.selectedCompany);
			console.log("selectedVehicle     " + dieselTransactionForm.selectedVehicle);
			
		};

		$scope.updateDieselInflow = function(inflow) {
			$scope.resetError();

			/* $http.put('/rest/order/update', order).success(function() {
			 $scope.fetchAllOrders();
			 $scope.order.productName = '';
			 $scope.order.buyer = '';
			 $scope.order.quantity = '';
			 $scope.order.delivered = false;
			 $scope.editMode = false;
			 $scope.order = {};
			 }).error(function() {
			 $scope.setError('Could not update the order');
			 });*/
			console.log("update done.");
			$scope.inflow = {};
		};

		$scope.editInflowTransaction = function(inflow) {
			$scope.resetError();
			$scope.inflow = inflow;
			$scope.editMode = true;
		};

		$scope.removeInflowTransaction = function(inflow) {
			$scope.resetError();

			/* $http.delete('/rest/order/remove/' + id).success(function() {
			 $scope.fetchAllOrders();
			 }).error(function() {
			 $scope.setError('Could not remove order');
			 });*/
			var index = $scope.inflowTransactions.indexOf(inflow);
			console.log("index ... " + index);
			if (index != -1) {
				dieselService.removeInflow(index);
			}
			$scope.fetchAllInflowTransactions();
		};

		$scope.removeAllInflowTransactions = function() {
			$scope.resetError();

			/*$http.delete('/rest/orders').success(function() {
			 $scope.fetchAllOrders();
			 }).error(function() {
			 $scope.setError('Could not remove all orders');
			 });*/
			dieselService.removeAllInflow();
			$scope.fetchAllInflowTransactions();
		};

		$scope.resetDieselTransactionForm = function() {
			$scope.resetError();
			$scope.dieselTransactionForm = {};
			$scope.editMode = false;
		};

		$scope.resetError = function() {
			$scope.error = false;
			$scope.errorMessage = '';
		};

		$scope.setError = function(message) {
			$scope.error = true;
			$scope.errorMessage = message;
		};

		$scope.fetchAllInflowTransactions();
		$scope.fetchDieselTransactions();


		/* Outflow journey */
		$scope.outflow = {};
		$scope.outflowTransactions = [];

		$scope.fetchAllOutflowTransactions = function() {
			/* $http.get('/rest/orders').success(function(rsList){
			 $scope.orders = rsList;
			 });*/
			$scope.outflowTransactions = dieselService.getOutflowData();
		};

		$scope.saveDieselOutflow = function(outflow) {

			$scope.resetError();

			/*  $http.post('/rest/order/add', order).success(function() {
			 $scope.fetchAllOrders();
			 $scope.order.productName = '';
			 $scope.order.buyer = '';
			 $scope.order.quantity = '';
			 $scope.order.delivered = false;
			 $scope.order = {};
			 }).error(function() {
			 $scope.setError('Could not add a new order');
			 });*/

			outflow.id = '3';
			dieselService.addOutflow(outflow);
			$scope.fetchAllOutflowTransactions();
			$scope.outflow = {};
		};

		$scope.updateDieselOutflow = function(outflow) {
			$scope.resetError();

			/* $http.put('/rest/order/update', order).success(function() {
			 $scope.fetchAllOrders();
			 $scope.order.productName = '';
			 $scope.order.buyer = '';
			 $scope.order.quantity = '';
			 $scope.order.delivered = false;
			 $scope.editMode = false;
			 $scope.order = {};
			 }).error(function() {
			 $scope.setError('Could not update the order');
			 });*/
			console.log("update done.");
			$scope.outflow = {};
		};

		$scope.editOutflowTransaction = function(outflow) {
			$scope.resetError();
			$scope.outflow = outflow;
			$scope.editMode = true;
		};

		$scope.removeOutflowTransaction = function(outflow) {
			$scope.resetError();

			/* $http.delete('/rest/order/remove/' + id).success(function() {
			 $scope.fetchAllOrders();
			 }).error(function() {
			 $scope.setError('Could not remove order');
			 });*/
			var index = $scope.outflowTransactions.indexOf(outflow);
			console.log("index ... " + index);
			dieselService.removeOutflow(index);
			$scope.fetchAllOutflowTransactions();
		};

		$scope.removeAllOutflowTransactions = function() {
			$scope.resetError();

			/*$http.delete('/rest/orders').success(function() {
			 $scope.fetchAllOrders();
			 }).error(function() {
			 $scope.setError('Could not remove all orders');
			 });*/
			dieselService.removeAllOutflow();
			$scope.fetchAllOutflowTransactions();
		};

		$scope.resetDieselOutflowForm = function() {
			$scope.resetError();
			$scope.outflow = {};
			$scope.editMode = false;
		};

		$scope.fetchAllOutflowTransactions();

		/* Report section */

		var totalInflow = 0;

		for (var key in $scope.inflowTransactions) {
			totalInflow += parseInt($scope.inflowTransactions[key].quantity);
		}
		;
		$scope.totalInflow = totalInflow;
		var totalOutflow = 0;

		for (var key in $scope.outflowTransactions) {
			totalOutflow += parseInt($scope.outflowTransactions[key].quantity);
		}
		;
		$scope.totalOutflow = totalOutflow;
		console.log("total outflow: " + totalOutflow);

		var tayaniConsumption = 0;
		var thirdPartyConsumption = 0;
		for (var key in $scope.outflowTransactions) {
			var obj = $scope.outflowTransactions[key];
			if (obj.buyer === 'Tayani') {
				tayaniConsumption += parseInt(obj.quantity);
			}
			else {
				thirdPartyConsumption += parseInt(obj.quantity);
			}
		}
		;
		console.log("Tayani Consumption outflow: " + tayaniConsumption);
		console.log("Third party Consumption outflow: " + thirdPartyConsumption);

		var stock = totalInflow - totalOutflow;
		$rootScope.dieselInStock = stock;
		console.log("in stock:  " + $rootScope.dieselInStock);
		$scope.donut = {
			labels : [ "In Stock", "Tayani Consumption", "Third Party Consumption" ],
			data : [ stock, tayaniConsumption, thirdPartyConsumption ]
		};

		$scope.pie = {
			labels : [ "In Stock", "Tayani Consumption", "Third Party Consumption" ],
			data : [ stock, tayaniConsumption, thirdPartyConsumption ]
		};

	});