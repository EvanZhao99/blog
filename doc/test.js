let obj = []
let handler = {
  /**
   * 
   * @param {*} target 
   * @param {*} name 
   * @param {*} value 
   */
  set: function(target, name, value) {
    update()
    return Reflect.set(target, name, value)
  },
  get: function(target, name) {
    collect()
    return Reflect.get(target, name)
  }
}
function update() {
  console.log('更新视图')
}
function collect() {
  console.log('依赖收集')
}

// 测试实例
let p = new Proxy(obj, handler)

console.log(p)
p.push(1)
console.log(p)
// 结果： 依赖收集 undefined 更新视图 依赖收集 1