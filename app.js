'use strict';

var angularTest = angular.module('angularTest', [
  'ui.router'
]);

angularTest.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider

  .state('home', {
    url: '/home',
    templateUrl: '/app/components/dashboard/dashboard.html'
  })
  .state('profile', {
    url: '/profile',
    templateUrl: '/app/components/profile/profile.html'
  });
});