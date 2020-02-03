# js笔记汇总

## 未归类
1. 高阶函数  
参数或者返回值是函数  
   
```js
  // 使用高阶函数 批量创建类型判断函数
function isType(type) {
  return function(obj) {
    return Object.prototype.toString.call(obj).includes(type)
  }
}

let types = ['String', 'Object','Array','Null','Undefined','Boolean']
let fns = {}
// 批量创建 函数柯里化
types.forEach(type => {
  fns['is' + type] = isType(type)
})

// 测试实例
let obj = true
console.log(fns.isBoolean(obj)) 
console.log(fns.isObject(obj))

// 结果： true  false
```

2. 实现`lodash`的`after`方法
```js
  function after(number, callback) {
    return function() {
      if(--number <= 0) {
        callback()
      }
    }
  }

  // 测试实例
  let done = after(3, function() {
    console.log('已执行三次')
  })

  done()
  done()
  done()
  // 执行结果： 已执行三次
 ```
3. 实现`lodash`的`before`方法
```js
// lodash中的before函数， 面向切片编程（AOP）， Vue实现数组响应式原理
Function.prototype.before = function(fn) {
  let self = this
  return function() {
    fn()
    self(...arguments)
  }
}

// 测试实例
function update() {
  console.log('更新视图')
}
let done = update.before(function() {
  console.log('检查state更新列表')
})
done()

// 结果： 检查state更新列表   更新视图
```
4. 实现深拷贝
```js

function deepClone(obj, hash=new WeakMap()) {
  // null & undefined
  if(obj == null) return obj
  // 正则
  if(obj instanceof RegExp) return new RegExp(obj)
  // 日期
  if(obj instanceof Date) return new Date(obj)
  // 对象 & 数组
  if(hash.has(obj)) return hash.get(obj) // 优化多次引用同一个对象的情况
  let instance = new obj.constructor
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      instance[key] = deepClone(obj[key], hash)
    }
  }
  return instance
}

// 测试实例
let obj = {age: 1}
let students = [obj]
let copyStudents = deepClone(students)
copyStudents[0].age = 2
console.log(obj.age)
console.log(students[0].age)
console.log(copyStudents[0].age)

// 结果： 1 1 2

```
5. 1





## 一、 深入理解原型
### 1.概念  
[ES2019规范](https://www.ecma-international.org/ecma-262/10.0/)对prototype的描述：
  > object that provides shared properties for other objects  

![](./img/prototype_es2019.png)

### 2.理解： 
  
prototype本身就是一个普通的js对象   

类似pubsub pattern 发布/订阅模式，发布者publisher与订阅者subscriber，与其他的普通js对象并没有本质的区别，只是一个约定而已

类比生活中的海军和空军，退役后都是普通人  

### 3.相关方法
- [Object.create ](#二Object.create)
- Object.setPrototypeOf
为一个已有的对象指定原型
### 4.参考：  
  [深入理解 JavaScript 原型](https://mp.weixin.qq.com/s/qg9LNm3awHBao1Du5n6KMQ)


## 二 Object.create 
将指定对象设为原型去实例化一个新的对象
### 1.参数
- prototype  原型
- properties  可枚举属性
### 2.实现原理
```js
Object.create = function(prototype, properties) {
  if(typeof prototype !== 'object') { 
    throw new Error('prototype must be a object')
  }
  function Constructor() {}
  Constructor.prototype = prototype
  let obj = new Constructor()
  if( properties !== undefined) {
    if(!properties || typeof properties !== 'object') {
      throw new Error('properties must be an object')
    }
    Object.defineProperties(obj, properties)
  }
  return obj
}
```
### 3.Object.create(null)和{}的区别？
Object.create(null)返回一个高度纯净的对象，没有原型链，可以自定义`toString、hasOwnProperty`等方法，不用担心覆盖原型链

## 三 hasOwnProperty 
判断是自身属性还是继承属性

## 四. Object.defineProperty
### 1. 参数
- obj
- prop
- descriptor
### 2. 描述符--（数据/存取）
- 数据描述符：value,writeble
- 存取描述符：set,get
- 公共选项：configurable, enumerable
> 数据描述符与存取描述符不能混合使用, 默认值均为false或undefined
#### 1. configurable
configurable特性表示对象的属性是否可以被删除，以及除writable和value特性意外的其他特性是否可以修改
#### 2. writable
属性值是否可以修改
#### 3. enumerable
属性是否可以在`for...in`和`Object.keys()`中被枚举到
#### 4. get
#### 5. set(newValue)

## 四. 函数式编程(FP)
### Monad/Monoid ??

## 五、MutationObserve
监听DOM的改变，在指定DOM改变时被调用
- observe      指定dom、监听内容属性
- disconnect   取消监听
- takeRecords  获取变更队列中所有已检测到但尚未处理的记录

```js
var targetNode = document.querySelector("#someElement");
var observerOptions = {
  childList: true,
  attributes: true
}

var observer = new MutationObserver(callback);
observer.observe(targetNode, observerOptions);


var mutations = observer.takeRecords();

if (mutations) {
  callback(mutations);
}

observer.disconnect();
```
## 六、setImmediate
在其他代码执行完毕会立马执行该回调，用于处理运行时间长的程序
```
var immediateID = setImmediate(func, [param1, param2, ...])
clearImmediate(immediateID)
```

## 七、new 操作符
new操作符一共做了四件事：
- 创建一个空对象
- 给对象指定原型
- 执行构造函数
- 判断构造函数有没有返回值，没有则返回创建的对象

### 1. 实现
```js
function myNew(constructor, ...args) {
  // 创建空对象
  let o = {}
  // 指定原型
  o.__proto__ = constructor.prototype
  let res = constructor.call(o, ...args)
  // 确定返回值，若构造函数的返回值是对象，则将其返回，否则返回新创建的对象o
  return typeof res === 'object' && res !== null ? res : o
}
```

## 八、Array.prototype.slice
返回一个新数组对象，原数组对象不改变。*浅拷贝*
### 1. 参数
- begin  
  起始索引，包含该处元素  
  默认为0
  若参数为负数，表示从倒数第几个开始，slice(-2)表示从倒数第二个开始（包含倒数第一个和倒数第二个）
  若大于数组长度，返回空数组

- end
  终止索引，不包含改处元素
  默认结束为止
  若参数为负数，表示到倒数第几个结束，slice(-2, -1)表示倒数第二个到倒数第一个（只包含倒数第二个，不包含倒数第一个）

### 2. String.prototype.slice(begin, end)
返回一个新的字符串，不改变原来的


## 九、DOM操作优化
现代浏览器已经针对连续的dom操作做了优化，所以不需要再去优化dom操作

## 十、JS数据存储
- 基本数据类型用`栈`存储，引用数据类型用`堆`存储
- 闭包遍历用`堆`存储

### js数据类型
- boolean
- string
- number
- null
- undifined
- symbol
- bigint
- Object
> 除了Object都是基本数据类型

## 十一、顶部导航栏切换动画
### 1 思路
- 布局：nav1与nav2上下罗列，父级容器设置overflow：hidden，只显示一个
- 通过transform:stranslateY(50%)切换，transition：transform实现过渡
- 监听window的sroll事件，通过scrollTop判断滚动方向
- 节流函数处理导航栏的切换

## 十二、数组
- push: 从数组最后添加一个， 并返回数组的长度
- pop: 从数组最后删除一个，并返回该值
- shift: 从数组开头删除一个，并返回该值
- unshift: 从数组开头添加一个， 并返回数组的长度

## 十三、Number
- Number.MAX_SAFE_INTEGER: js中最大的安全整数（2^53 - 1）

## 十四、编码
> 将符号与数字一一对应形成`编码表`  
> 1个字节(Byte)=8个字符(bit)
### 1. 标准
1. ASCII：
   1. 只有127个字母符号（大小写英文、数字和一些符号）
   2. 1个字节，8位2进制，其中一位是0；范围是0-127（0000 0000--0111 1111）
2. Unicode：将所有语言统一到一套代码中；全部2字节，生僻的是4字节
3. UTF-8：
   1. 根据不同的符号设置长度，节省空间；二进制；
   2. 兼容ASCII；
   3. 英文1字节，中文3字节
   4. 格式:只有一个字节高位为0，和ASCII相同；多个字节第一个字节`1的个数`等于字节数，取余`10`开头（1110xxxxxxxx 10xxxxxx 10xxxxxx）

### 2. base64格式
把每3字节（Byte）也就是24位（bit)，转换位4个6位的字节(3 * 8 = 4 * 6)，然后把6bit高位添加两位0，组成4个8bit的字节。理论上会比原来长1/3。

## 十五、XHR
### 1. use
```js
let request = new XMLHttpRequest()
request.open('GET', 'http://www.example.org/example.txt', true)
request.onreadystatechange = function handleLoad() {
  if(!request || request.readyState !== 4) {
    return 
  }
  let res = request.response
}
request.send()
```
### 2. Properties
#### 1. readystate
- 0: UNSENT; 调用`open()`之前
- 1: OPENDE; 调用`open()`
- 2：HEADERS_RECEIVED; 调用`send()`
- 3: LOADING
- 4: DONE;结束

#### 2. response
根据`responseType`返回相应的数据。types有以下几种：
- default：text
- arraybuffer:包含二进制数据的`ArrayBuffer`
- blob
- document: html或者xml
- json
- text

#### 3. responseText
#### 4. responseType
#### 5. responseURL
#### 6. responseXML
#### 7. status
- UNSET: 0
- OPENED: 0
- LOADING: 200
- DONE: 200
#### 8. timeout
设置过期时间

#### 9. upload
监控数据上传对象
```js

xhr.upload.onloadstart = function() {}
xhr.upload.onprogress = function() {}
xhr.upload.onabort = function() {}
xhr.upload.onerror = function() {}
xhr.upload.onload = function() {}
xhr.upload.ontimeout = function() {}
xhr.upload.onloadend = function() {}
```

#### 10. withCredentials

### 2. Events
- load: 请求成功结束
- abort: 取消
- error
- load
- loadend
- loadstart
- progress
- timeout

### 3. methods
- abort
- getAllResponseHeaders
- getResponseHeader
- open
- send
- setRequestHeader

## 十六、安全
### 1. CSRF(cross-site request forgery) 跨站请求伪造
攻击者盗用用户的cookie执行非用户本意的操作
#### 1. 场景
例如一家银行转账操作的URL是: http://www.examplebank.com/withdraw?account=AccoutName&amount=1000&for=PayeeName  
那么，恶意攻击者可以在另一个网站放置如下代码：<img src="http://www.examplebank.com/withdraw?account=Alice&amount=1000&for=Badman">  
如果用户刚访问了银行网站，并且登录信息未过期，那么恶意网站就可以冒充用户身份执行恶意代码，用户将损失1000资金。

#### 2. 防御
- 检查referer
- 添加token校验

### 2 XSS
网站中注入恶意代码。通常是输入框中包含js代码

## 十七、 arguments
`arguments`是一个`类数组对象`，除了`length`之外，没有其他数组的属性和方法
- 转换成数组
```js
let args = Array.from(arguments)
// or
let args = [...arguments]
```
- 非严格模式
在`非严格模式`下，arguments会跟踪参数的变化，如下：
```js
function f(a) {
  arguments[0] = 99
  console.log(a) // 99
}
f(1)

// or
function f(a) {
  a = 99
  console.log(arguments[0]) // 99
}
f(1)

```
> 但是在严格模式、剩余参数、默认参数、结构参数的情况下，arguments不会跟踪参数
```js
function f(a=10) {
  arguments[0] = 99
  console.log(a) // 1
}
f(1)

// or
function f(a=10) {
  a = 99
  console.log(arguments[0]) // 1
}
f(1)

```