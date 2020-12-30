

/**
 * Iterate over an Array or an Object invoking a function for each item
 * 遍历数组或对象
 * @param {*} obj 
 * @param {*} fn 
 */
function forEach(obj, fn) {
  if(obj === null || typeof obj === 'undefined') {
    return 
  }

  // force an array if not already something iterable
  // 若参数不可迭代 强制转为数组
  if(typeof obj !== 'object') {
    obj = [obj]
  }

  if(isArray(obj)) {
    for(let i = 0; i < obj.length; i++) {
      fn.call(null, obj[i], i, obj)
    }
  } else {
    for( let key in obj) {
      if(obj.hasOwnProperty(key)) {
        fn.call(null, obj[key], key, obj)
      }
    }
  }
}

/**
 * Extends object a by mutably  adding to it the properties of object b
 * @param {*} a 
 * @param {*} b 
 * @param {*} thisArg 
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if(thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg)
    } else {
      a[key] = val
    }
  })
  return a
}