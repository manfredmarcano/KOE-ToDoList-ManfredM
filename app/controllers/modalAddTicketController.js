app.controller('modalAddTicketController', function ($uibModalInstance, tableroId, $http, $rootScope, $scope, updateTicketsListService) {
	
	var pc = this;
	pc.tableroId = tableroId;
	pc.status = [];

	$scope.newTicket = {
		title: "",
		description: "",
		estimatedTime: "",
		statusSelected: {}
	};
	//$scope.statusSelected = {};

	pc.ok = function () {
		$(".lds-ripple").addClass("show");
		$http({
            method: 'POST',
            data: {
            	title: $scope.newTicket.title,
            	description: $scope.newTicket.description,
            	estimatedTime: $scope.newTicket.estimatedTime,
            	idStatus: $scope.newTicket.statusSelected.id
            },
            url: $rootScope.url+'api/tablero/'+pc.tableroId+'/ticket'
        }).then(function(response) {
        	$(".lds-ripple").removeClass("show");


        	if (response.status == 200) {
        		$http({
		            method: 'GET',
		            url: $rootScope.url+'api/ticket/'+response.data
		        }).then(function(response) {
		        	//console.log("Ticket recién creado: ", response.data);
		        	updateTicketsListService.setTicket(response.data);
		        	$uibModalInstance.close();
		        });
        	}

            //console.log(response.data);
            //$scope.tablero = response.data;
            //getTableroTickets(response.data.id);
            
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
        console.log(response.data);
        pc.status = response.data;
        $scope.newTicket.statusSelected = response.data[0];
    });
   

});