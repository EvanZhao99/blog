# JS面试题

[参考](https://juejin.im/post/5c64d15d6fb9a049d37f9c20)

### 目录
1. 原型与原型链
2. 变量对象
3. 活动对象
4. 作用域
5. 作用域链
6. 闭包
7. scirpt引入方式
8. 对象拷贝
9. new运算符的执行过程
10. instanceof原理
11. 类型判断
12. 代码复用 
13. 继承 
14. 模块化 
15. 防抖和节流
16. this的指向 
17. ES6/ES7 
18. AST 
19. babel编译原理 
20. 函数柯里化 
21. 数组

### 1. 原型与原型链
- 原型：就是一个普通的js对象，为其他对象提供共享属性和方法
- 原型链：每个对象都有一个属性`__proto__`,指向他的原型，原型本身也是一个对象，也会有自己的原型，就构成了一个链式结构。当对象被访问的属性 它自身没有的话，就会去它的原型上找，原型上没有就会去原型的原型上找，一直找到顶级的Object.prototype,如依旧没有，则返回undefined
- 执行上下文：执行上下文可以简单理解为一个对象，对当前执行环境的描述
    - 它包含三部分：
      - 变量对象
      - 作用域链
      - this指向
    - 类型：
      - 全局执行上下文：浏览器关闭时被弹出栈
      - 函数执行上下文：函数每次调用都会产生一个新的执行上下文
      - eval执行上下文：evel执行代码字符串是会创建一个执行环境
    - 代码执行过程：
      - 创建 全局上下文
      - 执行全局上下文， 自上而下执行 遇到函数时 `函数执行上下文`被push到执行栈顶层
      - 函数上下文被激活，成为active EC,开始执行函数中的代码，caller被挂起
      - 函数执行完后，callee被pop移除出执行栈，控制权交还给全局执行上下文（caller），继续执行

### 2. 变量对象
变量对象，是执行上下文的一部分，可以理解为一个简单的对象，存着这所有的函数形参、函数声明、变量声明。
### 3. 活动对象
在进入执行阶段之前，变量对象中的属性是不可访问的，在进入执行阶段之后， 变量对象变成了活动对象，里面的属性才可以被访问。  
对于执行上下文来说，活动对象和变量对象其实都是同一个对象，只是出于执行上下文的不同生命周期。只有出于执行上下文栈顶的函数执行上下文的变量对象，才会变成活动对象
### 4. 作用域
执行上下文中 声明的变量及其作用范围，可以分为 块级作用域和函数作用域  
特点：
- 声明提升：一个声明在函数体内都是可见的，函数会优于变量
- 非匿名自执行函数，函数变量 为 只读 状态，无法修改
```js
let foo = function() {}
(function foo() {
  foo = 10
  console.log(foo)
}())
```
### 5. 作用域链
作用域链可以理解为一组列表，包含父级和自身的变量对象。在当前执行上下文中可以访问到父级到全局的变量，就是因为作用域链的存在

### 6. 闭包
在函数中被当做返回值的函数，可以访问上一个函数的作用域。 
缺点：内存泄漏，将引用对象设为`null`，释放内存

### 7. scirpt引入方式：
- html 静态`script`标签
- js 动态插入`script`
- `<script defer>`: 立即下载，不影响其他操作；文档解析完成之后执行，也就是解析到</html>后再执行
- `<script async>`: 立即下载，不影响其他操作；下载完立即执行，暂停HTML解析

### 8. 对象拷贝
- 浅拷贝：以赋值的形式拷贝对象，指向的时同一个地址
- 深拷贝：递归+类型判断
  
### 9. new运算符的执行过程
- 新生成一个对象
- 设置原型：obj.__proto__ = FunctionA.prototype
- 绑定this: FunctionA.call(this)
- 返回新对象（如果改造函数没有的话）

### 10. instanceof原理
在原型链上如果能找到`constructor.prototype` 与 该构造函数的`prototype`相等，就返回true

### 11. 类型判断
- 基本类型（null）: 使用`String(null)='null'`
- 基本类型（string/number/boolean/undefined）+ function: 直接使用`typeof`
- 其余引用类型（Object/Array/Date/RegExp/Error）： 调用`toString`后根据`[object xxx]`进行判断

### 12. 代码复用
- 函数封装
- 继承`extend`
- 混入`mixin`
- 借用`apply/call`

### 13. 继承
- 最优化：圣杯模式
  ```js
  let inherit = (function() {
    let F = function() {}
    return function(c, p)  {
      F.prototype = p.prototype
      c.prototype = new F()
      c.prototype.constructor = c
    }
  })()
  ```
- class / extends


### 14 模块化
在较大规模的复杂项目中，模块化可以提高项目的可维护行、可拓展性以及协作开发
- es6: import export
- commonJS: require module.exports exports

### 15 防抖和节流
#### 防抖：高频操作只执行最后一次
- 场景：用户输入，只需要在输入完成后做一次校验即可
- 实现:
  ```js
  function debounce(fn, wait) {
    let timer = null
    return function() {
      let context = this
      let args = arguments
      if(timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn.call(context, ...args)
      }, timer)
    }
  }
  ```

#### 节流 每隔一段时间后执行一次 降低频率
- 场景：滚动条时间，每隔100~500ms执行一次
- 实现：
  ```js
  function throttle(fn, wait) {
    let timer = null
    return function() {
      let context = this
      let args = arguments
      if(!timer) {
        setTimeout(() => {
          fn.call(context, ...args)
          timer = null
        }, wait)
      }
    }
  }
  ```

### 16 this的指向
- 什么是this?  
由于JS的设计原理：在函数中，可以引用运行环境的变量，因此就需要一个机制来让我们可以在函数内部获取当前的运行环境，这便是`this`

- this指向谁？  
因此要明白`this`指向，其实就是要搞清楚函数的运行环境，也就是`谁调用了函数`。例如：
  - `obj.fn()`,`obj`调用了函数，所以`this === obj`
  - `fn()`, 这里可以看成`window.fn()`， 所以`this === window`

- 改变this指向  
  - call: `fn.call(target, ...args)`
  - apply: `fn.apply(target, [...args])`
  - bind: `fn.bind(target)(...args)`

### 17 ES6/ES7
- 声明：  
  - let / const: 块级作用域、不存在变量声明提升、临时死区、不允许重复声明
  - const: 常量
- 解构赋值
- class / extends： 类的声明与继承
- Set / Map: 新的数据结构
- 异步解决方案：
  - promise
  - generator
  - async/await

### 18. AST
抽象语法树（Abstract Syntax Tree）,是将代码逐字母解析成`树形结构的对象`。这是语言之间转换、代码语法检查、代码风格检查、代码格式化、代码高亮、代码错误提示、代码自动补全等等的基础。

### 19. babel编译原理
- Babylon：将ES6/7代码解析成AST
- babel-traverse对AST进行遍历，得到新的AST
- 新的AST通过babel-generator转换成es5

### 20. 函数柯里化
通过`预置通用参数`将`多参数函数`转化为`单一参数函数`
```js
function add(a, b) {
  return a + b
}
let sum = add(1, 2)
// 转化
function add(a) {
  return function(b) {
    return a + b
  }
}
let add1 = add(1)
let sum = add1(2) // 3
```
### 21 数组
- map
- forEach: 无法break 可以用`try/catch`中`throw new Error`来停止
- filter：过滤
- some: 有一项返回`true`，则返回`true`
- every: 有一项返回`false`，则返回`false`
- join: 生成字符串, （split, 字符串转数组）
- push / pop
- unshift / shift
- sort / reverse
- concat
- slice
- splice
- indexOf
- reduce
- 数组乱序
  ```js
  let arr = [1, 2, 3,4 ,5 ,6]
  arr.sort(() => {
    return Math.random() - 0.5
  })
  ```
- 数组拆解
  ```js
  // [1,[2,3]] --> [1, 2, 3]
  Array.prototype.flat = function() {
    return this.toString().split(',')
  }
  ```