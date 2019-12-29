let path = require('path')
let fs = require('fs')
let babylon = require('babylon')
let traverse = require('@babel/traverse').default
let generator = require('@babel/generator').default


// 提供一个运行的方法
class Compiler {
    constructor(config) {
        this.config = config
        this.entry = config.entry
        this.entryId = '' // 入口
        this.root = process.cwd() // 运行命令的位置
        this.modules = {} // 所有的依赖关系

        // console.log(this.root)
    }
    getSource(modulePath) {
        return fs.readFileSync(modulePath, 'utf8')
    }
    // 解析source
    parser(source, parentDir) { 
        let ast = babylon.parse(source)
        // 遍历树
        traverse(ast, {
            CallExpression(path) {
                let node = path.node
                if(node.callee.name === 'require') {
                    node.callee.name = '__webpack_require__'
                    // 增加一个后缀名 .js
                    let path = node.arguments[0].value
                    path = path.extname(path) ? path : path + '.js'
                    // 增加前缀
                    node.arguments[0].value = './' + path.join(parentDir, path)
                }
            }
        })
        // 重新生成树
        let r = generator(ast)
        console.log(r)
    }
    buildModule(modulePath, isMain) {
        let relativePath = path.relative(this.root, modulePath)
        let parentDir = path.dirname(relativePath)
        let source = this.getSource(modulePath, parentDir)
        if(isMain) {
            this.entryId = relativePath
        }
        this.parser(source)
        // console.log(source)
    }
    run() {
        this.buildModule(path.join(this.root, this.entry), true)
    }
}
module.exports = Compiler