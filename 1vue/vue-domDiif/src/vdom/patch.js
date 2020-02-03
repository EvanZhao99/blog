import {isSameNode, isVnode} from './vnode'

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

  // 如果节点类型相同，则更新该节点真实DOM属性
  let domElement = newVnode.domElement = oldVnode.domElement
  updateProperties(newVnode, oldVnode.props)

  // 更新children
  let oldChildren = oldVnode.children
  let newChildren = newVnode.children
  if(oldChildren.length > 0 && newChildren.length > 0) {
    updateChildren(domElement, oldChildren, newChildren)
  } else if(oldChildren.legnth > 0) {
    // 新节点没有children，直接情况dom的子节点
    domElement.innerHTML = ''
  } else if( newChildren.length > 0) {
    // 旧节点没有children，新节点有children，则直接在dom上插入子节点
    for(let i = 0; i < newChildren.length; i++) {
      domElement.appendChild(createDOMElementFromVnode(newChildren[i]))
    }
  }

}

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
 * 此处是精华
 * 打补丁，更新子节点，domdiff, 
 * 思路: 1）组件复用--根据key和type判断是否为同一个节点，若同一个节点就复用，修改有差异的属性，否则直接重建替换
 *      2) 对常见情况优化--新老队列节点比较顺序：头对头、尾对尾、头对尾、尾对头、依次遍历
 * @param {*} parentDomElement 
 * @param {*} oldChildren 
 * @param {*} newChildren 
 */
function updateChildren(parentDomElement, oldChildren, newChildren) {
  console.log(parentDomElement, oldChildren, newChildren)
  // 创建开始和结束索引及节点
  let oldStartIndex = 0, oldStartVnode = oldChildren[0]
  let newStartIndex = 0, newStartVnode = newChildren[0]
  let oldEndIndex = oldChildren.length - 1, oldEndVnode = oldChildren[oldEndIndex]
  let newEndIndex = newChildren.length - 1, newEndVnode = newChildren[newEndIndex]
  let oldKeyToIndexMap = createKeyToIndexMap(oldChildren)

  // 两个队列如果有一个结束则循环结束
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    // 老队列开始节点与新队列开始节点比较
    if (!oldStartVnode) {
      oldStartVnode = oldChildren[++oldStartIndex]
    } else if (!oldEndVnode) {
      oldEndVnode = oldChildren[--oldEndIndex]
    } else if (isSameNode(oldStartVnode, newStartVnode)) {
      // 头对头--两个队列的开始节点为同一节点
      patch(oldStartVnode, newStartVnode)
      // 索引向后移动
      oldStartVnode = oldChildren[++oldStartIndex]
      newStartVnode = newChildren[++newStartIndex]
    } else if (isSameNode(oldEndVnode, newEndVnode)) {
      // 尾对尾--两队列结束节点为同一节点
      // 为'在队列的开始插入新子节点'的情况做优化
      patch(oldEndVnode, newEndVnode)
      // 结束索引向前移动
      oldEndVnode = oldChildren[--oldEndIndex]
      newEndVnode = newChildren[--newEndIndex]
    } else if (isSameNode(oldEndVnode, newStartIndex)) {
      // 头对尾--新队列开始节点与老队列结束节点为相同节点
      patch(oldEndVnode, newStartIndex)
      oldEndVnode = oldChildren[--oldEndIndex]
      newStartVnode = newChildren[++newStartIndex]
    } else if (isSameNode(oldStartVnode, newEndVnode)) {
      // 尾对头
      patch(oldStartVnode, newEndVnode)
      oldStartVnode = oldChildren[++oldStartIndex]
      newEndVnode = newChildren[--newEndIndex]
    } else {
      // 常见情况都被排除后 遍历老队列中有没有与新队列开始节点key值相同的
      let oldIndexBykey = oldKeyToIndexMap[newStartVnode.key]
      // 如果老队列中没有与新队列开始元素key相同的节点 插入新节点
      if (oldIndexBykey == null) {
        parentDomElement.insertBefore(createDOMElementFromVnode(newStartVnode), oldStartVnode.domElement)
      } else {
        let oldVnodeToMove = oldChildren[oldIndexBykey]
        // 判断节点类型是否相同，相同则复用（移动位置并更新属性），不相同直接插入新的删除旧的（不是替换，位置不相同）
        if (oldVnodeToMove.type !== newStartVnode.type) {
          parentDomElement.insertBefore(newStartVnode, oldStartVnode.domElement)
        } else {
          patch(oldVnode, newStartVnode)
          oldChildren[oldIndexBykey] = undefined
          parentDomElement.insertBefore(newStartVnode, oldStartVnode.domElement)
        }
      }
      // 新队列开始索引向后移动
      newStartVnode = newChildren[++newStartIndex]
    }
  }

  // 如果旧队列先处理完，新队列还没处理完--将新队列剩余节点插入父节点
  if (newStartIndex <= newEndIndex) {
    // 判断节点插入的位置：1）如果通过“尾对尾”处理过新队列后面的节点，则直接插到该节点之前
    let beforeDOMElement = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].domElement
    for (let i = 0; i <= newEndIndex; i++) {
      parentDomElement.insertBefore(createDOMElementFromVnode(newChildren[i]), beforeDOMElement)
    }
  }

  // 如果新队列先处理完，将旧队列剩余节点删除
  if (oldStartIndex <= oldEndIndex) {
    for (let i = 0; i <= oldEndIndex; i++) {
      parentDomElement.removeChild(oldChildren[i].domElement)
    }
  }
}

/**
 * 根据子节点数组生成key--index的map
 * @example { key1: 1, key2: 7, key3: 5}
 * @param {*} children 
 */
function createKeyToIndexMap(children) {
  let map = {}
  for (let i = 0; i < children.length; i++) {
    let key = children[i].key
    if (key) {
      map[key] = i
    }
  }
  return map
}