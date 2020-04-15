const path = require('path');
const mergeWebpack = require('webpack-merge');
const CommonConfig = require('./webpack.common');

module.exports = mergeWebpack(CommonConfig, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    host: 'localhost',
    contentBase: [
      path.resolve(__dirname, 'dist')
    ],
    writeToDisk: true
  },
  output: {
    filename: '[name].js'
  },
});
