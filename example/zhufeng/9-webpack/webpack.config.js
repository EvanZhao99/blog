const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} =  require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path:path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  // 如果使用devServer, 那么所有产出的文件都会写入内存里，而不是硬盘
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // 产出文件的根目录
    port: 8080,
    host: 'localhost',
    compress: true
  },
  // module: {},
  plugins: [
    // 一个插件就是一个类 (class)
    new HtmlWebpackPlugin({
      template:'./src/index.html', // 指定模板文件
      filename: 'index.html', // 产出后的文件名
      hash: true, // 为了避免缓存，产出后的文件名加hash值
      chunks: ['main'],
      chunksSortMode: 'manual' // 对引入的代码块进行排序模式
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['dist']
    })
  ]
}