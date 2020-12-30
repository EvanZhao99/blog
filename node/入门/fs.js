const fs = require('fs')

// fs.writeFile(path, data, callback)
// fs.readFile(path, data, callback)

// fs.writeFile('./a.txt', 'abcdefghijklmnopqrstuvwxyz', err => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('成功')
//   }
// })

fs.readFile('./a.txt', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})