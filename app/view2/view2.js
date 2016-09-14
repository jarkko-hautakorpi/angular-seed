'use strict';

angular.module('myApp.view2', ['ui.router'])
/*
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl as vm'
  });
}])*/
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('view2', {
        url: '/view2',
        templateUrl: 'view2/view2.html',
        controller: 'View2Ctrl as vm'
      });
  }])

.controller('View2Ctrl', [function() {
        var vm = this;
        vm.activeVehicle = '';
        vm.vehicles = {
            0: {
                'make': 'Mercedes',
                'model': 'S 400 Hybrid'
            },
            1: {
                'make': 'Mazda',
                'model': '6 Sport Wagon'
            }
        };
}]);