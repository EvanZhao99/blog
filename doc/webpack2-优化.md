# webpack


## 一、webpack
### 什么是webpack?
webpack 是一个现代js应用程序的静态模块打包器(module bundler)。  
当webpack处理应用程序时，它会递归构建一个依赖关系图（dependency graph）,其中包含应用程序需要的所有模块，然后生成一个或多个bundle

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
- webpack 配置文件可以导出一个函数，函数的参数就是你传入的环境变量
    ```js
    // "build": "webpack --config ./build/webpack.base.js --env.production"

    module.exports = (env) => {
        console.log(env) // {production: true}
    }
    ```
- env和process.env
两个没关系，env是命令行，webpack传的参数

### 4. npx
npm5.2新加的功能   
`npx webpack`,npx会查找指定包中的可执行文件，如果该包不存在会先下载后执行。


## 二、loader

### 1, 什么是loader？
模块转换器，用于把模块原内容按照需求转换成新内容，可以加载非js模块  

1. loader 引入的四种方式：
1）绝对路径；2）alias别名；3）resolve.module

2. loader类型：pre normal inline post;   
`{enforce: 'pre'}`

### 2. 配置
#### 1. resolveLoader
配置loader的续接规则
```js
module.exports = {
    resolveLoader: {
        modules: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'loaders')]
    }
}
```
#### 2. module
```js
module: {
    rules: [
        {
            test: //,
            use: []
        }
    ]
}
```
- loader顺序：从下到上，从右到左
  

### 3. loaders
#### 1. expose-loader
1. 内联配置
2. 必须引入一次
```js
import $ from 'expose-loader?$!jquery'

// webpack.config.js
module.exports = {
    module: {
        rules: [
            {
                test: require.resolve('jquery),
                loader: 'expose-loader?$'
            }
        ]
    }
}

```
```js
module: {
    rules: {
        // 只要引用一次，就会暴露的全局上，不需要再次引入
        // 当用户引用了jQuery的时候，会触发此loader
        test: require.resolve('jquery'),
        use: {
            loader: 'expose-loader',
            options: '$' // 别名
        }
    }
}
```

## 三、plugin

### 1 什么是plugin？
在webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或者做你想要的事情。类似vue钩子函数

### 2. plugins

#### 1. provideplugin  
任何时候，当`identifier`被当做未赋值的变量时，`module`就会自动加载，并且`identifier`会被`module`导出的内容赋值
```js
new webpack.ProvidePlugin({
    $: 'jquery'
})
```
#### 2. purgecss-webpack-plugin
    > webpack plugin to remove unused css  
    > 压缩css代码

#### 3. ignorePlugin
例如moment语言包非常大,需要忽略无用的资源

#### 4. clean-webpack-plugin
 清空目录


## 四、 bable:
- presets:预设
默认设置多个常见plugein,例如‘plugin-transform-class’、'plugin-transform-for-of'
- plugins: 单独配置特定插件，用来弥补presets。
- 区别：presets从下到上执行，plugins从上到下执行

- exclude
- enforce: 'pre'---强制在所有js的loader之前执行
-


- babel-loader: webpack的loader，相当于入口文件，会调用`@babel/core`
- @babel/core:提供js转化的方法， 调用`@babel/preset-env`
- @babel-preset-env: 提供常用的babel插件


## plugin
- addAssetHtmlCdnWebpackPlugin: 引用cnd中plugin。在HTML生成之后插入链接
- 




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