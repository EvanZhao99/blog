

/**
 * axios构造函数
 * Create a new isntance of Axios
 */
function Axios() {

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

}