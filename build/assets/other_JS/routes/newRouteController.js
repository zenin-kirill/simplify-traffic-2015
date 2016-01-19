
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