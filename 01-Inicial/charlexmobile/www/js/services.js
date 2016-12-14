angular.module('app.services', ['ngResource'])

.config(['$resourceProvider', '$httpProvider',
function($resourceProvider, $httpProvider) {
  
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;

}])

.factory('Usuario', ['$resource', function($resource){
    return $resource('http://localhost:8000/api/usuario/:id/');
}])

.factory('Token', ['$resource', function($resource){
    return $resource('http://localhost:8000/api-token-auth/');
}])

.factory('Charla', ['$resource', function($resource){
    return $resource('http://localhost:8000/api/charla/:id/');
}])

.factory('Orador', ['$resource', function($resource){
    return $resource('http://localhost:8000/api/orador/:id/');
}])

.factory('UsuarioCharla', ['$resource', function($resource){
    return $resource('http://localhost:8000/api/usuariocharla/:id/');
}])

.factory('FotoCharla', ['$resource', function($resource){
    return $resource('http://localhost:8000/api/fotocharla/:id/');
}]);
