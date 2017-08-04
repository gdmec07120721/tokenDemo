var utils = require('./utils')
var path = require('path')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var pages = utils.getEnters('./src/modules/**/*.html')
var chunks = Object.keys(pages)

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var plugins = [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 公共模块的名称
      chunks: chunks, // chunks是需要提取的模块
      minChunks: chunks
    }),
    new FriendlyErrorsPlugin()
  ]

for(var pathName in pages){
  var conf = {
    filename: pathName + '.html',//生成的html存放路径，相对于path
    template: pages[pathName],//html模板路径
    chunks: [pathName, 'vendors'],//需要引入的chunk，不配置就会引入所有页面的资源
    inject: true,//js插入的位置，true/'head'/'body'/false
    hash: true, //为静态资源生成hash值
      minify: { //压缩HTML文件  
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
  }
  plugins.push(new HtmlWebpackPlugin(conf))
}

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: plugins
})




