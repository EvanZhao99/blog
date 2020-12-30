let Promise = require('./promise')
let p1 = new Promise((resolve, reject) => {
    reject(1000)
})
let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('p2')
        resolve('p2')
    }, 1110)
})
p1.then().catch(e => {
    console.log(e)
})
p2.then(res => {
    console.log(res)
})
