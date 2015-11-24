(function() {
    'use strict';

    //Indentation: Reindent lines 

    angular.module('application', [
        'ngResource',
        'ui.router',
        'ngAnimate',

        'foundation',
        'foundation.dynamicRouting',
        'foundation.dynamicRouting.animations'
    ])
    .config(config)

    .controller('vehiclesController', vehiclesController)
    .controller('newVehicleController', newVehicleController)
    .controller('editVehicleController', editVehicleController)

    .controller('carriersController', carriersController)
    .controller('newCarrierController', newCarrierController)
    .controller('editCarrierController', editCarrierController)

    .controller('citiesController', citiesController)
    .controller('newCityController', newCityController)
    .controller('editCityController', editCityController)

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
                headers: { 'Token': '12345' }
            },
            'update':
            {
                method:'PUT',
                headers: { 'Token': '12345' }
            },
            'remove':
            {
                method:'DELETE',
                headers: { 'Token': '12345' }
            }
        });
    }])


    .factory('CarriersFactory', ['$resource', function($resource)  
    {
        return $resource('http://api.simplify-traffic.com/v1/carriers/:carrierId', 
        {
            carrierId: "@carrierId"
        },

        {
            'get': 
            { 
                method:'GET',
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
                headers: { 'Token': '12345' }
            },
            'update':
            {
                method:'PUT',
                headers: { 'Token': '12345' }
            },
            'remove':
            {
                method:'DELETE',
                headers: { 'Token': '12345' }
            }
        });
    }])

    .factory('CitiesFactory', ['$resource', function($resource)  
    {
        return $resource('http://api.simplify-traffic.com/v1/cities/:cityId', 
        {
            cityId: "@cityId"
        },

        {
            'get': 
            { 
                method:'GET',
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
                headers: { 'Token': '12345' }
            },
            'update':
            {
                method:'PUT',
                headers: { 'Token': '12345' }
            },
            'remove':
            {
                method:'DELETE',
                headers: { 'Token': '12345' }
            }
        });
    }])



    config.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider'];

    vehiclesController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'VehiclesFactory'];
    newVehicleController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'VehiclesFactory', 'CarriersFactory'];
    editVehicleController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'VehiclesFactory', 'CarriersFactory'];

    carriersController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'CarriersFactory'];
    newCarrierController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'CarriersFactory'];
    editCarrierController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'CarriersFactory'];

    citiesController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'CitiesFactory'];
    newCityController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'CitiesFactory'];
    editCityController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'CitiesFactory'];



    function config($urlProvider, $locationProvider, $httpProvider) 
    {
        $httpProvider.defaults.headers.get = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.delete = {};

        $httpProvider.defaults.headers.get['Token'] = '12345';
        $httpProvider.defaults.headers.put['Token'] = '12345';
        $httpProvider.defaults.headers.post['Token'] = '12345';
        $httpProvider.defaults.headers.delete['Token'] = '12345';

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
        
        var vec = VehiclesFactory.query();
        var i;

        $scope.delete = function(id)
        {
            VehiclesFactory.remove({vehicleId: id}, function()
            {
                for (i = 0; i < vec.length; i++) 
                {
                    if (vec[i].id == id) {vec.splice(i, 1)}
                }

                $scope.vehicles = vec;
            });
        }
        
        //return new Date(entry.created_at.replace(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+) +(\d+)/, '$2/$3/$1 $4:$5:$6 GMT+$7'));
        //var text = "2012-11-28 12:10:10 0000";
        $scope.vehicles = vec;
    }


    function carriersController($scope, $stateParams, $state, $controller, CarriersFactory)
    {
        angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));
        
        var car = CarriersFactory.query();
        var i;

        $scope.delete = function(id)
        {
            CarriersFactory.remove({carrierId: id}, function()
            {
                for (i = 0; i < car.length; i++) 
                {
                    if (car[i].id == id) {car.splice(i, 1)}
                }

                $scope.carriers = car;
            });
        }
        $scope.carriers = car;
    }



    function citiesController($scope, $stateParams, $state, $controller, CitiesFactory)
    {
        angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));
        
        var city = CitiesFactory.query();
        var i;

        $scope.delete = function(id)
        {
            CitiesFactory.remove({cityId: id}, function()
            {
                for (i = 0; i < city.length; i++) 
                {
                    if (city[i].id == id) {city.splice(i, 1)}
                }

                $scope.cities = city;
            });
        }

        $scope.cities = city;
    }



    function newVehicleController($scope, $stateParams, $state, $controller, $location, VehiclesFactory, CarriersFactory) 
    {
        angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

        $scope.carriers = CarriersFactory.query();
        $scope.newVehicle = new VehiclesFactory();
        $scope.newVehicle.type = 'bus';
        $scope.newVehicle.carrier_id = '1';

        $scope.save = function() 
        {
            VehiclesFactory.save($scope.newVehicle, function() 
            {
                $location.path('/vehicles');
            });
        };
    }



    function newCarrierController($scope, $stateParams, $state, $controller, $location, CarriersFactory) 
    {
        angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

        $scope.newCarrier = new CarriersFactory();

        $scope.save = function() 
        {
            CarriersFactory.save($scope.newCarrier, function() 
            {
                $location.path('/carriers');
            });
        };
    }



    function newCityController($scope, $stateParams, $state, $controller, $location, CitiesFactory) 
    {
        angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

        $scope.newCity = new CitiesFactory();
        $scope.newCity.type = 'city';

        $scope.save = function() 
        {
            CitiesFactory.save($scope.newCity, function() 
            {
                $location.path('/cities');
            });
        };
    }


    
    function editVehicleController($scope, $stateParams, $state, $controller, $location, VehiclesFactory, CarriersFactory) 
    {
        angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

        $scope.carriers = CarriersFactory.query();
        var originalVehicle = VehiclesFactory.get({vehicleId: $stateParams.vehicleId});
        $scope.editVehicle = originalVehicle;

        $scope.isClean = function() 
        { 
          return angular.equals(originalVehicle, $scope.editVehicle); 
        }

        $scope.update = function() 
        {
            VehiclesFactory.update({vehicleId:$stateParams.vehicleId}, $scope.editVehicle, function() 
            {
                $location.path('/vehicles');
            });
        };
    }




    function editCarrierController($scope, $stateParams, $state, $controller, $location, CarriersFactory) 
    {
        angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

        var originalCarrier = CarriersFactory.get({carrierId: $stateParams.carrierId});
        $scope.editCarrier = originalCarrier;

        $scope.isClean = function() 
        { 
          return angular.equals(originalCarrier, $scope.editCarrier); 
        }
        
        $scope.update = function() 
        {
            CarriersFactory.update({carrierId:$stateParams.carrierId}, $scope.editCarrier, function() 
            {
                $location.path('/carriers');
            });
        };
    }



    function editCityController($scope, $stateParams, $state, $controller, $location, CitiesFactory) 
    {
        angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

        var originalCity = CitiesFactory.get({cityId: $stateParams.cityId});
        $scope.editCity = originalCity;

        $scope.isClean = function() 
        { 
          return angular.equals(originalCity, $scope.editCity); 
        }
        
        $scope.update = function() 
        {
            CitiesFactory.update({cityId:$stateParams.cityId}, $scope.editCity, function() 
            {
                $location.path('/cities');
            });
        };
    }



    function run() {
        FastClick.attach(document.body);
    }

})();