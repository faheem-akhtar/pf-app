require('./logger');
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const isEnvDevelopment = require('./is-env-development');

const [PORT] = process.argv.slice(3);

const app = next({ dev: isEnvDevelopment() });
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

require('./init-datadog');
