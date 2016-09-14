'use strict';

angular.module('myApp.view1', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl as vm'
      });
    }])

  .controller('View1Ctrl', function (ChuckNorrisService) {
    var vm = this;
    vm.joke = {};
    
    vm.getJoke = function() {
      ChuckNorrisService.apiGetNorrisJoke().then(function(response) {
        console.debug(response);
        vm.joke = response.data.value;
      });
    }
    
    vm.activePerson = {};
    vm.persons = {
        0: {
            'firstname': 'John',
            'lastname': 'Doe'
        },
        1: {
            'firstname': 'Mary',
            'lastname': 'Jane'
        },
        2: {
            'firstname': 'John',
            'lastname': 'Papa'
        }
    };
    vm.setActivePerson = function (person) {
        vm.activePerson = person;
    }
    /* Get Chuck Norris joke */
    vm.getJoke();
  });