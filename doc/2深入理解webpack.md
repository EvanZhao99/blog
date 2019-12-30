

## tem
- provideplugin 
- expose
- addAssetHtmlCdnWebpackPlugin: 引入cdn插件
- 热更新的原理是websocket
- import() 返回的是promise
- prefech与preload的区别
- ignorePlugin moment语言包非常大,需要忽略 
- dllPlugin: 动态链接库，不需要每次都重新构建第三方库，优化打包速度
    > 1.将依赖打包成库； 2. 通过`dllPlugin`创建manifest.json; 3. 通过addAssetHtmlPlugin

- resolve：减少查找范围，只找当前目录下的
- happypack: 开子进程打包
- 优化手段：代码分割  cdn  dllplugin  splitChunks  happypack
- process.cwd() 拿到当前的目录名
- resolveLoader
- inlineloader

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

## 一、AST
- 过程：把源代码转化成树，遍历树（深度优先）、修改树、生成树
- 特点：代码混淆、优化代码、代码检测、格式化、代码错误提示、自动补全
- astexplorer.net :  自动转化网站
- @babel/types: 创建节点
- babel插件
    ```js
    // babel插件
    let babelPlugin = {
        visitor: {

        }
    }
    babel.transform(code, {
        plugins: [
            {
                visitor: {
                    ClassDeclaration(path) {
                        let node = path.node
                    }
                }
            }
        ]
    })

    ```
- recast: 可以将代码转成ast的包
- [AST抽象语法树——最基础的javascript重点知识，99%的人根本不了解](https://segmentfault.com/a/1190000016231512?utm_source=tag-newest)
- esprima 解析语法树；traverse 遍历树； generator 重新生成树
- babylon           @babel/traverse   @babel/generator
- @babel/core transform 解析遍历树；

## 二、webpack实现
### 1. 流程
1. 把所有用到的模块依赖 做成一个对象 key是当前文件名
2. require -> __webpack_require __
3. 需要改造引用的路径
4. 确定入口文件 加载内容
5. 创建依赖谱图 把所有依赖做成列表
6. 把模板 和 我们解析出来的列表 进行渲染 打包到目标文件中

### 2.loader
1. loader 引入的四种方式：
1）绝对路径；2）alias别名；3）resolve.module

2. loader类型：pre normal inline post;   
`{enforce: 'pre'}`

3. 特点：职责单一 组合使用
4. loader分两部分：loader/pitch  
先执行pitch，操作文件；再执行loader，编译代码；pitch可以终止loader的执行，通过return可以直接跳到前一个loader节点
