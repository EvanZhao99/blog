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

// bodyparser中间件
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

// betterBody中间件 解析文件上传
let betterBody = (options) => {
    return async (ctx, next) => {
        let uploadDir = options.uploadDir
        
    }
}

app.use(async (ctx, nex) => {
    if(ctx.path === '/form' && ctx.method === 'POST') {
        let obj = await bodyparser(ctx)
        if(obj.username === 'admin') {
            ctx.body = 'ok'
        } else {
            ctx.body = 'no'
        }
    }
})
app.listen(5000)