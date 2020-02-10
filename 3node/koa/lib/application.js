let http = require('http')
let context = require('./context')
let request = require('./request')
let response = require('./response')

let ctx = Object.create(context)

class Application {
    constructor() {
        // 保证context内容不被污染 
         this.ctx = Object.create(context)
         this.request = Object.create(request)
         this.response = Object.create(response)
    }
    use(fn) {
        this.fn = fn
    }
    createContext(res, req) {
        let ctx = this.ctx
        ctx.request = this.request
        ctx.response = this.response
        ctx.req = ctx.request.req = req
        ctx.res = ctx.request.res = res
        return res
    }
    compose(ctx, middlewares) {
        async function dispatch(index) {
            let middle = middlewares[index]
            middle(ctx, () => dispatch(index++))
        }
        dispatch(0)
    }
    handleRequest() {
        return (req, res) => {
            let ctx = this.createContext(req, res)
            // 将所有中间件封装成一个promise 
            let p = this.compose(ctx, this.middlewares)
            // 相应结果
            p.then(() => {
                res.end(ctx.body)
            })
        }
    }
    listen() {
        // 可以保证this不错乱
        let server = http.createServer(this.handleRequest())
        server.lister(...arguments)
    }
}