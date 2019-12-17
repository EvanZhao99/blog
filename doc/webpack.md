# webpack
## 什么是webpack?
webpack 是一个现代js应用程序的静态模块打包器(module bundler)。  
当webpack处理应用程序时，它会递归构建一个依赖关系图（dependency graph）,其中包含应用程序需要的所有模块，然后生成一个或多个bundle

### 1 什么是loader？
模块转换器，用于把模块原内容按照需求转换成新内容，可以加载非js模块

### 2 什么是plugin？
在webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或者做你想要的事情。类似vue钩子函数

- 根据依赖将文件打包成一个bundle，往HTML中插入一个script标签，引入该文件
