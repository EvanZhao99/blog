let url = require('url')

let request = {
    // 获取原生req上的method
    get method() {
        return this.req.method
    },
    get path() {
        return url.parse(this.req.url).pathname
    }
    // ...
}

module.exports = request