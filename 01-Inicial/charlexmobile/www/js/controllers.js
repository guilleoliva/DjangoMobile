angular.module('app.controllers', [])
  
.controller('charlasCtrl', ['$scope', '$state', '$stateParams', 'Charla',
function ($scope, $state, $stateParams, Charla) {
    // Variables públicas
    var ctrl = this;
    ctrl.charlas = [];

    // Funciones públicas
    ctrl.actualizar = actualizar;

    // Declaraciones
    function actualizar(){
        ctrl.charlas = Charla.query();
        $scope.$broadcast('scroll.refreshComplete');
    }

    // Inicialización
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        actualizar();
    });

}])
   
.controller('charlaCtrl', ['$scope', '$stateParams', '$cordovaCamera', 'Charla', 'UsuarioCharla', 'FotoCharla',
function ($scope, $stateParams, $cordovaCamera, Charla, UsuarioCharla, FotoCharla) {
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
    
    // Inicialización

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;

        var oId = $stateParams['id'];
        Charla.get({id: oId}, function(charla) {
            ctrl.charla = charla;
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
            Charla.query({}, function(charlas){
                ctrl.charlas = charlas;
            });
        });
    });

}])

.controller('signupCtrl', ['$scope', '$state', '$stateParams', 'Usuario',
function ($scope, $state, $stateParams, Usuario) {

}])
   
.controller('loginCtrl', ['$scope', '$state', '$stateParams', 'Token',
function ($scope, $state, $stateParams, Token) {
    $state.go('tabsController.charlas');
}]);
