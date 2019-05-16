let buf1 = Buffer.from('珠')
let buf2 = Buffer.from('峰')

// 手写contcat
// 获取buffer总长度 遍历 copy 维护偏移量
Buffer.concat = function(bufferList, len=bufferList.reduce((a,b)=> a+b.length,0)) {
    let buffer = Buffer.alloc(len)
    let offset = 0
    bufferList.forEach(buf => {
        buf.copy(buffer, offset)
        offset = offset + buf.length
    })
    return buffer
}
console.log(Buffer.concat([buf1,buf1,buf2]).toString())

// split
// indexof 维护偏移量
Buffer.prototype.split = function(sep) {
 let arr = []
 let offset = 0
 let len = Buffer.from(sep).length
 while((current = this.indexof(sep, offset)) !== -1) {
    arr.push(this.slice(offset, current))
    offset = current + len
 }
 arr.push(this.slice(offset))
 return arr
}