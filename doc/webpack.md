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




- 预加载：preload/prefetch
- 魔法字符串
- 根据依赖将文件打包成一个bundle，往HTML中插入一个script标签，引入该文件
- npx 新版本出的功能
- 在没有webpack.config.js文件的情况下，webpack 会自动读取src/index.js文件
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

## 入门起步
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


