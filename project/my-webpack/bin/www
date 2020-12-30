#! /usr/bin/env node
// 上述命令代表：由node环境来执行

// 入口文件
// 读取用户传递的参数 --mode

// 刚开始 负责读取用户执行命令时所带的参数 读取用户的配置文件

// console.log(process.cwd())
let path = require('path')

// 获取配置文件的路径
// path.resolve 默认获取当前项目的根路径
let configPath = path.resolve('webpack.config.js')
let config = require(configPath)

// webpack-cli -> webpack

let Compiler = require('../src/Compiler.js')
let compiler = new Compiler(config)

// 开始打包
compiler.run()


// console.log(configPath)
