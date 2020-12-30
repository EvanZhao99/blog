let http = require('http')
let context = require('./context')
let request = require('./request')
let response = require('./response')
let Emitter = require('events')
let Stream = require('stream')

let ctx = Object.create(context)

class Application extends Emitter {
    constructor() {
        super()
        // 保证context内容不被污染 
        this.ctx = Object.create(context)
        this.request = Object.create(request)
        this.response = Object.create(response)
        this.middlewares = []
    }
    use(fn) {
        // 存储中间件
        this.middlewares.push(fn)
    }
    createContext(req, res) {
        let ctx = this.ctx
        ctx.request = this.request
        ctx.response = this.response
        // 将原生的请求响应也放到自己封装的request、response上
        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res
        return ctx
    }
    // 聚合 执行所有中间件
    compose(ctx, middlewares) {
        async function dispatch(index) {
            if(index === middlewares.length) {
                return false
            }
            try{
                let middle = middlewares[index]
                // 执行当前中间件 将下一个中间件作为next参数
                middle(ctx, () => dispatch(index+1))
            }
            catch(e) {
                this.emit('error', e)
            }
            
        }
        return dispatch(0)
    }
    handleRequest() {
        return (req, res) => {
            let ctx = this.createContext(req, res)
            // 将所有中间件封装成一个promise 
            let p = this.compose(ctx, this.middlewares)
            // 相应结果
            p.then(() => {
                let body = ctx.body
                // 文件流 管道返回
                if(body instanceof Stream) {
                    body.pipe(res)
                } else if(typeof body === 'object') {
                    // 对象转json 返回
                    ctx.set('Content-Type', 'application/json')
                    res.end(JSON.stringify(body))
                } else if(typeof body === 'string' || Buffer.isBuffer(body)) {
                    // 字符串 buffer 直接返回
                    res.end(body)
                } else {
                    res.end('NOT Found')
                }
            }, (err) => {
                this.emit('error', err)
                ctx.statusCode(500)
                res.end('server internal error')
            })
        }
    }
    listen() {
        // 可以保证this不错乱
        let server = http.createServer(this.handleRequest())
        server.listen(...arguments)
    }
}

module.exports = Application