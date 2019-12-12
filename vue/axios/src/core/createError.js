
let enhanceError = require('./enchanceError')

module.exports = function createError(message, config, code, request, response) {
  let error = new Error(message)
  return enhanceError(error, config, code, request, response)
}