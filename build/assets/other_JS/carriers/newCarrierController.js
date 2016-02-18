
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