app.controller('indexController', function($http, $scope, $rootScope, sessionService) {
    $scope.tableros = [];

    $scope.getUsername = function () {
        $http({
            method: 'GET',
            url: $rootScope.url+'api/user'
        }).then(function(response) {
            //console.log(response);
        });
    };

    $scope.getTableros = function () {
        $http({
            method: 'GET',
            url: $rootScope.url+'api/tablero'
        }).then(function(response) {
            //console.log(response.data);
            $scope.tableros = response.data;
            $(".lds-ripple").removeClass("show");
        });
    };

    $(".lds-ripple").addClass("show");
    $http({
        method: 'POST',
        url: $rootScope.url+'token',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },     
        data: {grant_type: 'password', username: 'Manfred', password: 'bq3fiyg9d83'}
    }).then(function(response) {
        sessionService.set(response.data.access_token);
        $http.defaults.headers.common.Authorization = 'Bearer '+sessionService.get();
        $scope.getUsername();
        $scope.getTableros();
        //$scope.getStatus();
    });

});