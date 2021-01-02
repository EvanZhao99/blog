let loaderUtils = require('loader-utils')
let babel = require('@babel/core')
function loader(source) {
  // 调用 async方法，将loader变为异步
  // 默认loader是同步状态，可以自动把loader的返回值直接返回callback(source)
  // 如果是异步，需要自己手动调用callback 将转化后的结果放进去 callback的第一个参数是err
  // babel-loader  core.transform  @preset-env
  let callback = this.async()
  let options = loaderUtils.getOptions(this)
  babel.transform(source, {
    ...options, 
    sourceMap: true,
    filename: this.resourcePath.split('/').pop()
  }, function(err, r){
    callback(err, r.code, r.map)
  })
  
}
module.exports = loader