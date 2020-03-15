## Vue
### 1. MVVM的原理？
- 传统的是mvc，需要手动将数据渲染到页面上。
- 随着前端业务越来越复杂，将中间层做了抽离，封装成框架，实现数据驱动视图，也就是我们说`VM`层，比如Vue，实现一个双向绑定

### 2. 请说一下响应式数据的原理？
- 思路：在初始化时传入`data`，对所有属性使用`defineProperty`进行重新定义，在`getter`和`setter`中添加拦截，当页面获取对应属性是进行依赖收集(收集当前组件的watcher),当属性发生变化时通知相关依赖进行更新操作。
- 源码：调用`initData`初始化data数据 =》调用`new Observer`对数据进行观察 =》 通过`this.walk(value)`进行对象的处理 =》 通过`defineReactive`实现对属性的响应式处理 =》 通过`Object.defineProperty`重新定义`getter`和`setter`
- 取值：在`getter`中调用`dep.depend`进行依赖收集
- 设值：在`setter`中调用`dep.notify`除非数据对应的依赖进行更新

### 3. Vue是如何检测数组的变化的？
- 重写数组原型，对可以改变原有数组的方法进行劫持，调用`notify`手动触发更新，然后对插入的新对象进行监听
- 可以改变原有数组的方法: push/pop/shift/unshift/sort/splice/reverse
- 改变数组的原型`let proto = Object.create(Array.prototype); arr.__proto__ = proto`
- 对插入元素的方法单独处理`push,unshift,splice,`对插入的对象进行检测

### 4. 为什么Vue采用异步渲染？
- Vue采用的是组件更新，如果不采用异步更新的话，每次更新数据都会更新组件，为了性能上的考虑，在本轮数据更新后，再去异步更新视图
- 数据更新是调用`notify`通知数据更新 =》 调用`watcher.update` =》 调用`queuewatcher`将wetcher`push`的更新队列中，通过`watcher.id`进行去重 =>在`nextTick`中异步执行`flushSchedulerQueue` =》调用`watcher.run`更新视图，并触发一些钩子

### 5. nextTick实现原理
- 核心是异步。将`cb`push到`callbacks`队列中，创建微任务去清空队列
- promise =》 mutationObserver => setImmidiate

### 6. Vue中的Computed的特点
- Computed和Watch都是一个`watcher`，区别是具备缓存，当依赖发生变化时更新视图。
- initComputed =>new Watcher => defineComputed => createCompuedGetter
- 通过`initComputed`对计算属性进行初始化 => 通过`new Watcher`为每个计算属性创建一个单独是`watcher` => 在`difineComputed`方法中通过`defineProperty`定义`getter`实现计算属性的响应式 => 当`watcher.dirty=true`时重新计算，否则直接返回`watcher.value`

### 7. watch的deep是如何实现的？
- 核心是递归

### 8. Vue生命周期？每个生命周期适合做哪些事？父子组件执行顺序？
- created： 实例创建完成，发送请求
- mounted： 进行DOM操作
- beforeUpdate：更改状态，不会触发附加的重新渲染
- destroyed: 进行优化操作，如清空定时器 解除事件
  
#### 父子组件执行顺序
> 由外到内执行：beforeCreate,created, beforeMount; 再由内到外执行mounted

- beforeCreate,created, beforeMount, mounted, beforeUpdate, updated, beforeDistroy, distroyed
- 根组件：beforeCreate, created,beforeMount, mounted
- 非根父组件：beforeCreate, created, beforeMount
- 子组件：：beforeCreate, created, beforeMount， =》mounted
- 非根父组件： mounted

### 9. Vue模板编译原理
- 通过正则解析标签，通过`with`改变作用域，再包装成函数
  ```js
  let render = `with(this){return ${code}}`
  let renderFn = new Function(render)
  ```

### 14. 用vnode来描述一个DOM结构
- 会将`template` => ast`语法树 => render函数 => `虚拟dom`
  ```js
  {tag, data, key, children,text}
  ```

### 15. diff算法的时间复杂度
- 先同级比较，再比较子节点；先判断一方有子节点另一方没有子节点的情况；比较都有子节点的情况；递归比较子节点

### 16. v-for为什么需要`key`
- 在组件更新时，会进行组件复用，通过`tag`和`key`去判断是否是同一个组件

### 17. 描述组件渲染和更新的过程
- 渲染组件是，会通过`Vue.extend`方法构建子组件的构造函数，并进行实例化。最终手动调用`$mount`进行挂载，更新组件是会进行`patchVnode`流程
- new Vnode => createComponent => 

### 18. Vue中data为什么是函数？
- 组件复用会创建多个实例，防止多个实例共享一个data对象

### 19. Vue事件绑定的原理
- 原生事件：on -> addEventListener
- 组件事件：on -> vm.$on()
- 组件native: nativeOnOn -> addEventListener
模板编译结果：
```js
let compoler = require("vue-template-compiler")
let r1 = compiler.compile('<div @click="fn"><div>')
let r2 = compiler.compile('<div @click="fn" @click.native="fn">')
console.log(r1.render) // {on: {click}}
console.log(r2.render) // {on: {click}, nativeOn: {click}}
```
> 在创建真实dom时，原生节点的`on`会使用`addEventlistner`处理；组件的`on`使用`vm.$on`,`nativeOn`使用`addEventlistner`

### 20 v-model的实现原理
- 组件：value + input
```js
// 默认是value+input, 可以修改
model: {
  prop: 'value',
  event: 'input'
}
```
- 原生原生：会根据不同的标签 生成不同的事件和属性
- composing: v-model不会在输入法组合文字的时候得到更新，可以使用`input`
  ```js
  // plateform/web/runtime/directives/model.js
  // v-model指令 添加了对composition事件的处理，自定义了composing属性
  function onCompositionStart (e) {
    e.target.composing = true
  }

  function onCompositionEnd (e) {
    // prevent triggering an input event for no reason
    if (!e.target.composing) return
    e.target.composing = false
    trigger(e.target, 'input')
  }

  // plateform/web/compiler/directives/model.js
  // 在进行代码编译时 会加上对composing的判断，在composing为true时 不会改变value的值
  code = `if($event.target.composing)return;${code}`

  // 例如
  <input v-mode="name" type="text">
  // 等价于
  <input :value="name" @input="if($event.target.composing)return;name=$event.target.value">
  ```

### 21 v-html缺陷
- xss攻击
- 替换掉内部的子标签

### 22. Vue组件通信
- props $on $emit
- event bus
- Vuex
- $children $parent
- ref获取实例
- provide inject
 > vm实例会在`provided`属性存放值， 子组件会查找所有父组件的`provided`属性

 ### 23 异步组件
 通过`import()`可以实现代码分割，减小打包体积
 - 代码
    - 通过 createAsyncPlaceholder 立即执行 asyncFactory
    - 因为是异步 会返回`undefined`
    - 通过createAsyncPlaceholder 创建一个注释<!->` 作为展位符
    - asyncFactory 成功后调用`resolve`
    - 通过`forceRender`强制更新
    - 再次调用`resolveAsyncComponent`,返回组件
    - 进行初始化，创建`vnode`，渲染组件
  ```js
  // vdom/create-component -- async component
  ```
### 24 插槽和作用域插槽
- 普通插槽：将 在父组件渲染好的结果 直接替换到 子组件的插槽上，整个渲染过程是在父组件进行的，所有作用域是父组件
- 作用域插槽：会将插槽的内容包装成一个函数，在子组件渲染是会调用该函数 并以参数形式将属性传入回调。所以插槽内容的渲染是在子组件中进行的，作用域是子组件

```js
// core/instance/render-helper/render-slot.js
```

### 25 keep-alive
- 属性：include/exclude
- 声明周期： activated/deactivated
- 在cache中保存组件列表，
- 通过最久未使用（lru）算法进行管理`key`值的列表

```js
// core/components/keep-alive
```

### 26 编码优化


### 27 Vue加载性能优化