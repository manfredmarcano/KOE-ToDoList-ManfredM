app.controller('tableroController', function($http, $scope, $rootScope, $transition$) {
	$scope.tablero = {};
	$scope.tickets = [];

	function getTableroTickets () {
		$http({
            method: 'GET',
            url: $rootScope.url+'api/tablero/'+$transition$.params().tableroId+'/ticket'
        }).then(function(response) {
            console.log(response.data);
            $scope.tickets = response.data;
        });
	};

	$http({
            method: 'GET',
            url: $rootScope.url+'api/tablero/'+$transition$.params().tableroId
        }).then(function(response) {
            console.log(response.data);
            $scope.tablero = response.data;

            getTableroTickets(response.data.id);
        });
});