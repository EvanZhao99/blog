let loaderUtils = require('loader-utils')
let mime = require('mime')
function loader(source) {
  let {limit} = loaderUtils.getOptions(this)
  if(limit > source.length) {
    // 拼装base64
    return `module.exports = "data:${mime.getType(this.resorcePath)};
    base64,${source.toString('base64')}"`
  }else {
    return require('./file-loader')
  }
}
loader.raw = true // 表示source是二进制
module.exports = loader