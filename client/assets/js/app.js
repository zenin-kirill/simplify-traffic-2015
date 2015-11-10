(function() {
  'use strict';

  angular.module('application', [
    'ngResource',
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
    .config(config)

    .factory('Vehicle', function($resource) {
      var Vehicle = $resource('http://api.simplify-traffic.com/v1/vehicles/:id',
              {query: 
                {
                  method: 'GET',
                  isArray: true,
                  headers: { 'Token': '12345' }
                } 
              },

              {get: 
                {
                  method: 'GET',
                  isArray: false,
                  headers: { 'Token': '12345' }
                } 
              },

              {update: 
                { 
                  method: 'PUT',
                  headers: { 'Token': '12345' }
                }
              }
      );
 
  Vehicle.update = function(cb) {
        return Vehicle.update({id: this._id.$oid},
            angular.extend({}, this, {_id:undefined}), cb);
      };
 
  Vehicle.destroy = function(cb) {
        return Vehicle.remove({id: this._id.$oid}, cb);
      };
 
      return Vehicle;
    })

    .controller('vehiclesList', vehiclesList)
    .controller('citiesList', citiesList)
    .controller('carriersList', carriersList)
    .run(run);

  config.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider'];
  vehiclesList.$inject = ['$scope', '$stateParams', '$state', '$controller', 'Vehicle', '$http'];
  citiesList.$inject = ['$scope', '$stateParams', '$state', '$controller', '$http'];
  carriersList.$inject = ['$scope', '$stateParams', '$state', '$controller', '$http'];
  vehiclesCreate.$inject = ['$scope', '$location', '$stateParams', '$state', '$controller', 'Vehicle']
  vehiclesEdit.$inject = ['$scope', '$location', '$routeParams', '$stateParams', '$state', '$controller', 'Vehicle']

  

  function config($urlProvider, $locationProvider, $httpProvider) {
    $httpProvider.defaults.headers.get = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.delete = {};
    $httpProvider.defaults.headers.get['Token'] = '12345';
    $httpProvider.defaults.headers.put['Token'] = '12345';
    $httpProvider.defaults.headers.post['Token'] = '12345';
    $httpProvider.defaults.headers.delete['Token'] = '12345';
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function vehiclesList($scope, $stateParams, $state, $controller, Vehicle, $http) {
    angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state, Vehicle}));
    //$scope.vehicles = Vehicle.quere();
    //$http.defaults.headers.get = {};
    $http.defaults.headers.get['Token'] = '12345';
    $http.get('http://api.simplify-traffic.com/v1/vehicles').
        success(function(data) {
           $scope.vehicless = data.vehicles;
        });
  }

  function vehiclesCreate($scope, $location, $stateParams, $state, $controller, Vehicle) {
    angular.extend(this, $controller('DefaultController', {$scope, $location, $stateParams, $state, $controller, Vehicle}));
    $scope.save = function() {
     Vehicle.save($scope.vehicle, function(vehicle) {
       $location.path('/vehicles/edit/' + vehicle._id.$oid);
     });
    }
  }

  function vehiclesEdit($scope, $location, $routeParams, $stateParams, $state, $controller, Vehicle) {
  angular.extend(this, $controller('DefaultController', {$scope, $location, $routeParams, $stateParams, $state, $controller, Vehicle}));
  var self = this;
 
  Vehicle.get({id: $routeParams.vehicleId}, function(vehicle) {
    self.original = vehicle;
    $scope.vehicle = new Vehicle(self.original);
  });

  $scope.isClean = function() {
    return angular.equals(self.original, $scope.vehicle);
  }

  $scope.destroy = function() {
    self.original.destroy(function() {
      $location.path('/vehicles/');
    });
  };
 
  $scope.save = function() {
    $scope.vehicle.update(function() {
      $location.path('/');
    });
  };
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