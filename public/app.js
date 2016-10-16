angular.module('MyApp', ['ngResource','chart.js','ngMessages', 'ngRoute', 'mgcrea.ngStrap'])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/listEmploye.html',
        controller: 'MainCtrl'
      })
      .when('/add/employee', {
        templateUrl: 'views/addEmp.html',
        controller: 'AddCtrl'
      })
      .when('/edit/employee/:id', {
        templateUrl: 'views/editEmp.html',
        controller: 'EditCtrl'
      })
      .when('/d3', {
        templateUrl: 'views/ghraphe.html',
        controller: 'ChartCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
       
  });