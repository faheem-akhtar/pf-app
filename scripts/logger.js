const winston = require('winston');
const ENABLE_NATIVE_LOGGING = process.env.NODE_ENV !== 'production';

class Console extends winston.transports.Console {
  log(info, callback) {
    if (!ENABLE_NATIVE_LOGGING) {
      super.log(info, callback);
      return;
    }
  }
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.errors({ stack: true }), winston.format.splat(), winston.format.json()),
  transports: [
    new Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
      handleExceptions: true,
    }),
  ],
});

['log', 'warn', 'error', 'info'].forEach((method) => {
  const native = console[method].bind(console);

  global.console[method] = function (...args) {
    const [firstArgument, ...rest] = args;
    const isFirstArgumentString = typeof firstArgument === 'string';
    const message = [isFirstArgumentString ? firstArgument : 'Generic'];

    if (ENABLE_NATIVE_LOGGING) {
      native(...args);
    }

    const messageContext = (isFirstArgumentString ? rest : args).reduce((acc, arg) => {
      if (Array.isArray(arg)) {
        acc['payload'] = arg;
      } else if (typeof arg === 'object') {
        return { ...acc, ...arg };
      } else {
        message.push(arg);
      }
      return acc;
    }, {});

    logger.log({
      level: method === 'log' ? 'info' : method,
      message: message.join(' '),
      ...messageContext,
    });
  };
});
