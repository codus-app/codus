/* eslint-disable no-console */

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: path.join(__dirname, 'src/app'),
    '': path.join(__dirname, 'src'), // Landing page
  },

  module: {
    rules: [
      // SASS files
      {
        test: /\.sass$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      // CSS files
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      // Vue template files
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          },
        },
      },
      // JavaScript files
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      // HTML files
      {
        test: /\.html$/,
        loaders: [
          'file-loader?name=[path][name].html&context=app',
          'extract-loader',
          'html-loader',
        ],
      },
      // Files that require no compilation or processing
      {
        test: /\.(ttf|woff|woff2|eot|png|svg)/,
        loader: 'url-loader',
        query: { limit: 10000, name: '[path][name].[ext]', context: 'app' },
      },
    ],
  },

  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name]/index.js',
  },

  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },


  // --------------------------------------------------------------------------


  devServer: {
    contentBase: path.join(__dirname, 'app'),
    historyApiFallback: true,
    noInfo: true,
    host: '0.0.0.0',
    disableHostCheck: true,
  },
};

// Custom settings for Cloud9
// detected by presence of C9_HOSTNAME environment variable
const isC9 = Boolean(process.env.C9_HOSTNAME);
// Default to not dev server if not running from command line
const isDevServer = process.argv[1] ? process.argv[1].indexOf('webpack-dev-server') !== -1 : false;

if (isC9) {
  console.log('Detected Cloud9');
  if (isDevServer) console.log(`Preview at http://${process.env.C9_HOSTNAME}`);
  module.exports.devServer.port = process.env.PORT;
  module.exports.devServer.host = process.env.IP;
}

// Custom settings for production
// detected when building in a path that begins with '/var/www'
if (__dirname.startsWith('/var/www')) {
  console.log('Production detected');
  module.exports.plugins = module.exports.plugins.concat([
    // Minify JS
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
    // Tell Vue to use production mode
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    // Let all loaders know they can minimize output
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]);
}
