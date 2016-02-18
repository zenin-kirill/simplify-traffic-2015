
appModule.controller('editUserController', editUserController)

editUserController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'UsersFactory', 'CarriersFactory'];


function editUserController($scope, $stateParams, $state, $controller, $location, UsersFactory, CarriersFactory) 
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

	var originalUser = UsersFactory.get({userId: $stateParams.userId}, function(user)
	{
		$scope.carriers = CarriersFactory.query( function(carriers)
		{
			var i = indexOfObjByVal(carriers,'id', user.carrier_id);

			if (carriers[i] != undefined)
			{
				var deleted = carriers.splice(i, 1)[0];
				carriers.splice(0, 0, deleted);
			}
			else
			{
				user.carrier_id = carriers[0].id;
			}
		});
		user.password = "";
	})

	$scope.editUser = originalUser;

	$scope.isClean = function() 
	{ 
		return angular.equals(originalUser, $scope.editUser); 
	}
	
	$scope.update = function() 
	{
		if ($scope.editUser.password == $scope.repassword)
		{
			UsersFactory.update({userId:$stateParams.userId}, $scope.editUser, function() 
			{
				$location.path('/users');
			});
		}
		else
		{
			alert('Введенные пароли не совпадают');
			$scope.editUser.password = "";
			$scope.repassword = "";
		}
	};
}