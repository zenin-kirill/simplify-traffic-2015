
appModule.controller('editUserController', editUserController)

editUserController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'UsersFactory', 'CarriersFactory'];


function editUserController($scope, $stateParams, $state, $controller, $location, UsersFactory, CarriersFactory) 
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

	var originalUser = UsersFactory.get({userId: $stateParams.userId}, function(user)
	{
		$scope.carriers = CarriersFactory.query( function(carriers)
		{
			if (carriers[user.carrier_id] == undefined)
				user.carrier_id = carriers[0].id;
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