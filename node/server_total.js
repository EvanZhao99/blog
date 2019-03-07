let http = require('http')
let url = require('url')
let querystring = require('querystring')

let users = {}

http.createServer((req, res) => {
  let path = '', get = {}, post = {}
  if (req.method === 'GET') {
    let {pathname, query} = url.parse(req.url, ture)

    path = pathname
    get = query
    complete()
  } else if (req.method === 'POST') {
    path = req.url

    let arr = []
    req.on('data', buffer => {
      arr.push(buffer)
    })
    req.on('end', () => {
      let buffer = Bffer.concat(arr)

      post = querystring.parse(buffer.toString())
      complete()
    })
  }

  function complete() {
    if (path == '/reg') {
      let {username, password} = get

      if (users[username]) {
        res.write({error: 1, msg: ''})
        res.end()
      } else {
        users[username] = password

        res.write({error: 0, msg: ''})
        res.end()
      }
    } else if (path == '/login') {

    } else {

    }
  }
}).listen(8080)