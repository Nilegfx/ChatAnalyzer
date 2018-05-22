const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const CopyWebpackPlugin    = require( 'copy-webpack-plugin' );
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: 'eval',
  entry: [
    'font-awesome/scss/font-awesome.scss',
    './client/css/main.scss',
    './client/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: 'build/', // Relative directory for base of server
    publicPath: '/',
    inline: true,
    port: process.env.PORT || 3000, // Port Number
    host: '127.0.0.1', // Change to '0.0.0.0' for external facing server
    historyApiFallback: true,
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'moment': 'moment'
    }),
    new MiniCssExtractPlugin('main.css'),
    new CopyWebpackPlugin( [ { from: 'client/index.html' },{ from: 'client/images', to: 'images' } ], { ignore: [ '.DS_Store' ] } ),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new BundleAnalyzerPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?name=images/[name].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      },
      // font-awesome
      {
        test: /font-awesome\.config\.js/,
        use: [
          { loader: 'style-loader' },
          { loader: 'font-awesome-loader' }
        ]
      }
    ]
  }
};
