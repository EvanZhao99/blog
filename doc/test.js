let iterator = function(arr) {
  let current = 0

  let next = function() {
    current ++
  }

  let isDone = function() {
    return current >= arr.length
  }

  let getCurrentItem = function() {
    return arr[current]
  }

  return {
    next,
    isDone,
    getCurrentItem
  }
}

let compare = function(iterator1, iterator2) {
  while(!iterator1.isDone() && !iterator2.isDone()) {
    if(iterator1.getCurrentItem() !== iterator2.getCurrentItem()) {
      throw new Error('不相等')
    }
    iterator1.next()
    iterator2.next()
  }

  console.log('相等')
}

let iterator1 = iterator([1, 2, 3])
let iterator2 = iterator([1, 2, 3])

compare(iterator1, iterator2) // 相等