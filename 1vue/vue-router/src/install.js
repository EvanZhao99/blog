

let _Vue

export function install(Vue) {
  // 确保 install 调用一次
  if (install.installed && Vue = _Vue) {
    return
  }
  install.installed = true
  // 把Vue赋值给全局变量
  _Vue = Vue

  const isDef = v => v !== undefined

  const registerInstance = (vm, callVal) => {

  }

  Vue.mixin({
    beforeCreate() {
      if (isDef(this.$options.router)) {
        this._routerRoot = this
        this._router = this.$options.router
        // 初始化路由
        this._router.init(this)
        // 为_route属性实现双向绑定
        Vue.util.defineReactive(this, "_route", this._router.history.current)
      } else {
        // 用于router-view层级判断
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      reginsterInstance(this, this)
    },
    destroyed() {
      registerInstance(this)
    }
  })
  Vue.component('Router-view', View)
  Vue.component('Router-link', Link)

}