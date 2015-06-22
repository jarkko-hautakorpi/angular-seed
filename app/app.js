'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'ui.bootstrap',
    'myApp.view1',
    'myApp.view2',
    'myApp.version'
]);
myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
}]);
myApp.factory("Sanasto", function Sanasto() {
    var vm = this;
    return {
        getLexicon: function () {
            return window.sanalista["kotus-sanalista"].st;
        }
    };
});
