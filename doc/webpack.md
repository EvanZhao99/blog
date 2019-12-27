# webpack
## 什么是webpack?
webpack 是一个现代js应用程序的静态模块打包器(module bundler)。  
当webpack处理应用程序时，它会递归构建一个依赖关系图（dependency graph）,其中包含应用程序需要的所有模块，然后生成一个或多个bundle

### 1 什么是loader？
模块转换器，用于把模块原内容按照需求转换成新内容，可以加载非js模块

### 2 什么是plugin？
在webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或者做你想要的事情。类似vue钩子函数

- purgecss-webpack-plugin
    > webpack plugin to remove unused css  
    > 压缩css代码





- 魔法字符串
- 根据依赖将文件打包成一个bundle，往HTML中插入一个script标签，引入该文件
- 代码模块会打包成一个对象：key是路径名，值是function（eval执行代码字符串）
- --config：指定webpack配置文件目录
    ```js
    // package.json
    scripts: {
        "build": "webpack --config ./build/webpack.base.js"
    }
    ```
- webpack 配置文件可以导出一个函数，函数的参数就是你传入的环境变量
    ```js
    // "build": "webpack --config ./build/webpack.base.js --env.production"

    module.exports = (env) => {
        console.log(env) // {production: true}
    }
    ```
- env和process.env
两个没关系，env是命令行，webpack传的参数

- html-webpack-plugin: 默认创建一个HTML，并引入打包后的bundle。也可以指定HTML模板
- clean-webpack-plugin: 清空目录
- copy-webpack-plugin: 复制文件目录
## 一、 bable:
- presets:预设
默认设置多个常见plugein,例如‘plugin-transform-class’、'plugin-transform-for-of'
- plugins: 单独配置特定插件，用来弥补presets。
- 区别：presets从下到上执行，plugins从上到下执行
- 


- exclude
- enforce: 'pre'---强制在所有js的loader之前执行
-


- babel-loader: webpack的loader，相当于入口文件，会调用`@babel/core`
- @babel/core:提供js转化的方法， 调用`@babel/preset-env`
- @babel-preset-env: 提供常用的babel插件

## module
```js
module: {

}

```
- loader顺序：从下到上，从右到左

## plugin
- addAssetHtmlCdnWebpackPlugin: 引用cnd中plugin。在HTML生成之后插入链接
- 

## npx
npm5.2新加的功能   
`npx webpack`,npx会查找指定包中的可执行文件，如果该包不存在会先下载后执行。

## 一、入门起步
1. 建一个文件夹
```
mkdir webpack_first\ 
```
2. 初始化npm
```
npm init -y
```
> *-y*默认选*yes*
3. 安装webpack
```
npm i webpack webpack-cli
```
> `webpack-cli`是命令行工具，通过该包调用`webpack`
4. 编写需要打包的代码
```js
// 目录结构
/*
- src
   |-index.js
*/

// index.js文件
console.log('hello world')
```
5. 执行打包命令
```
npx webpack
```
> `webpack`会默认查找项目下`src/index.js`文件，并生成`dist`文件夹，将打包后的文件放入该文件夹中

## 二、代码分离
三种常用的代码分离的方式：
- 多入口：使用`entry`手动设置多个入口
- 防止重复：使用 `optimization.splic`对公共依赖进行抽离
- 动态导入：使用`import(/* webpackChunkName: "lodash" */ 'lodash')`
    > 会自动将引入的依赖单独打包，在调用时加载

## 三、缓存
对于一些不经常修改的资源，可以通过`命中缓存`来降低网络流量，优化加载速度

1. 采用`chunkhash`生成哈希，通过`output.filename`进行文件名替换，确保浏览器获取到修改后的文件
2. 通过`HashedModuleIdsPlugin`解决`moduleId`改变导致的`chunkhash`改变

## 四、创建libray
- 通过`webpack.externals`将依赖外部化
- 通过`output.filename`设置Libray的名称
- 通过`output.library`暴露全局变量， 通过`output.libraryTarget`设置暴露方式
- 在packge.js中知道bundle的路径`"mail: "dist/webpack-numbers.js""`

## 五、预加载：preload与prefetch
### preload
当前页面需要的资源
#### 1优先级
当设置`as`属性时，根据其值确定优先级，否则等同于异步

### prefetch
其他页面需要的资源
#### 1 优先级
在浏览器空闲的时候加载

## 六、pwa
1. 使用`workbox-webpack-plugin`生成Service Worker文件
    ```js
    new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true
    })
    ```
2. 注册Service Worker
    ```js

    if('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('SW registered: ', registration)
            }).catch(registrationError => {
                console.log('SW registration failed:', registrtionError)
            })
        })
    }
    ```