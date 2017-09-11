'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl as vm'
  });
}])

.controller('View1Ctrl', [function() {
        var vm = this;
        vm.activePerson = {};
        vm.persons = {
            0: {
                'firstname': 'John',
                'lastname': 'Doe'
            },
            1: {
                'firstname': 'Mary',
                'lastname': 'Jane'
            }
        };
        vm.setActivePerson = function (person) {
            vm.activePerson = person;
        }
}]);