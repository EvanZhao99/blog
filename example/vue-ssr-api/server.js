const Vue = require('vue')
const server = require('express')()
const path = require('path')
const createApp = require('./app')
const renderer = require('vue-server-renderer').createRenderer({
  template:require('fs').readFileSync(path.resolve(__dirname, './index.template.html'), 'utf-8')
})

server.get('*', (req, res) => {
  const context = { url: req.url }
  const app = createApp(context)

  renderer.renderToString(app, (err, html) => {
    // 处理错误……
    res.end(html)
  })
})

server.listen(8080)