const express = require('express');

const app = express();

app.get('/pf-web-app/ping/', (req, res) => {
  res.send('OK');
});

app.listen(8080, () => {
  console.info('Server is up on 8080');
});
