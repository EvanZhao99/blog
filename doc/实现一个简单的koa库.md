

## 零、写在前面
本文内容简介：
- koa应用
- 实现简单的Koa库
  - use
  - listen
  - ctx.method
  - ctx.body
  - ctx.body=
- 实现bodyparse中间件

## 一、基本用法
使用`Koa`起一个HTTP服务
```js
let Koa = require('koa')

let app = new Koa()

app.use(async (ctx, next) => {
    ctx.body = 'hello world'
})

app.listen(5000)
```
## 二、Koa实现原理
Koa本质上是用`优雅`的方式对`http`进行了一层包装，并没有内置额外的功能。  

koa内部执行过程：
1. 监听请求，获取request内容
2. 执行中间件 根据request内容进行一系列操作，将结果赋值给`ctx.body`属性
3. 通过`req.end(ctx.body)`将相应结果返回
Koa实例的方法只有两个:`use`和`listen`
### 1. Koa中间件
koa中间件的原理其实很简单，和`VueRouter的beforeEach`、`redux中间件`的原理都差不多
```js
class Application{
    // 聚合 执行所有中间件
    compose(ctx, middlewares) {
        async function dispatch(index) {
            if(index === middlewares.length) {
                return false
            }
            try{
                let middle = middlewares[index]
                // 执行当前中间件 将下一个中间件作为next参数
                middle(ctx, () => dispatch(index++))
            }
            catch(e) {
                this.emit('error', e)
            }
            
        }
        dispatch(0)
    },
    use(middleware) {
        this.middlewares.push(middleware)
    }
}
```
### 2. listen函数
```js
class Application{
    listen() {
        let server = http.createServer(this.handleRequest())
        server.lister(...arguments)
    }
}
```
### 3. ctx
Koa把req和res整合到了ctx上 同时扩展了一些其他的属性和方法。  
req/res是原生的，request、response自己封装的
```js
function createContext(res, req) {
    let ctx = this.ctx
    ctx.request = this.request
    ctx.response = this.response
    // 将原生的请求响应也放到自己封装的request、response上
    ctx.req = ctx.request.req = req
    ctx.res = ctx.request.res = res
    return res
}
```
### 4. ctx属性取值 & ctx.method
当访问`ctx.method`时，会读取`ctx.request.method`的值
```js
app.use(async ctx => {
    consle.log(ctx.method === ctx.request.method) // true
})
```
可以通过`__difineGetter__`实现
```js
let ctx = {}

// 如果去ctx取值，转换成去ctx.request上取值
function defineGetter(property, key) {
    context.__defineGetter__(key, function() {
        return this[property][key]
    })
}

defineGetter('request', 'method')
```
### 5. ctx属性赋值 & ctx.body=
当给`ctx.body`赋值时，`ctx.response.bodoy`的值也会改变
```js
app.use(async ctx => {
    ctx.body = 'hello world'
    consle.log(ctx.response.body) // hello world
})
```
可以通过`__difineSetter__`实现
```js
let ctx = {}

// 如果在ctx设置值 会转换为去ctx.resposne上设置值
function defineSetter(property, key) {
    context.__defineSetter__(key, function(value) {
        this[property][key] = value
    })
}

defineSetter('response', 'body')
```
## 三、实现中间件
中间件本质是一个函数，参数为执行上下文`ctx`
1. 中间件执行顺序为从上到下（洋葱模型），具体可看`compose`函数的实现原理
2. 每个中间件都可以决定是否向下执行，向下执行需要调用`next`函数
3. 可以根据 第二条 做权限校验
4. 返回一个async函数 确保执行顺序

### 1. 实现bodyparse中间件
通过`querystring`对请求数据进行解析，然后返回解析结果
```js
let bodyparser = (ctx) => {
    return async (ctx, next) => {
        await new Promise((resolve, reject) => {
            let arr = []
            // 拿到buffer数据
            ctx.req.on('data', function(data){
                arr.push(data)
            })
            ctx.req.on('end', function() {
                // 将buffer转化为字符串 再解析
                let obj = require('querystring').parse(Buffer.concat(arr).toString())
                ctx.request.body = obj
                resolve()
            })
        })
        next()
        
    }
    return 
}
```
### 2. 实现static中间件
```js
let fs=  require('fs');
let fsPromise = fs.promises;
let path = require('path');
let mime = require('mime');

function static(pathname) {
    return async(ctx, next) => {
        console.log(pathname, ctx.path)
        let requestPath = path.join(pathname, ctx.path)
        console.log(requestPath, pathname, ctx.path)
        try{
            let statObj = await fsPromise.stat(requestPath)
            if(!statObj.isFile()) {
                requestPath = path.join(requestPath, 'index.html')
            }
            ctx.set('Content-Type',mime.getType(requestPath)+';charset=utf8')
            ctx.body = fs.createReadStream(requestPath)
        }
        catch(e) {
            return next()
        }
    }
}

module.exports = static
```
### 四、源码
[源码地址](https://github.com/pluckychuang/blog/tree/master/3node/koa)
本地演示：
1. download该目录下代码
2. npm i
3. 执行`server.js`演示中间件
4. 执行`test.js`演示Koa库
