
function createDOMElementFromVnode(vnode) {
  let { type, children} = vnode
  if(type) {
    let domElement = vnode.domElement = document.createElement(type)
    updatePropertied(vnode)
    if(Array.isArray(vnode.children)) {
      vnode.children.forEach(child => domElement.appendChild(createDOMElementFromVnode(child)))
    }
  } else {
    vnode.domElement = document.createTextNode(vnode.text)
  }
  return vnode.domElement

}
function updatePropertied(vnode, oldProps={}) {
  let newProps = vnode.props
  let domElement = vnode.domElement
  let oldStyle = oldProps.style || {}
  let newStyle = newProps.style || {}

  // 属性修改原则： 先删除多余的旧的对象属性（老的有新的没有），在根据新的对象属性进行赋值

  // 删除styel中多余属性
  for(let oldAttrName in oldStyle) {
    if(!newStyle[oldAttrName]) {
      domElement.style[oldAttrName] = ''
    }
  }
  // 删除props中多余的属性
  for(let propName in oldProps) {
    if(!newProps[propName]) {
      delete domElement[propName]
    }
  }
  // 属性赋值-包含添加和修改功能-直接用新的属性值覆盖真实dom的属性
  for(let propName in newProps) {
    if(propName == 'style') {
      for(let newAtrrName in newStyle) {
        domElement.style[newAtrrName] = newStyle[newAtrrName]
      }
    } else {
      domElement[propName] = newProps[propName]
    }
  }

}

export function mount(vnode, container) {
  let newDOMElement = createDOMElementFromVnode(vnode)
  container.appendChild(newDOMElement) 
}

export function patch() {

}