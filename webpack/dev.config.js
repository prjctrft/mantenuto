require('babel-polyfill');

// Webpack config for development
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var assetsPath = path.resolve(__dirname, '../static/dist');
var host = (process.env.HOST || 'localhost');
var port = (+process.env.PORT + 1) || 3001;
var helpers = require('./helpers');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

var babelrc = fs.readFileSync('./.babelrc');
var babelrcObject = {};

try {
  babelrcObject = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

// merge global and dev-only plugins
var combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

var babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, { plugins: combinedPlugins });
delete babelLoaderQuery.env;

var validDLLs = helpers.isValidDLLs(['vendor'], assetsPath);
if (process.env.WEBPACK_DLLS === '1' && !validDLLs) {
  process.env.WEBPACK_DLLS = '0';
  console.warn('webpack dlls disabled');
}

var webpackConfig = module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      'react-hot-loader/patch',
      'font-awesome-webpack!./src/theme/font-awesome.config.js',
      './src/client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/dist/'
  },
  module: {
    loaders: [
      {
        happy: { id: 'jsx' },
        test: /\.jsx?$/,
        loader: 'happypack/loader?id=jsx',
        include: [path.resolve(__dirname, '../src')]
      },
      {
        happy: { id: 'json' },
        test: /\.json$/,
        loader: 'happypack/loader?id=json',
        include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../')]
      },
      {
        happy: { id: 'less' },
        test: /\.less$/,
        loader: 'happypack/loader?id=less',
        include: [path.resolve(__dirname, '../src')]
      },
      // specially for theme/bootstrap.global.scss so compiled css is not module
      {
        happy: { id: 'globalSass' },
        test: /\.global.scss$/,
        loader: 'happypack/loader?id=globalSass',
        include: [path.resolve(__dirname, '../src')]
      },
      {
        happy: { id: 'sass' },
        test: /\.scss$/,
        exclude: /\.global.scss$/,
        loader: 'happypack/loader?id=sass',
        include: [path.resolve(__dirname, '../src')]
      },
      { test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url?limit=10240' }
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  plugins: [
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,  // <-------- DISABLE redux-devtools HERE
      __DLLS__: process.env.WEBPACK_DLLS === '1'
    }),
    webpackIsomorphicToolsPlugin.development(),

    helpers.createHappyPlugin('jsx', [
      'react-hot-loader/webpack',
      'babel?' + JSON.stringify(babelLoaderQuery),
      // 'eslint-loader'
    ]),
    helpers.createHappyPlugin('json', ['json']),
    helpers.createHappyPlugin('less', [
      'style',
      'css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]',
      'autoprefixer?browsers=last 2 version',
      'less?outputStyle=expanded&sourceMap'
    ]),
    helpers.createHappyPlugin('sass', [
      'style',
      'css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]',
      'autoprefixer?browsers=last 2 version',
      'sass?outputStyle=expanded&sourceMap'
    ]),
    helpers.createHappyPlugin('globalSass', [
      'style',
      'css?modules=false?importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]',
      'autoprefixer?browsers=last 2 version',
      'sass?outputStyle=expanded&sourceMap'
    ])
  ]
};

if (process.env.WEBPACK_DLLS === '1' && validDLLs) {
  helpers.installVendorDLL(webpackConfig, 'vendor');
}
