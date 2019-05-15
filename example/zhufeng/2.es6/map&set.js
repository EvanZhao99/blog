let arr1 = [1,2,3,1,2]
let arr2 = [3,4,5,3,1]

// 并集
function union() {
  let s = new Set([...arr1, ...arr2])
  return [...s]
}

// 交集
function intersection() {
  let s1 = new Set([...arr1])
  let s2 = new Set([...arr2])
  return [...s1].filter(item => {
    return s2.has(item)
  })
}

// 差集
function deff() {
  let s1 = new Set([...arr1])
  let s2 = new Set([...arr2])
  return [...s2].filter(item => {
    return !s1.has(item)
  })
}
console.log(intersection())
console.log(union())
console.log(deff())

// map
let a = {b: 1}
let map = new Map()
map.set(1, a)
a = null
console.log(map)