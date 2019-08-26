const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} =  require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  devtool: 'eval',
  // 单入口打包 默认chunk名为'main'，每个chunk一般会生成一个文件
  entry: path.join(__dirname, 'src/index.js'),
  // 多入口打包
  // entry: {
  //   index: path.join(__dirname, 'src/index.js'), // index为chunk名字
  //   login: path.join(__dirname, 'src/login.js')
  // },
  output: {
    path:path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/' // 访问路径为：publicPath+outputPath
  },
  // 如果使用devServer, 那么所有产出的文件都会写入内存里，而不是硬盘
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // 产出文件的根目录
    port: 8080,
    host: 'localhost',
    compress: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            // 如果小于10k,就将图片转成base64，嵌入HTML中
            limit: 10
          }
        }
      }
    ]
  },
  plugins: [
    // 一个插件就是一个类 (class)
    new HtmlWebpackPlugin({
      template:'./src/index.html', // 指定模板文件
      filename: 'index.html', // 产出后的文件名
      hash: true, // 为了避免缓存，产出后的文件名加hash值
      chunks: ['main'],
      chunksSortMode: 'manual' // 对引入的代码块进行排序模式
    }),
    // 在打包前清空目录
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['dist']
    }),
    new MiniCssExtractPlugin({
      filename: '[name][hash].css', // name是代码中chunk名字
      chunkFilename: '[id].css' // 异步加载时用到
    })
  ]
}