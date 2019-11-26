
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
    <component>
        <template v-slot:default>
            default:{{todo}}
        </templat3e>
    </component>
    <component>
        <template v-slot:other>other:{{other}}</templat3e>
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
        </template>
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

## 五、mixin
### 1、介绍
mixin是用来分发Vue组件中可复用功能的一种方式。  
`mixin`是一个普通的*js对象*，可以包含任意的组件选项。  
使用mixin的组件会拥有对应的选项，类似于继承。
### 2.选项合并
- 数据对象内部进行递归合并，发生冲突时组件的数据优先
- 同名钩子函数会合并为数组，都会被调用。并且mixin顺序在前
- 值为对象的选项被合并为一个对象，键名冲突的组件优先

> 类似Vue.extend策略：能合并的合并，不能合并的组件优先
### 2. 全局混入
`Vue.mixin`可以进行全局注册，将影响每一个之后创建的Vue实例

## 六、Vue自定义指令
### 1.简介
自定义指令主要用于对原生DOM进行底层操作
### 2.钩子
- bind：指令绑定时，只调用一次
- inserted: 元素被插入到父节点（不一定被插入到文档中）
- update：组件的vnode更新时
- componentUpdated: 组件及其子组件的VNode全部更新完毕时
- unbind:指令与元素解绑时

### 3.钩子函数参数
- el:绑定的元素，可以直接操作DOM
- binding：一个对象，包含以下属性
  - name: 指令名
  - value： 指令绑定的值
  - oldValue: 指令绑定的前一个值
  - expression: 字符串形式的指令表达式
  - arg: 传给指令的参数
  - modifiers:修饰符
- vnode:Vue编译产生的虚拟节点
- oldVnode:上一个虚拟节点
> 除了el,其他的都是只读属性
### 4. 全局指令
```js
Vue.directive('directiveName', {
    inserted(el, binding) {
        // todo
    }
})
```
### 5.组件指令
```js
{
    direcrives: {
        directiveName: {
            inserted: function(el, binding) {
                // todo
            }
        }
    }
}
```
### 6.动态指令参数
指令的参数可以是动态的`v-mydirective:[argument]="value"`
```js
<template v-slot:[slotname]="slotPropers"></template>
```
### 7.函数简写
在`bingd`和`update`时触发相同的行为而不关心其他钩子是，可以使用简写：
```js
Vue.directive('directiveName', function(el, bingding) {
    // todo
})
```

## 七、插件
### 1.功能
没有严格限制，一般有三种用途：
- 全局组件：Vue.component
- 全局指令：Vue.directive
- 实例属性和方法：vm.$xxx

### 2.使用
通过全局方法Vue.use()使用插件
```js
Vue.use(myPlugin, options)
```
### 3.开发
Vue会自动调用插件的`install`方法，两个参数：
- Vue: Vue构造器
- options： 选项
```js
myPlugin = {
    install(Vue, options) {
        Vue.directive("directiveName", {
            bind(el, binding) {
                // todo
            }
        })
        Vue.mixin({
            created: function() {
                this.$methodName = function() {
                    // todo
                }
            }
        })
        Vue.prototype.$methodName = function() {
            // todo
        }
    }
}
```

## 八、过滤器
Vue.filter不改变数据，只改变用户看到的输出。使用管道符（pipeline）隔开
```js
Vue.filter('toRMB', function(value){
    return value && '￥' + value
})
<span>{{price | toRMB}}</span>

```











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


