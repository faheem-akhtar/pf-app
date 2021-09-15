const ddTrace = require('dd-trace');
const logger = require('./logger');

const isEnvDevelopment = require('./is-env-development');

const tracer = ddTrace.init({
  logInjection: true,
  logger: {
    info: (message) => logger.info(message),
    warn: (message) => logger.warn(message),
    debug: (message) => logger.trace(message),
    error: (err) => logger.error(err),
  },
  debug: isEnvDevelopment(),
});

global.console.log = (...args) => logger.info(...args);

const headersToRecord = [
  'host',
  'connection',
  'pragma',
  'cache-control',
  'sec-ch-ua',
  'sec-ch-ua-mobile',
  'upgrade-insecure-requests',
  'user-agent',
  'accept',
  'sec-fetch-site',
  'sec-fetch-mode',
  'sec-fetch-user',
  'sec-fetch-dest',
  'accept-encoding',
  'accept-language',
  'cookie',
  'x-akamai-device-characteristics',
];

tracer.use('http', {
  headers: headersToRecord,
  hooks: {
    request: (span, req, res) => {
      if (req.path) {
        span.setTag('req.path', req.path);
        logger.info(req.path);
      }
      if (req._header) {
        span.setTag('req._header', req._header);
        logger.info(req._header);
      }
      if (res && res._header) {
        span.setTag('res._header', res._header);
        logger.info(res._header);
      }
    },
  },
});

tracer.use('next', {
  headers: headersToRecord,
  hooks: {
    request: (span, req, res) => {
      span.setTag('req.url', req.url);
      span.setTag('req.cookies', req.cookies);
      span.setTag('res._header', res._header);
    },
  },
});
