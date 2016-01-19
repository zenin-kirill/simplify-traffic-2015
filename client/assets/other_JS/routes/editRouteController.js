
appModule.controller('editRouteController', editRouteController)

editRouteController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'RoutesFactory', 'CitiesFactory', 'CarriersFactory'];


function editRouteController($scope, $stateParams, $state, $controller, $location, RoutesFactory, CitiesFactory, CarriersFactory) 
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

	var originalRoute = RoutesFactory.get({routeId: $stateParams.routeId}, function(route)
	{
		$scope.cities = CitiesFactory.query(function(cities)
		{
			if (cities[route.city_id] == undefined)
				route.city_id = cities[0].id;
		});

		$scope.carriers = CarriersFactory.query(function(carriers)
		{
			if (carriers[route.carrier_id] == undefined)
				route.carrier_id = carriers[0].id;
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