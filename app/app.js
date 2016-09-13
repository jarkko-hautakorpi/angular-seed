'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'ngTouch',
  'ui.bootstrap',
  'myApp.view1',
  'myApp.view2'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
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