app.controller('indexController', function($http, $scope, $rootScope, sessionService) {
    this.mensaje = "Hola Angular, soy Manfred!";


    $scope.getUsername = function (data) {
        $http({
            method: 'GET',
            url: $rootScope.url+'api/user'
        }).then(function(response) {
            console.log(response);
        });
    };


    $http({
        method: 'POST',
        //url: 'http://todolist.koeonline.net/token',
        url: $rootScope.url+'token',
        //data: dataToken,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },     
        data: {grant_type: 'password', username: 'Manfred', password: 'bq3fiyg9d83'}
    }).then(function(response) {
        console.log(response);
        sessionService.set(response.data.access_token);
        $http.defaults.headers.common.Authorization = 'Bearer '+sessionService.get();
        //$httpProvider.interceptors.push('httpRequestInterceptor');
        $scope.getUsername();
    });


});