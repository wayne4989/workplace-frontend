import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
let webpack = require('webpack');
let helpers = require('./helper');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.ts$/,
      loaders: [
        {
          loader: 'ts-loader',
        }, 'angular2-template-loader'
      ]
    }, {
      test: /\.(ts|js)$/,
      loaders: [
        'angular-router-loader'
      ]
    }, {
      test: /\.html$/,
      use: 'html-loader'
    }, {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
      use: 'file-loader?name=assets/[name].[hash].[ext]'
    }, {
      test: /\.(sa|sc|c)ss$/,
      use: [
        'to-string-loader',
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [require('autoprefixer')]
          }
        },
        'sass-loader'
      ]
    }]
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      name: true,
      cacheGroups: {
        vendors: {
          test: './src/vendor.ts',
          name: 'vendors',
          reuseExistingChunk: true,
          chunks: 'all'
        },
        polyfills: {
          test: './src/polyfills.ts',
          name: 'polyfills',
          reuseExistingChunk: true,
          chunks: 'all'
        },
        app: {
          test: './src/main.ts',
          name: 'app',
          reuseExistingChunk: true,
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /\@angular(\\|\/)core(\\|\/)fesm5/,
      helpers.root('src'), // location of your src
      {} // a map of your routes,
    ),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyWebpackPlugin([{
      from: './src/sitemap.xml',
      to: 'sitemap.xml',
      toType: 'file'
    }])
  ]
};
