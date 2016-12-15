angular.module('app.services', ['ngResource'])

.config(['$resourceProvider', '$httpProvider',
function($resourceProvider, $httpProvider) {
  
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;

  // Agrergar cabecera de Token si está disponible
  $httpProvider.interceptors.push(function($q, Sesion) {
    return {
        'request': function(config) {
            var token = Sesion.cargarSesion();
            if (token)
                config.headers['Authorization'] = 'Token ' + token;

            return config;
        }
    };
});

}])

.factory('Usuario', ['$resource', function($resource){
    return $resource('http://192.168.1.5:8000/api/usuario/:id/');
}])

.factory('Token', ['$resource', function($resource){
    return $resource('http://192.168.1.5:8000/api-token-auth/');
}])

.factory('Charla', ['$resource', function($resource){
    return $resource('http://192.168.1.5:8000/api/charla/:id/');
}])

.factory('Orador', ['$resource', function($resource){
    return $resource('http://192.168.1.5:8000/api/orador/:id/');
}])

.factory('UsuarioCharla', ['$resource', function($resource){
    return $resource('http://192.168.1.5:8000/api/usuariocharla/:id/');
}])

.factory('FotoCharla', ['$resource', function($resource){
    return $resource('http://192.168.1.5:8000/api/fotocharla/:id/');
}])

.service('Sesion', [function(){
    return {
        guardarSesion: function(token){
            localStorage.setItem('token', token);
        },
        cargarSesion: function(){
            return localStorage.getItem('token');
        },
        borrarSesion: function(){
            localStorage.removeItem('token');
        }
    }
}]);
