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

    .controller('citiesList', citiesList)
    //.controller('carriersList', carriersList)

    .controller('vehiclesController', vehiclesController)
    .controller('newVehicleController', newVehicleController)
    .controller('editVehicleController', editVehicleController)

    .controller('carriersController', carriersController)
    .controller('newCarrierController', newCarrierController)
    .controller('editCarrierController', editCarrierController)

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



    config.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider'];

    vehiclesController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'VehiclesFactory'];
    newVehicleController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'VehiclesFactory'];
    editVehicleController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'VehiclesFactory'];


    carriersController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'CarriersFactory'];
    newCarrierController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'CarriersFactory'];
    editCarrierController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'CarriersFactory'];
    
    citiesList.$inject = ['$scope', '$stateParams', '$state', '$controller', '$http'];
    //carriersList.$inject = ['$scope', '$stateParams', '$state', '$controller', '$http'];

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

        $scope.delete = function(id){
            VehiclesFactory.remove({vehicleId: id}, function(){
                for (i = 0; i < vec.length; i++) {
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

        $scope.delete = function(id){
            CarriersFactory.remove({carrierId: id}, function(){
                for (i = 0; i < car.length; i++) {
                    if (car[i].id == id) {car.splice(i, 1)}
                }

            $scope.carriers = car;
        });

        }
        $scope.carriers = car;
    }



    function newVehicleController($scope, $stateParams, $state, $controller, $location, VehiclesFactory) 
    {
        angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

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
                $location.path('/carrier');
            });
        };
    }


    
    function editVehicleController($scope, $stateParams, $state, $controller, $location, VehiclesFactory) 
    {
        angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

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
                $location.path('/carrier');
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

// function carriersList($scope, $stateParams, $state, $controller, $http) {
//     angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state, $http: $http}));
    
//     $http.get('http://api.simplify-traffic.com/v1/carriers')
//     .success(function(data) 
//     {
//         $scope.carriers = data;
//     });
// }

function run() {
    FastClick.attach(document.body);
}

})();