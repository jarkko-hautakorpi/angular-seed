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
    ChuckNorrisService.apiGetNorrisJoke().then(function(response) {
      console.debug(response);
      vm.joke = response.data.value;
    });
  });