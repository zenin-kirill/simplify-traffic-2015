
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