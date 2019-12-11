
/**
 * @file settle
 * @progress finish
 */
let createError = requir('./createError')

/**
 * 处理validateStatus
 */
module.exports = function settle(resolve, reject, response) {
  let validateStatus = response.config.validateStatus
  // 确保没有validateStatus或者validateStatus是有效的
  if(!validateStatus || validateStatus(response.status)) {
    resolve(response)
  } else {
    reject(createError(
      'Request failed with status code' + response.status,
      response.config,
      null,
      response.request,
      response
    ))
  }
}