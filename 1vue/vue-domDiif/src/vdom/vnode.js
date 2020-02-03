
const VNODE_TYPE = 'VNODE_TYPE'

/**
 * 如果key和type均相同，认为同一个节点
 * @param {*} oldVnode 
 * @param {*} newVnode 
 */
export function isSameNode(oldVnode, newVnode) {
  return oldVnode.key === newVnode.key && oldVnode.type === newVnode.type
}

export function isVnode(vnode) {
  return vnode && vnode._type == VNODE_TYPE;
}

export default function vnode(type, key, props={}, children=[], text, domElement) {
  return {
    _type: VNODE_TYPE,
    type, key, props, children, text, domElement
  }
}