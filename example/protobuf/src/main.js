var WSMessage // 解码编码器
var wsmessage // proto实例
var buffer // 8位无符号字节数组
protobuf.load("./proto/message.proto", function(err, root) {
  if(err) {
    throw err
  }
  WSMessage = root.lookup("wenlipackage.WSMessage")
  wsmessage = WSMessage.create({id: "1", content: "hello", sender: "web", time: new Date().getTime()})
  buffer = WSMessage.encode(wsmessage).finish()
})


var wsUri = "ws://127.0.0.1:8082/";
          var output;
          function init() {
             output = document.getElementById("output");
             testWebSocket();
          }
          function testWebSocket() {
             websocket = new WebSocket(wsUri);
             websocket.onopen = function (evt) {
                 onOpen(evt)
             };
             websocket.onclose = function (evt) {
                 onClose(evt)
             };
             websocket.onmessage = function (evt) {
                 onMessage(evt)
             };
             websocket.onerror = function (evt) {
                 onError(evt)
             };
         }
         function onOpen(evt) {
             writeToScreen("CONNECTED");
             doSend(buffer);
         }
         function onClose(evt) {
             writeToScreen("DISCONNECTED");
         }
         function onMessage(evt) {
             var reader = new FileReader();
             reader.readAsArrayBuffer(evt.data);
             reader.onload = function (e) {
                 var buf = new Uint8Array(reader.result);
                 writeToScreen('<span style="color: blue;">RESPONSE: ' + WSMessage.decode(buf).content + '</span>');
             }
         }
         function onError(evt) {
            writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
         }
         function doSend(message) {
             writeToScreen("SENT: " + wsmessage.content);
             websocket.send(buffer);
         }
         function writeToScreen(message) {
             var pre = document.createElement("p");
             pre.style.wordWrap = "break-word";
             pre.innerHTML = message;
             output.appendChild(pre);
         }
         window.addEventListener("load", init, false);