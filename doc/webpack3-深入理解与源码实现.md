

## tem

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


## 三. loader实现


1. 特点：职责单一 组合使用
2. loader分两部分：loader/pitch  
先执行pitch，操作文件；再执行loader，编译代码；pitch可以终止loader的执行，通过return可以直接跳到前一个loader节点

### 1. less-laoder
> 思路：引入`less`模块，调用其`render`函数，将`less`语法转义成`css`语法
```js

let less = require('less')
function loader(source) {
  let css 
  less.render(source, function(err, r){
    css = r.css
  })
  return css
}
module.exports = loader
```

### 2. style-loader
> 思路：创建一个`style`标签，引入css代码，插入到HTML文档中
```js
function loader(source) {
  let code = `let style = document.createElement('style')
    style.innerHTML = ${JSON.stringify(source)}
    document.head.appendChild(style)
  `
  // 回车转成明文的\n(\\n)
  return code.replace(/\\/g, '\\\\')
}
module.exports = loader
```

## 四、plugin实现
plugin是一个类，包含`apply`函数
```js
class A {
    apply(compiler) {
        compiler.hooks.parser.tap('pluginName', function() {
            
        })
    }
}
```
