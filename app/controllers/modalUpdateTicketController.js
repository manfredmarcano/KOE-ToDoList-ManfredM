app.controller('modalUpdateTicketController', function ($uibModalInstance, ticket, $http, $rootScope, $scope, updateTicketsListService) {
	var pc = this;
	pc.ticket = angular.copy(ticket);
	pc.status = [];

	pc.ok = function () {
        $(".lds-ripple").addClass("show");
		$http({
            method: 'PUT',
            data: {
            	idStatus: pc.ticket.estatus.id
            },
            url: $rootScope.url+'api/ticket/'+pc.ticket.id
        }).then(function(response) {
            $(".lds-ripple").removeClass("show");
        	updateTicketsListService.setTicket(pc.ticket);
        	$uibModalInstance.close();
        });
	};

	pc.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
    
    $(".lds-ripple").addClass("show");
    $http({
        method: 'GET',
        url: $rootScope.url+'api/status'
    }).then(function(response) {
        $(".lds-ripple").removeClass("show");
        pc.status = response.data;
        pc.ticket.estatus = response.data[0];
    });
    
});