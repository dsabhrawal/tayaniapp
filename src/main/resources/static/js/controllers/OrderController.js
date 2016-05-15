'use strict';

/**
 * OrderController
 * 
 * @constructor
 */

var OrderController = function($scope, $http) {
    $scope.order = {};
    $scope.editMode = false;

    $scope.fetchAllOrders = function() {
        $http.get('/rest/orders').success(function(rsList){
            $scope.orders = rsList;
        });
    };

    $scope.saveOrder = function(order) {

        $scope.resetError();

        $http.post('/rest/order/add', order).success(function() {
            $scope.fetchAllOrders();
            $scope.order.productName = '';
            $scope.order.buyer = '';
            $scope.order.quantity = '';
            $scope.order.delivered = false;
            $scope.order = {};
        }).error(function() {
            $scope.setError('Could not add a new order');
        });
    };

    $scope.updateOrder = function(order) {
        $scope.resetError();

        $http.put('/rest/order/update', order).success(function() {
        	$scope.fetchAllOrders();
        	$scope.order.productName = '';
            $scope.order.buyer = '';
            $scope.order.quantity = '';
            $scope.order.delivered = false;
            $scope.editMode = false;
            $scope.order = {};
        }).error(function() {
            $scope.setError('Could not update the order');
        });
    };

    $scope.editOrder = function(order) {
        $scope.resetError();
        $scope.order = order;
        $scope.editMode = true;
    };

    $scope.removeOrder = function(id) {
        $scope.resetError();

        $http.delete('/rest/order/remove/' + id).success(function() {
            $scope.fetchAllOrders();
        }).error(function() {
            $scope.setError('Could not remove order');
        });
        
        $scope.order = '';
    };

    $scope.removeAllOrders = function() {
        $scope.resetError();

        $http.delete('/rest/orders').success(function() {
            $scope.fetchAllOrders();
        }).error(function() {
            $scope.setError('Could not remove all orders');
        });

    };

    $scope.resetOrderForm = function() {
        $scope.resetError();
        $scope.order = {};
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

    $scope.fetchAllOrders();

    $scope.predicate = 'id';
};