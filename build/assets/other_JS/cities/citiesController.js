
appModule.controller('citiesController', citiesController)

citiesController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'CitiesFactory'];


function citiesController($scope, $stateParams, $state, $controller, CitiesFactory)
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));
	
	var i;
	var city = CitiesFactory.query();

	$scope.cities = city;

	$scope.delete = function(id)
	{
		CitiesFactory.remove({cityId: id}, function()
		{
			for (i = 0; i < $scope.cities.length; i++) 
			{
				if ($scope.cities[i].id == id) {$scope.cities.splice(i, 1)}
			}
	});
	}
}