const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = env => {
  return {
    mode: 'development',
    entry: {
      'index': './src/index.js',
      // 'anotherModule': './src/another-module.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      chunkFilename: '[name].bundle.js' // 决定非主入口的bundle名称
    },
    // optimization: {
    //   splitChunks: {
    //     chunks: 'all'
    //   }
    // },
    devServer: {
      contentBase: './dist'
    },
    plugins: [
      new HTMLWebpackPlugin({
        title: 'Code Splitting',
        template: './src/index.html'
      })
    ]
  }
}