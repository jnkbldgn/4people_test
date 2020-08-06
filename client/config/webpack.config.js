const sass = require('sass');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const helpers = require('./helpers');

const isProd = process.env.NODE_ENV === 'production';
const mode = isProd ? 'production' : 'development';

const entry = {
  app: helpers.appDirResolve('./index.js'),
};

const output = {
  filename: isProd ? '[name].[contenthash:8].js' : '[name].js',
  publicPath: '/static/',
  path: helpers.rootDirResolve('./dist/static/'),
};

const optimization = {
  minimize: isProd,
  minimizer: [
    new TerserPlugin({
      parallel: 4,
    }),
  ],
  splitChunks: {
    chunks: 'all',
    minSize: 100000,
    maxSize: 250000,
  },
};

const loaderMCEP = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    hmr: !isProd,
  },
};

const loaderSass = {
  loader: 'sass-loader',
  options: {
    implementation: sass,
  },
};

const rules = [
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      productionMode: isProd,
      compilerOptions: {
        preserveWhitespace: false,
      },
    },
  },
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /[\\/]node_modules[\\/]/,
  },
  {
    test: /\.s[ca]ss$/,
    use: [
      'vue-style-loader',
      loaderMCEP,
      'css-loader',
      loaderSass,
    ],
  },
  {
    resourceQuery: /blockType=i18n/,
    type: 'javascript/auto',
    loader: '@intlify/vue-i18n-loader',
  },
];

const alias = {
  '@': helpers.appDirResolve('.'),
  Plugins: helpers.appDirResolve('./plugins'),
  Components: helpers.appDirResolve('./components'),
  Views: helpers.appDirResolve('./views'),
  Api: helpers.appDirResolve('./api'),
  Store: helpers.appDirResolve('./store'),
  I18n: helpers.appDirResolve('./i18n'),
  Models: helpers.appDirResolve('./models'),
};

const plugins = [
  new VueLoaderPlugin(),
  new VuetifyLoaderPlugin(),
  new HtmlWebpackPlugin({
    filename: helpers.rootDirResolve('./dist/index.html'),
    template: helpers.appDirResolve('./index.html'),
    title: '4People_test',
  }),
  new MiniCssExtractPlugin({
    filename: isProd ? '[name].[contenthash:8].css' : '[name].css',
    chunkFilename: isProd ? '[name].[contenthash:8].css' : '[name].css',
  }),
  new SimpleProgressWebpackPlugin({
    format: 'minimal',
  }),
];

const stats = {
  all: false,
  entrypoints: false,
  performance: false,
  errors: true,
  warnings: true,
  colors: true,
};

module.exports = {
  entry,
  optimization,
  mode,
  module: {
    rules,
  },
  resolve: {
    alias,
  },
  plugins,
  stats,
  devtool: isProd ? false : 'source-map',
  output,
};
