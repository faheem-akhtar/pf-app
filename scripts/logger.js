const bunyan = require('bunyan');

const { info, error, warn, trace } = console;

const logger = bunyan.createLogger({
  name: 'pf-web-app',
  streams: [],
});

global.console.log = (...args) => {
  info(...args);
  logger.info(...args);
};

global.console.info = (...args) => {
  info(...args);
  logger.info(...args);
};
global.console.warn = (...args) => {
  warn(...args);
  logger.warn(...args);
};
global.console.debug = (...args) => {
  trace(...args);
  logger.trace(...args);
};
global.console.error = (...args) => {
  error(...args);
  logger.error(...args);
};

module.exports = logger;
