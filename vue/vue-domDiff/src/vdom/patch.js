/**
 * @file 补丁；创建和更新真实DOM
 * 
 */
import { isSameNode } from './vnode.js'


/**
 * 通过虚拟节点创建真实节点
 * 流程：1）根据type通过createElement创建dom； 2）根据vnode给属性赋值； 3）递归创建子节点
 * @param {*} vnode 
 */
function createDOMElementFromVnode(vnode) {
  let { type, children } = vnode
  if (type) {
    let domElement = vnode.domElement = document.createElement(type)
    updatePropertied(vnode)
    if (Array.isArray(vnode.children)) {
      vnode.children.forEach(child => domElement.appendChild(createDOMElementFromVnode(child)))
    }
  } else {
    vnode.domElement = document.createTextNode(vnode.text)
  }
  return vnode.domElement

}

/**
 * 更新dom属性
 * 思路：新旧vnode对比--1）删除多余的旧对象的属性；2）根据新vnode属性对dom进行赋值，实现添加和修改
 * @param {*} vnode 
 * @param {*} oldProps 
 */
function updateProperties(vnode, oldProps = {}) {
  let newProps = vnode.props
  let domElement = vnode.domElement
  let oldStyle = oldProps.style || {}
  let newStyle = newProps.style || {}

  // 属性修改原则： 先删除多余的旧的对象属性（老的有新的没有），在根据新的对象属性进行赋值

  // 删除styel中多余属性
  for (let oldAttrName in oldStyle) {
    if (!newStyle[oldAttrName]) {
      domElement.style[oldAttrName] = ''
    }
  }
  // 删除props中多余的属性
  for (let propName in oldProps) {
    if (!newProps[propName]) {
      delete domElement[propName]
    }
  }
  // 属性赋值-包含添加和修改功能-直接用新的属性值覆盖真实dom的属性
  for (let propName in newProps) {
    if (propName == 'style') {
      for (let newAtrrName in newStyle) {
        domElement.style[newAtrrName] = newStyle[newAtrrName]
      }
    } else {
      domElement[propName] = newProps[propName]
    }
  }

}

/**
 * 挂载
 * 思路：1）通过虚拟dom节点创建真实dom节点； 2）挂载到容器上
 * Vue.$mount：如果没有传container参数，只进行编译工作，不进行挂载；将编译后的html字符串赋值给vm.$el，所以可以通过Vue.$mount实现消息通知、对话窗等dom操作
 * @param {*} vnode 
 * @param {*} container 
 */
export function mount(vnode, container) {
  let newDOMElement = createDOMElementFromVnode(vnode)
  container.appendChild(newDOMElement)
}

/**
 * 更新节点；打补丁
 * 思路：1）判断类型是否一样，若不一样直接替换
 *      2）判读是否是文本节点，如果是文本节点直接赋值
 *      3）调用updateProperties更新dom属性
 *      4)调用updateChildren更新子节点
 */
export function patch(oldVnode, newVnode) {
  // 操作对象是旧的vnode上的dom,并不是新建dom（单纯的打补丁的操作）

  // 如果类型不同，直接替换
  if (oldVnode.type !== newVnode.type) {
    let newElement = createDOMElementFromVnode(newVnode)
    return oldVnode.domElement.parentNode.replaceChild(newElement, oldVnode.domElement)
  }
  // 文本节点直接赋值
  if (typeof newVnode.text !== 'undefined') {
    return oldVnode.domElement.textContent = newVnode.text
  }
  let domElement = newVnode.document = oldVnode.domElement
  // 更新属性
  updateProperties(newVnode, oldVnode.props)
  // 更新子节点
  let oldChildren = oldVnode.children;//老的虚拟DOM节点的儿子数组
  let newChildren = newVnode.children;//新的虚拟DOM节点儿子数组
  // 新旧节点都有儿子
  if (oldChildren.length > 0 && newChildren.length > 0) {
    updateChildren(domElement, oldChildren, newChildren)
  } else if (oldChildren.length > 0) {
    // 只有老的节点有儿子新的没儿子，则不要儿子
    domElement.innerHTML = ''

  } else if (newChildren.length > 0) {
    // 只有新的节点有儿子老的没有，则直接添加
    for (let i = 0; i < newChildren.length; i++) {
      domElement.appendChild(createDOMElementFromVnode(newChildren[i]))
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

/**
 * 更新子节点
 * 思路：1）组件复用--根据key和type判断是否为同一个节点，若同一个节点就复用，修改有差异的属性，否则直接进行添加和删除
 *      2) 常见情况优化--新老队列节点比较顺序：头对头、尾对尾、头对尾、尾对头、依次遍历
 */
function updateChildren(parentDomElement, oldChildren, newChildren) {
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
  // 老队列处理完了，新队列没处理完---插入新队列中的剩余节点
  if (newStartIndex <= newEndIndex) {
    // 判断节点插入的位置：1）如果通过“尾对尾”处理过新队列后面的节点，则直接插到该节点之前
    let beforeDOMElement = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].domElement
    for (let i = 0; i <= newEndIndex; i++) {
      parentDomElement.insertBefore(createDOMElementFromVnode(newChildren[i]), beforeDOMElement)
    }
  }
  // 新队列先处理完，老队列没处理完--删除老队列中的剩余节点
  if (oldStartIndex <= oldEndIndex) {
    for (let i = 0; i <= oldEndIndex; i++) {
      parentDomElement.removeChild(oldChildren[i].domElement)
    }
  }

}