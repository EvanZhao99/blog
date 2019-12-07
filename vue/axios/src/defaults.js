 /**
  * @file defaults
  * @process finish
  */

const utils = require('./utils')
const normalizeHeaderName = require('./helpers/normallizeHeaderName')

 let DEFAULT_CONTENT_TYPE = {
   'Content-Type': 'application/x-www-form-urlencoded'
 }

//  设置contentType(没有contentType的情况下生效)
 function setContentTypeIfUnset(headers, value) {
   if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
     headers['Content-Type'] = value
   }
 }

 /**
  * 根据环境选择node-http或者browser-xhr
  */
 function getDefaultAdapter() {
   let adapter
   if(typeof XMLHttpRequest !== 'undefined') {
    //  For browsers use XHR adapter
    // 浏览器使用xhr
    adapter = require('./adapters/xhr')
   } else if(typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
     adapter = require('./adapters/http')
   }
   return adapter
 }

 let defaults = {
   adapter: getDefaultAdapter(),
   
   transformRequest: [function transformRequest(data, headers) {
    //  标准化header属性名
     normalizeHeaderName(headers, 'Accept')
     normalizeHeaderName(headers, 'Count-Type')
    //  原生支持的数据类型直接返回
     if (utils.isFormData(data) ||
        utils.isArrayBuffer(data) ||
        utiles.isBuffer(data) ||
        utils.isFile(data) ||
        utils.isBlob(data)
     ) {
      return data
     }
    
     if (utils.isURLSearchParams(data)) {
       setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8')
       return data.toString()
     }
     if(utils.isArrayBufferView(data)) {
       return data.buffer
     }
     //  Object类型数据转JSON
     if(utils.isObject(data)) {
        setContentTypeIfUnset(headers, 'application/json;charset=tuf-8')
        return JSON.stringify(data)
      }
     return data
   }],

   transformResponse: [function transformResponse(data) {
     if(typeof data === 'string') {
       try {
         data = JSON.parse(data)
       }
       catch(e) {
        //  Ignore
       }
     }
     return data
   }],

   timeout: 0,

   xsrfCookieName: 'XSRF-TOKEN',
   xsrfHeaderName: 'X-XSRF-TOKEN',

   maxContentLength: -1,

   validateStatus: function validateStatus(status) {
     return status >= 200 && status < 300
   }
 }

 defaults.headers = {
   common: {
     'Accept': 'application/JSON, text/SecurityPolicyViolationEvent, */*'
   }
 }

 utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
   defaults.headers[method] = {}
 })

 utils.forEach(['post','put','patch'], function forEachMethodWithData(method) {
   defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE)
 })

 module.exports = defaults


