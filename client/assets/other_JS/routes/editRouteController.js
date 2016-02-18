
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