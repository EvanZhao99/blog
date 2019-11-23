
import vnode from './vnode.js'
import { h } from './index.js';
import { patch } from './patch.js';
const hasOwnProperty = Object.prototype.hasOwnProperty
export default function(type, config, ...children) {
  const props = {} 
  let key;
  if(config && config.key) {
    key = config.key
  }

  // 迭代config中的每一个属性
  for(let propName in config) {
    if(hasOwnProperty.call(config, propName) && propName != 'key') {
      props[propName] = config[propName]
    }
  }
  return vnode(type, key, props, children.map((child, index) => {
    return typeof child == 'string' || typeof child == 'number' ? vnode(
      undefined, undefined, undefined, child
    ) : child
  }))
}