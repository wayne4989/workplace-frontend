import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import * as OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as autoprefixer from 'autoprefixer';
let commonConfig = require('./webpack.common.ts');
let helpers = require('./helper.ts');

module.exports = webpackMerge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[name].[hash].chunk.js',
    globalObject: 'this'
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        // sourceMap: true, // set to true if you want JS source maps
        uglifyOptions: {
          output: {
            comments: false
          },
          mangle: {
            keep_fnames: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'PEERSVIEW_API': JSON.stringify(process.env.PEERSVIEW_API)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false // workaround for ng2
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[name].[hash].chunk.css'
    })
  ]
});
