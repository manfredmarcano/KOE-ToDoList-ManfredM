var app = angular.module('koeToDoListApp', [
    
]);
 
//Añade aquí las constantes  
/* 
app.config(['$routeProvider', function ($routeProvider) {
    //En este bloque config solo se configuran las rutas
 
    $routeProvider.when('/', {
        templateUrl: 'main.html',
        controller: 'MainController'
    });
 
    $routeProvider.otherwise({
        redirectTo: '/'
    });
}]);
*/
 
app.controller('indexCtrl', function($http, $scope, $rootScope) {
    this.mensaje = "Hola Angular, soy Manfred!";


    $scope.getUsername = function (data) {

        $http({
            method: 'GET',
            url: $rootScope.url+'api/user',
            headers: {'Authorization': 'Bearer '+data.data.access_token},
        }).then(function(response) {
            //console.log(response);
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

        $scope.getUsername(response);
    });


});

app.config([function () {
    //Bloque config para configurar el resto de cosas que no son las rutas.
}]);
 
app.run(function($rootScope) {
    $rootScope.url = 'http://todolist.koeonline.net/';
});