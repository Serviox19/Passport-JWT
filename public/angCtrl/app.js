var app = angular.module('myApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "partials/home.html",
      controller: ""
    })
    .state('register', {
      url: "/register",
      templateUrl: "partials/register.html",
      controller: ""
    })
    .state('login', {
      url: "/login",
      templateUrl: "partials/login.html",
      controller: ""
    })
    .state('dashboard', {
      url: "/dashboard",
      templateUrl: "partials/dashboard.html",
      controller: ""
    })
});
