/**
 * 数据结构描述
 * pathList: ['/','/about','/about/a','/about/b']
 * pathMap: {'/': '/的记录','/about': '/about的记录',}
 * record: {path, component, parent}
 */ 

export default class VueRouter{
  constructor(options) {
    // 1 什么叫路由 根据不同的路径跳转不同的组件
    // 将用户传递的routes 转化为好维护的结构

    // match 负责匹配路径 
    // addRoutes 动态添加路由配置

    this.matcher = createMathcer(options.routes || [])

    // 创建路由系统 根据模式 创建不同的路由对象 默认是hash
    this.mode = options.mode || 'hash'

    // vue路由有三种模式 hash h5api abstract, 为了保证调用时方法一致，我们需要提供一个base类，在分别实现子类，不同的模式通过父类调用对应子类的方法
    this.history = new HashHistory(this)
  }
  init(app) {
    // app 代指的是根实例

    // 初始化时先拿到当前路径，进行匹配逻辑
    const history = this.history

    // 让路由系统过度到某个路径
    const setupHashLister = () => {
      // 监听路由变化
      history.setupHashLister()
    }

    // 父类提供方法负责调整
    history.transitionTo(
      // 子类获取对应路径
      history.getCurrentLoation(),
      // 跳转成功后注册路径监听 为视图更新做准备
      setupHashLister
    )
    history.listen((route) => {
      // 发布订阅
      app._route = route // 视图刷新
    })
  }
  // 匹配路由
  match(location) {
    return this.matcher.match(location)
  }
}
// Vue 默认调用install方法
VueRouter.install = install