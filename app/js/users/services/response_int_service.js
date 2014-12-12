'use strict';

module.exports = function(app) {
  app.factory('responseIntService', ['$q', '$location', function($q, $location) {
    return function(promise) {
      return promise.then(
        function(response) {
          return response;
        },

        function(response) {
          if (response.status === 401)
            $location.url('/users');
          return $q.reject(response);
        }
      );
    };
  }]);
};
