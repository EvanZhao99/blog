let loaderUtils = require('loader-utils')
let fs = require('fa')
// loader中不要带绝对路径
function loader(source) {
  let callback = this.async()
  let {layout, reg} = loaderUtils.getOptions(this)
  this.addDependency(layout)
  fs.readFile(layout, 'utf8', function(err, data) {
    let r = data.replace(reg, source)
    callback(err, `module.exports=${JSON.stringify(r)}`)
  })
}
module.exports = loader