/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-dynamic-require */
const webpack = require('webpack');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const pathUtils = require('./utils/path');

const webpackConfig = require(pathUtils.rootResolve('./client/config/webpack.config.js'));

module.exports = (app) => {
  webpackConfig.entry.app = [
    'webpack-hot-middleware/client',
    webpackConfig.entry.app,
  ];
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  );

  const compiler = webpack(webpackConfig);
  const devMiddleware = WebpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    writeToDisk: (filePath) => /index\.html$/.test(filePath),
  });
  const hotMiddleware = WebpackHotMiddleware(compiler);

  app.use(devMiddleware);
  app.use(hotMiddleware);

  return app;
};
