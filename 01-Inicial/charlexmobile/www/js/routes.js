angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    .state('tabsController.charlas', {
        url: '/charlas',
        views: {
            'tab1': {
                templateUrl: 'templates/charlas.html',
                controller: 'charlasCtrl',
                controllerAs: 'ctrl'
            }
        }
    })

    .state('tabsController.oradores', {
        url: '/oradores',
        views: {
            'tab3': {
                templateUrl: 'templates/oradores.html',
                controller: 'oradoresCtrl',
                controllerAs: 'ctrl'
            }
        }
    })

    .state('tabsController', {
        url: '/page1',
        templateUrl: 'templates/tabsController.html',
        abstract: true
    })

    .state('charla', {
        url: '/charla/:id',
        templateUrl: 'templates/charla.html',
        controller: 'charlaCtrl',
        controllerAs: 'ctrl'
    })

    .state('orador', {
        url: '/orador/:id',
        templateUrl: 'templates/orador.html',
        controller: 'oradorCtrl',
        controllerAs: 'ctrl'
    })

    .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl',
        controllerAs: 'ctrl'
    })

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl',
        controllerAs: 'ctrl'
    })



    $urlRouterProvider.otherwise('/login')



});