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
    handleRequest() {
        return (req, res) => {
            this.fn(req, res)
        }
    }
    listen() {
        // 可以保证this不错乱
        let server = http.createServer(this.handleRequest())
        server.lister(...arguments)
    }
}