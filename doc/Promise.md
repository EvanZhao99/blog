# Promise
JavaScript有很多强大的功能，其中一个是它可以轻松搞定异步编程。在需要执行多个异步操作时，会导致多个回调函数嵌套，导致代码不够直观，就是常说的回调地狱。  
Promise本意是承诺，在程序中的意思就是承诺我过一段时间会给你一个结果。什么时候会用到过一段时间？答案就是异步操作。异步是指可能比较长时间才有结果的任务，如网络请求，读取本地文件等
### 三种状态
- Pending Promise对象实例创建时候等初始状态
- Fulfilled 可以理解为成功等状态
- Rejected 可以理解为失败等状态
> then 方法就是用来指定Promise对象等状态改变时确定执行等操作，resolve时执行第一个函数（onFulfilled),reject时执行第二个函数（onRejected
### 构造一个Promise
##### 1 使用Promise
```
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if(Math.random()>0.5)
            resolve('This is resolve!');
        else
            reject('This is reject!');
    }, 1000);
});
promise.then(Fulfilled,Rejected)
```
- 构造一个Promise实例需要给Promise构造函数传入一个函数
- 传入的函数需要有两个形参，两个形参都是function类型的参数。
第一个形参运行后会让Promise实例处于resolve状态，所以我们一般给第一个形参命名为resolve,使 Promise 对象的状态改变成成功，同时传递一个参数用于后续成功后的操作
第一个形参运行后会让Promise实例处于reject状态，所以我们一般给第一个形参命名为reject,将 Promise 对象的状态改变为失败，同时将错误的信息传递到后续错误处理的操作
##### 2 es5模拟Promise 
```
function Promise(fn) {
    fn((data)=> {
        this.success(data);
    }, (error)=> {
        this.error();
    });
}

Promise.prototype.resolve = function (data) {
    this.success(data);
}

Promise.prototype.reject = function (error) {
    this.error(error);
}

Promise.prototype.then = function (success, error) {
    this.success = success;
    this.error = error;
}
```
##### 3 es6模拟Promise
```
class Promise {
    constructor(fn) {
        fn((data)=> {
            this.success(data);
        }, (error)=> {
            this.error();
        });
    }

    resolve(data) {
        this.success(data);
    }

    reject(error) {
        this.error(error);
    }

    then(success, error) {
        this.success = success;
        this.error = error;
        console.log(this);
    }
}
``` 
### promise 做为函数的返回值
```
function ajaxPromise (queryUrl) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', queryUrl, true);
    xhr.send(null);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.responseText);
        }
      }
    }
  });
}

ajaxPromise('http://www.baidu.com')
  .then((value) => {
    console.log(value);
  })
  .catch((err) => {
    console.error(err);
  });
```
### promise的链式调用
每次调用返回的都是一个新的Promise实例
链式调用的参数通过返回值传递
then可以使用链式调用的写法原因在于，每一次执行该方法时总是会返回一个Promise对象
```
readFile('1.txt').then(function (data) {
    console.log(data);
    return data;
}).then(function (data) {
    console.log(data);
    return readFile(data);
}).then(function (data) {
    console.log(data);
}).catch(function(err){
 console.log(err);
});
``` 
### promise API
- Promise.all
同时执行多个异步，均完成是状态变为resolve
- Promise.race
同时执行多个异步，当有一个完成时状态变为resolve