//@ts-check

'use strict';

const path = require('path');
const webpack = require('webpack');

const requestConfig = {
  target: 'web',
	mode: 'none',

  entry: './src/webview-ui/index.tsx',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'webview.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  devtool: 'source-map',
  infrastructureLogging: {
    level: "log"
  },
  devServer: {
    compress: true,
    port: 9000,
    hot: true,
    allowedHosts: "all",
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  }
};

module.exports = (env, argv) => {
  requestConfig.mode = argv.mode;
  return requestConfig;
};