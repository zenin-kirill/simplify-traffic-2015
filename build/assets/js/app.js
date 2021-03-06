(function() {
    'use strict';

    //Indentation: Reindent lines 

    var appModule = angular.module('application', [
        'ngResource',
        'ui.router',
        'ngAnimate',

        'foundation',
        'foundation.dynamicRouting',
        'foundation.dynamicRouting.animations'
        ])
    
    .config(config)
    .run(run)

    config.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider'];



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



    function indexOfObjByVal(array, property, value) 
    {
        if (array instanceof Array)
        {
            for (var i = 0; i < array.length; i++)
            if (array[i][property] == value)
                return i;
        }
        else
            return null;
    }

    function selectObj($scope, obj)
    {
        return $scope.selectedObj = obj;
    }


    function run() {
        FastClick.attach(document.body);
    }

appModule.controller('carriersController', carriersController)

carriersController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'CarriersFactory'];


function carriersController($scope, $stateParams, $state, $controller, CarriersFactory)
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));
	
	var i;
	var car = CarriersFactory.query();

	$scope.carriers = car;

	$scope.delete = function(id)
	{
		CarriersFactory.remove({carrierId: id}, function()
		{
			for (i = 0; i < $scope.car.length; i++) 
			{
				if ($scope.car[i].id == id) {$scope.car.splice(i, 1)}
			}
	});
	}      
}



appModule.factory('CarriersFactory', ['$resource', function($resource)  
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

appModule.controller('editCarrierController', editCarrierController)

editCarrierController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'CarriersFactory', 'CitiesFactory'];


function editCarrierController($scope, $stateParams, $state, $controller, $location, CarriersFactory, CitiesFactory) 
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

	var originalCarrier = CarriersFactory.get({carrierId: $stateParams.carrierId}, function(carrier)
	{
		$scope.cities = CitiesFactory.query(function(cities)
		{
			var i = indexOfObjByVal(cities,'id', carrier.city_id);

			if (cities[i] != undefined)
			{
				var deleted = cities.splice(i, 1)[0];
				cities.splice(0, 0, deleted);
			}
			else
			{
				carrier.city_id = cities[0].id;
			}
		});
	});

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

appModule.controller('newCarrierController', newCarrierController)

newCarrierController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'CarriersFactory', 'CitiesFactory'];


function newCarrierController($scope, $stateParams, $state, $controller, $location, CarriersFactory, CitiesFactory) 
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

	$scope.newCarrier = new CarriersFactory();

	$scope.cities = CitiesFactory.query(function(cities)
	{
		$scope.newCarrier.city_id = cities[0].id;
	});

	$scope.save = function() 
	{
		CarriersFactory.save($scope.newCarrier, function() 
		{
			$location.path('/carriers');
		});
	};
}

appModule.controller('editRouteController', editRouteController)

editRouteController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'RoutesFactory', 'CitiesFactory', 'CarriersFactory'];


function editRouteController($scope, $stateParams, $state, $controller, $location, RoutesFactory, CitiesFactory, CarriersFactory) 
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

	var originalRoute = RoutesFactory.get({routeId: $stateParams.routeId}, function(route)
	{
		$scope.cities = CitiesFactory.query(function(cities)
		{
			var i = indexOfObjByVal(cities,'id', route.city_id);

			if (cities[i] != undefined)
			{
				var deleted = cities.splice(i, 1)[0];
				cities.splice(0, 0, deleted);
			}
			else
			{
				route.city_id = cities[0].id;
			}
		});

		$scope.carriers = CarriersFactory.query(function(carriers)
		{
			var i = indexOfObjByVal(carriers,'id', route.carrier_id);

			if (carriers[i] != undefined)
			{
				var deleted = carriers.splice(i, 1)[0];
				carriers.splice(0, 0, deleted);
			}
			else
			{
				route.carrier_id = carriers[0].id;
			}
		});
	});
	
	$scope.editRoute = originalRoute;

	$scope.isClean = function() 
	{ 
		return angular.equals(originalRoute, $scope.editRoute); 
	}

	$scope.update = function() 
	{
		RoutesFactory.update({routeId:$stateParams.routeId}, $scope.editRoute, function() 
		{
			$location.path('/routes');
		});
	};
}

appModule.controller('newRouteController', newRouteController)

newRouteController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'RoutesFactory', 'CitiesFactory', 'CarriersFactory'];


function newRouteController($scope, $stateParams, $state, $controller, $location, RoutesFactory, CitiesFactory, CarriersFactory) 
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

	$scope.newRoute = new RoutesFactory();

	$scope.cities = CitiesFactory.query(function(cities)
	{
		$scope.newRoute.city_id = cities[0].id;
	});

	$scope.carriers = CarriersFactory.query(function(carriers)
	{
		$scope.newRoute.carrier_id = carriers[0].id;
	});     

	$scope.save = function() 
	{
		RoutesFactory.save($scope.newRoute, function() 
		{
			$location.path('/routes');
		});
	};
}

appModule.controller('routesController', routesController)

routesController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'RoutesFactory', 'CitiesFactory', 'CarriersFactory'];


function routesController($scope, $stateParams, $state, $controller, RoutesFactory, CitiesFactory, CarriersFactory)
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

	var i, j;
	$scope.carriersNames = [];
	$scope.cityNames = [];
	

	
	RoutesFactory.query(function(routes)
	{
		CarriersFactory.query(function(carriers) 
		{
			for (i = 0; i < routes.length; i++)
			{
				if (( j = indexOfObjByVal( carriers,'id', routes[i].carrier_id)) != undefined)
					$scope.carriersNames[i] = carriers[j].display_name;
				else
					$scope.carriersNames[i] = "не существует";
			}

			$scope.carriers = carriers;
		});

		CitiesFactory.query(function(cities) 
		{
			
			for (i = 0; i < routes.length; i++)
			{
				if (( j = indexOfObjByVal( cities,'id', routes[i].city_id)) != undefined)
					$scope.cityNames[i] = cities[j].name;
				else
					$scope.cityNames[i] = "не существует";
			}

			$scope.cities = cities;
			$scope.routes = routes;
		});
	});

	$scope.delete = function(id)
	{
		RoutesFactory.remove({routeId: id}, function()
		{
			for (i = 0; i < $scope.routes.length; i++) 
			{
				if ($scope.routes[i].id == id) {$scope.routes.splice(i, 1)}
			}
	});
	}
}

appModule.factory('RoutesFactory', ['$resource', function($resource)  
{
	return $resource('http://api.simplify-traffic.com/v1/routes/:routeId', 
	{
		routeId: "@routeId"
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

appModule.controller('citiesController', citiesController)

citiesController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'CitiesFactory'];


function citiesController($scope, $stateParams, $state, $controller, CitiesFactory)
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));
	
	var i;
	var city = CitiesFactory.query();

	$scope.cities = city;

	$scope.delete = function(id)
	{
		CitiesFactory.remove({cityId: id}, function()
		{
			for (i = 0; i < $scope.cities.length; i++) 
			{
				if ($scope.cities[i].id == id) {$scope.cities.splice(i, 1)}
			}
	});
	}
}

appModule.factory('CitiesFactory', ['$resource', function($resource)  
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

appModule.controller('editCityController', editCityController)

editCityController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'CitiesFactory'];


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

appModule.controller('newCityController', newCityController)

newCityController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'CitiesFactory'];


function newCityController($scope, $stateParams, $state, $controller, $location, CitiesFactory) 
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

	$scope.newCity = new CitiesFactory();

	$scope.save = function() 
	{
		CitiesFactory.save($scope.newCity, function() 
		{
			$location.path('/cities');
		});
	};
}

appModule.controller('editStopController', editStopController)

editStopController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'StopsFactory', 'CitiesFactory'];


function editStopController($scope, $stateParams, $state, $controller, $location, StopsFactory, CitiesFactory) 
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

	var originalStop = StopsFactory.get({stopId: $stateParams.stopId}, function(stop)
	{
		$scope.cities = CitiesFactory.query(function(cities)
		{
			var i = indexOfObjByVal(cities,'id', stop.city_id);

			if (cities[i] != undefined)
			{
				var deleted = cities.splice(i, 1)[0];
				cities.splice(0, 0, deleted);
			}
			else
			{
				stop.city_id = cities[0].id;
			}
		});
	});

	$scope.editStop = originalStop;
	
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

appModule.controller('newStopController', newStopController)

newStopController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'StopsFactory', 'CitiesFactory'];


function newStopController($scope, $stateParams, $state, $controller, $location, StopsFactory, CitiesFactory) 
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

	$scope.newStop = new StopsFactory();

	$scope.cities = CitiesFactory.query(function(cities)
	{
		$scope.newStop.city_id = cities[0].id;
	});

	$scope.save = function() 
	{
		StopsFactory.save($scope.newStop, function() 
		{
			$location.path('/stops');
		});
	};
}

appModule.controller('stopsController', stopsController)

stopsController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'StopsFactory', 'CitiesFactory'];


function stopsController($scope, $stateParams, $state, $controller, StopsFactory, CitiesFactory)
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));
	
	var i, j;
	$scope.cityNames = [];
	
	StopsFactory.query(function(stops)
	{
		CitiesFactory.query(function(cities) 
		{
			for (i = 0; i < stops.length; i++)
			{
				if (( j = indexOfObjByVal( cities,'id', stops[i].city_id)) != undefined)
					$scope.cityNames[i] = cities[j].name;
				else
					$scope.cityNames[i] = "не существует";
			}

			$scope.stops = stops;
		});
	});
	
	$scope.delete = function(id)
	{
		StopsFactory.remove({stopId: id}, function()
		{
			for (i = 0; i < $scope.stops.length; i++) 
			{
				if ($scope.stops[i].id == id) {$scope.stops.splice(i, 1)}
			}
	});
	}
}

appModule.factory('StopsFactory', ['$resource', function($resource)  
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

appModule.controller('editUserController', editUserController)

editUserController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'UsersFactory', 'CarriersFactory'];


function editUserController($scope, $stateParams, $state, $controller, $location, UsersFactory, CarriersFactory) 
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

	var originalUser = UsersFactory.get({userId: $stateParams.userId}, function(user)
	{
		$scope.carriers = CarriersFactory.query( function(carriers)
		{
			var i = indexOfObjByVal(carriers,'id', user.carrier_id);

			if (carriers[i] != undefined)
			{
				var deleted = carriers.splice(i, 1)[0];
				carriers.splice(0, 0, deleted);
			}
			else
			{
				user.carrier_id = carriers[0].id;
			}
		});
		user.password = "";
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

appModule.controller('newUserController', newUserController)

newUserController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'UsersFactory', 'CarriersFactory'];


function newUserController($scope, $stateParams, $state, $controller, $location, UsersFactory, CarriersFactory) 
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

	$scope.newUser = new UsersFactory();
	$scope.newUser.role = 'carrier';
         $scope.newUser.token = '333';// ВРЕМЕННО


         $scope.carriers = CarriersFactory.query(function(carriers)
         {
         	$scope.newUser.carrier_id = carriers[0].id;
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

appModule.controller('usersController', usersController)

usersController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'UsersFactory', 'CarriersFactory'];


function usersController($scope, $stateParams, $state, $controller, UsersFactory, CarriersFactory)
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

	var i,j;
	$scope.carriersNames = [];

	UsersFactory.query(function(users)
	{
		CarriersFactory.query(function(carriers) 
		{
			for (i = 0; i < users.length; i++)
			{
				if (( j = indexOfObjByVal( carriers,'id', users[i].carrier_id)) != undefined)
					$scope.carriersNames[i] = carriers[j].display_name;
				else
					$scope.carriersNames[i] = "не существует";
			}

			$scope.users = users;
		});
	});



	$scope.delete = function(id)
	{
		UsersFactory.remove({userId: id}, function()
		{
			for (i = 0; i < $scope.users.length; i++) 
			{
				if ($scope.users[i].id == id) {$scope.users.splice(i, 1)}
			}
	});
	}
}

appModule.factory('UsersFactory', ['$resource', function($resource)  
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
    
appModule.controller('editVehicleController', editVehicleController)

editVehicleController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'VehiclesFactory', 'CarriersFactory'];


function editVehicleController($scope, $stateParams, $state, $controller, $location, VehiclesFactory, CarriersFactory) 
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

	var originalVehicle = VehiclesFactory.get({vehicleId: $stateParams.vehicleId}, function(vehicle)
	{
		$scope.carriers = CarriersFactory.query(function(carriers)
		{
			var i = indexOfObjByVal(carriers,'id', vehicle.carrier_id);

			if (carriers[i] != undefined)
			{
				var deleted = carriers.splice(i, 1)[0];
				carriers.splice(0, 0, deleted);
			}
			else
			{
				vehicle.carrier_id = carriers[0].id;
			}
		});
	});

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

appModule.controller('newVehicleController', newVehicleController)

newVehicleController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'VehiclesFactory', 'CarriersFactory'];


function newVehicleController($scope, $stateParams, $state, $controller, $location, VehiclesFactory, CarriersFactory) 
{
    angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

    $scope.newVehicle = new VehiclesFactory();
    $scope.newVehicle.type = 'bus';

    $scope.carriers = CarriersFactory.query(function(carriers)
    {
       $scope.newVehicle.carrier_id = carriers[0].id;
   });

    $scope.save = function() 
    {
        VehiclesFactory.save($scope.newVehicle, function() 
        {
            $location.path('/vehicles');
        });
    };
}



appModule.controller('vehiclesController', vehiclesController)

vehiclesController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'VehiclesFactory', 'CarriersFactory'];


function vehiclesController($scope, $stateParams, $state, $controller, VehiclesFactory, CarriersFactory)
{
    angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

    var i,j;
    $scope.carriersNames = [];

    VehiclesFactory.query(function(vehicles)
    {
        CarriersFactory.query(function(carriers) 
        {
            for (i = 0; i < vehicles.length; i++)
            {
                if (( j = indexOfObjByVal( carriers,'id', vehicles[i].carrier_id)) != undefined)
                    $scope.carriersNames[i] = carriers[j].display_name;
                else
                    $scope.carriersNames[i] = "не существует";
            }

            $scope.vehicles = vehicles;
        });
    });

    $scope.delete = function(id)
    {
        VehiclesFactory.remove({vehicleId: id}, function()
        {
            for (i = 0; i < $scope.vehicles.length; i++) 
            {
                if ($scope.vehicles[i].id == id) {$scope.vehicles.splice(i, 1)}
            }
    });
    }
    
        //return new Date(entry.created_at.replace(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+) +(\d+)/, '$2/$3/$1 $4:$5:$6 GMT+$7'));
        //var text = "2012-11-28 12:10:10 0000";
    }

appModule.factory('VehiclesFactory', ['$resource', function($resource)  
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
}]);

})();