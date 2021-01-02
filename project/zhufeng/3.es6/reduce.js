Array.prototype.reduce = (callback, pre) => {
  for(let i = 0; i < this.length; i++) {
    if(typeof pre === undefined) {
      pre = callback(this[i], this[i+1], i+1, this)
      i++
    } else {
      pre = callback(this)
    }
  }
}