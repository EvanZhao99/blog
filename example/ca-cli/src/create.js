const axios = require('axios')
const ora = require('ora') // 终端样式
const Inquirer = require('inquirer') // 命令行交互
const { promisify } = require('util')
const fs = require('path')
let ncp = require('ncp')
let downloadGitReop = require('download-git-repo') // 下载git仓库
const MetalSmith = require('metalsmith') // 遍历文件夹
// consolidate 统一了所有的模板引擎
let {rendr} = require('consolidate').ejs
const { downloadDirectory } = require('./constants')

render = promisify(render)

downloadGitReop = promisify(downloadGitReop)

ncp = promisify(ncp)

// create 功能是创建项目
// 列出所有项目 让用户选择安装
