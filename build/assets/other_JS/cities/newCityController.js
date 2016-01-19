
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