/* eslint-disable no-console */

const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: path.join(__dirname, 'app/src'),
  },

  module: {
    loaders: [
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
          'file-loader?name=[name].html',
          'extract-loader',
          'html-loader',
        ],
      },
      // Files that require no compilation or processing
      {
        test: /\.(ttf|woff|woff2|eot|png|svg)/,
        loader: 'url-loader',
        query: { limit: 10000, name: '[name].[ext]' },
      },
    ],
  },

  output: {
    path: path.join(__dirname, 'app/build'),
    publicPath: '/build/',
    filename: 'index.js',
  },

  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common.js',
    },
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({ minimize: true, compress: { warnings: false } }),
    new CopyWebpackPlugin([{ from: 'app/src/favicons' }]),
  ],


  // --------------------------------------------------------------------------


  devServer: {
    contentBase: path.join(__dirname, 'app'),
    historyApiFallback: true,
    noInfo: true,
  },
};

if (process.env.C9_HOSTNAME) {
  console.log('Detected Cloud9');
  console.log(`Preview at ${process.env.C9_HOSTNAME}`);
  module.exports.devServer.port = process.env.PORT;
  module.exports.devServer.host = process.env.IP;
}
