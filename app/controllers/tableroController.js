app.service('updateTicketsListService', function(){
    var ticket = {};

    this.getTicket = function() {
        return ticket;
    };

    this.setTicket = function(newTicket) {
        ticket = newTicket;
    };
});


app.controller('tableroController', function($http, $scope, $rootScope, $transition$, $uibModal, $document, updateTicketsListService) {
	$scope.tablero = {};
	$scope.tickets = [];
	



	//var pc = this;
	//$scope.data = "Lorem Name Test"; 

	$scope.open = function (size) {
		var modalInstance = $uibModal.open({
		  animation: true,
		  ariaLabelledBy: 'modal-title',
		  ariaDescribedBy: 'modal-body',
		  templateUrl: 'app/views/addTicketModal.html',
		  controller: 'modalAddTicketController',
		  controllerAs: 'pc',
		  size: size,
		  resolve: {
		    tableroId: function () {
		      return $transition$.params().tableroId;
		    }
		  }
		});

		
		modalInstance.result.then(function () {
			//alert("now I'll close the modal");
			$scope.tickets.push( updateTicketsListService.getTicket() );
		});
		
	};









	function getTableroTickets () {
		$http({
            method: 'GET',
            url: $rootScope.url+'api/tablero/'+$transition$.params().tableroId+'/ticket'
        }).then(function(response) {
            console.log(response.data);
            $scope.tickets = response.data;
        });
	};

	$scope.getLastDate = function (estatus) {

		var last = estatus.sort(function(a,b) {
			return new Date(b.date) - new Date(a.date);
		});

		console.log("LAST:");
		console.log(last);

		return last[0].color;
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