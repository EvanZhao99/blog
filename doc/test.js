function sum(x, y) {
  if(x === 0 && y === 0) {
    return 1
  } else if(x > 0 && y === 0) {
    return sum(x-1, y)
  } else if(x === 0 && y > 0) {
    return sum(x, y-1)
  } else {
    return sum(x-1,y) + sum(x, y-1)
  }
}
console.log(sum(3, 4))