# websocket

## todu
- \n：newline; \r: carriage





## 什么是websocket
websock是HTML5的一个新协议，它允许服务端向客户端发送请求，实现浏览器与服务器的双工通信

## 特点
- 与HTTP协议有着良好的兼容性，在握手阶段采用HTTP协议
- 建立在tcp协议基础之上， 和HTTP同属于应用层
- 数据格式比较轻量，性能开销小，通信高效
- 可以发送文本，也可以发送二进制
- 没有同源限制
- 标识符是ws,加密是wss

## socketIO
跨平台的websocket通信库，具有前后端一致的API，可以触发和相应自定义事件。  
socketIO核心API就是`emit`和`on`,前后端一致


