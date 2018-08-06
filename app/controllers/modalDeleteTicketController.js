app.controller('modalDeleteTicketController', function ($uibModalInstance, ticket, $http, $rootScope, updateTicketsListService) {
	
	var pc = this;
	pc.ticket = ticket;

	pc.ok = function () {
		$http({
            method: 'DELETE',
            url: $rootScope.url+'api/ticket/'+pc.ticket.id
        }).then(function(response) {
        	if (response.status == 200) {
	        	updateTicketsListService.setTicket(pc.ticket);
	        	$uibModalInstance.close();
        	};
        });
	};

	pc.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
   
});