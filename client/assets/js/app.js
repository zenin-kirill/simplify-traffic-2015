(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
    .config(config)
    .run(run)
    .controller('vehiclesList', vehiclesList)
    .controller('citiesList', citiesList)
    .controller('carriersList', carriersList)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];
  vehiclesList.$inject = ['$scope', '$stateParams', '$state', '$controller', '$http'];
  citiesList.$inject = ['$scope', '$stateParams', '$state', '$controller', '$http'];
  carriersList.$inject = ['$scope', '$stateParams', '$state', '$controller', '$http'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function vehiclesList($scope, $stateParams, $state, $controller, $http) {
    angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state, $http: $http}));
    $http.get('http://api.simplify-traffic.com/v1/vehicles').
        success(function(data) {
            $scope.vehicles = data.vehicles;
        });
  }

  function citiesList($scope, $stateParams, $state, $controller, $http) {
    angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state, $http: $http}));
    $http.get('http://api.simplify-traffic.com/v1/cities').
        success(function(data) {
            $scope.cities = data.cities;
        });
  }

  function carriersList($scope, $stateParams, $state, $controller, $http) {
    angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state, $http: $http}));
    $http.get('http://api.simplify-traffic.com/v1/carriers').
        success(function(data) {
            $scope.carriers = data.carriers;
        });
  }

  function run() {
    FastClick.attach(document.body);
  }

})();