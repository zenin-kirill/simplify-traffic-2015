
appModule.controller('editCityController', editCityController)

editCityController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'CitiesFactory'];


function editCityController($scope, $stateParams, $state, $controller, $location, CitiesFactory) 
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

	var originalCity = CitiesFactory.get({cityId: $stateParams.cityId});
	$scope.editCity = originalCity;

	$scope.isClean = function() 
	{ 
		return angular.equals(originalCity, $scope.editCity); 
	}
	
	$scope.update = function() 
	{
		CitiesFactory.update({cityId:$stateParams.cityId}, $scope.editCity, function() 
		{
			$location.path('/cities');
		});
	};
}