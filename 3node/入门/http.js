let http = require('http')
let server = http.createServer((req, res) => {
  res.write('abc')
  res.end()
})
server.listen(8080)