const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: 'pf-web-app',
});

global.console.log = (...args) => logger.info(...args);
global.console.info = (...args) => logger.info(...args);
global.console.warn = (...args) => logger.warn(...args);
global.console.debug = (...args) => logger.trace(...args);
global.console.error = (...args) => logger.error(...args);

module.exports = logger;
