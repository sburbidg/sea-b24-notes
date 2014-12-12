'use strict';

module.exports = function(app) {
  require('./services/response_int_service')(app);
  require('./directives/logout_directive')(app);
  require('./controllers/users_controller')(app);
};
