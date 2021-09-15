const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: 'pf-web-app',
});

module.exports = logger;
