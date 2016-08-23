'use strict';
/**
 * @name tayaniApp.controller:MainCtrl
 * Controller of the tayaniApp
 */

angular.module('tayaniApp')
	.controller('DieselCtrl', function($rootScope, $scope, $position, $http, dieselService, TransportService, DieselConfig, FirmService, DealerService, DealTypeService, $timeout, toaster) {

		$scope.init = function() {
			$scope.dieselTransactionForm = {
				dealTypeSelected : 'NONE',
				selectedCompany : '',
				selectedVehicle : '',
				quantity : '',
				transactionDate : ''
			}
			$scope.dieselTransaction = {};
			$scope.editMode = false;
			$scope.predicate = 'id';
			$scope.totalDieselInflow = 0;
			$scope.totalDieselOutflow = 0;
			$rootScope.dieselInStock = $scope.totalDieselInflow - $scope.totalDieselOutflow;
			$scope.dealSelected = 'NONE';
			$rootScope.loggedInUser = 'dsabhrawal';
			$scope.firms = [];
			$scope.vehicles = [];
			$scope.deaselDealers = [];
		}

		$scope.getDieselInflow = function() {
			dieselService.getTotalInflow(function(status, data) {
				if (status === 200 && data != 'Error') {
					$scope.totalDieselInflow = data;
					$scope.getDieselOutflow();
				}
				else {
					toaster.error("Couldn't get diesel inflow.");
				}
			});
		}
		
		$scope.getDieselOutflow = function() {
			dieselService.getTotalOutflow(function(status, data) {
				if (status === 200 && data != 'Error') {
					$scope.totalDieselOutflow = data;
					$rootScope.dieselInStock = $scope.totalDieselInflow - $scope.totalDieselOutflow;
				}
				else {
					toaster.error("Couldn't get diesel outflow.");
				}
			});
		}
		
		$scope.getDieselDealers = function() {
			DealerService.getAll(function(data, status) {
				if (status === 200) {
					console.log("Dealers data successfully fetched.");
					$scope.deaselDealers = data;
				}
				else {
					toaster.error("Couldn't get data!");
				}
			});
		}

		$scope.getAllFirms = function() {
			FirmService.getAll(function(data, status) {
				if (status === 200) {
					console.log("Firms data successfully fetched.");
					$scope.firms = data;
				}
				else {
					toaster.error("Couldn't get data!");
				}
			});
		}
		$scope.getAllTransport = function() {
			TransportService.getVehicleData(function(status, data) {
				if (status === 200) {
					console.log("Vehicles data successfully fetched.");
					$scope.vehicles = data
				}
				else {
					toaster.error("Couldn't get Data!");
				}
			});
		}

		$scope.fetchDieselTransactions = function() {
			
				dieselService.getDieselTransactions(function(status, data){
					if(status === 200){
						$scope.dieselTransactions = data;
						console.log(JSON.stringify(data));
					}else{
						$scope.setError("Couldn't fetch diesel transactions.");
					}
				});
		};

		$scope.fetchInitialData = function() {
			$scope.getAllFirms();
			$scope.getAllTransport();
			$scope.getDieselDealers();
			$scope.fetchDieselTransactions();
		}


		/********************************* DATA FETCHING AND INITIALIZATION DONE ***********************************************/

		$scope.saveDieselTransaction = function(dieselTransactionForm, update) {

			$scope.dieselTransactionTobeSaved = {
				id : '',
				quantity : dieselTransactionForm.quantity,
				date : dieselTransactionForm.transactionDate,
				dealType : {},
				user : {
					id : 1,
					username : $rootScope.loggedInUser
				}
			};
			
			if(update){
				$scope.dieselTransactionTobeSaved.id = dieselTransactionForm.id;
			}
			console.log("Diesel Transaction to be saved." + JSON.stringify(dieselTransactionForm));
			$scope.resetError();

			/* Getting logged in user details */

			/*finding deal type object from service based on the deal type selected */
			DealTypeService.getDealTypeByType(dieselTransactionForm.dealTypeSelected, function(status, data) {
				if (status === 200) {
					$scope.dieselTransactionTobeSaved.dealType = data;
					$scope.getDieselConfiguration($scope.dieselTransactionTobeSaved.dealType);
				}
				else {
					toaster.error("Couldn't add transaction!");
				}
			});

			$scope.getDieselConfiguration = function(dealType) {
				/* getting diesel configuration based on deal selected */
				DieselConfig.getDieselConfigurationByDealType(dealType, function(status, data) {
					if (status === 200) {
						$scope.dieselTransactionTobeSaved.dieselConfiguration = data;
						if (dieselTransactionForm.dealTypeSelected === 'PURCHASE') {
							$scope.getDieselDealerAndSave();
						}
						else if (dieselTransactionForm.dealTypeSelected === 'SALE') {
							if ($rootScope.dieselInStock - dieselTransactionForm.quantity < 0) {
								$scope.setError("Not enough diesel in stock.");
								$timeout(function() {
									$scope.resetError();
								}, 5000);
								return;
							}

							$scope.getFirmsData();
						}
					}
					else {
						toaster.error("Couldn't add transaction!");
					}
				});
			}

			$scope.getFirmsData = function() {
				/* Getting firm object from db */
				FirmService.getFirmByName(dieselTransactionForm.selectedCompany, function(status, data) {
					if (status === 200) {
						$scope.dieselTransactionTobeSaved.firm = data;
						$scope.getTransportDataAndSave();
					}
					else {
						toaster.error("Couldn't add transaction!");
					}
				});
			}

			/* For Purchase transaction */
			$scope.getDieselDealerAndSave = function() {
				// getting dealer object from db
				DealerService.getDealerByName(dieselTransactionForm.selectedCompany, function(status, data) {
					if (status === 200) {
						$scope.dieselTransactionTobeSaved.dieselDealer = data;
						dieselService.addDieselTransaction($scope.dieselTransactionTobeSaved, function(status, data) {
							if (status === 200 && data !== 'Error') {
								$scope.setInfo("Diesel Transaction saved with Id:" + data);
								$scope.getDieselInflow();
								$scope.dieselTransactionForm = {};
								$scope.fetchDieselTransactions();
							}
							else {
								toaster.error("Couldn't update transaction!");
							}
						});
					}
					else {
						toaster.error("Couldn't add transaction!");
					}
				});
			}

			/* For sale transaction */
			$scope.getTransportDataAndSave = function() {
				/* Getting selected vehicle object from db */
				TransportService.getTransportByVehicleNo(dieselTransactionForm.selectedVehicle, function(status, data) {
					if (status === 200) {
						$scope.dieselTransactionTobeSaved.transport = data;
						dieselService.addDieselTransaction($scope.dieselTransactionTobeSaved, function(status, data) {
							if (status === 200 && data !== 'Error') {
								$scope.setInfo("Diesel Transaction saved with Id:" + data);
								$scope.getDieselInflow();
								$scope.dieselTransactionForm = {};
								$scope.fetchDieselTransactions();
							}
							else {
								$scope.setError("Couldn't update transaction!");
							}
						});
					}
					else {
						toaster.error("Couldn't add transaction!");
					}
				});
			}

		};

		/********************************* Save Transaction End **********************************************/

		$scope.updateDieselTransaction = function(dieselTransaction) {
			$scope.resetError();
			$scope.saveDieselTransaction(dieselTransaction, true);
			$scope.resetDieselTransactionForm();
		};


		$scope.editDieselTransaction = function(dieselTransaction) {
			$scope.resetError();
			console.log(dieselTransaction);
			$scope.dieselTransactionForm.id = dieselTransaction.id;
			$scope.dieselTransactionForm.dealTypeSelected = dieselTransaction.dealType.type;
			if('PURCHASE'=== dieselTransaction.dealType.type){
				$scope.dieselTransactionForm.selectedCompany = dieselTransaction.dieselDealer.name;
			}else{
				$scope.dieselTransactionForm.selectedCompany = dieselTransaction.firm.name;
				$scope.dieselTransactionForm.selectedVehicle = dieselTransaction.transport.vehicleNumber;
			}
			
			$scope.dieselTransactionForm.quantity = dieselTransaction.quantity;
			$scope.dieselTransactionForm.transactionDate = dieselTransaction.date;
			$scope.editMode = true;
		};

		$scope.removeDieselTransaction = function(dieselTransaction) {
			$scope.resetError();

			/* $http.delete('/rest/order/remove/' + id).success(function() {
			 $scope.fetchAllOrders();
			 }).error(function() {
			 $scope.setError('Could not remove order');
			 });*/
			var index = $scope.dieselTransactions.indexOf(dieselTransaction);
			console.log("index ... " + index);
			if (index != -1) {
				dieselService.removeDieselTransaction(index);
			}
			$rootScope.dieselInStock = dieselService.getDieselInStock();
			$scope.fetchDieselTransactions();
		};

		$scope.removeAllDieselTransactions = function() {
			$scope.resetError();

			/*$http.delete('/rest/orders').success(function() {
			 $scope.fetchAllOrders();
			 }).error(function() {
			 $scope.setError('Could not remove all orders');
			 });*/
			dieselService.removeAllDieselTransactions();
			$rootScope.dieselInStock = dieselService.getDieselInStock();
			$scope.fetchDieselTransactions();
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

		$scope.setInfo = function(message) {
			$scope.info = true;
			$scope.infoMessage = message;
		};

		$scope.resetInfo = function(message) {
			$scope.info = false;
			$scope.infoMessage = '';
		};

		$scope.init();
		$scope.fetchInitialData();
		$scope.getDieselInflow();

	}).controller('DieselReportController', function($rootScope, $scope, dieselService) {

	console.log("in stock:  " + $rootScope.dieselInStock);
	console.log(Date.today());
	/*$scope.donut = {
		labels : [ "In Stock", "Tayani Consumption", "Third Party Consumption" ],
		data : [ stock, tayaniConsumption, thirdPartyConsumption ]
	};

	$scope.pie = {
		labels : [ "In Stock", "Tayani Consumption", "Third Party Consumption" ],
		data : [ stock, tayaniConsumption, thirdPartyConsumption ]
	};*/

	$scope.bar = {
		labels : [ Date.today().toString('dd MMM'), Date.today().addDays(-1).toString('dd MMM'), Date.today().addDays(-2).toString('dd MMM'), Date.today().addDays(-3).toString('dd MMM'), Date.today().addDays(-4).toString('dd MMM'), Date.today().addDays(-5).toString('dd MMM'), Date.today().addDays(-6).toString('dd MMM') ],
		series : [ 'Purchase', 'Sale' ],

		data : [
			[ 40, 59, 20, 40, 56, 55, 40 ],
			[ 28, 48, 40, 19, 50, 27, 60 ]
		]
	};
}).controller('DieselConfigCtrl', function($rootScope, $scope, DieselConfig, toaster) {

	$scope.dieselConfiguration = [];
	$scope.getDieselConfig = function() {
		DieselConfig.getConfiguration(function(response) {
			$scope.dieselConfiguration = response;
			if (response.length === 0) {
				toaster.error("Couldn't get data!");
			}
		});
	}

	/* Diesel Price configuration start*/
	$scope.saveDieselConfiguration = function(dieselConfiguration) {
		console.log("dieselConfiguration to be updated: " + JSON.stringify(dieselConfiguration))
		DieselConfig.updateConfiguration(dieselConfiguration, function(response) {
			console.log("success " + response);
			if (response == 'true') {
				$scope.getDieselConfig();
				toaster.success({
					title : "",
					body : "Success!"
				});
			}
			else {
				console.error("couldn't update.");
				toaster.error("Couldn't update!");
			}
		});

	}
	$scope.resetDieselConfiguration = function() {
		console.log("not functioning right now.");
	}

	$scope.getDieselConfig();
/* Diesel Price Configuration end*/
});