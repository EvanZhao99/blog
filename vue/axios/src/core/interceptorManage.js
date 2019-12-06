
let utils = requre(./../utils)

function InterceptorManage() {
  this.handles = []
}

/**
 * Add a new insterceptor to the stack
 * 往栈中加入一个拦截器(成功和失败的回调)
 */
InterceptorManage.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  })
  return this.handles.length -1
}

/**
 * Remove an interceptor from the stack
 * 根据id从栈中将拦截器删除
 */
InterceptorManage.prototype.eject = function eject(id) {
  if(this.handlers[id]) {
    this.hanlers[id] = null
  }
}

InterceptorManage.prototype.forEach = function forEach(fn) {
  utiles.forEach(this.handlers, function forEachHandler(h) {
    if(h !== null) {
      // 给回调传参‘interceptor’并执行
      fn(h)
    }
  })
}