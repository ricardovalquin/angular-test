'use strict';

angular.module('angularTest')
  .directive('headerSection', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/shared/header/header.html'
    };
});
