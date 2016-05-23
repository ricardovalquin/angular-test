'use strict';

var angularTest = angular.module('angularTest', [
  'ui.router'
]);

angularTest.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider

  .state('home', {
    url: '/home',
    templateUrl: 'components/dashboard/dashboard.html'
  })
  .state('profile', {
    url: '/profile',
    templateUrl: 'components/profile/profile.html'
  });
});