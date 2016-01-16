
appModule.controller('vehiclesController', vehiclesController)

vehiclesController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'VehiclesFactory', 'CarriersFactory'];


function vehiclesController($scope, $stateParams, $state, $controller, VehiclesFactory, CarriersFactory)
{
    angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

    var i,j;
    $scope.carriersNames = [];

    VehiclesFactory.query(function(vehicles)
    {
        CarriersFactory.query(function(carriers) 
        {
            for (i = 0; i < vehicles.length; i++)
            {
                if (( j = indexOfObjByVal( carriers,'id', vehicles[i].carrier_id)) != undefined)
                    $scope.carriersNames[i] = carriers[j].display_name;
                else
                    $scope.carriersNames[i] = "не существует";
            }

            $scope.vehicles = vehicles;
        });
    });

    $scope.delete = function(id)
    {
        VehiclesFactory.remove({vehicleId: id}, function()
        {
            for (i = 0; i < $scope.vehicles.length; i++) 
            {
                if ($scope.vehicles[i].id == id) {$scope.vehicles.splice(i, 1)}
            }
    });
    }
    
        //return new Date(entry.created_at.replace(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+) +(\d+)/, '$2/$3/$1 $4:$5:$6 GMT+$7'));
        //var text = "2012-11-28 12:10:10 0000";
    }