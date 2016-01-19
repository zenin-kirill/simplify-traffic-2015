
appModule.controller('newUserController', newUserController)

newUserController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'UsersFactory', 'CarriersFactory'];


function newUserController($scope, $stateParams, $state, $controller, $location, UsersFactory, CarriersFactory) 
{
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

	$scope.newUser = new UsersFactory();
	$scope.newUser.role = 'carrier';
         $scope.newUser.token = '333';// ВРЕМЕННО


         $scope.carriers = CarriersFactory.query(function(carriers)
         {
         	$scope.newUser.carrier_id = carriers[0].id;
         });
         

         $scope.save = function() 
         {
         	if ($scope.newUser.password == $scope.repassword)
         		UsersFactory.save($scope.newUser, function() 
         		{
         			$location.path('/users');
         		});
         	else
         	{
         		alert('Введенные пароли не совпадают');
         		$scope.newUser.password = "";
         		$scope.repassword = "";
         	}
         };
     }