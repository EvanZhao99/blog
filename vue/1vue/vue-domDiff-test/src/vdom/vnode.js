const VNODE_TYPE = 'VNODE_TYPE'
// domElement是此虚拟DOM节点对应的真实DOM节点
// _type=NODE_TYPE type=标签类型div p span

/**
 * 判断是否是同一个节点
 * @param {*} oldVnode 
 * @param {*} newVnode 
 */
export function isSameNode(oldVnode, newVnode) {
  return oldVnode.key === newVnode.key && oldVnode.type === newVnode.type
}

/**
 * 判断是否是虚拟节点
 * @param {*} vnode 
 */
export function isVnode(vnode) {
  return vnode && vnode._type === VNODE_TYPE
}

export function vnode(type, key, props = {}, children = [], text, domElement) {
  return {
      _type: VNODE_TYPE,//表示这是一个虚拟DOM节点
      type, key, props, children, text, domElement
  }
}
export default vnode