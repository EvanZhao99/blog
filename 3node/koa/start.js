let Koa = require('koa')
let app = new Koa()

app.use(ctx => {
    // 把req和res整合到了ctx上 同时扩展了一些其他的属性和方法
    // req/res是原生的，request、response自己封装的
    console.log(ctx.req.method) // get
    console.log(ctx.request.req.method) // get
    console.log(ctx.request.method) // get

    // 1. 实现
    console.log(ctx.method) // get

    // 2. 实现
    ctx.body = 'hello world'
    console.log(ctx.response.body) // hello world
})

app.listen(5000)