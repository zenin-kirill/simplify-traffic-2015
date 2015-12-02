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

    .controller('usersController', usersController)
    .controller('newUserController', newUserController)
    .controller('editUserController', editUserController)

    .controller('stopsController', stopsController)
    .controller('newStopController', newStopController)
    .controller('editStopController', editStopController)

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

    .factory('UsersFactory', ['$resource', function($resource)  
    {
        return $resource('http://api.simplify-traffic.com/v1/users/:userId', 
        {
            userId: "@userId"
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

    .factory('StopsFactory', ['$resource', function($resource)  
    {
        return $resource('http://api.simplify-traffic.com/v1/stops/:stopId', 
        {
            stopId: "@stopId"
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

    vehiclesController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'VehiclesFactory', 'CarriersFactory'];
    newVehicleController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'VehiclesFactory', 'CarriersFactory'];
    editVehicleController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'VehiclesFactory', 'CarriersFactory'];

    carriersController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'CarriersFactory'];
    newCarrierController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'CarriersFactory'];
    editCarrierController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'CarriersFactory'];

    citiesController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'CitiesFactory'];
    newCityController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'CitiesFactory'];
    editCityController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'CitiesFactory'];

    usersController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'UsersFactory', 'CarriersFactory'];
    newUserController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'UsersFactory', 'CarriersFactory'];
    editUserController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'UsersFactory', 'CarriersFactory'];

    stopsController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'StopsFactory', 'CitiesFactory'];
    newStopController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'StopsFactory', 'CitiesFactory'];
    editStopController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'StopsFactory', 'CitiesFactory'];



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



    function vehiclesController($scope, $stateParams, $state, $controller, VehiclesFactory, CarriersFactory)
    {
        angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

        var i,j;
        var carriersNames = [];
        
        var vehicles = VehiclesFactory.query(function()
        {
            var carriers = CarriersFactory.query(function() 
            {
                for (i = 0; i < vehicles.length; i++)
                {
                    if (( j = indexOfObjByVal( carriers,'id', vehicles[i].carrier_id)) != undefined)
                        carriersNames[i] = carriers[j].display_name;
                    else
                        carriersNames[i] = "не существует";
                }

                $scope.carriersNames =  carriersNames;
                $scope.vehicles = vehicles;
            });
        });

    

        $scope.delete = function(id)
        {
            VehiclesFactory.remove({vehicleId: id}, function()
            {
                for (i = 0; i < vehicles.length; i++) 
                {
                    if (vehicles[i].id == id) {vehicles.splice(i, 1)}
                }

                $scope.vehicles = vehicles;
            });
        }
        
        //return new Date(entry.created_at.replace(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+) +(\d+)/, '$2/$3/$1 $4:$5:$6 GMT+$7'));
        //var text = "2012-11-28 12:10:10 0000";
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



    function usersController($scope, $stateParams, $state, $controller, UsersFactory, CarriersFactory)
    {
        angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

        var i,j;
        var carriersNames = [];
        
        var users = UsersFactory.query(function()
        {
            var carriers = CarriersFactory.query(function() 
            {
                for (i = 0; i < users.length; i++)
                {
                    if (( j = indexOfObjByVal( carriers,'id', users[i].carrier_id)) != undefined)
                        carriersNames[i] = carriers[j].display_name;
                    else
                        carriersNames[i] = "не существует";
                }

                $scope.carriersNames =  carriersNames;
                $scope.users = users;
            });
        });



        $scope.delete = function(id)
        {
            UsersFactory.remove({userId: id}, function()
            {
                for (i = 0; i < users.length; i++) 
                {
                    if (users[i].id == id) {users.splice(i, 1)}
                }

                $scope.users = users;
            });
        }
    }



    function stopsController($scope, $stateParams, $state, $controller, StopsFactory, CitiesFactory)
    {
        angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));
        
        var i, j;
        var cityNames = [];
        
        var stops = StopsFactory.query(function()
        {
            var cities = CitiesFactory.query(function() 
            {
                for (i = 0; i < stops.length; i++)
                {
                    if (( j = indexOfObjByVal( cities,'id', stops[i].city_id)) != undefined)
                        cityNames[i] = cities[j].name;
                    else
                        cityNames[i] = "не существует";
                }

                $scope.cityNames =  cityNames;
                $scope.stops = stops;
            });
        });
        
        $scope.delete = function(id)
        {
            StopsFactory.remove({stopId: id}, function()
            {
                for (i = 0; i < stops.length; i++) 
                {
                    if (stops[i].id == id) {stops.splice(i, 1)}
                }

                $scope.stops = stops;
            });
        }
    }



    function newVehicleController($scope, $stateParams, $state, $controller, $location, VehiclesFactory, CarriersFactory) 
    {
        angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

        $scope.newVehicle = new VehiclesFactory();
        $scope.newVehicle.type = 'bus';
        $scope.carriers = CarriersFactory.query(function(object){
             $scope.newUser.carrier_id = object[0].id;
        });

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



    function newUserController($scope, $stateParams, $state, $controller, $location, UsersFactory, CarriersFactory) 
    {
        angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

        $scope.newUser = new UsersFactory();
        $scope.newUser.role = 'carrier';
        $scope.newUser.type = 'user';
        $scope.carriers = CarriersFactory.query(function(object){
             $scope.newUser.carrier_id = object[0].id;
        });
       

        $scope.save = function() 
        {
            if ($scope.newUser.password == $scope.repassword)
                UsersFactory.save($scope.newUser, function() 
            {
                $location.path('/users');
            });
            else
            {
                alert('Введенные пароли не совпадают');
                $scope.newUser.password = "";
                $scope.repassword = "";
            }
        };
    }



    function newStopController($scope, $stateParams, $state, $controller, $location, StopsFactory, CitiesFactory) 
    {
        angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

        $scope.newStop = new StopsFactory();
        $scope.newStop.type = 'bus';
        $scope.cities = CitiesFactory.query(function(object){
            $scope.newStop.city_id = object[0].id;
        });

        

        $scope.save = function() 
        {
            StopsFactory.save($scope.newStop, function() 
            {
                $location.path('/stops');
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

    function editUserController($scope, $stateParams, $state, $controller, $location, UsersFactory, CarriersFactory) 
    {
        angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

        $scope.carriers = CarriersFactory.query();
        var originalUser = UsersFactory.get({userId: $stateParams.userId}, function(){
             originalUser.password = "";
        })
        $scope.editUser = originalUser;

        $scope.isClean = function() 
        { 
          return angular.equals(originalUser, $scope.editUser); 
        }
        
        $scope.update = function() 
        {
            if ($scope.editUser.password == $scope.repassword)
            {
                UsersFactory.update({userId:$stateParams.userId}, $scope.editUser, function() 
                {
                   $location.path('/users');
                });
            }
            else
            {
                alert('Введенные пароли не совпадают');
                $scope.editUser.password = "";
                $scope.repassword = "";
            }
        };
    }



    function editStopController($scope, $stateParams, $state, $controller, $location, StopsFactory, CitiesFactory) 
    {
        angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

        var originalStop = StopsFactory.get({stopId: $stateParams.stopId});
        $scope.editStop = originalStop;
        $scope.cities = CitiesFactory.query(function(object){
            if (object[editStop.city_id] == undefined)
                $scope.editStop.city_id = object[0].id;
        });


        $scope.isClean = function() 
        { 
          return angular.equals(originalStop, $scope.editStop); 
        }

        $scope.update = function() 
        {
            StopsFactory.update({stopId:$stateParams.stopId}, $scope.editStop, function() 
            {
                $location.path('/stops');
            });
        };
    }

    function indexOfObjByVal(array, property, value) {
        if (array instanceof Array)
        {
            for (var i = 0; i < array.length; i++)
                if (array[i][property] == value)
                    return i;
        }
        else
            return undefined;
    }

    function run() {
        FastClick.attach(document.body);
    }

})();