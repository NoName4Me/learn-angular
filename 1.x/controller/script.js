var myApp = angular.module('myApp', []);

myApp.controller('DoubleController', ['$scope', function($scope) {
    $scope.double = function(value) {
      return value ? value * 2 : 0;
    }
  }])
  .controller('SpicyController', ['$scope', function($scope) {
    $scope.customSpice = 'some';
    $scope.spice = 'very';
    $scope.spicy = function(spice) {
      $scope.spice = spice;
    }
  }])
  .controller('Lv1Controller', ['$scope', function($scope) {
    $scope.lv = {
      id: 1,
      name: 'LEVEL-1'
    }
  }])
  .controller('Lv2Controller', ['$scope', function($scope) {
    $scope.lv = {
      id: 2,
      name: 'LEVEL-2'
    }
  }])
  .controller('Lv3Controller', ['$scope', function($scope) {
    $scope.lv = {
      id: 3,
      name: 'LEVEL-3'
    }
  }]);
