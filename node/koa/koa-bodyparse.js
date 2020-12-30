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

module.exports = bodyparser