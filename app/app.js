var app = angular.module('koeToDoListApp', [
    'ui.bootstrap',
    'ui.router'
]);
 
app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'app/views/home.html',
            controller: 'indexController'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('tablero', {
            // we'll get to this in a bit    
            url: '/tablero/{tableroId}',
            templateUrl: 'app/views/tablero.html',
            controller: 'tableroController'
        });

        

});
 
app.run(function($rootScope, $http, sessionService) {
    $rootScope.url = 'http://todolist.koeonline.net/';
});


