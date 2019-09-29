# Vue中JSX的基本用法及其应用场景

## 什么是JSX？
JSX是React出的一种对JavaScript的语法扩展。

在Vue中大多数情况推荐使用模板语法，通过template中的Vue指令进行快速开发。但是template也是存在一些缺陷的，扩展难度大，造成逻辑冗余。这时候我们就需要`JavaScript`的完全编程能力，结合`render函数`与`JSX`进行功能扩展。 

## 基础用法
##### 1. 嵌入表达式  

在JSX中，我们可以在大括号中使用任何有效的JS表达式
  ```JavaScript
  // 动态渲染内容
  let name = "Josh Perez"
  let element = <h1>Hello {name}</h1>

  // 动态绑定属性
  let imgUrl = 'http://xxx.jpg'
  let img = <img src={imgUrl} />
  ```
  > 在`<>`中写HTML标签，在`{}`中写js代码  
  
  
JSX代码本身也是js表达式，它表示的是一个js对象。
```javascript
// 在vue的render函数中，以下两种写法是等价的
render: function(createElement) {
  let name = "Josh Perez"
  let element = <h1 class="title">Hello {name}</h1>
  return element
}
// ===》》
render: function(createElement) {
  let name = "Josh Perez"
  let element = createElement(
    'h1',
    {class: title},
    `Hello ${name}`
  )
  return element
}
```
> 事实上， Babel会把JSX语法转义成JS对象，也就是上述代码的后一种写法。

##### 绑定事件
在JSX中事件的命名采用小驼峰式（camelCase），而不是纯小写。
```javascript
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>

```
##### 条件渲染
在JSX中无法使用Vue中的`v-if-else`指令，可以使用Javascript中的运算符`if`或者`三元运算符`代替
```javascript
// if运算符
let isEnable = props.isEnable
render(h) {
  if(isEnable) {
    return <button>禁用</button>
  } else {
    return <button>启用</button>
  }
}
```
```javascript
// 三元运算符
let isEnable = props.isEnable
render(h) {
  return <button>{isEnable ? '禁用' : '启用'}</button>
}
```