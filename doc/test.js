// const obj = {
//     say() {
//         Array.from(arguments).forEach(item => {
//             console.log(`${this.str} ${item}`)
//         })
//     }
// }
// Object.defineProperties(obj, {
//     'str': {
//         value: 'hello',
//         writable: false
//     }
// })
// const objZh = {}
// Object.defineProperties(objZh, {
//     'str': {
//         value: '你好',
//         writable: false
//     }
// })

// // 方法一
// function f() {
//     obj.say.call(objZh, ...arguments)
// }

// // 方法二
// const f1 = (...arg) => {
//     Object.assign(objZh, obj)
//     objZh.say(...arg)
// }

// // 方法三
// let o = {
//     get str() {
//         return objZh.str
//     },
//     say: obj.say
// }

console.log()