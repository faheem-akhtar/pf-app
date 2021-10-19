const ddTrace = require('dd-trace');

const tracer = ddTrace.init({
  logInjection: true,
  debug: false,
});

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
      }
      if (req._header) {
        span.setTag('req._header', req._header);
      }
      if (res && res._header) {
        span.setTag('res._header', res._header);
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
