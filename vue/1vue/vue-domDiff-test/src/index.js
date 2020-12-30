import { h, mount, patch } from './vdom'
// h 用来创建虚拟DOM， 虚拟DOM就是一个普通的js对象，包含类型、属性、children等。作用是用js描述真实DOM，存放真实DOM的信息

const root = document.getElementById('root')

const oldVnode = h('ul', {id: 'container', style: {width: '200px'}}, 
  h('li', { style:{ backgroundColor: '#000000'}}, 'A'), 
  h('li', { style:{ backgroundColor: '#300000'}}, 'B'), 
  h('li', { style:{ backgroundColor: '#600000'}}, 'C'), 
  h('li', { style:{ backgroundColor: '#900000'}}, 'D'),
)

mount(oldVnode, root)
