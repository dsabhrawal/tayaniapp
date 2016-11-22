'use strict';
/**
 * @ngdoc function
 * @name tayaniApp.services:DieselService
 * @description
 */
var app = angular.module('tayaniApp');
app.service('dieselService',['$rootScope', 'DieselConfig', '$http', 'APP_CONSTANTS', function($rootScope, DieselConfig, $http, APP_CONSTANTS) {

	var addDieselTransaction = function(dieselTransaction, cbResult) {

		console.log('inside service: ' + JSON.stringify(dieselTransaction));
		var config = {
			headers : {
				'Content-Type' : 'application/json'
			}
		}

		$http.post('/rest/api/diesel-transaction/add', dieselTransaction, config).success(function(data, status, headers, config) {
			cbResult(status, data);
		}).error(function(data, status, headers, config) {});

	}

	var getDieselTransactions = function(cbResult) {

		$http.get("/rest/api/diesel-transaction/all").success(function(data, status, headers, config) {
			cbResult(status, data);
		}).error(function(data, status, headers, config) {
			cbResult(status, data);
		});
	}

	var removeDieselTransaction = function(transactionIds, cbResult) {
		console.log(transactionIds);
		var queryStringData = {
				transactionIds : transactionIds
		};
		var config = {
			params : queryStringData,
			headers : {
				'Content-Type' : 'application/json'
			}
		}
		$http.delete('/rest/api/diesel-transaction/delete', config).success(function(data, status, headers, config) {
			cbResult(status, data);
		}).error(function(data, status, headers, config) {
			cbResult(status, data);
		});
	};

	var updateDieselTransactions = function(updateTransactionForm, cbResult){
		
		var dates = updateTransactionForm.dates.split(' - ');
		var startDate = new Date(dates[0]).toString(APP_CONSTANTS.INPUT_DATE_FORMAT);
		var endDate = new Date(dates[1]).toString(APP_CONSTANTS.INPUT_DATE_FORMAT);
		console.log(startDate);
		console.log(endDate);
		var data = {
				dealType : updateTransactionForm.dealTypeSelected,
				firmName : updateTransactionForm.selectedCompany,
				price : updateTransactionForm.price,
				fromDate : startDate,
				toDate : endDate
		}
		
		var config = {
				headers : {
					'Content-Type' : 'application/json'
				}
			}
			$http.post('/rest/api/diesel-transaction/update', JSON.stringify(data),config).success(function(data, status, headers, config) {
				cbResult(status, data);
			}).error(function(data, status, headers, config) {
				cbResult(status, data);
			});
	}

	var getTotalInflow = function(cbResult) {
		$http.get("/rest/api/diesel-transaction/total-inflow").success(function(data, status, headers, config) {
			cbResult(status, data);
		}).error(function(data, status, headers, config) {
			cbResult(status, data);
		})
	}

	var getTotalOutflow = function(cbResult) {
		$http.get("/rest/api/diesel-transaction/total-outflow").success(function(data, status, headers, config) {
			cbResult(status, data);
		}).error(function(data, status, headers, config) {
			cbResult(status, data);
		})
	}
	
	return {
		addDieselTransaction : addDieselTransaction,
		getDieselTransactions : getDieselTransactions,
		removeDieselTransaction : removeDieselTransaction,
		getTotalInflow : getTotalInflow,
		getTotalOutflow : getTotalOutflow,
		updateDieselTransactions : updateDieselTransactions
	};

}]);

app.service('TransportService',['$http', '$window', function($http, $window) {

	var getVehicleData = function(cbResult) {

		if ($window.sessionStorage["VEHICLES"]) {
			var data = JSON.parse($window.sessionStorage["VEHICLES"]);
			return cbResult(200, data);
		}else{
			
		$http.get('/rest/api/transport/all-vehicles').success(function(data, status, headers, config) {
			if(status === 200){
				$window.sessionStorage["VEHICLES"] = JSON.stringify(data);
			}
			cbResult(status, data);
		}).error(function(data, status, headers, config) {
			cbResult(status, data);
		});
		}
	}

	var findTransportByVehicleNo = function(vehicleNo, cbResult) {
		var queryStringData = {
			vehicleNumber : vehicleNo
		};
		var config = {
			params : queryStringData,
			headers : {
				'Content-Type' : 'application/json'
			}
		}
		$http.get('rest/api/transport/find-by-vehicleNo', config).success(function(data, status, headers, config) {
			cbResult(status, data);
		}).error(function(data, status, headers, config) {});
	}
	return {
		getVehicleData : getVehicleData,
		getTransportByVehicleNo : findTransportByVehicleNo
	};

}]);

app.service('FirmService', function($http, $window) {

	var getAll = function(cbResult) {
		
		if ($window.sessionStorage["firms"]) {
			var data = JSON.parse($window.sessionStorage["firms"]);
			return cbResult(data, 200);
		}else{
		$http.get("/rest/api/firm/all").success(function(data, status, headers, config) {
			console.log("status of firm getall: " + status);
			
			if (status === 200) {
				console.log("Firms data successfully fetched.");
				$window.sessionStorage["firms"] = JSON.stringify(data);
			}
			cbResult(data, status);
		}).error(function(data, status, headers, config) {
			cbResult(data, status);
		});
	   }
	}
	var findByFirmName = function(firmName, cbResult) {
		var queryStringData = {
			name : firmName
		};
		var config = {
			params : queryStringData,
			headers : {
				'Content-Type' : 'application/json'
			}
		}
		$http.get('rest/api/firm/find-by-name', config).success(function(data, status, headers, config) {
			cbResult(status, data);
		}).error(function(data, status, headers, config) {});
	}
	return {
		getAll : getAll,
		getFirmByName : findByFirmName
	}
});

app.service('DealerService', function($http) {

	var getAll = function(cbResult) {
		$http.get("/rest/api/diesel-dealer/all").success(function(data, status, headers, config) {
			console.log("status of firm getall: " + status);
			cbResult(data, status);
		}).error(function(data, status, headers, config) {
			cbResult(data, status);
		});
	}

	var findByName = function(dealerName, cbResult) {
		var queryStringData = {
			name : dealerName
		};
		var config = {
			params : queryStringData,
			headers : {
				'Content-Type' : 'application/json'
			}
		}
		$http.get('rest/api/diesel-dealer/find-by-name', config).success(function(data, status, headers, config) {
			cbResult(status, data);
		}).error(function(data, status, headers, config) {});
	}
	return {
		getAll : getAll,
		getDealerByName : findByName
	}
});

app.service('DealTypeService', function($http) {

	var findBydType = function(dealType, cbResult) {
		var queryStringData = {
			type : dealType
		};
		var config = {
			params : queryStringData,
			headers : {
				'Content-Type' : 'application/json'
			}
		}
		$http.get('rest/api/dealtype/find-by-type', config).success(function(data, status, headers, config) {
			cbResult(status, data);
		}).error(function(data, status, headers, config) {});
	}
	return {
		getDealTypeByType : findBydType
	}
});

app.service('DieselConfig', function($http) {
	var result;
	var getConfiguration = function(cbResult) {

		$http.get('/rest/api/diesel-conf/all').success(function(response) {
			cbResult(response);
		}).error(function() {
			// $scope.setError('Could not update the Purchase configuration');
		});
	}
	var updateConfiguration = function(dieselConfigurationToSave, cbResult) {

		var config = {
			headers : {
				'Content-Type' : 'application/json'
			}
		}
		$http.post('/rest/api/diesel-conf/update', dieselConfigurationToSave, config).success(function(response) {
			cbResult(response);
		}).error(function() {
			// $scope.setError('Could not update the Purchase configuration');
		});
	}

	var findByDealType = function(dealType, cbResult) {
		var queryStringData = {
			id : dealType.id,
			type : dealType.type
		};
		var config = {
			params : queryStringData,
			headers : {
				'Content-Type' : 'application/json'
			}
		}
		$http.get('rest/api/diesel-conf/find-by-dealType', config).success(function(data, status, headers, config) {
			cbResult(status, data);
		}).error(function(data, status, headers, config) {});
	}

	return {
		getConfiguration : getConfiguration,
		updateConfiguration : updateConfiguration,
		getDieselConfigurationByDealType : findByDealType
	}

});

// diesel reports services.
app.service('dieselReportsService', ['$http', 'APP_CONSTANTS', function($http, APP_CONSTANTS){
	
	var dateFormat = APP_CONSTANTS.DATE_FORMAT;
	var labelsForteenDays = function(){
	     var lables = new Array();
		lables.push(Date.today().toString(dateFormat));
		lables.push(Date.today().addDays(-1).toString(dateFormat));
		lables.push(Date.today().addDays(-2).toString(dateFormat));
		lables.push(Date.today().addDays(-3).toString(dateFormat));
		lables.push(Date.today().addDays(-4).toString(dateFormat));
		lables.push(Date.today().addDays(-5).toString(dateFormat));
		lables.push(Date.today().addDays(-6).toString(dateFormat));
		lables.push(Date.today().addDays(-7).toString(dateFormat));
		lables.push(Date.today().addDays(-8).toString(dateFormat));
		lables.push(Date.today().addDays(-9).toString(dateFormat));
		lables.push(Date.today().addDays(-10).toString(dateFormat));
		lables.push(Date.today().addDays(-11).toString(dateFormat));
		lables.push(Date.today().addDays(-12).toString(dateFormat));
		lables.push(Date.today().addDays(-13).toString(dateFormat));
		return lables;
	}
	
	var getTotalDieselFlowFortnightly = function(cbResult) {

		$http.get("/rest/api/diesel-reports/total-dieselflow-fortnightly").success(function(data, status, headers, config) {
			cbResult(status, data);
		}).error(function(data, status, headers, config) {
			cbResult(status, data);
		})

	}
	
	var dieselSaleFortnightlyReport = function(requestParam, scope, cbResult){
		var queryStringData = {
				data: requestParam,
				scope: scope
		}
		
		var config = {
				params : queryStringData,
				headers : {
					'Content-Type' : 'application/json'
				}
			}
			$http.get('rest/api/diesel-reports/fortnightly', config).success(function(data, status, headers, config) {
				cbResult(data, status);
			}).error(function(data, status, headers, config) {});
		
	}
	
	return {
		getTotalDieselFlowFortnightly : getTotalDieselFlowFortnightly,
		dieselSaleFortnightlyReport : dieselSaleFortnightlyReport,
		labelsForteenDays : labelsForteenDays
	}
	
}]);