let express = require('express')
let app = express()
app.use(express.static(__dirname))

app.listen(3000)

let WebSocketServer = require('ws').Server
let server = new WebSocketServer({port: 8888})

server.on('connection', function(socket) {
    console.log('链接成功')
    // 监听客户端发来的消息
    socket.on('message', function(message) {
        console.log('客户端消息：', message)
        socket.send('服务器消息：' + message)
    })
})