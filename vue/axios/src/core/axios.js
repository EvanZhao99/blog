
const mergeConfig = require('./mergeConfig')
const InterceptorManage = require('./interceptorManage')
const dispatchRequest = require('./dispatchRequest')

/**
 * axios构造函数
 * Create a new isntance of Axios
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig
  this.interceptors = {
    request: new InterceptorManage(),
    response: new InterceptorManage()
  }
}

/**
 * requst函数（实际上我们平时创建的axios实例就是该函数，扩展了各种属性和方法）
 */
Axios.prototype.request = function request(config) {
  // 兼容参数形式 axios(url, config) / axios(config)
  if(typeof config === 'string') {
    config = arguments[1] || {}
    config.url = arguments[0]
  } else {
    config = config || {}
  }

  config = mergeConfig(this.defaults, config)

  // Set config.method
  // 处理请求类型method,兼容大小写
  if(config.method) {
    config.method = config.method.toLowerCase()
  } else if(this.defaults.method) {
    config.method = this.defaults.method.toLowerCase()
  } else {
    config.method = 'get'
  }

  // Hook up interceptors middleware
  // 链接拦截器中间件
  // 请求发送放到中间，请求拦截放在前面，响应拦截后面；通过promise链式调用
  let chain = [dispatchRequest, undefined] 
  let promise = Promise.resolve(config)

  // 将requestInterceptor加到chain开头
  this.interceptors.request.forEach(function unshiftRequstInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected)
  })

  // 将responseInterceptor加到chain结尾
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected)
  })

  while(chain.length) {
    promise = promise.then(chain.shift(), chain.shift())
  }

  return promise
}

// URL统一资源定位符
// URI统一资源标识符
Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config)
  return buildURl(config.url, config.params, config.paramsSrializer).replace(/^\?/, '')
}

// Provide aliases for supported request methods
// 为支持的请求方法提供别名
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }))
  }
})

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utiles.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }))
  }
})

mudule.exports = Axios
