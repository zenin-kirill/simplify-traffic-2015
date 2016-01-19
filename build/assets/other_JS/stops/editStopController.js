
appModule.controller('editStopController', editStopController)

editStopController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'StopsFactory', 'CitiesFactory'];


function editStopController($scope, $stateParams, $state, $controller, $location, StopsFactory, CitiesFactory) 
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

	var originalStop = StopsFactory.get({stopId: $stateParams.stopId}, function(stop)
	{
		$scope.cities = CitiesFactory.query(function(cities)
		{
			if (cities[stop.city_id] == undefined)
				stop.city_id = cities[0].id;
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