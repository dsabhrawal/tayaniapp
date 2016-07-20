'use strict';
/**
 * @ngdoc function
 * @name tayaniApp.services:DieselService
 * @description
 */
var app = angular.module('tayaniApp');
app.service('dieselService', function($rootScope) {
	var inflowData = [
		{
			id : '1',
			buyer : 'Ekta',
			quantity : 500,
			price : 50,
			transactionDate : '12/12/2016T10:20'
		},
		{
			id : '2',
			buyer : 'Deepak',
			quantity : 500,
			price : 50,
			transactionDate : '12/06/2016T02:20'
		}
	];

	var dieselTransactionData = [
		{
			id : 1,
			user : 'Ekta',
			quantity : 50,
			dealType : 'Sale',
			company : 'Transporter',
			vehicle : 'MH-20N-2345',
			price : 50,
			transactionDate : '2016-07-20'
		},
		{
			id : 2,
			user : 'Deepak',
			quantity : 100,
			dealType : 'Purchase',
			company : 'HTC Ltd',
			vehicle : 'NA',
			price : 50,
			transactionDate : '2016-07-21'
		}
	];

	var outflowData = [
		{
			id : '1',
			buyer : 'Tayani',
			quantity : 200,
			price : 50,
			transactionDate : '12/12/2016T10:20'
		},
		{
			id : '2',
			buyer : 'Okhal',
			quantity : 300,
			price : 50,
			transactionDate : '12/06/2016T02:20'
		}
	];

	var addInflow = function(inflow) {
		inflowData.push(inflow);
	};

	var getInflowData = function() {
		return inflowData;
	};

	var removeInflow = function(index) {
		inflowData.splice(index, 1);
	};

	var removeAllInflow = function() {
		inflowData = [];
	};

	var addOutflow = function(outflow) {
		outflowData.push(outflow);
	};

	var getOutflowData = function() {
		return outflowData;
	};

	var removeOutflow = function(index) {
		outflowData.splice(index, 1);
	};

	var removeAllOutflow = function() {
		outflowData = [];
	};

	var addDieselTransaction = function(dieselTransaction) {
		//console.log("id  "+ dieselTransactionData[dieselTransactionData[1].id-1]);
		var transaction = {
			id : 3,
			user : 'Deepak',
			quantity : dieselTransaction.quantity,
			dealType : dieselTransaction.dealTypeSelected,
			company : dieselTransaction.selectedCompany,
			price : '',
			vehicle : '',
			transactionDate : dieselTransaction.transactionDate
		}
		if (dieselTransaction.dealTypeSelected === 'Purchase') {
			transaction.price = $rootScope.dieselInflowPrice;
			transaction.vehicle = 'NA';
			$rootScope.dieselInStock = $rootScope.dieselInStock + dieselTransaction.quantity;
		}
		if (dieselTransaction.dealTypeSelected === 'Sale') {
			transaction.price = $rootScope.dieselOutflowPrice;
			transaction.vehicle = dieselTransaction.selectedVehicle;
			$rootScope.dieselInStock = $rootScope.dieselInStock - dieselTransaction.quantity;
		}
		console.log("price "+ $rootScope.dieselOutflowPrice)
		console.log("data pushed:: " + transaction);
		dieselTransactionData.push(transaction);
	}
	
	var getDieselTransaction = function(){
		return dieselTransactionData;
	}

	return {
		addInflow : addInflow,
		getInflowData : getInflowData,
		removeInflow : removeInflow,
		addOutflow : addOutflow,
		getOutflowData : getOutflowData,
		removeOutflow : removeOutflow,
		removeAllInflow : removeAllInflow,
		removeAllOutflow : removeAllOutflow,
		addDieselTransaction : addDieselTransaction,
		getDieselTransaction : getDieselTransaction
	};

});

app.service('vehicleService', function() {
	var owners = {
		tayani : 'Tayani Minerals',
		ajita : 'Ajit Saria Mines and Minerals',
		transporter : 'Transporter',
		blastingContractor : 'Blasting Contractor'
	}
	var vehicleType = {
		truck : 'Truck',
		tipper : 'Tipper',
		minivan : 'Minivan',
		excavator : 'Excavator'
	}
	var company = {
		tata : 'Tata',
		al : 'AshokLeyland',
		lt : 'L&T'
	}
	var model = {
		prima : 'Prima',
		ape : 'Ape',
		ht : 'HT-67'
	}

	var data = [
		{
			id : '1',
			vehicleNumber : 'MH-29-VT-3468',
			Owner : owners.tayani,
			type : vehicleType.truck,
			company : company.tata,
			model : model.prima,
			purchased : 'May-2010',
			remarks : 'Used in transporting boulders',
			own : true
		},
		{
			id : '2',
			vehicleNumber : 'MH-29-VT-3469',
			Owner : owners.tayani,
			type : vehicleType.minivan,
			company : company.tata,
			model : model.ape,
			purchased : 'Jun-2009',
			remarks : 'Used in transporting boulders',
			own : true
		},
		{
			id : '3',
			vehicleNumber : 'MH-29-VT-4040',
			Owner : owners.ajita,
			type : vehicleType.truck,
			company : company.tata,
			model : model.prima,
			purchased : 'Sep-2010',
			remarks : 'Used in transporting boulders',
			own : true
		},
		{
			id : '4',
			vehicleNumber : 'MH-29-VT-3434',
			Owner : owners.ajita,
			type : vehicleType.tipper,
			company : company.al,
			model : model.ht,
			purchased : 'May-2012',
			remarks : 'Used in transporting boulders',
			own : true
		},
		{
			id : '5',
			vehicleNumber : 'MH-29-VT-2323',
			Owner : owners.transporter,
			type : vehicleType.truck,
			company : company.tata,
			model : model.prima,
			purchased : '',
			remarks : '',
			own : false
		},
		{
			id : '6',
			vehicleNumber : 'MH-29-VT-4594',
			Owner : owners.transporter,
			type : vehicleType.tipper,
			company : company.tata,
			model : model.prima,
			purchased : '',
			remarks : '',
			own : false
		},
		{
			id : '7',
			vehicleNumber : 'MH-29-VT-1232',
			Owner : owners.blastingContractor,
			type : vehicleType.excavator,
			company : company.lt,
			model : model.ht,
			purchased : '',
			remarks : '',
			own : false
		}
	];

	var getVehicleData = function() {
		return data;
	}
	var getOwners = function() {
		return owners;
	}

	return {
		getVehicleData : getVehicleData,
		getOwners : getOwners
	};

});