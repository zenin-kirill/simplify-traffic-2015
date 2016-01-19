
appModule.controller('usersController', usersController)

usersController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'UsersFactory', 'CarriersFactory'];


function usersController($scope, $stateParams, $state, $controller, UsersFactory, CarriersFactory)
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

	var i,j;
	$scope.carriersNames = [];

	UsersFactory.query(function(users)
	{
		CarriersFactory.query(function(carriers) 
		{
			for (i = 0; i < users.length; i++)
			{
				if (( j = indexOfObjByVal( carriers,'id', users[i].carrier_id)) != undefined)
					$scope.carriersNames[i] = carriers[j].display_name;
				else
					$scope.carriersNames[i] = "не существует";
			}

			$scope.users = users;
		});
	});



	$scope.delete = function(id)
	{
		UsersFactory.remove({userId: id}, function()
		{
			for (i = 0; i < $scope.users.length; i++) 
			{
				if ($scope.users[i].id == id) {$scope.users.splice(i, 1)}
			}
	});
	}
}