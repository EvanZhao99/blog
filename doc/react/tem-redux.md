# redux
## tem
concept 概念
对于Express和koa这些框架，中间件就是你向框架接收请求和生成响应之间加入的一些代码。
中间件最好的特点就是可以合成一个链
redux中间件作用于“dispatch action”和“到达reducer”之间，可以用来做日志、崩溃报告、异步api，路由等。logging,crash reporting, talking to an asynchronous API, routing
in-depth 深入； intro 介绍; grok 摸索 意会；
separate 单独的; ecosystem 生态； caught an exception; monkeypatching is a hack 恶作剧是一种黑客行为；
middleware: 包裹dispatch 并返回新的function
三个方面：
只对外暴露store的子集
如果在中间件中调用‘store.dispatch’ 会将所有中间件全部调用一次
createStore 代替 store，确保中间件只调用一次。（每次都是通过createStore新建并返回，而不是操作公共的store）

## 流程
