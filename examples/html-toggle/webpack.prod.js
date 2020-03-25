const path = require('path')
const mergeWebpack = require('webpack-merge')
const CommonConfig = require('./webpack.common')

module.exports = mergeWebpack(CommonConfig, {
  mode: 'production',
  devtool: 'none',
  output: {
    filename: '[name].js' 
  }
});
