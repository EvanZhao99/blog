# es6
## 一、symbol
### 1 概述
是什么: `Symbol`是es6引入的一种原始数据类型，表示独一无二的值。  
为什么： `es5`的对象属性名都是字符串，容易造成属性名冲突，symbol可以从根本上防止属性名冲突  
使用场景： 为原有的对象添加属性和方法，或者创建对象是避免属性被后来者重写覆盖。
### 2 usage
symbol的值通过`Symbol`函数生成。对象属性名的类型有两种：`string`/`symbol`
```js
let s = Symbol()
typeof s
// "symbol"
```
`Symbol`函数接受一个字符串参数
```js
let s1 = Symbol('foo')
s1.toString() // "Symbol(foo)"
```
如果参数是对象，则调用该对象的toString方法
```js
let obj = {
  toString() {
    return 'abc'
  }
}
let s = Symbol(obj)
s // Symbol(abc)
```
> symbol值不能与其他类型的值进行计算，会报错  
> symbol值可以显示转换为字符串  
> symbol值可以转换为Boolean值，但不能转换为number

### 3 Symbol.prototype.description
可以直接获取symbol的描述值
```js
const s = Symbol('foo')
s.description // 'foo'
```
### 4. 作为属性名

### 5. 属性名遍历
symbol作为属性名，遍历对象的时候，该属性不会出现在`for...in``for...of`循环中，也不会被`Object.keys()``Object.getOwnPropertyNames()``JSON.stringify()`返回。可以借此特点实现非私有的内部方法
### 6. 获取方式
#### 6.1 Object.getOwnPropertySymbols()
获取所有symbol属性名
#### 6.2 Reflect.ownKeys()
返回所有类型的属性名

### 7 Symbol.for()、Symbol.keyFor()
`Symbol.for()`创建一个新的symbol，并将其登记在全局环境中供搜索，下次调用时先检查是否存在该key值对应的symbol，存在就直接返回，不存在就新建。
> 可以在不同的iframe或service worker中取到同一个值  

`Symbol.keyFor()`返回一个已登记的Symbol类型的key,不会返回`Symbol()`创建的symbol的key

### 8. 内置的Symbol值
。。。

## 二、模块
### 1.标准
- commentjs
- AMD
- es

#### 1.1为什么ES模块比CommenJS更好？
ES是官方标准，也是JS语言明确的发展方向，而CommentJS模块是ES出来之前的一种临时解决方案。ES模块支持`静态分析`，从而实现向tree-shaking、按需加载等优化，并提供循环引用和动态绑定等功能。  

CommenJS的模块是在执行的时候加载的，会创建一个模块对象，通过这个对象去访问模块的属性和方法，代码会被全部加载进来。