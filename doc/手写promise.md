* 高阶函数：参数为函数，预置参数
* 函数柯里化：
* 偏函数：
* AOP：面向切片编程。把原来的代码切成片， 在在中间加入自己的代码
* includes
* 
* 异步不能使用 try catch
* 同步“异步的返回结果”
* 错误优先
* 宏任务 微任务
- 
```
function a() {
    function f() {}
    return f
}
function a () {
    return function() {}
}
哪个性能高
```
- 发布 -> 代理 -> 订阅
- 观察者模式 （与发布订阅的区别）
- Vuex 发布订阅 proxy
- 
- 异步缺陷：
- 1 回调地狱
- 2 错误问题 不能使用try-catch
- 3 同步“异步问题需要自己维护计数器”
- 
# promise
- 是一个类 new Promise
- 含义；承诺。
- 两个值：value，reason
- 三个状态：成功态；失败；等待
- 一个promise可以then多次，
### then
- return一个常量 包括undefined,会传到下一个then
- 如果then方法中抛出异常 会走到下一个then的catch中
- 穿透 如果没有处理错误 继续向下找
- catch不会中断then链
- 如果返回一个promise 状态会传给下一个then
- 失败 两种可能 错误 失败的promise
- finally es9 只是一个肯定执行的函数
- promise一旦成功就不能再改为失败状态
- 每次调用then会返回一个新的promise
- 写promise时需要遵循规范
- 不同promise可能会混用，需要考虑别人的promise出错的情况
- x 与 proise2不能相等
- typeof 检测前三位？？？
- 避免多次取then, then.call(x, y=>{})
- 测试： promise/A+
- promise.defer
- 执行promise`promise.then`
- catch 是没有“成功”的`then`方法
- fn(...arguments) 箭头函数向上查找？？？
- 
# generator es6语法
- 异步迭代 自执行函数实现（递归）
- 



### tem
- typeof instanceof constructor object.toString
- promisify promisise化
- mz 模块 将node模块都进行了promise包装
- console.dir()f????
- 类数组？？？
- 迭代器会不断调用next,直到`done===true`
- ti co 大牛 GitHub
- 1.toString() // 报错
- 1.1.toString() // 不报错
- console.log(typeof 1+ + '123') // Number


### 作业
- finally的实现
- promise流程写一遍
- 答题
- 
### next
- 周三五：es6 map set symbol reduce compose
- 周日：node核心应用