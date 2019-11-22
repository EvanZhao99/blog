
## 一、组件通信
### 1.dispatch

### 2.broadcast

### 3.eventbus
将监听的事件存放到events中，通过emit调用对应的回调函数
```js
{
    events: {
        eventName: callback,
        ...
    },
    on(eventName, callback) {
        this.events[eventName] = callback
    },
    emit(eventName) {
        this.events[eventName]()
    }
}
```
## 二、Vue.use
use方法使用时，默认会调用内部的`install`方法  
install方法主要做三件事：
- 注册全局组件，component
- 注册全局指令--directive
- 给原型添加方法、属性--vm.$methodName

## 三、vm.$mount
将虚拟dom转换成真实dom，如果指定挂载点，则替换挂载点
### 1.使用
```js
// 创建vdom
let vm = new Vue({
  render(h) {
    return h('div',{}, 'hello')
  }
})
// 将vdom转换成dom
vm.$mount()
// 拿到dom 插入body中
document.body.appendChild(vm.$el)
```
## 四、具名插槽和作用域插槽
### 1.具名插槽
```js
// component
<div>
    <slot name="default"></slot>
    <slot name="other"></slot>
</div>

// parant
<div>
    <component v-slot:default>
        default
    </component>
    <component v-slot:other>
        other
    </component>
</div>

```

### 2.作用域插槽
```js
// component
// 通过绑定TODO，暴露数据list给父级组件使用
<div>
    <slot name="default" :todo="list"></slot>
    <slot name="other" v-bind:todo="list"></slot>
</div>

// parant
// 父级的插槽内容中可以访问子组件的数据
<div>
    <component>
        <template v-slot:default="todo">
            default:{{todo}}
        </templat3e>
    </component>
    <component>
        <template v-slot:other="todo">other:{{other}}</templat3e>
    </component>
</div>

```
> 作用域插槽的内部工作原理是将插槽内容包括在一个传入单个参数的函数里  
> 
    ```js
    function(slotPropers) {
        // 插槽内容
    }

    ```
> 因此，`v-slot`的值可以是任何能够作为函数参数的表达式

### 3.动态插槽
`v-slot`支持动态指令参数，用来定义插槽名
```js
<base-layout>
  <template v-slot:[slotName]>
    ...
  </template>
</base-layout>
// slotName是vm.data的一个属性
```
### 4. 具名插槽缩写
v-slot:slotName=“slotPropers” 等价于：
#slotName=“slotPropers”


## lodash
- deepClone 源码？？？
- 
# 打包 发布npm
1. 修改版本后
2. private: false
3. script.dist: vue-cli-service build --target lib --name myLib [entry]
4. npm run dist
5. mian: ./dist/myLib.umd.min.js
6. npm pubulic
> 注：css会被抽离成单独文件，所以引用组件时需要单独引入css，(可以通过在 vue.config.js 中设置 css: { extract: false } 强制内联)
# 路由权限
1. 定义权限列表
```javascript
authList: [
    {
        label: '一级菜单'，
        value: 'firse',
        parent: ''
    },
    {
        label: '二级菜单'，
        value: 'firse-first',
        parent: 'first'
    },
]
```
2. 定义路由表，meta中添加属性`auth`
```javascript
routes: [
    {
        name: 'first',
        path: 'first',
        component: () => import("@/pages/home.vue"),
        meta: {auth: 'first'}
    }
]
```
3. 从后端获取权限列表，添加动态路由，路由守卫中进行权限验证
```
roter.beforeEach((to, from, next) => {

})
```
4. 创建菜单及页面内按钮的映射树
5. 通过UI页面对树进行操作，实现授权功能
6. 

## vue-observer
-  array
```js
function arrayObserver() {

}
function observer() {

}
function defineActive() {
    jichuang
}
```


## vue domDiff


