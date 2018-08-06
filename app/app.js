var app = angular.module('koeToDoListApp', [
    
]);
 
app.config([function () {
    //Bloque config para configurar el resto de cosas que no son las rutas.
}]);
 
app.run(function($rootScope) {
    $rootScope.url = 'http://todolist.koeonline.net/';
});