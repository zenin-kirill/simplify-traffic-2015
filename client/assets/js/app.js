(function() {
    'use strict';

    angular.module('application', [
        'ngResource',
        'ngRoute',
        'ui.router',
        'ngAnimate',

        'foundation',
        'foundation.dynamicRouting',
        'foundation.dynamicRouting.animations'
    ])
        .config(config)
        .controller('citiesList', citiesList)
        .controller('carriersList', carriersList)
        .controller('vehiclesController', vehiclesController)
        .controller('newVehicleController', newVehicleController)
        .controller('editVehicleController', editVehicleController)
        .run(run)

        .factory('VehiclesFactory', ['$resource', function($resource)  
        {
            return $resource('http://api.simplify-traffic.com/v1/vehicles/:vehicleId', 
            {
                vehicleId: "@vehicleId"
            },

            {
                'get': 
                { 
                    method:'GET',
                     isArray: true,
                    headers: { 'Token': '12345' }
                },
        
                'query': 
                {
                    method: 'GET',
                    isArray: true,
                    headers: { 'Token': '12345' }
                },
                'save':
                { 
                    method:'POST',
                    isArray: true,
                    headers: { 'Token': '12345' }
                },
                'update':
                {
                    method:'PUT',
                    isArray: true,
                    headers: { 'Token': '12345' }
                }
            });
        }])

   

    config.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider'];
  
    vehiclesController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'VehiclesFactory'];
    newVehicleController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'VehiclesFactory'];
    editVehicleController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', '$routeParams', 'VehiclesFactory'];

    citiesList.$inject = ['$scope', '$stateParams', '$state', '$controller', '$http'];
    carriersList.$inject = ['$scope', '$stateParams', '$state', '$controller', '$http'];

    function config($urlProvider, $locationProvider, $httpProvider) 
    {
        $httpProvider.defaults.headers.get = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.post = {};
    // $httpProvider.defaults.headers.delete = {};

        $httpProvider.defaults.headers.get['Token'] = '12345';
        $httpProvider.defaults.headers.put['Token'] = '12345';
        $httpProvider.defaults.headers.post['Token'] = '12345';
    // $httpProvider.defaults.headers.delete['Token'] = '12345';

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';

        $urlProvider.otherwise('/');

        $locationProvider.html5Mode(
        {
            enabled:false,
            requireBase: false
        });

        $locationProvider.hashPrefix('!');
    }



    function vehiclesController($scope, $stateParams, $state, $controller, VehiclesFactory)
    {
        angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));
  
        $scope.vehicles = VehiclesFactory.query();
    }



    function newVehicleController($scope, $stateParams, $state, $controller, $location, VehiclesFactory) 
    {
        angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

        $scope.newVehicle = new VehiclesFactory();
        $scope.newVehicle.type = 'bus';
        $scope.newVehicle.carrier_id = '1';

        $scope.save = function() 
        {
            VehiclesFactory.save($scope.newVehicle, function(vehicle) 
            {
                $location.path('!#/vehicles');
            });
        };
    }
  

    
    function editVehicleController($scope, $stateParams, $state, $controller, $location, $routeParams, VehiclesFactory) 
    {
        angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));
        
        var self = this;
 
        VehiclesFactory.get({vehicleId: $routeParams.vehicleId}, function(vehicle) 
        {
            self.originalVehicle = vehicle;
            $scope.editVehicle = new VehiclesFactory(self.originalVehicle);
        });

        $scope.isClean = function() 
        { 
          return angular.equals(self.originalVehicle, $scope.editVehicle); 
        }
 
        $scope.update = function() 
        {
            VehiclesFactory.update({vehicleId:$routeParams.vehicleId}, $scope.editVehicle, function() 
            {
                $location.path('/vehicles');
            });
        };
    }



    function citiesList($scope, $stateParams, $state, $controller, $http) 
    {
        angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state, $http: $http}));
    
        $http.get('http://api.simplify-traffic.com/v1/cities')
            .success(function(data) 
            {
                $scope.cities = data;
            });
    }

    function carriersList($scope, $stateParams, $state, $controller, $http) {
        angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state, $http: $http}));
    
        $http.get('http://api.simplify-traffic.com/v1/carriers')
            .success(function(data) 
            {
                $scope.carriers = data;
            });
    }

    function run() {
        FastClick.attach(document.body);
    }

})();