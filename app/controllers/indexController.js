app.controller('indexController', function($http, $scope, $rootScope, sessionService) {
    this.mensaje = "Hola Angular, soy Manfred!";
    $scope.tableros = [];
    $scope.status = [];

    $scope.getUsername = function (data) {
        $http({
            method: 'GET',
            url: $rootScope.url+'api/user'
        }).then(function(response) {
            console.log(response);
        });
    };

    $scope.getTableros = function (data) {
        $http({
            method: 'GET',
            url: $rootScope.url+'api/tablero'
        }).then(function(response) {
            console.log(response.data);
            $scope.tableros = response.data;
        });
    };

    $scope.getStatus = function (data) {
        $http({
            method: 'GET',
            url: $rootScope.url+'api/status'
        }).then(function(response) {
            //console.log(response.data);
            $scope.status = response.data;
        });
    };

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
        $scope.getStatus();
    });

});