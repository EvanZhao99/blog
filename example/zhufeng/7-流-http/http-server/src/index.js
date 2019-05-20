let http = require('http')
// let chalk = require('chalk')
let url = require('url')
// let fs = require('mz/fs')


class Server{
    constructor(config) {
        this.config = config
    }
    start() {
        console.log(this)
        let server = http.createServer(this.handleRequest.bind(this))
        server.listen(this.config.config, () => {
            console.log(`Starting up http-sever http:localhost:${this.config.port}`)
        })
    }
    async handleRequest(req, res) {
        console.log(this)
    }
}
new Server({port: 8080}).start()