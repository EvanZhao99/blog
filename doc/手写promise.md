## tem
- 三个状态： fulfilled、padding、rejected
- 两个值：value、reason
- 一个方法：then
- 默认padding，可以转化为fulfilled和rejected,只能更改一次


## promise 内部执行过程
以ajax请求为例：
 1. 创建promise实例: 传入executor(resolve, reject) 立即执行函数 两个回调
 ```javascript
 let extcutor = (resolve, reject) => {
     try{
         // todo
         resolve()
     }catch(e) {
         reject(e)
     }
     
 }
 new Promise(executor)
 ```
 2. 构造函数会进行一些列初始化，创建相应变量保存数据，并执行相应操作，具体请看步骤3-6
 3. 创建：value reason 两个参数，分别保存成功的值 失败原因
 3. 创建：status 三个状态：pending/fulfilled/rejected
 1. 创建：resolveCallbacks rejectCallbacks 存放成功或失败的回调
 1. 执行；executor,发送ajax请求
 7. 执行：then 接收onfulfilled，并push到resolveCallbacks; 接收onrejected,并push到rejectCallback
 1. 监听http状态：
    *  成功：执行resolve 1.将status值变为fulfilled; 2.创建一个微任务，遍历resovelCallbacks并执行所有callback
    *  失败：执行reject 1. 将status值变为rejected; 2. 创建一个微任务， 遍历rejectCallbacks并执行所有callback
 1. 执行完主线程所有宏任务，然后清空微任务，此时执行onfulfilled或onrejected

```javascript
let resolvePromise = (promise2, x, resolve, reject) => {
    // 判断x的类型 来处理promise2是成功还是失败
    // 所有的promise都遵循规范 不同的人实现的promise库可能不同
    // 尽可能考虑周全 要考虑别人的promise出错的情况
    if(promsie2 === x) {
        return reject(new TypeError('循环引用'))
    }
    // 判断x是不是一个promise 这个x可能不是自己的promise 为了保证安全 需要进行校验 防止一起调用成功和失败
    if(typeof x === 'function' || (typeof x === 'object' && x !== null)) {
        let called; // 维护该变量 判断是否调用过resolve/reject 防止两者一起调用
        
        // 此步骤使用`try-catch`是为了防止调用外部promise.then报错，考虑到第三方作者可能采用`defineProperty`重写then方法的getter时抛异常，并且只取一次，以后使用call方法调用
        try{
            let then = x.then;
            if(typeof then === 'function') {
                then.call(x, y => {
                    if(called) {
                        return
                    }
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if(called) {
                        return
                    }
                    called = true
                    reject(r)
                })
            } else {
                resolve(x)
            }
        }catch(e) {
            if(called) {
                return
            }
            called = true
            reject(e)
        }
    }else {
        resolve(x)
    }
}
class Promise{
    constructor(executor) {
        this.status = 'pending';
        this.value
        this.reason;
        this.resolveCallbacks = [] // 当then是pending时 我希望把成功的方法都放到数组当中
        this.rejectCallbacks = []
        let resolve = (value) => {
            // 如果是promise就调用这个promise的then方法
            if(value instanceof Promise) {
                return value.then(resolve, reject)
            }
            if(this.status == 'pending') { // 保证状态只改变一次
                this.status = 'fulfilled'
                this.value = value
                this.resolveCallbacks.forEach(fn => fn()) // 发布
            }
        }
        let reject = (reason) => { // 保证状态只改变一次
            if(this.status === 'pending') {
                this.status = 'rejected'
                this.reason = reason
                this.rejectCallbacks.forEach(fn => fn())
            }

        }
        // 立即执行函数为外部提供 使用try-catch比较稳妥
        try{
            executor(resolve, reject)
        } catch(e) {
            reject(e)
        }
    }
    // 根据状态执行成功或失败的回调，并根据callback返回结果做相应的处理，最后返回一个新的promise
    then(onfulfilled, onrejected) {
        onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : value => value;
        onrejected = typeof onrejected === 'function' ? onrejected : reason => {throw reason};
        // 创建一个新的promise
        let promise2;
        promise2 = new Promise((resolve, reject) => {
            if(this.status === 'fulfilled') {
                setTimeout(() => {
                    try{
                        let x = onfulfilled(this.value);
                        // x是普通值还是promise 如果是普通值 直接调用promise2的resolve
                        // 如果是promise 那应该让x这个promise执行x.then
                        resolvePromise(promise2, x, resolve, reject)
                    }catch(e) {
                        reject(e)
                    }
                },0)
            }
            if(this.status === 'rejected') {
                setTimeout(() => {
                    try{
                        let x = onrejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch(e) {
                        reject(e)
                    }
                })
            }
            if(this.status == 'pending') {
                this.resolveCallbacks.push(() => {
                    setTimeout(() => {
                        try{
                            let x = onfulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        }catch(e) {
                            reject(e)
                        }
                    }, 0)
                })
                this.rejectCallbacks.push(() => {
                    setTimeout(() => {
                        try{
                            let x = onrejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        }catch(e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        })
        return promise2
    }
    catch(rejectCallback) {
        this.then(null, rejectCallback)
    }
    finally(callback) {
        this.then(callback, callback)
    }
}

Promise.resolve = function(value) {
    return new Promise((resolve, reject) => {
        resolve(value)
    })
}
Promise.reject = function(value) {
    return new Promise((resolve, reject) => {
        reject(reason)
    })
}
module.exports = Promise
```
## 测试

1. 暴露一个方法 这个方法需要返回一个对象 对象上需要有 promise resolve reject 三个属性
```js
Promise.defer= Promise.deferred = function() {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return 
}
```
2. 全局安装测试工具 sudo npm instal promises-aplus-tests -g
3. 配置脚本
```js
// package.json文件
{
  "scripts": {
    "test": "promises-aplus-tests ./src/promise.js"
  }
}

```
4. 执行脚本
```js
npm run test
```