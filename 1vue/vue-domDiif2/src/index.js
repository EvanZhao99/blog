// index.js
import { h, mount, patch } from './vdom'

// 获取根节点
const root = document.getElementById('root')

// 创建虚拟dom
const vnode = h(
  'ul', // type
  // 特性
  {
    id: 'container',
    style: { width: '200px' }
  },
  // 子节点
  h('li', { style: { color: 'red' } }, 'A'),
  h('li', { style: { color: 'blue' } }, 'B'),
  h('li', { style: { color: 'green' } }, 'C'),
)

// 将虚拟节点挂载到根节点上
// mount方法会将虚拟DOM转换成真实DOM，然后再appendChild到root上
mount(vnode, root)

// 更新按钮
let button = document.createElement('button')
button.innerHTML = '更新节点'
button.onclick = function() {
  const newVNode = h(
    'ul', // type
    // 特性
    {
      id: 'container',
      style: { width: '200px' }
    },
    // 子节点
    h('li', { style: { color: 'black' } }, 'D'),
    h('li', { style: { color: 'blue' } }, 'E'),
    h('li', { style: { color: 'green' } }, 'F'),
  )
  patch(vnode, newVNode)
}
root.appendChild(button)