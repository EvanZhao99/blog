let loaderUtils = require('loader-utils')
function loader(source) {
  // 拿到内容 写到指定文件中
  let name = laoderUtils.interpolateName(thsi, '[hash:8].[ext]', {content: source})
  this.emitFile(name, source)
  return `module.exports='${name}'`
}
loader.raw = true
module.exports = loader