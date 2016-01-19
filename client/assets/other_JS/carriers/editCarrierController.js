
appModule.controller('editCarrierController', editCarrierController)

editCarrierController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'CarriersFactory'];


function editCarrierController($scope, $stateParams, $state, $controller, $location, CarriersFactory) 
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

	var originalCarrier = CarriersFactory.get({carrierId: $stateParams.carrierId});
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