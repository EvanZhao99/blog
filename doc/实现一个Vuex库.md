# 实现一个Vuex库

## 一、什么是Vuex？
Vuex是一个状态管理工具，采用集中式存储管理Vue所有组件的状态

## 二、在Vue中使用
```js
import Vue from 'vue'
import Vuex from './vuex'

// 会在所有组件vm实例声明一个$store属性
Vue.use(Vuex)
let store = new Vuex.Store({
  state: {
    a: 1,
    b: 11
  },
  mutations: {
    add1(state, payload) {
      state.a += 1
    }
  },
  actions: {
    asyncAdd1(store, payload) {
      setTimeout(() => store.commit('add1'), 3)
    }
  },
  getters: {
    getA(state) {
      return state.a
    }
  },
  modules: {
    module1: {
      mutations: {
        add1() {},
        add2() {}
      }
    }
  }
})

new Vue({
  store, 
  render: h => h(App),
}).$mount('#app')
```
## 三、基本概念
- state：状态，作为应用的唯一数据源
- getter: 类似计算属性，根据依赖缓存返回值，在依赖值改变时重新计算
- mutation：唯一改变状态的方式就是`提交mutation`，类似事件的发布订阅模式
- action：可以执行异步，在回调中提交mutation
- module：Vuex允许我们将store分割成模块，每个`module`拥有自己的`state/getter/mutation/action`

## 四、实现Vuex
通过上文我们已经大概了解了`Vuex`的用法及特点，接下来我们将依次实现上述功能
### 1. install
在使用`Vuex`是，我们需要注册该组件  
```js
Vue.use(Vuex)
```
Vue会默认调用`Vuex`的`install`方法实现插件注册
```js
// Vue.use会调用install方法
const install = (_Vue) => {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      // 没有直接将$store放到原型上 是为了只对这一个实例起作用
      if(this.$options && this.$options.store) {
        // 给根实例添加$store属性
        this.$store = this.$options.store
      } else {
        // 有可能单独创建了一个实例 没有父亲，那就无法获取store属性
        this.$store = this.$parent && this.$parent.$store
      }
    }
  })
}
```
### 2. Store类
- 创建Vue实例实现响应式,存放state
- 添加`getters/mutations/actions/subscribers/modules`等实例属性，用于存放对应值
- 通过`ModuleCollection`格式化模块
- 定义`subscribe/commit/dispatch`等方法
```js
class Store{
    constructor(options = {}) {
        // 通过创建Vue实例实现响应式
        this.s = new Vue({
            data() {
                return {state: options.state}
            }
        })
        this.getters = {}
        this._mutations = {}
        this.actions = {}
        this._subscribers = []
        // 将数据格式化成一个想要的树结构
        this._modules = new ModuleCollection(options)
        // 处理getters mutations actions 挂在children
        installModule(this, this.s.state, [], this._modules.root)
        // plugin
        let plugins = options.plugins || []
        plugins.forEach(plugin => plugin(this))
    }
    subscribe(fn) {
        this._subscribers.push(fn)
    }
    commit(mutationName, payload) {
        this.mutations[mutationName](payload)
    }
    dispatch(actionName, payload) {
        this.actions[actionName](payload)
    }
    get state() {
        return this.s.state
    }
}
```
### 3. ModuleCollection类
根据用户的模块配置项数据格式化模块  
核心是注册模块`register`
```js
// 格式化模块
class ModuleCollection{
  constructor(options) {
    this.register([], options)
  }
  /**
   * 注册模块
   * @param {*} path 模块路径 [parentName, childName,...]
   * @param {*} module 模块
   */
  register(path, module) {
    let obj = {
      _rawModule: module,
      _children: {},
      state: module.state
    }
    if(path.length === 0) {
      this.root = obj
    } else {
      // 根据路径拿到parent
      let parent = path.slice(0, -2).reduce((parent, currentPath) => {
        return parent[currentPath]
      }, this.root)
      // 将该模块挂在parent上
      parent._children[path[path.length-1]] = obj
    }
    // 看当前模块是否有modules
    if(module.modules) {
      forEach(module.modules, (moduleName, module) => {
        this.register(path.concat(moduleName), module)
      })
    }
  }
}
```

### 4. 挂在模块

```js
/**
 * 挂载模块
 * @param {Store} store Store实例
 * @param {Object} rootState 根state
 * @param {Array} path 要挂在模块的路径
 * @param {*} module 要挂在的模块
 */
const installModule = (store, rootState, path, module) => {
  // 处理state
  // 儿子（根模块的state不需要此处处理，Store类的属性访问器实现）
  if(path.length > 0) {
    // 去掉最后一个 就是父亲的路径，拿到父亲的状态，将模块的状态放到上面
    let parentState = path.slice(0, -2).reduce((parentState, currentPath) => {
      return parentState[currentPath]
    }, rootState)
    // 响应式的将当前模块的state放置到父级模块的state上。（会覆盖父级state中与子模块名相同的属性）
    Vue.set(parentState, path[path.length-1], module.state)
  }
  // 处理getters 重新get 执行回调 传入state
  let getters = module._rawModule.getters
  if(getters) {
    forEach(getters, (getterName, fn) => {
      Object.defineProperty(store.getters, getterName, {
        get() {
          return fn(module.state) // getter的回调传入state
        }
      })
    })
  }
  // 处理mutations
  let mutations = module._rawModule.mutations
  if(mutations) {
    forEach(mutations, (mutationName, fn) => {
      // mutation对应的值是数组，所有模块中名称相同的mutation放到同一个数组中，避免被重写。类似addEventListener
      let mutations = store._mutations[mutationName] || []
      mutations.push(payload => {
        fn(rootState, payload)
        // 发布  让所有的订阅依次执行
        store._subscribers.forEach(fn => fn({type: mutationName, payload: payload}, rootState))
      })
    })
  }

  // 处理actions
  let actions = module._rawModule.actions
  if(actions) {
    forEach(actions, (actionName, fn) => {
      let actions = store.actions[actionName] || []
      actions.push(payload => {
        fn(store, payload)
      })
    })
  }

  // 挂载儿子 递归
  forEach(module._children, (moduleName, module) => {
    installModule(store, rootState, path.concat(moduleName), module)
  })

}
```