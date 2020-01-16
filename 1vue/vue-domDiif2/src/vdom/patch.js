import {isSameNode, isVnode} from './vnode'

/**
 * 通过虚拟节点创建真实DOM
 * 也可通过虚拟节点vnode.domElement访问真实dom
 */
function createDOMElementFromVnode(vnode) {
  let { type, children } = vnode
  if(type) {
    // 创建真实节点 并挂载到vnode的domElement上
    let domElement = vnode.domElement = document.createElement(type)
    // 属性赋值
    updateProperties(vnode)
    // 递归遍历子节点 并操作dom 将子节点插入到当前节点下
    if(Array.isArray(children)) {
      children.forEach(child => {
        domElement.appendChild(createDOMElementFromVnode(child))
      })
    }
  } else{
    // 创建文本节点
    vnode.domElement = document.createTextNode(vnode.text)
  }
  return vnode.domElement
}

/**
 * 直接操作DOM，更新属性
 * @param {*} vnode 
 * @param {*} oldProps 
 */
function updateProperties(vnode, oldProps={}) {
  let newProps = vnode.props
  let domElement = vnode.domElement

  // 对style等特殊属性进行单独处理
  let oldStyle = oldProps.style || {}
  let newStyle = newProps.style || {}

  // 属性更新：删除不需要的属性，然后用新属性覆盖老属性
  
  // 删除style多余属性
  for(let oldAttrName in oldStyle) {
    if(!newStyle[oldAttrName]) {
      domElement.style[oldAttrName] = ''
    }
  }
  // 清除多余属性
  for(let oldPropName in oldProps) {
    if(!newProps[oldProps]) {
      delete domElement[oldPropName]
    }
  }

  // 用新属性覆盖旧属性
  for(let newPropName in newProps) {
    if(newPropName === 'style') {
      let styleObject = newProps.style
        for (let newAttrName in styleObject) {
            domElement.style[newAttrName] = styleObject[newAttrName]
        }
    } else {
      domElement[newPropName] = newProps[newPropName]
    }
  }
}

/**
 *将虚拟节点转换为真实节点 挂载到容器上
 * @param {*} vnode 
 * @param {*} container 
 */
export function mount(vnode, container) {
  let domElement = createDOMElementFromVnode(vnode)
  container.appendChild(domElement)
}

/**
 * 比较新旧节点的区别  更新dom
 * 两步：1）更新节点属性；2）更新children
 */
export function patch(oldVnode, newVnode) {
  // 判断节点类型是否相同 如果不相同 直接删除重建
  if(oldVnode.type !== newVnode.type) {
    return oldVnode.domElement.parentNode.replaceChild(createDOMElementFromVnode(newVnode), oldVnode.domElement)
  }
  // 文本节点 直接替换内容
  if(newVnode.text !== undefined) {
    return oldVnode.domElement.textContent = newVnode.text
  }
}