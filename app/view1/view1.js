'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl as vm'
        });
    }])

    .controller('View1Ctrl', function (Sanasto) {
        var vm = this;
        vm.hakusana = '';
        vm.sanasto = Sanasto.getLexicon();
    });