const ddTrace = require('dd-trace');
const serviceName = `pf-web-app-${process.env.NEXT_PUBLIC_COUNTRY_CODE}`;

const tracer = ddTrace.init({
  service: serviceName,
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
  'Referer',
];

function getResourceName(path) {
  const categoryRegex = `commercial|commercial-rent|commercial-buy|rent|buy|${encodeURI('للإجار')}|${encodeURI(
    'تجارية-للايجار'
  )}|${encodeURI('تجارية')}|${encodeURI('تجارية-للايجار')}|${encodeURI('للبيع')}|${encodeURI(
    'تجارية-للبيع'
  )}|${encodeURI('للايجار')}|${encodeURI('تجارية-للايجار')}|${encodeURI('تجاري')}`;
  const resourceName = path
    // Replace query string
    .replace(/\?.*/, '')
    // remove the extension
    .replace(/\.[a-z]{2,4}$/i, '')
    // Replace language and starting slash
    .replace(/^\/((en|ar|fr)\/)?/, '')
    // Replace slash with underscore
    .replace(/\//g, '_');

  return resourceName.match(new RegExp(`^(${categoryRegex})_.+`)) && !resourceName.match(/-\d{5,}$/)
    ? 'search_landing_page'
    : resourceName;
}

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
      if (req.body) {
        span.setTag('req.body', req.body);
      }
      if (req.query) {
        span.setTag('req.query', req.query);
      }
    },
  },
  client: {
    service: serviceName,
    hooks: {
      request: (span, req) => {
        if (!req.aborted || !req.destroyed) {
          span.setTag('resource.name', `${req.method} ${getResourceName(req.path)}`);
        }
      },
    },
  },
  server: {
    service: serviceName,
    hooks: {
      request: (span, req) => {
        span.setTag('resource.name', `${req.method} ${getResourceName(req.url)}`);
      },
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
