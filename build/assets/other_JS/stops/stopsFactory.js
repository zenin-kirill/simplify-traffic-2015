
appModule.factory('StopsFactory', ['$resource', function($resource)  
{
	return $resource('http://api.simplify-traffic.com/v1/stops/:stopId', 
	{
		stopId: "@stopId"
	},

	{
		'get': 
		{ 
			method:'GET',
			headers: { 'Token': '12345' }
		},

		'query': 
		{
			method: 'GET',
			isArray: true,
			headers: { 'Token': '12345' }
		},
		'save':
		{ 
			method:'POST',
			headers: { 'Token': '12345' }
		},
		'update':
		{
			method:'PUT',
			headers: { 'Token': '12345' }
		},
		'remove':
		{
			method:'DELETE',
			headers: { 'Token': '12345' }
		}
	});
}])