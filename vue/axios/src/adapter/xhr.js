


module.exports = function xhrAdaper(config) {
  // 发送xhr请求，并返回一个promise
  return new Promise(function dispatchXhtRequest(resolve, reject) {
    let requestData = config.data
    let requestHeaders = config.headers

    // 如果是formdata类型数据 不设置Content-Type,浏览器会自动加上
    if(utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type'] // Let the browser set it
    }

    let request = new XMLHttpRequest()

    // Http basic authentication
    if(config.auth) {
      let username = config.auth.username || ''
      let password = config.auth.password || ''
      requestHeaders.Authorization = 'Basic' + btoa(username + ":" + password)
    }
  })
}