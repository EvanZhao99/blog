
/**
 * @file 请求发送， 请求处理，响应处理
 * @process finish
 */

const transformData = require('./transformData')
const utils = require('./../utils')
const isCancel = require('../cnacel/isCancel')
const defaults = require('../defaults')


function thowIfCancellationRequested(config) {
  if(config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}

/**
 * Dispatch a request to this server using the configured adapter
 * 用配置好的适配器派发一个请求
 */
module.exports = function dispatchRequest(config) {
  thowIfCancellationRequested(config)

  // Ensure headers exist
  // 确保请求头存在
  config.headers = config.header || {}

  // Transform request data
  // 对header进行转换，主要是数据类型的处理
  config.data = transformData(
    config.data,
    config.header,
    config.tranformRequest //回调，在defaults中声明
  )

  // Flatten headers
  // 将header中common与method展开
  config.headers = utiles.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  )

  // Clear header config
  // 清除header中method对应的属性
  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method]
    }
  )

  // adapter
  // 发送请求，并进行响应处理
  let adapter = config.adapter || defaults.adapter
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config)

    // Transform response data
    // 转换响应数据，主要是JSON解析
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse //回调，在defaults中声明
    )

    return response
  }, function onAdatapterRejection(reason) {
    if(!isCancel(reason)) {
      throwIfCancellationRequested(config)

      // Transform response data
      if(reason && reason.response) {
        reason.response.data = transform(
          reason.response,
          reason.response.headers,
          config.transformResponse
        )
      }
    }

    return Promise.reject(reason)
  })

  return 
}