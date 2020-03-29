let express = require('express')
// let {Message} = require('./db')
let app = express()
app.use(express.static(__dirname)) // static中间件托管静态资源

let server = require('http').createServer(app)
let io = require('socket.io')(server) // 复用HTTP通道

// 监听客户端链接事件
io.on('connection', function(socket) {
    socket.on('message', function(message) {
        console.log(message)
        socket.send('服务器说：' + message) // socket.send 等价于 socket.emit('message')
    })
})

server.listen(3000)
