// 存放常量的文件
const fs = require('fs')
const { version } = require('../package.json')

// 模板存储的位置 判断当前系统 获取根目录
// vue-cli 2.0 用的是user-home 模块
const rc = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.carc`

// 默认模板
const defaults = {
  wx: 'plackychuang/ca-vuex'
}

let templates = {}

if(fs.existsSync(rc)) {
  let content = fs.readFileSync(rc).toString()
  templates = JSON.parse(content)
  Object.assign(templates, defaults)
} else {
  templates = Object.assign(defaults)
}

module.exports = {
  version,
  rc,
  templates,
  defaults
}