// 维护一个额外的变量
let obj = {}
let a = 100
Object.defineProperty(obj, 'a', {
  enumerable: true,
  configurable: true,
  get: function() {
    return a
  },
  set: function(value) {
    a = value
  }
})
console.log(obj.a)

let obj = {
  _a: 110,
  get a() {
    return this._a
  },
  set a(value) {
    this._a = value
  }
}
console.log(obj.a)