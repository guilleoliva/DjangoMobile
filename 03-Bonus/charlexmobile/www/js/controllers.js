angular.module('app.controllers', [])
  
.controller('charlasCtrl', ['$scope', '$state', '$stateParams', 'Sesion', 'Charla',
function ($scope, $state, $stateParams, Sesion, Charla) {
    // Variables públicas
    var ctrl = this;
    ctrl.charlas = [];

    // Funciones públicas
    ctrl.actualizar = actualizar;
    ctrl.logout = logout;

    // Declaraciones
    function actualizar(){
        ctrl.charlas = Charla.query();
        $scope.$broadcast('scroll.refreshComplete');
    }

    function logout(){
        Sesion.borrarSesion();
        $state.go('login');
    }

    // Inicialización
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        actualizar();
    });

}])
   
.controller('charlaCtrl', ['$scope', '$stateParams', '$cordovaCamera', 'Sesion', 'Charla', 'UsuarioCharla', 'FotoCharla',
function ($scope, $stateParams, $cordovaCamera, Sesion, Charla, UsuarioCharla, FotoCharla) {
    // Variables públicas
    var ctrl = this;
    ctrl.charla = {};
    ctrl.rating = null;
    ctrl.ratingOpciones = [
        { id: 0, label: '' },
        { id: 1, label: 'Horrible' },
        { id: 2, label: 'Mucho para mejorar' },
        { id: 3, label: 'Aprueba por poquito' },
        { id: 4, label: '¡Muy buena!' },
        { id: 5, label: 'Excelente' }
    ]
    ctrl.fotos = [];

    // Funciones públicas
    ctrl.registrar = registrar;
    ctrl.sacarFoto = sacarFoto;

    // Declaraciones
    function registrar() {
        var registro = new UsuarioCharla({
            charla: ctrl.charla.url,
            rating: (ctrl.rating ? ctrl.rating['id'] : null)
        });
        registro.$save()
        .then(function(){
            alert("¡Gracias por participar!");
            actualizarEstado();
        });
    }

    function actualizarEstado() {
        UsuarioCharla.query({charla: ctrl.charla.id, solo_yo: true}, function(registro){
            if (registro.length) {
                ctrl.usuarioVa = true;
                if (registro[0].rating)
                    ctrl.rating = ctrl.ratingOpciones[registro[0].rating];
            }
            else {
                ctrl.usuarioVa = false;
                ctrl.rating = null;
            }
        });

        FotoCharla.query({charla: ctrl.charla.id}, function(fotos){
            ctrl.fotos = fotos;
        });
    }

    function sacarFoto() {
        var options = {
            quality: 90,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 800,
            targetHeight: 600,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        $cordovaCamera.getPicture(options)
        .then(function(imagen) {
            var foto = new FotoCharla({
                charla: ctrl.charla.url,
                foto: imagen
            });
            foto.$save()
            .then(function(){
                alert("¡Gracias por la foto!");
                actualizarEstado();
            }, function(err){
                alert("Ups! Algo salió mal");
            });
        }, function(err) {
            alert("Error al abrir la cámara");
        });
    }
    
    // Inicialización

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;

        var oId = $stateParams['id'];
        Charla.get({id: oId}, function(charla) {
            ctrl.charla = charla;
            actualizarEstado();
        });
    });
}])
   
.controller('oradoresCtrl', ['$scope', '$stateParams', 'Orador',
function ($scope, $stateParams, Orador) {
    // Variables públicas
    var ctrl = this;
    ctrl.oradores = [];

    // Funciones públicas
    ctrl.actualizar = actualizar;

    // Declaraciones
    function actualizar(){
        ctrl.oradores = Orador.query();
        $scope.$broadcast('scroll.refreshComplete');
    }

    // Inicialización
    actualizar();

}])
      
.controller('oradorCtrl', ['$scope', '$stateParams', 'Orador', 'Charla',
function ($scope, $stateParams, Orador, Charla) {
    // Variables públicas
    var ctrl = this;
    ctrl.orador = {};
    ctrl.charlas = [];
    
    // Inicialización
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;

        var oId = $stateParams['id'];
        Orador.get({id: oId}, function(orador) {
            ctrl.orador = orador;
            Charla.query({orador: ctrl.orador.id}, function(charlas){
                ctrl.charlas = charlas;
            });
        });
    });

}])

.controller('signupCtrl', ['$scope', '$state', '$stateParams', 'Usuario',
function ($scope, $state, $stateParams, Usuario) {
    // Variables públicas
    var ctrl = this;
    ctrl.usuario = '';
    ctrl.password = '';
    ctrl.passwordRepite = '';
    ctrl.nombre = '';

    // funciones públicas
    ctrl.agregarUsuario = agregarUsuario;

    // Declaraciones
    function agregarUsuario(){
        if (ctrl.password != ctrl.passwordRepite) {
            alert("Las contraseñas no coinciden");
            return;
        }
        usuario = new Usuario({
            username: ctrl.usuario,
            password: ctrl.password,
            first_name: ctrl.nombre
        });
        usuario.$save()
        .then(function(){
            $state.go('login');
        }, function(fail){
            alert("Ups! Algo salió mal");
        });
    }

}])
   
.controller('loginCtrl', ['$scope', '$state', '$stateParams', 'Token', 'Sesion',
function ($scope, $state, $stateParams, Token, Sesion) {
    // Variables públicas
    var ctrl = this;
    ctrl.usuario = '';
    ctrl.password = '';

    // funciones públicas
    ctrl.validarUsuario = validarUsuario;

    // Declaraciones
    function validarUsuario(){
        usuario = new Token({
            username: ctrl.usuario,
            password: ctrl.password
        });
        usuario.$save()
        .then(function(token){
            Sesion.guardarSesion(token.token);
            $state.go('tabsController.charlas');
        }, function(fail){
            alert("Ups! Algo salió mal");
        });
    }

    // Inicialización

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        if (Sesion.cargarSesion())
            $state.go('tabsController.charlas');
    });

}]);
