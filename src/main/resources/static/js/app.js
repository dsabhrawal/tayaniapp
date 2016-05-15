'use strict';

var TayaniApp = {};

var app = angular
		.module('TayaniApp', [ 'TayaniApp.filters', 'TayaniApp.services',
				'TayaniApp.directives', 'TayaniApp.controllers' ]);

app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/users', {
		templateUrl : '/views/users.html',
		controller : 'usersController'
	}).when('/firms', {
		templateUrl : '/views/firms.html',
		controller : 'FirmController'
	}).when('/orders', {
		templateUrl : '/views/orders.html',
		controller : 'OrderController'
	}).otherwise({
		redirectTo : '/'
	});
} ]);