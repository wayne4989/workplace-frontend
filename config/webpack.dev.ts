import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as OpenBrowserPlugin from 'open-browser-webpack-plugin';
let commonConfig = require('./webpack.common.ts');
let helpers = require('./helper.ts');

module.exports = webpackMerge(commonConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new OpenBrowserPlugin({
      port: 4200,
      url: 'http://localhost:4200'
    }), /* it opens default browser */
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'PEERSVIEW_API': JSON.stringify(process.env.PEERSVIEW_API)
      }
    })
  ],
  devServer: {
    watchOptions: {
      ignored: /node_modules/
    },
    historyApiFallback: true,
    stats: 'minimal',
    overlay: true
  }
});
