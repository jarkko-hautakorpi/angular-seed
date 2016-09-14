'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'ngAnimate',
  'ngTouch',
  'ui.bootstrap',
  'myApp.view1',
  'myApp.view2'
])
/*
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}])
*/
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
    // Here we are just setting up some convenience urls.
    //.when('/home', '/view1')
    // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
    .otherwise('/');
  $stateProvider.state('home', {
    url: "/",
    template: '<h1>Default state</h1>'
  });
}])

.service('ChuckNorrisService', function($http){
    var errorCallback = function (data, status, headers, config) {
        console.log('ERROR'+data.error.message);
    };
    
    var successCallback = function (data, status, headers, config) {
        return data;
    };
    
    return {
        apiGetNorrisJoke: function () {
            return $http.get('http://api.icndb.com/jokes/random?firstName=Chuck&amp;lastName=Norris').error(errorCallback);
        }
      }
});