// This module will convert the undersocre object into angular module and that will be injected in the angular controllers to use.
var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function($window) {
  return $window._; // assumes underscore has already been loaded on the page
}]);