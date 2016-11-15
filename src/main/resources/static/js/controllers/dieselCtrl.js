'use strict';
/**
 * @name tayaniApp.controller:MainCtrl Controller of the tayaniApp
 */

angular
		.module('tayaniApp')
		.controller(
				'DieselCtrl', ['$rootScope', '$scope', '$position', '$http', 'dieselService', 'TransportService', 'DieselConfig', 'FirmService', 'DealerService', 'DealTypeService', '$timeout', 'toaster', '$window', '$log', 'APP_CONSTANTS','authService',
				function($rootScope, $scope, $position, $http, dieselService, TransportService, DieselConfig, FirmService, DealerService, DealTypeService, $timeout, toaster, $window, $log, APP_CONSTANTS, authService) {

					$scope.init = function() {
						$scope.dieselTransactionForm = {
							dealTypeSelected : 'NONE',
							selectedCompany : '',
							selectedVehicle : '',
							quantity : '',
							price : '',
							transactionDate : ''
						}
						$scope.updateTransactionForm = {
							dealTypeSelected : 'NONE',
							selectedCompany : '',
							price : '',
							dates : {startDate : null, endDate: null}
						}
						$scope.dieselTransaction = {};
						$scope.editMode = false;
						$scope.predicate = 'date';
						$scope.totalDieselInflow = 0;
						$scope.totalDieselOutflow = 0;
						$rootScope.dieselInStock = $scope.totalDieselInflow - $scope.totalDieselOutflow;
						$scope.dealSelected = 'NONE';
						// $rootScope.loggedInUser = 'dsabhrawal';
						$scope.firms = [];
						$scope.vehicles = [];
						$scope.deaselDealers = [];
						$scope.activeTab = 0;
						$scope.format = 'dd-MM-yyyy';
						
						$scope.ranges = {
								'Today': [moment(), moment()],
								'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
								'Last 7 days': [moment().subtract('days', 7), moment()],
								'Last 30 days': [moment().subtract('days', 30), moment()],
								'This month': [moment().startOf('month'), moment().endOf('month')]
							};
						
						 $scope.dateOptions = {
								    formatYear: 'yy',
								    maxDate: null,
								    minDate: null,
								    startingDay: 1
								  };
						
						 $scope.newTranDatePicker = {
									isNewTranDatePickerOpen : false
							}
					}
					
					$scope.newTranDatePickerToggle = function($event) {
				        $event.preventDefault();
				        $event.stopPropagation();
				        return  $scope.newTranDatePicker.isNewTranDatePickerOpen = true;
				      };
					
					$scope.setActiveTab = function(tabToBeActive) {
						if ($scope.activeTab == tabToBeActive) {
							$scope.activeTab = 0;
						} else {
							$scope.activeTab = tabToBeActive;
						}
					}

					$scope.getDieselInflow = function() {
						dieselService.getTotalInflow(function(status, data) {

							if (status === 200 && data === 'null') { // handling
																		// zero
																		// case
								console.log("handling 0 diesel stock case");
								$rootScope.dieselInStock = 0;
								$scope.totalDieselInflow = 0;
							} else if (status === 200 && data != 'Error') {
								$scope.totalDieselInflow = data;
								$scope.getDieselOutflow();
							} else {
								toaster.error("Couldn't get diesel inflow.");
							}
						});
					}

					$scope.getDieselOutflow = function() {
						dieselService.getTotalOutflow(function(status, data) {

									if (status === 200 && data === 'null') { // handling zero case
										console.log("handling 0 diesel stock case for outflow."+ $scope.totalDieselInflow);
										$scope.totalDieselOutflow = 0;
										$rootScope.dieselInStock = $scope.totalDieselInflow - $scope.totalDieselOutflow;
									} else if (status === 200 && data != 'Error') {
										$scope.totalDieselOutflow = data;
										$rootScope.dieselInStock = $scope.totalDieselInflow - $scope.totalDieselOutflow;
									} else {
										toaster.error("Couldn't get diesel outflow.");
									}
								});
					}

					$scope.getDieselDealers = function() {
						DealerService
								.getAll(function(data, status) {
									if (status === 200) {
										console
												.log("Dealers data successfully fetched.");
										$scope.deaselDealers = data;
									} else {
										toaster.error("Couldn't get data!");
									}
								});
					}

					$scope.getAllFirms = function() {
						FirmService
								.getAll(function(data, status) {
									if (status === 200) {
										console
												.log("Firms data successfully fetched.");
										$scope.firms = data;
									} else {
										toaster.error("Couldn't get data!");
									}
								});
					}
					$scope.getAllTransport = function() {
						TransportService
								.getVehicleData(function(status, data) {
									if (status === 200) {
										console
												.log("Vehicles data successfully fetched.");
										$scope.vehicles = data
									} else {
										toaster.error("Couldn't get Data!");
									}
								});
					}

					$scope.fetchDieselTransactions = function() {

						dieselService
								.getDieselTransactions(function(status, data) {
									if (status === 200) {
										$scope.dieselTransactions = data;
										$log.log('Transactions fetched');
									} else {
										$scope
												.setError("Couldn't fetch diesel transactions.");
									}
								});
					};

					$scope.fetchInitialData = function() {
						$scope.getAllFirms();
						$scope.getAllTransport();
						$scope.getDieselDealers();
						$scope.fetchDieselTransactions();
					}

					/**
					 * ******************************* DATA FETCHING AND INITIALIZATION DONE * **********************************************
					 */

					$scope.saveDieselTransaction = function(dieselTransactionForm, update) {

						var currentUser = authService.getCurrentUser();
						$scope.dieselTransactionTobeSaved = {
							id : '',
							quantity : dieselTransactionForm.quantity,
							price : dieselTransactionForm.price,
							date : dieselTransactionForm.transactionDate.toString(APP_CONSTANTS.INPUT_DATE_FORMAT),
							dealType : {},
							user : {
								id : currentUser.id,
								username : currentUser.username
							}
						};

						if (update) {
							$scope.dieselTransactionTobeSaved.id = dieselTransactionForm.id;
						}
						console.log("Diesel Transaction to be saved." + JSON.stringify($scope.dieselTransactionTobeSaved));
						$scope.resetError();

						/* Getting logged in user details */

						/*
						 * finding deal type object from service based on the
						 * deal type selected and saving the transaction
						 */
						DealTypeService
								.getDealTypeByType(
										dieselTransactionForm.dealTypeSelected,
										function(status, data) {
											if (status === 200) {
												$scope.dieselTransactionTobeSaved.dealType = data;
												// $scope.getDieselConfiguration($scope.dieselTransactionTobeSaved.dealType);

												if (dieselTransactionForm.dealTypeSelected === 'PURCHASE') {
													$scope.getDieselDealerAndSave();
												} else if (dieselTransactionForm.dealTypeSelected === 'SALE') {
													if ($rootScope.dieselInStock - dieselTransactionForm.quantity < 0) {
														$scope.setError("Not enough diesel in stock.");
														$timeout(function() {
																	$scope.resetError();
																}, 5000);
														return;
													}

													$scope.getFirmsData();
												}
											} else {
												toaster.error("Couldn't add transaction!");
											}
										});

						/* Currently not using as requirement changed. */
						$scope.getDieselConfiguration = function(dealType) {
							/*
							 * getting diesel configuration based on deal
							 * selected
							 */
							DieselConfig
									.getDieselConfigurationByDealType(
											dealType,
											function(status, data) {
												if (status === 200) {
													$scope.dieselTransactionTobeSaved.dieselConfiguration = data;
													if (dieselTransactionForm.dealTypeSelected === 'PURCHASE') {
														$scope
																.getDieselDealerAndSave();
													} else if (dieselTransactionForm.dealTypeSelected === 'SALE') {
														if ($rootScope.dieselInStock - dieselTransactionForm.quantity < 0) {
															$scope.setError("Not enough diesel in stock.");
															$timeout(function() {
																		$scope.resetError();
																	}, 5000);
															return;
														}

														$scope.getFirmsData();
													}
												} else {
													toaster.error("Couldn't add transaction!");
												}
											});
						}

						$scope.getFirmsData = function() {
							/* Getting firm object from db */
							FirmService
									.getFirmByName(
											dieselTransactionForm.selectedCompany,
											function(status, data) {
												if (status === 200) {
													$scope.dieselTransactionTobeSaved.firm = data;
													$scope
															.getTransportDataAndSave();
												} else {
													toaster
															.error("Couldn't add transaction!");
												}
											});
						}

						/* For Purchase transaction */
						$scope.getDieselDealerAndSave = function() {
							// getting dealer object from db
							DealerService
									.getDealerByName(
											dieselTransactionForm.selectedCompany,
											function(status, data) {
												if (status === 200) {
													$scope.dieselTransactionTobeSaved.dieselDealer = data;
													dieselService.addDieselTransaction($scope.dieselTransactionTobeSaved, function(status,data) {
																		if (status === 200 && data !== 'Error') {
																			$scope.setInfo("Diesel Transaction saved with Id:" + data);
																			$scope.dieselTransactionForm = {};
																			$scope.getDieselInflow();
																			$scope.fetchDieselTransactions();
																		} else {
																			toaster.error("Couldn't update transaction!");
																		}
																	});
												} else {
													toaster.error("Couldn't add transaction!");
												}
											});
						}

						/* For sale transaction */
						$scope.getTransportDataAndSave = function() {
							/* Getting selected vehicle object from db */
							TransportService
									.getTransportByVehicleNo(
											dieselTransactionForm.selectedVehicle,
											function(status, data) {
												if (status === 200) {
													$scope.dieselTransactionTobeSaved.transport = data;
													dieselService
															.addDieselTransaction(
																	$scope.dieselTransactionTobeSaved,
																	function(
																			status,
																			data) {
																		if (status === 200
																				&& data !== 'Error') {
																			$scope
																					.setInfo("Diesel Transaction saved with Id:"
																							+ data);
																			$scope
																					.getDieselInflow();
																			$scope.dieselTransactionForm = {};
																			$scope
																					.fetchDieselTransactions();
																		} else {
																			$scope
																					.setError("Couldn't update transaction!");
																		}
																	});
												} else {
													toaster
															.error("Couldn't add transaction!");
												}
											});
						}

					};

					/********************************* Save Transaction End**********************************************/

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
						if ('PURCHASE' === dieselTransaction.dealType.type) {
							$scope.dieselTransactionForm.selectedCompany = dieselTransaction.dieselDealer.name;
						} else {
							$scope.dieselTransactionForm.selectedCompany = dieselTransaction.firm.name;
							$scope.dieselTransactionForm.selectedVehicle = dieselTransaction.transport.vehicleNumber;
						}

						$scope.dieselTransactionForm.quantity = dieselTransaction.quantity;
						$scope.dieselTransactionForm.transactionDate = dieselTransaction.date;
						$scope.dieselTransactionForm.price = dieselTransaction.price;
						$scope.editMode = true;
						$scope.showAddTransactionPanel();
					};

					$scope.removeDieselTransaction = function(dieselTransaction) {
						$scope.resetError();
						$scope.resetDieselTransactionForm();
						dieselService
								.removeDieselTransaction(
										dieselTransaction.id,
										function(status, data) {
											if (status === 200
													&& data === 'true') {
												$scope
														.fetchDieselTransactions();
												$scope.getDieselInflow();
												toaster
														.info("Transaction remove success!");

											} else {
												toaster
														.error("Couldn't remove transaction!");
											}
										});
					};

					$scope.removeAllDieselTransactions = function() {
						$scope.resetError();
						$scope.resetDieselTransactionForm();
						dieselService.removeAllDieselTransactions(function(
								status, data) {
							if (status === 200 && data === 'true') {
								$scope.dieselTransactions = [];
								$scope.getDieselInflow();
								toaster.info("Transaction remove success!");
							} else {
								toaster.error("Couldn't remove transaction!");
							}
						});
						$rootScope.dieselInStock = dieselService
								.getDieselInStock();
						$scope.fetchDieselTransactions();
					};

					/** Update Transaction form start * */

					$scope.updateDieselTransactionForm = function(updateTransactionForm) {

						$log.log(updateTransactionForm);
						dieselService.updateDieselTransactions(
								updateTransactionForm, function(status, data) {
									if (status === 200) {
										$scope.resetUpdateTransactionForm();
										toaster.info({
											toasterId : 1,
											body : data
													+ " Transactions Updated!"
										});
										$scope.fetchDieselTransactions();
									} else {
										toaster.pop({
											toasterId : 1,
											type : 'error',
											body : "Error in updating!"
										});
									}
								});

						$scope.resetError();
					}

					/** Update Transaction form end * */
					$scope.resetDieselTransactionForm = function() {
						$scope.resetError();
						$scope.dieselTransactionForm = {};
						$scope.editMode = false;
					};

					$scope.resetUpdateTransactionForm = function() {
						$scope.resetError();
						$scope.updateTransactionForm = [];
					}

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

				}]).controller(
				'DieselConfigCtrl',
				function($rootScope, $scope, DieselConfig, toaster) {

					$scope.dieselConfiguration = [];
					$scope.getDieselConfig = function() {
						DieselConfig.getConfiguration(function(response) {
							$scope.dieselConfiguration = response;
							if (response.length === 0) {
								toaster.error("Couldn't get data!");
							}
						});
					}

					/* Diesel Price configuration start */
					$scope.saveDieselConfiguration = function(
							dieselConfiguration) {
						console.log("dieselConfiguration to be updated: "
								+ JSON.stringify(dieselConfiguration))
						DieselConfig.updateConfiguration(dieselConfiguration,
								function(response) {
									console.log("success " + response);
									if (response == 'true') {
										$scope.getDieselConfig();
										toaster.success({
											title : "",
											body : "Success!"
										});
									} else {
										console.error("couldn't update.");
										toaster.error("Couldn't update!");
									}
								});

					}
					$scope.resetDieselConfiguration = function() {
						console.log("not functioning right now.");
					}

					$scope.getDieselConfig();
					/* Diesel Price Configuration end */
				}).filter('reverse', function() {
			return function(items) {
				if (items)
					return items.slice().reverse();
			};
		});
;