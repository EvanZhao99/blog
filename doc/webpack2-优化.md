# webpack优化


## 一、webpack简介
### 1. webpack核心概念
- entry: 指定webpack开始构建的入口文件(默认是src/index.js)，从该模块开始构建并计算出直接或间接的依赖模块
- output: 指定webpack构建完成后的输出目录
- loaders: 模块转换器，用于把模块原内容按照需求转换成新内容，可以加载非js模块。由于webpack只能处理js文件，所以需要一些将非js文件编译成webpack可以处理的模块
- plugins: 插件，扩展webpack的能力，在webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或者做你想要的事情
- chunk：coding split的产物，我们可以对一些代码打包成一个单独的chunk，比如将一些公共模块单独打包，可以实现去重、缓存等，或者按需加载的模块，优化加载时间

### 2. webpack优化手段
1. 代码分割：通过`import()`懒加载的依赖会单独打包；多入口打包
2. cdn： addAssetHtmlCdnWebpackPlugin
3. dllplugin：动态链接库；将第三方包打包好之后存放起来，避免每次打包  
    > 1.将依赖打包成库； 2. 通过`dllPlugin`创建manifest.json; 3. 通过addAssetHtmlPlugin
4. splitChunks：将公共依赖单独打包 
5. happypack：开启子进程打包

### 3. 命令行配置
1. --config
    ```js
    // package.json
    scripts: {
        "build": "webpack --config ./build/webpack.base.js"
    }
    ```
2. webpack 配置文件可以导出一个函数，函数的参数就是你传入的环境变量
    ```js
    // "build": "webpack --config ./build/webpack.base.js --env.production"

    module.exports = (env) => {
        console.log(env) // {production: true}
    }
    ```
3. env和process.env
两个没关系，env是命令行，webpack传的参数

4. npx
npm5.2新加的功能   
`npx webpack`,npx会查找指定包中的可执行文件，如果该包不存在会先下载后执行。

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

### 2. tapable
webpack本质上是一种事件流机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是`Tapable`，webpack中最核心负责编译的`Compiler`和负责创建bundles的`Compilation`都是Tapable的实例。





## 四、 bable:




