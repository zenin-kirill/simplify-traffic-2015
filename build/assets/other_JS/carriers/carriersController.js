
appModule.controller('carriersController', carriersController)

carriersController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'CarriersFactory'];


function carriersController($scope, $stateParams, $state, $controller, CarriersFactory)
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));
	
	var i;
	var car = CarriersFactory.query();

	$scope.carriers = car;

	$scope.delete = function(id)
	{
		CarriersFactory.remove({carrierId: id}, function()
		{
			for (i = 0; i < $scope.car.length; i++) 
			{
				if ($scope.car[i].id == id) {$scope.car.splice(i, 1)}
			}
	});
	}      
}

