# 实现一个简单的webpack
## 零、写在前面
本文内容简介：
1. webpack执行流程
2. 用代码简单实现webpack流程
3. loader实现原理
4. 实现`less-loader`
5. plugin实现原理

## 一、webpack执行流程
1. 读取配置文件`webpack.config.js`
2. 确定入口文件，读取源代码
3. 根据AST语法树解析代码，将`require`替换成`__webpack_require__`,进行依赖收集
4. 根据依赖列表递归构建依赖图谱。把所有用到的模块依赖存放到一个对象中，`key`是模块路径,`value`是模块内容
5. 将构建好的内容写入到输出文件中