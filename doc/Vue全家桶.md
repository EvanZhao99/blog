
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


# lodash
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


