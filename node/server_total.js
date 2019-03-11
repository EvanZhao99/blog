let http = require('http')
let url = require('url')
let querystring = require('querystring')
let fs = require('fs')

let users = {}

http.createServer((req, res) => {
  let path = '', get = {}, post = {}
  if (req.method === 'GET') {
    let {pathname, query} = url.parse(req.url, true)

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
      let buffer = Buffer.concat(arr)

      post = querystring.parse(buffer.toString())
      complete()
    })
  }
  console.log(users)

  function complete() {
    let {username, password} = get

    if (path == '/reg') {
      if (users[username]) {
        res.write(JSON.stringify({error: 1, msg: '此用户已存在'}))
        res.end()
      } else {
        users[username] = password

        res.write(JSON.stringify({error: 0, msg: ''}))
        res.end()
      }
    } else if (path == '/login') {
      if (!users[username]) {
        res.write(JSON.stringify({error: 1, msg: '此用户不存在'}))
        res.end()
      } else if (users[username] !== password) {
        res.write(JSON.stringify({error: 1, msg: '账号或密码错误'}))
        res.end()
      } else {
        res.write(JSON.stringify({error: 0, msg: ''}))
        res.end()
      }
    } else {
      fs.readFile(`./${path}`, (error, buffer) => {
        if (error) {
          res.writeHeader(404)
          res.write('Not Found')
          res.end()
        } else {
          res.write(buffer)
          res.end()
        }
      })
    }
  }
}).listen(8080)