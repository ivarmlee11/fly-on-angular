angular.module('AirplaneApp', ['ui.router', 'ngResource'])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider
  .state('airplanes', {
    url: '/',
    templateUrl: 'views/airplanes.html',
    controller: 'AirplaneCtrl'
  })
  .state('new', {
    url: '/airplanes/new',
    templateUrl: 'views/new.html',
    controller: 'AirplaneCtrl'
  })
  .state('show', {
    url: '/airplanes/:id',
    templateUrl: 'views/showone.html',
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
  url = 'http://localhost:3000/api/airplanes/:id';
  return $resource(url, {}, {
    all: { isArray: false },
    get: { isArray: false }
  });
}])

.controller('AirplaneCtrl', ['$scope', '$stateParams', 'Airplanes',
 function($scope, $stateParams, Airplanes) {

  $scope.airplane = {
    name: '',
    model: '',
    engines: null
  };

  Airplanes.all(function success(data) {
    $scope.airplanes = data;
  }, function error(data) {
    console.log(data);
  });

  Airplanes.get({id: $stateParams.id},
   function success(data) {
    $scope.airplane = data;
  }, function error(data) {
    console.log(data);
  });

  $scope.delete = function(id, idx) {
    Airplanes.delete('/api/airplanes/' + id)
    .then(function success(res) {
      $scope.airplanes.splice(idx, 1);
    }, function error(res) {
      alert('fail');
    });
  };

  $scope.add = function() {
    Airplanes.post('/api/airplanes/', $scope.airplane).then(function success(res) {
      $scope.airplanes.push(res.data);
      $scope.airplane.name = '';
      $scope.airplane.model = '';
      $scope.airplane.engines = null;
    }, function error(res) {
      console.log(res);
      $scope.airplane.name = '';
      $scope.airplane.model = '';
      $scope.airplane.engines = null;
    });
  }

  $scope.edit = function() {
    Airplanes.put('/api/airplanes/', $scope.airplane)
    .then(function success(res) {
      $scope.airplanes.push(res.data);
      $scope.airplane.name = '';
      $scope.airplane.model = '';
      $scope.airplane.engines = null;
    }, function error(res) {
      console.log(res);
      $scope.airplane.name = '';
      $scope.airplane.model = '';
      $scope.airplane.engines = null;
    });
  }
}]);

