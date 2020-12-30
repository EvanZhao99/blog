const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

class MyPlugin{
  apply(compiler) {
    compiler.hooks.done.tap('MyPlugin', function() {
      console.log('compiler完成~~~~~~~~~~~~~~~~~~~~~~·')
    })
  }
}

module.exports = env => {
  return {
    mode: 'development',
    entry: {
      'index': './src/index.js',
      // 'anotherModule': './src/another-module.js'
    },
    output: {
      filename: '[name].bundle.[chunkhash].js',
      path: path.resolve(__dirname, 'dist'),
      chunkFilename: '[name].bundle.[chunkhash].js' // 决定非主入口的bundle名称
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    devServer: {
      contentBase: './dist'
    },
    resolveLoader: {
      modules: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'loaders')
      ]
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: ['style-loader','less-loader']
        },
        {
          test: /\.js$/,
          use: [
            'my-loader'
          ]
        }
      ]
    },
    plugins: [
      new HTMLWebpackPlugin({
        title: 'Code Splitting',
        template: './src/index.html'
      }),
      new MyPlugin(0)
    ]
  }
}