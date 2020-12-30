let Promise = require('./promise.js')

let promise = new Promise(function executor(resolve, reject) {
  setTimeout(() => {
    console.log(0)
    reject(1)

  }, 0)
})

promise.then(function onfulfilled(res) {
  console.log(res)
}).catch(function onreject(e) {
  return new Promise(() => {
    console.log(e)
  })
})