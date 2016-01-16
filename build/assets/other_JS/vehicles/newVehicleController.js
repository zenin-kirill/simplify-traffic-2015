
appModule.controller('newVehicleController', newVehicleController)

newVehicleController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'VehiclesFactory', 'CarriersFactory'];


function newVehicleController($scope, $stateParams, $state, $controller, $location, VehiclesFactory, CarriersFactory) 
{
    angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

    $scope.newVehicle = new VehiclesFactory();
    $scope.newVehicle.type = 'bus';

    $scope.carriers = CarriersFactory.query(function(carriers)
    {
       $scope.newVehicle.carrier_id = carriers[0].id;
   });

    $scope.save = function() 
    {
        VehiclesFactory.save($scope.newVehicle, function() 
        {
            $location.path('/vehicles');
        });
    };
}

