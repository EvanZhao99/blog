
// 如果onfulfilled或者onrejected的返回值是promise，递归调用
let resolvePromise = (promise2, x, resolve, reject) => {
  // 防止：let p = promise.then(() => p)
  if(promise2 === x) {
    return reject(new TypeError('循环引用'))
  }
  // function or object
  if(typeof x === 'function' || (typeof x === 'object' && x !== null)) {
    let called
    try{
      let then = x.then
      // 判断promise 如果返回值是promise 递归调用then 确保promise执行完载再往下走
      if(typeof then === 'function') {
        // 相当于 x.then(res => resolve(y))
        then.call(x, y => {
          if(called) return
          called = true
          resolvePromise(promise2, y, resolve, reject)
        }, r => {
          if(called) return 
          called = true
          reject(r)
        })
      }else {
        resolve(x)
      }
    }catch(e) {
      // 确保失败只调用一次
      if(called) return
      called = true
      reject(e)
    }
  }else {
    resolve(x)
  }
}

class Promise{
  constructor(executor) {
    this.value
    this.reason
    this.status = 'pending' // 默认pending状态
    this.resolveCallbacks = []
    this.rejectCallbacks = []

    // 三件事：改变状态、value赋值，调用回调
    let resolve = value => {
      if(value instanceof Promise) {
        return value.then(resolve, reject)
      }
      if(this.status === 'pending') {
        this.status = 'fulfilled'
        this.value = value
        this.resolveCallbacks.forEach(fn => fn());
      }
    }

    // 三件事：改变状态、reason赋值，调用回调
    let reject = reason => {
      if(this.status === 'pending') {
        this.status = 'rejected'
        this.reason = reason
        this.rejectCallbacks.forEach(fn => fn());
      }
    }

    try{
      // 执行 立即执行函数
      executor(resolve, reject)
    }catch(e) {
      reject(e)
    }
  }


  then(onfulfilled, onrejected) {
    // 确保回调是function
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val
    onrejected = typeof onrejected === 'function' ? onrejected : r => {throw r}
    let promise2
    promise2 = new Promise((resolve, reject) => {
      // 同步成功 或Promise.then, 直接调用回调函数
      if(this.status === 'fulfilled') {
        setTimeout(() => {
          try{
            let x = onfulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        }, 0)
      }
      // 同步失败
      if(this.status === 'rejected') {
        setTimeout(() => {
          try{
            let x = onrejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          }catch(e) {
            reject(e)
          }
        }, 0)
      }

      // 异步 等待
      if(this.status === 'pending') {
        // 成功回调保存到栈中
        this.resolveCallbacks.push(() => {
          // 为啥要模拟异步？？？
          // promise.then(callback) 回调是异步执行的
          setTimeout(() => {
            try{
              let x = onfulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            }catch(e) {
              reject(e)
            }
          }, 0)
        })
        // 失败回调保存到栈中
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
  catch(rejectFunc) {
    return this.then(null, rejectFunc)
  }
}

Promise.resolve = function(value){
  return new Promise((resolve,reject)=>{
      resolve(value);
  })
}
Promise.reject = function(reason){
  return new Promise((resolve,reject)=>{
      reject(reason);
  })
}

/**
 * 思路：遍历promise，在then方法中对结果进行收集、排序
 */
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    // 收集返回值
    let results = []
    // 计数器
    let i = 0
    let onfulfilled = function (value, index) {
      results[index] = value
      // 当成功的个数与传入参数的个数相等时 执行resolve
      if(++i === promises.length) {
        resolve(results)
      }
    }

    // 遍历promise 
    for(let i = 0; i < promises.length; i++) {
      let current = promises[i]
      if(typeof current === 'object' && current !== null) {
        if(typeof current.then === 'function') {
          current.then(res => {
            onfulfilled(res, i)
          }, reject)
        } else {
          onfulfilled(current, i)
        }
      } else {
        onfulfilled(current, i)
      }
    }

  })
}

/**
 * 思路：遍历promises,在then方法中调用resolve，谁先成功谁执行
 */
Promsise.race = function(promises) {
  return new Promise((resolve, reject) => {
    for(let i = 0; i < promises.length; i++) {
      let current = promises[i]
      if(typeof current === 'object' && current !== null) {
        if(typeof current.then === 'function') {
          current.then(resolve, reject)
        } else {
          resolve(current)
        }
      } else {
        resolve(current)
      }
    }
  })
}

/**
 * 用于测试 暴露defer/resolve/reject方法
 */
Promise.defer= Promise.deferred = function() {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
      dfd.resolve = resolve
      dfd.reject = reject
  })
  return dfd
}

// let test = require("promises-aplus-tests")
// test(Promise)

module.exports = Promise