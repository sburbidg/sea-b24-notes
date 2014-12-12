'use strict';

module.exports = function(app) {
  app.directive('logoutButton', function(){
    return {
      restrict: 'EAC',
      replace: true,
      template: '<button data-ng-click="logout()">Logout</button>'

    };
  });
};
