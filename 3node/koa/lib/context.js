

let context = {}

// 如果去ctx取值，转换成去ctx.request上取值
function defineGetter(property, key) {
    context.__defineGetter__(key, function() {
        return this[property][key]
    })
}

// 如果在ctx设置值 会转换为去ctx.resposne上设置值
function defineSetter(property, key) {
    context.__defineSetter__(key, function(value) {
        this[property][key] = value
    })
}

defineGetter('request', 'method')
defineGetter('request', 'path')
defineGetter('response', 'body')

defineSetter('response', 'body')

module.exports = context