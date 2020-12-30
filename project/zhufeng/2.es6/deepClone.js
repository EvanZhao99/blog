// 类型判断+递归
function deepClone(obj, hash=new WeakMap) {
  // 类型验证 对象类型
  if(obj == null) {
    return obj
  }
  if(obj instanceof RegExp) {
    return new RegExp(obj)
  }
  if(obj instanceof Date) {
    return new Date(obj)
  }
  // 非对象类型
  if(typeof obj !== 'object') {
    return obj
  }
  // 数组、对象
  if(hash.has(obj)) {
    // 防止相互引用 死循环
    return hash.get(obj)
  }
  let instance = new obj.constructor // 拷贝
  hash.set(obj, instance) // 拷贝前后做一个映射
  for(key in obj) {
    if(obj.hasOwnProperty(key)) {
      instance[key] = deepClone(obj[key], hash) // 递归
    }
  }
  return instance

}