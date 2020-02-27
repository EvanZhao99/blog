// 存放常量的文件

const { version } = require('../package.json')

// 模板存储的位置 判断当前系统 获取根目录
// vue-cli 2.0 用的是user-home 模块
const downloadDirectory = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.template`
module.exports = {
  version,
  downloadDirectory
}