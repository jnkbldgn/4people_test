/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const express = require('express');
const compression = require('compression');
const routes = require('./routes');
const eventSources = require('./eventSources');
const pathUtils = require('./utils/path');

const { PORT = 8080, NODE_ENV = 'production' } = process.env;
const isProd = NODE_ENV === 'production';

const app = express();

if (isProd) {
  app.use(compression());
} else {
  const devServerInit = require('./devServer');
  devServerInit(app);
}

app.get('/favicon.ico', (req, res) => res.status(200));

app.use('/static', express.static(pathUtils.rootResolve('./dist/static')));
app.use('/event', eventSources);
app.use(routes);

app.use((err, req, res) => {
  console.error(err);
  res.status(err.status || 500).send('Error');
});

app.listen(PORT, () => console.info(`app listening at http://localhost:${PORT}`));
