const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const ddTrace = require('dd-trace');

const isEnvDev = process.env.NODE_ENV === 'development';
const [PORT] = process.argv.slice(3);

const datadogTracer = ddTrace.init();
const app = next({ dev: isEnvDev });
const handle = app.getRequestHandler();

console.info('Initializing nextJS server');
app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);

    handle(req, res, parsedUrl);
  }).listen(PORT, (err) => {
    if (err) throw err;
    console.info(`nextJS server is ready at ${PORT} port`);
  });
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

datadogTracer.use('http', {
  headers: headersToRecord,
  hooks: {
    request: (span, req) => {
      if (req.path) {
        span.setTag('req.path', req.path);
      }
      if (req._header) {
        span.setTag('req._header', req._header);
      }
    },
  },
});

datadogTracer.use('next', {
  headers: headersToRecord,
  hooks: {
    request: (span, req) => {
      span.setTag('req.url', req.url);
      span.setTag('req.cookies', req.cookies);
    },
  },
});
