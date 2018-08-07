var app = angular.module('koeToDoListApp', [
    'ui.bootstrap',
    'ui.router'
]);
 
app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'app/views/home.html',
            controller: 'indexController'
        })
        .state('tablero', {
            url: '/tablero/{tableroId}',
            templateUrl: 'app/views/tablero.html',
            controller: 'tableroController'
        });
});
 
app.run(function($rootScope, $http, sessionService) {
    $rootScope.url = 'http://todolist.koeonline.net/';
});


