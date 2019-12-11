/**
 * @file xhr
 * @progress finish
 * @思路 1）创建xhr对象；2）调用open（）；3）监听readystatechange，处理response；
 *      4）处理request headers；5）根据需求监听各种事件
 */
var utils = require('./../utils');
var settle = require('./../core/settle');
var buildURL = require('./../helpers/buildURL');
var buildFullPath = require('../core/buildFullPath');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');

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
      // base64编码字符串转ASCII
      requestHeaders.Authorization = 'Basic' + btoa(username + ":" + password)
    }

      let fullPath = buildFullPath(config.baseURL, config.url)
      // xhr.open
      request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true)
      
      // Set the request timeout in MS
      request.timeout = config.timeout

      // Lister for reader state
      request.onreadystatechange = function handleLoad() {
        if(!request || request.readyState !== 4) {
          return 
        }

        // The request errored out and we didn't get a response, this will be 
        // hadled by onerror instead
        // With one exception: request that using file: protocol,most browsers
        // will return status as 0 even thogh it's a successful request
        if(request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return 
        }

        //  Prepare the response
        let responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null
        let responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response
        let response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config: config,
          request: request
        }

        settle(resolve, reject, response)

        // Clean up request
        request = null
      }

      // Handle browser request cancellation (as opposed to amanual cancellation)
      // 请求取消处理
      request.oabort = function handleAbort() {
        if(!request) {
          return
        }

        reject(createError('Request aborted', config, 'ECONNABORTED', request))

        // Clearn up reuqest
        request = null
      }

      // Headle low level network errors
      request.onerror = function handleError() {
        // Real errors are hidden from us by the browser
        // onerror should only fire if it's a network error
        reject(createError('Network Error', config, null, request))

        // Clean up request
      }

      // Handle timeout
      request.ontimeout = function handleTimeout() {
        let timeoutErrorMessage = 'timeout of' + config.timeout + 'ms exceeded'
        if(config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage
        }
        reject(createError(timeoutErrorMessage, config, 'ECONNABORTED', request))

        // Clean up request
        request = null
      }

    // Add xsrf header
    // This is only done if runnig in a standard browser environment
    // Specifically not if we're in a web worker, or react-native
    // xsrf 只能在浏览器环境运行
    if(utils.isStandardBrowserEnv()) {
      let cookies = require('./../helpers/cookies')

      // Add xsrf header
      let xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined

      if(xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue
      }
    }

    // Add headers to the request
    if('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if(typeof requestData === 'undefined' && key.toLowerCase() === 'content-type')  {
          delete requestHeaders[key]
        } else {
          request.setRequestHeader(key, val)
        }
      })
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true
    }

    // Add responseType to request if needed
    if(config.responseType) {
      try {
        request.responseType = config.responseType
      } catch(e) {
        // Expected DOMException thrown by browsers not comptible XMLHttpRequest Level 2
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function
        if(config.responseType !== 'json') {
          throw e
        }
      }
    }

    // Heandle progress if needed
    if(typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress)
    }

    // Not all browsers support upload events
    if(typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('proress', config.onUploadProgress)
    }

    if(config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if(!request) {
          return
        }

        request.abort()
        reject(cnacel)

        // Clean up request
        request = null
      })
    }

    if(requestData === undefined) {
      requestData = null
    }

    // Send the request 
    request.send(requestData)
  })
}