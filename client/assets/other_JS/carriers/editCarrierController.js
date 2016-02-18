
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