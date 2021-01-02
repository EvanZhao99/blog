let path = require('path')
let fs = require('fs')
let babylon = require('babylon')
let traverse = require('@babel/traverse').default
let generator = require('@babel/generator').default
let {SyncHook} = require('tapable');
let transform = require('@babel/core').transform;

// 提供一个运行的方法
class Compiler {
    constructor(config) {
        this.config = config
        this.entry = config.entry
        this.entryId = '' // 入口
        this.root = process.cwd() // 运行命令的位置
        this.modules = {} // 所有的依赖关系

        // 声明钩子
        this.hooks = {
            entryOption:new SyncHook(['compiler']),
            emitFile: new SyncHook(['compiler']),
            parse: new SyncHook(['compiler'])
        }
        // 调用plugin
        config.plugins.forEach(instance => {
            instance.apply(this)
        })
    }
    getSource(modulePath) {
        // 同步读取代码文件
        let source = fs.readFileSync(modulePath, 'utf8')

        // 递归调用loader 处理源码
        let rules = this.config.module.rules
        for(let i = 0; i < rules.length; i++) {
            let {test: reg, use} = rules[i]
            console.log(reg,reg.test(modulePath))
            if(reg.test(modulePath)) {
                // 需要先定位到最后一个 [style-loader, less-loader]
                let len = use.length -1
                function normalLoader() {
                    let loader = use[len--]
                    if(loader) {
                        let l = require(loader)
                        source = l(source)
                        normalLoader() //取下一个loader
                    }
                }
                normalLoader()
            }
        }
        return source
    }
    // 解析source
    parser(source, parentDir) {
        // ast语法树解析代码
        let ast = babylon.parse(source, {
            sourceType: 'module',
            plugins: [
                'decorators'
            ]
        })
        // let ast = transform(source, function(err, result) {
        //     if(err) return console.log(err);
        //     let ast = result.ast;
        //     console.log('==result:', result)
        // });
        let dependencies = []
        let configMap = {};
        // 遍历树
        traverse(ast, {
            // CallExpression(p) {
            //     let node = p.node
                // if(node.callee.name === 'require') {
                //     node.callee.name = '__webpack_require__'
                //     // 增加一个后缀名 .js
                //     let pathValue = node.arguments[0].value
                //     pathValue = path.extname(pathValue) ? pathValue : pathValue + '.js'
                //     // 增加前缀
                //     node.arguments[0].value = './' + path.join(parentDir, pathValue)
                //     // 依赖收集
                //     dependencies.push(node.arguments[0].value)
                // }
                // console.log('===node',node)
            // }

            // 装饰器-----
            // Decorator(path) {
            //     let node = path.node;
            //     let decoratorName = node.expression.callee.name;
            //     if(decoratorName === 'subscribe') {
            //         let componentName = path.parentPath.parentPath.parent.id.name;
            //         let messageName = node.expression.arguments[0].value;
            //         let componentNames = configMap[messageName] = configMap[messageName] || [];
            //         componentNames.push(componentName);
            //     }
            // }

            // PubSub监听-------
            CallExpression(path) {
                let node = path.node;
                let objectName = node.callee.object && node.callee.object.name;
                let propertyName = node.callee.property && node.callee.property.name;
                if(objectName === 'PubSub' && propertyName === 'subscribe') {
                    let messageName = node.arguments[0].value;
                    let parentPath = path.parentPath;
                    while(parentPath && parentPath.parent.type !== 'ClassDeclaration') {
                        parentPath = parentPath.parentPath;
                    }
                    let componentName = parentPath.parent.id.name;
                    let componentNames = configMap[messageName] = configMap[messageName] || [];
                    componentNames.push(componentName);
                    console.log('消息路由配置：', configMap);

                }
            }
        })
        console.log(configMap)
        // 重新生成树
        let r = generator(ast)
        this.hooks.parse.call(this)
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
        // let { r, dependencies } = this.parser(source, parentDir);
        // 测试
        this.parser(source, parentDir)
        return;
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

        // 将内容写入文件 存放资源
        this.assets = {
            [filename]: str
        }
        Object.keys(this.assets).forEach(key => {
            fs.writeFileSync(path.join(p, key), this.assets[key])
        })
        this.hooks.emitFile.call(this)
    }
    run() {
        // 依赖构建 调用loader编译
        this.buildModule(path.join(this.root, this.entry), true)
        return;
        // 用模板生成一个 输出的文件
        this.emitFile()
    }
}
module.exports = Compiler