
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