# 面试题
大部分做编程的同学都比较反感面试的时候做笔试题，因为经常出现一些开发中用不到或者很难背但很容易百度的概念  

个人认为面对这种情况没必要太过反感，保持一种佛系的心态就比较好，多准备一些日常开发用到的或者能提高自底层理解的面试题，重点在于学习而不是应试。对于比较生僻的知识当做课外阅读了解一下就好，如果面试真遇到了，大概描述一下自己的理解，表示知道有这么回事就行，大部分面试官只是为了了解一下你知识的广度，不会太过计较。对于比较较真的公司，不一定真的合适，不去也罢。  

下面是我日常总结和收集的一些对于自我提高有帮助的面试题，答案写的不是很详细，不理解的可以Google一下，没必要死记硬背条目，理解就好

## 未分类

### 从输入URL到页面加载发生了什么？
- DNS解析，通过域名拿到ip
- 建立TCP链接
- 发送http请求
- 服务器处理请求，返回对应资源
- 浏览器加载资源
- 解析HTML，生成DOM tree
- 解析CSS，生成style rules
- 构建渲染树，render tree
- layout布局，painting绘制


## css
### 1. BFC 块级格式化上下文
- 触发条件： 
  - 根元素
  - position：absolute、fixed
  - float元素
  - overflow ！== visible

- 规则：
  - 属于同一个BFC的两个相同Box垂直排列
  - 属于同一个BFC的两个相邻Box的margin重叠
  - BFC的区域不会与float区域重叠
  - 计算BFC高度时，浮动元素也参与计算
  - 文字层不会被float层覆盖  环绕于周围

- 应用
  - 阻止margin重叠
  - 清除内部浮动
  - 自适应两栏布局(left:float,right:bfc),
  - 可以阻止元素被浮动元素覆盖

### 2. 层叠优先级
自下而上：
- background
- z-index < 0
- 块级元素
- 浮动元素
- 行内元素
- z-index === 0 / auto(没有设置)
- z-index > 0
  
### 3. 居中对齐
- 水平居中
  - 行内：text-align
  - 块级：margin：0 auto
  - absolute:left:50% +transform:translateX(50%)
  - flex + justify-content:center
- 垂直居中
  - line-height
  - absolute + transform
  - flex + align-items: center
  - table

- 水平垂直居中
  - absolute + transform
  - flex + justify-content + align-items

### 4. 盒模型
通过box-sizing进行设置
- content-box(标准盒模型)
- border-box（IE模型）

### 5. 选择器优先级
从高到低：
- !important
- 行内样式
- #id
- class
- tag
- *
- 继承
- 默认

### 6. 去除浮动影响，防止父级高度塌陷   

- 通过增加尾部元素清除
  - ：after/ <br> / clear:both
- 创建父级BFC
- 父级高端设置

### 7. link 与 @import
- link属于HTML标签，@import属于css语法
- 解析到link时，页面会同步加载对于的CSS，而@import只能用于加载css
- link可以使用js动态引入，@import不行
- @import IE5以上才能用，link不存在兼容性

### 8. CSS动画
- transition：过渡
  - transition-property：属性
  - transition-duration：间隔
  - transition-delay：延迟

- animation / keyframes
  - @keyframs name: {from:{style}, to: {style}}
  - animation-name: 动画名称 对应@keyframes
  - animation-duration: 间隔
  - animation-delay：延迟
  - 。。。




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

### 8. Vue生命周期？每个生命周期适合做哪些事？
- created： 实例创建完成，发送请求
- mounted： 进行DOM操作
- beforeUpdate：更改状态，不会触发附加的重新渲染
- destroyed: 进行优化操作，如清空定时器 解除事件

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










## 各种实现流程
### 1. promise是怎么实现的？
promise的核心就是一个then方法，还有两个值value和reason，分别保存成功时的值和失败的原因，还有三个状态：fulfilled,padding,rejected.  
then方法的核心是创建并返回一个新的promise，在excutor中将成功和失败的回调push到对应的回调栈中，在调用resolve或reject函数时创建一个微任务清空回调栈
resolve负责将用户传的value赋值给新的promise实例的value属性，在调用成功的回调的时候 传给onfulfilled
```js
let p = new Promsie((resolve, reject) => {
    resolve(value)
})
p.then(function onfulfilled(res) => {
    return value
}).then(function onfulfilled(res) => {
    
})
```

### 2. VueX是怎么实现的？
- 首先实现install方法进行插件注册，通过Vue.mixin函数 在beforeCreate钩子中 将所有组件的实例都添加一个$store属性，可以访问到store实例

- 创建一个Vue实例，将state放到vm实例的data上，从而实现响应式，重写一下state的getter，访问state时都从vm实例上拿数据

### 3. 如何封装Element的table和form组件？



### 4. bable的polifile和runtime的区别？
- bable的默认配置只会将新的语法转换成es5,不会转换api,像promise、set、map这种全局对象。
- 当运行环境中没有用到的api时，polyfill会做兼容，实现一些全局方法，同时也会污染全局变量
- babel-runtime不会污染全局方法，当没有相应的api时，runtime会自动引入。但是runtime不能转码实例上的方法，比如`'hello'.includes('l')`

### 5. git flow:
> git 分支的本质是指向提交对象的可变指针。  
> tag 和branch类似，都是指针，但是是固定的，不能commit，只能checkout；branch是可变指针
- 首先我们会有一个production分支，通常用master分支代替，包含最新发布到生产环境的代码，这个分支不能修改，只能从其他分支合并。
- develop分支，这个分支是我们的主开发分支，包含所有下一次要发布的代码，主要用来合并其他分支，如feature 功能开发分支
- feature，这个分支是用来开发新功能的，一旦开发完成，就会合并到devlop分支，等待一下次发布
- release分支，当我们需要往生成环境发布一个新版本的时候，会从develop分支checkout一个新的分支，完成发布后，会合并到develop和master分支
- fix分支，当线上产品发现bug时，我们会从master分支checkout一个fix分支，修复完成后，合并到master和develop分支

### 6. diff算法的了解
> diff算法的本质是找出两个对象之间的差异，目的是尽可能复用节点。
- Vue首先会判断是否是同一个组件，它是根据key和tag去判断的，还有一些其他的属性，具体的记不清了。
- 如果不是同一个组件就删除重建，是的话就更新，比较出两个对象的差异，直接对真是DOM进行增删改操作。
- updateChildren子组件更新，组件下面可能会存在多个子组件，依次对比前后子组件是否为同一组件，是的话就调用patchNode方法，否则删除重建。
- 在比较时做了一些对常见操作的优化，首先是常规比较，首对首，然后会考虑到有倒序的情况，首对尾；删除第一个元素的情况，尾对尾

### 7. Vue-router的原理
- 首先监听`hashChange`事件
- 拿到hash值`#`后面的path字符串'/xxx',传给`transitionTo`方法
- transitionTo:通过`match`方法根据`path`匹配到相应的路由
- 依次执行`beforeHooks`/`updateRoute(route)`/'onComplete'
- updateRoute: `this.current=route`
- 通过vue的响应式实现视图更新:`Vue.util.defineReactive(this, '_route', this._router.history.current)`




## 面试经历
## 头条一面
1. 实现一个函数，判定一个给定的正整数n,是否和除了它自身以外的所有正因子之和相等，相等返回true， 否则返回false。
   示例： 输入：28， 输出： true  
   解释： 28的正因子：1，2，4，7，14.1+2+4+7+14=28
```js
function isSum(n) {
    let res = 0
    let item = 1
    while( item < n ) {
        if(n % item === 0) {
            res += item
        }
        item++
    }
    return res === n
}
console.log(isSum(28))  // true
```

## todo
- 说一下你对脚手架的理解?
  [脚手架的实现原理](https://github.com/pluckychuang/blog/blob/master/doc/%E5%89%8D%E7%AB%AF%E8%84%9A%E6%89%8B%E6%9E%B6%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86.md)

Vue指令如何封装，钩子函数有哪些？
- 分为全局指令和局部指令
- 全局指令:
```js
Vue.directive('name', {
    inserted(el) {
        el.style.display = 'none' // block inline
    }
})
```
- 局部指令：
```js
directives: {
    directiveName: {
        insterted(el) {
            
        }
    }
}
```