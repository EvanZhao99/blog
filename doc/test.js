let Koa = require('koa')

let app = new Koa()

app.use(async (ctx, next) => {
    ctx.body = 'hello world'
})

app.listen(5000)