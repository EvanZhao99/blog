# webpack入门
## 一、什么是webpack？
webpack是现代JavaScript应用程序的静态模块打包器；
在webpack处理代码的时候，会递归创建一个依赖关系图（dependency graph），其中包含应用程序所需要的所有依赖模块，然后打包成一个或多个bundle；
webpack解决了js应用程序的工程构建问题
1. webpack唯一的功能就是打包 
2. 单纯的webpack只能打js包，借助相应的`loader`，才能为其他文件打包，例如：css，图片等。

## 二、入门起步
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


## 三、基础配置
webpack的配置文件为根目录下的`webpack.config.js`。，当然，在配置比较复杂时可以拆分为多个模块（由于webpack运行在`node`环境中，所以采用的是`CommenJS`规范）。  

以下的配置是webpack打包必不可少的：
```js
//  webpack.config.js文件
module.exports = {
    mode: 'none', 'production', 'development',
    entry: '入口',
    output: {
        path: '绝对路径',
        filename: ''
    }
}
```
### 1. 单入口、多入口打包
##### 单入口
一般情况下我们使用的是单入口模式，通过`entry`指定入口文件地址，也就是我们常见的配置方式。
##### 多入口
有些特殊情况下，我们需要打包多个文件
```
const path = require('path')
module.exports = {
  mode: 'development',
  // 指定多个入口文件
  entry: {
    index: './src/index.js',
    admin: './src/admin.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].min.js' // name是占位符，代表文件名称
  }
```
## 四、loader介绍
loader是webpack的精华，单纯的webpack只能打包js文件，要想实现复杂的功能，必须依靠相应的loader帮忙打包js以外的文件，再将其扔给webpack

1. loader 引入的三种方式：
1）绝对路径；2）alias别名；3）resolve.module

2. loader类型：pre normal inline post;   
`{enforce: 'pre'}`  

3. resolveLoader
   配置loader的续接规则
```js
module.exports = {
    resolveLoader: {
        modules: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'loaders')]
    }
}
```

4. loader顺序：从下到上，从右到左

以下为几种常见`loader`及其作用：
### 1、css-loader
css-loader可以解析css文件，并将css代码转化为字符串，以供webpack识别
### 2、 style-loader
通过css-laoder的辅助，webpack将css文件打包，但并不能作用于HTML文档上，也就是说这时的样式是不起作用的。需要通过style-loader将打包好的css文件插入html中，使样式生效。其本质是创建style标签，引入css文件
### 3、autoprefixer postcss-loader
给样式加浏览器前缀，做兼容
### 4、 file-loader
读取并输出文件,其实就是对文件进行copy
### 5、 url-loader 
读取并输出base64(base64会让文件膨胀，大约在1/3)
### 6、expose-loader
内联配置，必须引入一次，只要引用一次，就会暴露的全局上，不需要再次引入，当用户引用了jQuery的时候，会触发此loader
```js
module: {
    rules: {
        test: require.resolve('jquery'),
        use: {
            loader: 'expose-loader',
            options: '$' // 别名
        }
    }
}
```
### 7、 webpack-dev-server
webpack-dev-server是一个小型的`Node.js Express`服务器，给前端的本地开发带来极大方便。支持热更新（并不会更新文件 更新的是浏览器缓存）  

使用方式：
1. 下载
    ```
    webpack webpack-cli webpack-dev-server
    ```
2. 不支持命令行，必须放在script中（5.2以上可以使用npx）
    ```
    "script": {
        "dev": "webpack-dev-server"
    }
    ```
3. 直接访问 注意目录问题
### 8、eslint
* 配置：
    ```
    // eslintrc.js文件
    {
        rules: {
            indent: ["error", 4]
        }
    }
    ```
### 9、单元测试 jest
1. 安装jest
    ```
    cnpm i jest jest-webpack
    
    ```
2. 脚本
    ```
    "script": {
        "test": "jest-webpack"
    }
    ```
3. 编写测试用例
    ```
    // test 文件夹 -> xx.js
    const mod = require('../src/xx.js')
    
    test('test1~5', () => {
        expect(mod.fn(1)).toBe(2)
    })
    ```

## 五、 plugin介绍

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

#### 5. addAssetHtmlCdnWebpackPlugin
引用cnd中plugin。在HTML生成之后插入链接

## 六、bable
- presets:预设
默认设置多个常见plugein,例如‘plugin-transform-class’、'plugin-transform-for-of'
- plugins: 单独配置特定插件，用来弥补presets。
- 区别：presets从下到上执行，plugins从上到下执行
- exclude
- enforce: 'pre'---强制在所有js的loader之前执行
- babel-loader: webpack的loader，相当于入口文件，会调用`@babel/core`
- @babel/core:提供js转化的方法， 调用`@babel/preset-env`
- @babel-preset-env: 提供常用的babel插件

```js
// .bablerc
{
    "presets": ["@babel/preset-env"],
    "plugins": [
        ["@babel/plugin-proposal-decorators",{ "legacy": true }]
    ]
}
```

参考：[webpack中文文档](https://webpack.docschina.org/concepts)