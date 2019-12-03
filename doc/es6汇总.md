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
symbol作为属性名，遍历对象的时候，该属性不会出现在`for...in``for...of`循环中，也不会被`Object.keys()``Object.getOwnPropertyNames()``JSON.stringify()`返回  
但是，它不是私有属性，可以通过`Object.getOwnPropertyNames()`获取