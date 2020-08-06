/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const express = require('express');
const routes = require('./routes');
const api = require('./api');
const pathUtils = require('./utils/path');
const devServerInit = require('./devServer');

const { PORT = 8080, NODE_ENV = 'production' } = process.env;
const isProd = NODE_ENV === 'production';

const app = express();

if (isProd) {
  app.use(express.compress());
} else {
  devServerInit(app);
}

app.use('/static', express.static(pathUtils.rootResolve('./dist/static')));
app.use('/api/v1', api);
app.use(routes);

app.listen(PORT, () => console.info(`app listening at http://localhost:${PORT}`));
