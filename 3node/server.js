let http = require('http')
let fs = require('fs')

let server = http.createServer((req, res) => {
  fs.readFile(`./${req.url}`, (err, data) => {
      console.log(req.url)
    if (err) {
      res.writeHeader(404)
      res.write('not found')
      console.log(err)
      res.end()
    } else {
      res.write(data)
      res.end()
    }
  })
})
server.listen(8080)