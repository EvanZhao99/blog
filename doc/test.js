// var isSymmetric = function(root) {
//   if(!root) {
//     return true
//   }
//   if(root.left === root.right) {
//     return true
//   }
//   if(!root.left || !root.right) {
//     return false
//   }
//   if(root.left.val !== root.right.val) {
//     return false
//   }
//   return isSymmetric(root.left) && isSymmetric(root.right)
// }

// let p = {
//   value: 1,
//   left: {value: 2},
//   right: {value: 1}
// }

// let q = {
//   value: 1,
//   left: {value: 1},
//   right: { value: 2}
// }

// console.log(isSameTree(p, q))


Function.prototype.before = function(beforeFn) {
  let self = this
  return function() {
    // 此处的self：原函数；this: 调用before的对象
    beforeFn.call(this, ...arguments)
    return self.call(this, ...arguments)
  }
}

Function.prototype.after = function(afterFn) {
  let self = this
  return function() {
    let res = self.call(this, ...arguments)
    afterFn.call(this, ...arguments)
    return res
  }
}

let fn = function() {
  console.log('me')
}

let beforeFn = function() {
  console.log('before')
}

let afterFn = function() {
  console.log('after')
}

fn = fn.before(beforeFn).after(afterFn)
fn()