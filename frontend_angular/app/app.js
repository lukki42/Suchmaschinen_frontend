'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});

  $routeProvider.when('/', {
    templateUrl: 'index.html',
    controller: 'AppCtrl'
  });

}])

.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.createIndex = function () {
    var crIndexUrl = "http://127.0.0.1:8000/api/app/index/";

    $http.post(crIndexUrl);
  };

  $scope.deleteIndex = function () {
    var crIndexUrl = "http://127.0.0.1:8000/api/app/index/";

    $http.delete(crIndexUrl);
  };
}]);
