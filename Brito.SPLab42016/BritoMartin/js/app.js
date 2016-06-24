var app = angular.module('MyFinalWeb', ['ui.router','MyFinalWeb.MyController','angularFileUpload','satellizer']);

app.config(function($stateProvider, $urlRouterProvider, $authProvider) {


  $authProvider.loginUrl = '../2parcial/2ParcialServices/PHP/clases/autentificador.php';
  $authProvider.signupUrl = 'PHP/clases/autentificador.php';
  $authProvider.tokenName = 'tokenMed';
  $authProvider.tokenPrefix = 'Medical_Care';
  $authProvider.authHeader = 'Data';
  //$authProvider.authToken = 'Bearer';


  $stateProvider

.state('login', {
    views: {
      'principal': { templateUrl: 'templates/login.html',controller: 'loginCtrl' },
      'menuSuperior': {templateUrl: 'templates/menuSup.html',controller: 'loginCtrl'}
    },
    url:'/login'
  })

.state('menu', {
    views: {
      'principal': { templateUrl: 'templates/menu.html',controller: 'menuCtrl' },
      'menuSuperior': {templateUrl: 'templates/menuSup.html',controller: 'menuCtrl'},
      'logout': {templateUrl: 'templates/logout.html', controller: 'logoutCtrl'}
    },
    url:'/menu'
  })
.state('registroTurnos', {
    views: {
      'principal': { templateUrl: 'templates/menuAdmin.html',controller: 'menuAdminCtrl' },
      'menuSuperior': {templateUrl: 'templates/menuSup.html',controller: 'menuCtrl'},
      'logout': {templateUrl: 'templates/logout.html', controller: 'logoutCtrl'}
    },
    url:'/registroTurnos'
  })
  .state('gestionDeUsuarios', {
    url: '/gestionDeUsuarios',
    views: {
      'principal': { templateUrl: 'templates/gestionDeUsuarios.html',controller: 'gestionDeUsuariosCtrl' },
      'menuSuperior': {templateUrl: 'templates/menuSup.html',controller: 'menuCtrl'},
      'logout': {templateUrl: 'templates/logout.html', controller: 'logoutCtrl'}
    }
  })

    .state('grilla', {
    url: '/grilla',
    views: {
      'principal': { templateUrl: 'templates/templateGrilla.html',controller: 'templateGrillaCtrl' },
      'menuSuperior': {templateUrl: 'templates/menuSup.html',controller: 'menuCtrl'},
      'logout': {templateUrl: 'templates/logout.html', controller: 'logoutCtrl'}
    }
  })
    .state('grillaProductos', {
    url: '/grillaProductos',
    views: {
      'principal': { templateUrl: 'templates/templateGrillaProductos.html',controller: 'templateGrillaProductosCtrl' },
      'menuSuperior': {templateUrl: 'templates/menuSup.html',controller: 'menuCtrl'},
      'logout': {templateUrl: 'templates/logout.html', controller: 'logoutCtrl'}
    }
  })
       .state('grillaUsuarios', {
    url: '/grillaUsuarios',
    views: {
      'principal': { templateUrl: 'templates/templateGrillaUsuarios.html',controller: 'templateGrillaUsuariosCtrl' },
      'menuSuperior': {templateUrl: 'templates/menuSup.html',controller: 'menuCtrl'},
      'logout': {templateUrl: 'templates/logout.html', controller: 'logoutCtrl'}
    }
  })
  .state('modificar', {
    url: '/modificar/{:id}?:nombre:apellido:dni:foto',
    views: {
      'principal': { templateUrl: 'templates/templateAlta.html',controller: 'templateModificarCtrl' },
      'menuSuperior': {templateUrl: 'templates/menuSup.html',controller: 'menuCtrl'},
      'logout': {templateUrl: 'templates/logout.html', controller: 'logoutCtrl'}
    }
  })
    .state('alta', {
    url: '/alta',
    views: {
      'principal': { templateUrl: 'templates/templateAlta.html',controller: 'templateAltaCtrl' },
      'menuSuperior': {templateUrl: 'templates/menuSup.html',controller: 'menuCtrl'},
      'logout': {templateUrl: 'templates/logout.html', controller: 'logoutCtrl'}
    }
  });



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
