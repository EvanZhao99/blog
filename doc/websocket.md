# websocket

## todu
- \n：newline; \r: carriage
- ob: 表示后面都是二进制。0b11 === 3





## 什么是websocket
websock是HTML5的一个新协议，它允许服务端向客户端发送请求，实现浏览器与服务器的双工通信  
属于应用层协议，它基于TCP传输协议，并复用了HTTP的握手通道
## 优势
- 基于双向通信，实时性更强
- 更好的二进制支持
- 较少的控制开支。链接建立后，协议控制的数据包头部较小

## socketIO
跨平台的websocket通信库，具有前后端一致的API，可以触发和相应自定义事件。  
socketIO核心API就是`emit`和`on`,前后端一致


