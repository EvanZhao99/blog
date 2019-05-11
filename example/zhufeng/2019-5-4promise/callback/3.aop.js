// AOP 面向切片编程 把原来的代码切成片 再中间加上自己的代码
// 装饰器 扩展原有的方法 重写原有的方法
function say(who) {
    console.log(who+ '说话')
}

Function.prototype.before = function(callback) {
    let self = this
    return function() {
        callback()
        self(...arguments)
    }
}
let newFn = say.before(function(){
    console.log('请问')
})
newFn('我')