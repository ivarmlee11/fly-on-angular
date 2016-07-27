angular.module('AirplaneApp', ['ui.router', 'ngResource'])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider
  .state('airplanes', {
    url: '/',
    templateUrl: 'views/airplanes.html',
    controller: 'AirplaneCtrl'
  })
  .state('404', {
    url: '/404',
    templateUrl: 'views/404.html'
  });

  $urlRouterProvider.otherwise('/404');
  $locationProvider.html5Mode(true);
}])

.factory('Airplanes', ['$resource', function($resource) {
  return $resource('http://localhost:3000/api/airplanes/:id', {}, {
    query: { isArray: true }
  });
}])

.controller('AirplaneCtrl', ['$scope', 'Airplanes', function($scope, Airplanes) {
  $scope.airplane = {
    name: '',
    model: '',
    engines: null
  };
  Airplanes.query(function success(data) {
    $scope.airplanes = data;
  }, function error(data) {
    console.log(data);
  });
}]);

