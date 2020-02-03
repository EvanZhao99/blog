import vnode from './vnode'

export default function h(type, config, ...children) {
  // 存放属性
  const props = {}
  let key
  if(config && config.key) {
    key = config.key
  }
  // 遍历config中的属性,拷贝到props中
  for(let propName in config) {
    if(config.hasOwnProperty(propName) && propName !== 'key') {
      props[propName] = config[propName]
    }
  }
  // 生成虚拟dom
  // 其实就是按照约定的属性名重新拼装了一个对象，额外插入一个_type属性 标明是虚拟节点
  return vnode(type, key, props, children.map((child, index) => {
    // 判断child为 字符串或数字， 创建文本节点
    return typeof child === 'string' || typeof child === 'number' ? vnode(
      undefined, undefined, undefined, undefined, child
    ) : child
  }))
}