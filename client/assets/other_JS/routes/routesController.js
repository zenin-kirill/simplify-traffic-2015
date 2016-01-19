
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