const VNODE_TYPE = 'VNODE_TYPE'
// domElement是此虚拟DOM节点对应的真实DOM节点
// _type=NODE_TYPE type=标签类型div p span


export function isSameNode(oldVnode, newVnode) {

}

export function isVnode(vnode) {

}

export function vnode(type, key, props = {}, children = [], text, domElement) {
  return {
      _type: VNODE_TYPE,//表示这是一个虚拟DOM节点
      type, key, props, children, text, domElement
  }
}
export default vnode