'use strict';

angular.module('angularTest')
  .directive('headerSection', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'shared/header/header.html'
    };
});
