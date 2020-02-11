let Koa = require('./lib/application')

let app = new Koa()
let static = require('./koa-static')
let bodyparser = require('./koa-bodyparse')

// app.use(ctx => {
//     console.log(ctx.req.method) // get
//     console.log(ctx.request.req.method) // get
//     console.log(ctx.request.method) // get

//     console.log(ctx.method) // get

//     ctx.body = 'hello world'
//     console.log(ctx.response.body) // hello world
// })

app.use(static(__dirname))

// betterBody中间件 解析文件上传
let betterBody = (options) => {
    return async (ctx, next) => {
        let uploadDir = options.uploadDir
         
    }
}

// app.use(async (ctx, nex) => {
//     if(ctx.path === '/form' && ctx.method === 'POST') {
//         let obj = await bodyparser(ctx)
//         if(obj.username === 'admin') {
//             ctx.body = 'ok'
//         } else {
//             ctx.body = 'no'
//         }
//     }
// })
app.listen(5000)