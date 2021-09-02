const express = require('express');
const next = require('next');
const ddTrace = require('dd-trace');
const { default: tracingMiddleware } = require('express-opentracing');

const isEnvDev = process.env.NODE_ENV === 'development';

const [PORT] = process.argv.slice(3);

const datadogTracer = ddTrace.init();

const app = next({ dev: isEnvDev });

const handle = app.getRequestHandler();

(async () => {
  console.info('Initializing nextJS server');
  await app.prepare();
  const server = express();
  server.all('*', handle);
  server.listen(PORT, () => {
    console.info(`nextJS server is ready at ${PORT} port`);
  });
  server.use(tracingMiddleware({ tracer: datadogTracer }));
})();
