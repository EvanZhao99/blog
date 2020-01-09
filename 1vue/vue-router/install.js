


export let _Vue
export default function install(Vue) { // Vue 构造函数
  _Vue = Vue
  // 就干一件事： 在所有组件加_routerRoot属性 指向跟vm
  Vue.mixin({
    // 所有组件都增加beforeCreate
    beforeCreate() {
      // 如果有router属性 说明是根实例
      if (this.$options.router) {
        // 将根实例挂载到_routerRoot属性说明是根实例
        this._routerRoot = this
        // 将根vm挂载到_routerRoot
        this._router = this.$options.router
        // 将当前router实例挂载到_router
        this._router = this.$options.
        
        // 将current变成响应式
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        // 父组件渲染后会渲染子组件
        // 保证所有子组件都用于_routerRoot属性 指向根vm
        // 保证所有组件都可以通过this._routerRoot._router拿到用户传进来的router实例对象
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return this._routerRoot
    }
  })

  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot._router
    }
  })

  // 注册全局组件
  Vue.component('RouterView', RouterView)
}