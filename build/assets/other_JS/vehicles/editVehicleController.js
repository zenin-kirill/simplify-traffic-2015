    
appModule.controller('editVehicleController', editVehicleController)

editVehicleController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'VehiclesFactory', 'CarriersFactory'];


function editVehicleController($scope, $stateParams, $state, $controller, $location, VehiclesFactory, CarriersFactory) 
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

	var originalVehicle = VehiclesFactory.get({vehicleId: $stateParams.vehicleId}, function(vehicle)
	{
		$scope.carriers = CarriersFactory.query(function(carriers)
		{
			if (carriers[vehicle.carrier_id] == undefined)
				vehicle.carrier_id = carriers[0].id;
		});
	});

	$scope.editVehicle = originalVehicle;

	$scope.isClean = function() 
	{ 
		return angular.equals(originalVehicle, $scope.editVehicle); 
	}

	$scope.update = function() 
	{
		VehiclesFactory.update({vehicleId:$stateParams.vehicleId}, $scope.editVehicle, function() 
		{
			$location.path('/vehicles');
		});
	};
}