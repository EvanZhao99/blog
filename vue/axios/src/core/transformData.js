
const utils = require('./../utils')


/**
 * Transform thi data for a request or a response
 */
module.exports = function tranformData(data, headers, fns) {
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers)
  })

  return data
}