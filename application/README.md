# application

> a application

## Build Setup

其实主要修改的就是以下两个文件‘webpack.dev.conf.js’和‘webpack.base.conf.js’
        
 1、修改‘webpack.dev.conf.js ’文件 。webpack多页的重中之重就是创建多个HtmlWebpackPlugin对象，并且配置指定的html页面个加载的js，修改‘webpack.dev.conf.js ’文件：
       
```html
new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 公共模块的名称
      chunks: ['main', 'index', 'login'], // chunks是需要提取的模块
      minChunks: 3
}),
new HtmlWebpackPlugin({
      filename: 'index.html',//生成的html存放路径，相对于path
      template: path.resolve(__dirname, '../src/modules/index/index.html').replace(/\\/g,'/'),//html模板路径
      chunks: ['index','vendors'],//需要引入的chunk，不配置就会引入所有页面的资源,'index'是入口文件的属性名
      inject: true, //js插入的位置，true/'head'/'body'/false
      hash: true, //为静态资源生成hash值
      minify: { //压缩HTML文件
       removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
}),

```

2、修改‘webpack.base.conf.js ’文件 。多入口配置，：

```html
entry: {
    main: './src/main.js',
    index: './src/modules/index/main.js',
    login: './src/modules/login/main.js'
 }
```

以上是静态写死了入口文件和指定加载的html页面文件。

为了更好地实现自动化加载，从而对相应的文件进行改造。

1、修改‘utils.js’文件

```html
var glob = require('glob')

exports.getEnters = function(globPath){
  var baseName, template, pathName,
      entries = {}
  glob.sync(globPath).forEach(function (entry, index){
    // 获取路径中文件名,后缀是可选的,path.extname(path)获取路径中的扩展名
    baseName = path.basename(entry, path.extname(entry))
    template = entry.replace('./src/modules/', '').replace('/' + baseName + path.extname(entry), '')
    pathName = template
    entries[pathName] = entry
  })
  return entries
}

```

2、修改‘webpack.dev.conf.js ’文件

```html
var pages = utils.getEnters('./src/modules/**/*.html')
var chunks = Object.keys(pages)

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

```

3、修改‘webpack.base.conf.js ’文件

```html
var entries = utils.getEnters('./src/modules/**/*.js')

module.exports = {
  entry: entries,
  ......
}
```

哈哈，原来之前修改的文件是对的，只是访问的路径姿势错误，正确的访问路径姿势是：http://localhost:8080/login.html#/index，一定要访问指定的html文件，默认的是index.html。

4、修改‘webpack.prod.conf.js’文件（配置webpack打包js）

```html
var pages = utils.getEnters('./src/modules/**/*.html')
var chunks = Object.keys(pages)

var plugins = [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
 ]

for(var pathName in pages){
  var conf = {
    filename: pathName + '.html',//生成的html存放路径，相对于path
    template: pages[pathName],//html模板路径
    chunks: [pathName, 'vendor', 'manifest'],//需要引入的chunk，不配置就会引入所有页面的资源
    inject: true,//js插入的位置，true/'head'/'body'/false
    //hash: true, //为静态资源生成hash值
    minify: { //压缩HTML文件
      removeComments: true, //移除HTML中的注释
      collapseWhitespace: true, //删除空白符与换行符
      removeAttributeQuotes: true //删除属性引用
    },
    chunksSortMode: 'dependency'
  }
  plugins.push(new HtmlWebpackPlugin(conf))
}

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: plugins
})

....

```

注意：webpackJsonp is not defined报错，主要是少了webpack的启动文件

```html
  ...
  new webpack.optimize.CommonsChunkPlugin(
        {names: ["vendor", "manifest"]}
  ),
  ...
  
```

那么页面中还需要将‘webpackAssets’（名称不固定）文件引入到页面中，并且这个文件一定要放在其他js前引用！

```html
for(var pathName in pages){
  var conf = {
     ..
    chunks: [pathName, 'vendor', 'manifest'],//需要引入的chunk，不配置就会引入所有页面的资源
     ...
  }
  plugins.push(new HtmlWebpackPlugin(conf))
}

```

