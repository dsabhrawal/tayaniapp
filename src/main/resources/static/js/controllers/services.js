'use strict';
/**
 * @ngdoc function
 * @name tayaniApp.services:DieselService
 * @description
 */
var app = angular.module('tayaniApp');
app.service('dieselService', function($rootScope, DieselConfig, $http) {

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

	var removeDieselTransaction = function(transactionId, cbResult) {

		var queryStringData = {
			transactionId : transactionId
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

	var removeAllDieselTransactions = function(cbResult) {
		$http.delete('/rest/api/diesel-transaction/deleteAll').success(function(data, status, headers, config) {
			cbResult(status, data);
		}).error(function(data, status, headers, config) {
			cbResult(status, data);
		});
	};

	var getTotalDieselFlowFortnightly = function(cbResult) {

		$http.get("/rest/api/diesel-transaction/total-dieselflow-fortnightly").success(function(data, status, headers, config) {
			cbResult(status, data);
		}).error(function(data, status, headers, config) {
			cbResult(status, data);
		})

	}

	/*var getTotalOutflow = function(cbResult) {

		$http.get("/rest/api/diesel-transaction/total-outflow").success(function(data, status, headers, config) {
			cbResult(status, data);
		}).error(function(data, status, headers, config) {
			cbResult(status, data);
		})
		
	}*/

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
		removeAllDieselTransactions : removeAllDieselTransactions,
		getTotalInflow : getTotalInflow,
		getTotalOutflow : getTotalOutflow,
		getTotalDieselFlowFortnightly : getTotalDieselFlowFortnightly
	};

});

app.service('TransportService', function($http) {

	var getVehicleData = function(cbResult) {

		$http.get('/rest/api/transport/all-vehicles').success(function(data, status, headers, config) {
			cbResult(status, data);
		}).error(function(data, status, headers, config) {
			cbResult(status, data);
		});
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

});

app.service('FirmService', function($http) {

	var getAll = function(cbResult) {
		$http.get("/rest/api/firm/all").success(function(data, status, headers, config) {
			console.log("status of firm getall: " + status);
			cbResult(data, status);
		}).error(function(data, status, headers, config) {
			cbResult(data, status);
		});
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