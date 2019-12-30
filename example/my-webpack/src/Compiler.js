let path = require('path')
let fs = require('fs')
let babylon = require('babylon')
let traverse = require('@babel/traverse').default
let generator = require('@babel/generator').default
let {SyncHook} = require('tapable')

// 提供一个运行的方法
class Compiler {
    constructor(config) {
        this.config = config
        this.entry = config.entry
        this.entryId = '' // 入口
        this.root = process.cwd() // 运行命令的位置
        this.modules = {} // 所有的依赖关系
        this.hooks = {
            entryOption:new SyncHook(['compiler']),
            emitFile: new SyncHook(['compiler']),
            parse: new SyncHook(['compiler'])
        }

        // console.log(this.root)
    }
    getSource(modulePath) {
        return fs.readFileSync(modulePath, 'utf8')
    }
    // 解析source
    parser(source, parentDir) {
        let ast = babylon.parse(source)
        let dependencies = []
        // 遍历树
        traverse(ast, {
            CallExpression(p) {
                let node = p.node
                if(node.callee.name === 'require') {
                    node.callee.name = '__webpack_require__'
                    // 增加一个后缀名 .js
                    let pathValue = node.arguments[0].value
                    pathValue = path.extname(pathValue) ? pathValue : pathValue + '.js'
                    // 增加前缀
                    node.arguments[0].value = './' + path.join(parentDir, pathValue)
                    // 依赖收集
                    dependencies.push(node.arguments[0].value)
                }
            }
        })
        // 重新生成树
        let r = generator(ast)
        return {r: r.code, dependencies}
    }
    buildModule(modulePath, isMain) {
        // 拿到相对于“根路径”的相对路径
        let relativePath = path.relative(this.root, modulePath)
        let parentDir = path.dirname(relativePath)
        let source = this.getSource(modulePath)
        if(isMain) {
            this.entryId = relativePath
        }
        let { r, dependencies } = this.parser(source, parentDir)
        this.modules[relativePath] = r
        // 递归进行依赖构建
        dependencies.forEach(dep => {
            this.buildModule(path.join(this.root, dep))
        })
        // console.log(source)
    }
    emitFile() {
        let ejs = require('ejs')
        let templateStr = this.getSource(path.resolve(__dirname, './ejs.ejs'))
        let str = ejs.render(templateStr, {
            entryId: this.entryId,
            modules: this.modules
        })
        let {filename, path: p} = this.config.output

        // 存放资源
        this.assets = {
            [filename]: str
        }
        Object.keys(this.assets).forEach(key => {
            fs.writeFileSync(path.join(p, key), this.assets[key])
        })
        this.hooks.emitFile.call(this)
    }
    run() {
        this.buildModule(path.join(this.root, this.entry), true)
    }
}
module.exports = Compiler