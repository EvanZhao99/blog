# 实现一个简单的Vue
包含三个功能：
- 实现`h`函数，创建虚拟DOM
- 实现`mount`函数，将虚拟DOM转化为真实DOM，并挂载到指定容器
- 实现`patch`函数，更新DOM，模拟domDiff算法，组件复用，更新子节
  
涉及概念：
- 虚拟DOM：就是一个普通的JS对象，存放着属性、类型、children，作用是描述真实DOM，存放真实DOM信息

## 一、一个简单的例子
用Vue动态创建一个列表，并插入到文档中，只需要三步：
- 获取根节点
- 创建虚拟dom
- 将虚拟dom挂载到根节点上  
  
代码如下：

```js
// index.js
import {h, mount} from './vdom'

// 一、获取根节点
const root = document.getElementById('root')

// 二、创建虚拟dom
const vnode = h(
  'ul', // type
  // 特性
  {
    id: 'container',
    style: {width: '200px'}
  },
  // 子节点
  h('li', {style: {color: 'red'}}, 'A'),
  h('li', {style: {color: 'blue'}}, 'B'),
  h('li', {style: {color: 'green'}}, 'C'),
)

// 三、将虚拟节点挂载到根节点上
mount(vnode, root)
```
浏览器渲染效果如下：
![](./img/vue-domdiff/ul.png)

## 二、具体实现
上述例子一共用到两个方法，`h`函数和`mount`函数

### 1. h函数的实现
```js
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
  // 生成虚拟节点
  // 其实就是按照约定的属性名重新拼装了一个对象，额外插入一个_type属性 标明是虚拟节点
  return vnode(type, key, props, children.map((child, index) => {
    // 判断child为 字符串或数字， 创建文本节点
    return typeof child === 'string' || typeof child === 'number' ? vnode(
      undefined, undefined, undefined, undefined, child
    ) : child
  }))
}
```
实现过程中用到了`vnode`方法,创建一个虚拟节点
```js
// vnode.js
export default function vnode(type, key, props={}, children=[], text, domElement) {
  return {
    _type: VNODE_TYPE,
    type, key, props, children, text, domElement
  }
}

```

### 2. mount函数的实现
`mount`函数包含两个步骤：
1. 
```js
/**
 *将虚拟节点转换为真实节点 挂载到容器上
 * @param {*} vnode 
 * @param {*} container 
 */
export function mount(vnode, container) {
  let domElement = createDOMElementFromVnode(vnode)
  container.appendChild(domElement)
}
```

createDOMElementFromVnode:
```js
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
```
updateProperties:
```js
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
```