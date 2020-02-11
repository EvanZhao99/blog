let Koa = require('./lib/application')

let app = new Koa()

// app.use(async (ctx, next) => {
//     console.log(ctx.req.method) // get
//     console.log(ctx.request.req.method) // get
//     console.log(ctx.method) // get

//     ctx.body = 'hello world'
//     console.log(ctx.response.body) // hello world
// })

app.use(async (ctx,next)=>{ 
    console.log(1);
    ctx.body = 'hello'
    await next()
    console.log(2);
});
app.use(async (ctx,next)=>{ 
    console.log(3);
    ctx.body = 'world'
    await next();
    console.log(4);
})
app.use(async(ctx,next)=>{ 
    console.log(5);
    ctx.body = 'xxx'
    await next();
    console.log(6);
})



app.listen(5000)