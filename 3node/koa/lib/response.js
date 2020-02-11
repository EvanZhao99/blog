

let response = {
    _body: '',
    get body() {
        return this._body
    },
    set body(value) {
        // 设置body 自动将状态码置为200
        this.res.statusCode = 200
        this._body = value
    }
}

module.exports = response