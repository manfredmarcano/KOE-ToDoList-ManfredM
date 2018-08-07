app.controller('tableroController', function($http, $scope, $rootScope, $transition$, $uibModal, $document, updateTicketsListService, $filter, $state, $log) {
	$scope.tablero = {};
	$scope.tickets = [];
	$scope.showView = false;

	$scope.openTicketCreationModal = function (size) {
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
			$scope.tickets.push( updateTicketsListService.getTicket() );
		}, function () {
		  	$log.info('Modal dismissed at: ' + new Date());
		});
	};

	$scope.openTicketEliminationModal = function (size, ticket) {
		var modalInstance = $uibModal.open({
		  animation: true,
		  ariaLabelledBy: 'modal-title',
		  ariaDescribedBy: 'modal-body',
		  templateUrl: 'app/views/deleteTicketModal.html',
		  controller: 'modalDeleteTicketController',
		  controllerAs: 'pc',
		  size: size,
		  resolve: {
		    ticket: function () {
		      return ticket;
		    }
		  }
		});

		modalInstance.result.then(function () {
			$scope.tickets = $filter('filter')($scope.tickets, function(value, index) {return value.id !== updateTicketsListService.getTicket().id;});
		}, function () {
		  	$log.info('Modal dismissed at: ' + new Date());
		});
	};

	$scope.openTicketUpdateModal = function (size, ticket) {
		var modalInstance = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'app/views/updateTicketModal.html',
			controller: 'modalUpdateTicketController',
			controllerAs: 'pc',
			size: size,
			resolve: {
				ticket: function () {
			  		return ticket;
				}
			}
		});

		modalInstance.result.then(function () {
			getTableroTickets();
		}, function () {
		  	$log.info('Modal dismissed at: ' + new Date());
		});
	};

	function getTableroTickets () {
		$http({
            method: 'GET',
            url: $rootScope.url+'api/tablero/'+$transition$.params().tableroId+'/ticket'
        }).then(function(response) {
            console.log("Tickets:");
        	console.log(response.data);
            $scope.tickets = response.data;
        });
	};

	$scope.getLastDate = function (estatus) {
		var last = estatus[0];
		for (var i=1; i<estatus.length; i++) {
			if (estatus[i].date > last.date) {
				last = estatus[i];
			}
		}
		return last;
	};

	$http({
        method: 'GET',
        url: $rootScope.url+'api/tablero/'+$transition$.params().tableroId
    }).then(function(response) {
    	$scope.showView = true;
        $scope.tablero = response.data;
        getTableroTickets(response.data.id);
    }).catch(function(response){
    	//console.log("Error: ", response);
    	$state.go('home');
    });
});