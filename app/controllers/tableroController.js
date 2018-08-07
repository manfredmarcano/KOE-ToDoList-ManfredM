app.controller('tableroController', function($http, $scope, $rootScope, $transition$, $uibModal, $document, updateTicketsListService, $filter, $state, $log, $timeout) {
	$scope.tablero = {};
	$scope.tickets = []; $scope.auxTickets = [];
	$scope.showView = false;
	$scope.filtros = {
		estado: "0",
		fecha: "0"
	};

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
			$scope.filtros.estado = "0";
			$scope.filtros.fecha = "0";
			$scope.tickets = angular.copy( $scope.auxTickets );
	
			$timeout(function() {
				$scope.$apply(function(){
					$scope.tickets.push( updateTicketsListService.getTicket() );
				});
			});
			
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

			/*
			$scope.filtros.estado = "0";
			$scope.filtros.fecha = "0";
			$scope.tickets = angular.copy( $scope.auxTickets );
			*/
			$timeout(function() {
				$scope.$apply(function(){
					$scope.auxTickets = angular.copy($scope.tickets);
				});
			});
			

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

			/*
			$scope.filtros.estado = "0";
			$scope.filtros.fecha = "0";
			$scope.tickets = angular.copy( $scope.auxTickets );
			
			$timeout(function() {
				$scope.$apply(function(){
					getTableroTickets();
				});
			});
			*/

		}, function () {
		  	$log.info('Modal dismissed at: ' + new Date());
		});
	};

	function getTableroTickets () {
		$http({
            method: 'GET',
            url: $rootScope.url+'api/tablero/'+$transition$.params().tableroId+'/ticket'
        }).then(function(response) {
        	$(".lds-ripple").removeClass("show");
            console.log("Tickets:");
        	console.log(response.data);
            $scope.tickets = response.data;
            $scope.auxTickets = response.data;
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

	$(".lds-ripple").addClass("show");
	$http({
        method: 'GET',
        url: $rootScope.url+'api/tablero/'+$transition$.params().tableroId
    }).then(function(response) {
    	$scope.showView = true;
        $scope.tablero = response.data;
        getTableroTickets(response.data.id);
    }).catch(function(response){
    	$(".lds-ripple").removeClass("show");
    	//console.log("Error: ", response);
    	$state.go('home');
    });

    $scope.$watch('filtros', function (newVal, oldVal) {
    	if (typeof newVal != "undefined") {
    		if (!(newVal.estado == "0" && newVal.fecha == "0")) {
    			// Existe algún tipo de filtro
    			console.log("EXISTE FILTRO:");
    			//console.log()
    			$scope.tickets = angular.copy( $scope.auxTickets ); 


    			// Arreglar el array para poder filtrar luego
    			var original = angular.copy($scope.tickets);
				var arreglado = [];
				
				for (var i=0; i<original.length; i++) {
					var arrAux = {};
					arrAux = $scope.getLastDate(original[i].estatus); // {}
					original[i].estatus = [];
					original[i].estatus.push( arrAux );
					arreglado.push(original[i]);
				}
				
    			if (newVal.estado != "0" && newVal.fecha == "0") {
    				var query = { estatus: { name: "" } };
    				switch (newVal.estado) {
    					case "1": // Pendiente
    						query.estatus.name = "Pendiente";
    					break;
    					case "2": // Trabajando
    						query.estatus.name = "Trabajando";
    					break;
    					case "3": // Completado
    						query.estatus.name = "Completado";
    					break;
    					default:
    						alert("Error en switch");
    				}
    				//console.log("Filtrado:");
    				//console.log(arreglado);
    				//$scope.auxTickets = angular.copy( $scope.tickets );
    				//console.log( $filter('filter')(arreglado, query) );
    				$scope.tickets = $filter('filter')(arreglado, query);
    			} else if (newVal.estado == "0" && newVal.fecha != "0") {
    				var reverse = true;
    				switch (newVal.fecha) {
    					case "1": // ASC
    						reverse = false;
    					break;
    					case "2": // DESC
    						reverse = true;
    					break;
    					default:
    						alert("Error en switch");
    				}
    				//console.log($filter('orderBy')(arreglado, 'estatus[0].date', reverse));
    				$scope.tickets = $filter('orderBy')(arreglado, 'estatus[0].date', reverse);
    			} else if (newVal.estado != "0" && newVal.fecha != "0") {
    				var query = { estatus: { name: "" } };
    				switch (newVal.estado) {
    					case "1": // Pendiente
    						query.estatus.name = "Pendiente";
    					break;
    					case "2": // Trabajando
    						query.estatus.name = "Trabajando";
    					break;
    					case "3": // Completado
    						query.estatus.name = "Completado";
    					break;
    					default:
    						alert("Error en switch");
    				}
    				//$scope.tickets = $filter('filter')(arreglado, query);
    				var primerArreglo = $filter('filter')(arreglado, query);
    				var reverse = true;

    				switch (newVal.fecha) {
    					case "1": // ASC
    						reverse = false;
    					break;
    					case "2": // DESC
    						reverse = true;
    					break;
    					default:
    						alert("Error en switch");
    				}
    				//console.log($filter('orderBy')(arreglado, 'estatus[0].date', reverse));
    				$scope.tickets = $filter('orderBy')(primerArreglo, 'estatus[0].date', reverse);
    			}

    		} else {
    			// Sin filtro, array original
    			console.log("SIN FILTRO:");
    			$scope.tickets = angular.copy( $scope.auxTickets );
    		}
    	}
    }, true);
});