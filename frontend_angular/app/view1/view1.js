'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])


.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {
  $scope.searchTerm = "";

  $scope.apiurl = "http://127.0.0.1:8000/api";

  $scope.searchGames = function () {
      console.log("Search Term: " + $scope.searchTerm);

      var requestUrl = $scope.apiurl + "/app/documents/search/" + $scope.searchTerm;

      console.log(requestUrl);

      $http.get(requestUrl).then(function(response) {
        $scope.response = response.data;
        $scope.str1 = angular.fromJson($scope.response);
        console.log($scope.str1.hits.hits);

        $scope.cnt = 0;

        for(const [key, value] of Object.entries($scope.str1.hits.hits)){
          console.log(value._source.ResponseName);

          var parent = document.getElementById("1337");

          var node = document.createElement("div");
          node.id = "game:" + $scope.cnt;
          console.log(node.id);
          node.textContent += value._source.ResponseName;

          parent.appendChild(node);
          $scope.cnt += 1;
        }
          var parent = document.getElementById("game:7");

          var node = document.createElement("li");
          node.id = "futz";
          node.textContent += "FUTZ";

          parent.appendChild(node);

      });
  } ;
}]);