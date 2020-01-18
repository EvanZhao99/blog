function canSort(current, target) {
  let queue = []
  let i = 0
  while(current.length > 0) {
    console.log(queue, current, target, i)
    if(target[i] === queue[0]) {
      queue.shift()
      i++
    } else if(target[i] === current[0]){
      current.shift()
      i++
    } else {
      queue.push(current.shift())
    }
  }
  console.log(queue, current, target)
  return queue.length === 0

}

console.log(canSort([1,2,3,4,5],[1,2,4,3,5]))