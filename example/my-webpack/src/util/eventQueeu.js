// 消息监听任务队列
let eventQueue = {
    message1: {
        component1: [fn1, fn2]
    }
};

// 路由 组件与文件路径的关系 由该组件开发者配置
const routerMap = {
    component1: () => import('../src/components/component1'),
    component2: () => import('../src/components/component2'),
}

// 消息路由 消息与组件的对应关系 通过AST解析自动生成
const configMap = {
    message1: [
        'component1',
        'component2'
    ]
}

// 全局状态管理器
const store = {
    components: {
        component1, // 组件实例对象
        component2
    }
} 

// 消息处理器
function messageHandler(messageName) {
    let componentNames = configMap[messageName] || [];
    componentNames.forEach(componentName => {
        let component = store.components[componentName];
        // 检测状态管理器是否存在该组件，没有就创建，有就调用
        if(!component) {
            component = store.components[componentName] = routerMap[componentName]();
        }
        // 将消息派发给组件
        dispatch(messageName, component)
    })
}

// 消息订阅装饰器
function subscribe(messageName) {
    return target => {
        if(!configMap[messageName]?.include(target.constructor.name)) {
            throw new Error(`please registor component ${target.constructor.name}'to message ${messageName}`)
        }
        let eventQueue; // 消息监听任务队列
        eventQueue[messageName].push((component) => {
            target.prototype[functionName].call(component);
        })
    }
}

// 消息派发
function dispatch(messageName, component) {
    if(!component) {
        return messageHandler(messageName);
    }
    let componentName = component.constructor.name;
    eventQueue[messageName][componentName]?.forEach(task => task(component));
}

class Model{
    @subscribe('choice_question_message')
    close() {
        // 老师发题时隐藏该弹窗
    }
}


// AST解析 生成configMap.js
let babylon = require('babylon');
let traverse = require('@babel/traverse').default

let code = fs.readFileSync('./component1.js', 'readFileSync');
parse(code);
function parser(source) {
    // ast语法树解析代码
    let ast = babylon.parse(source, {
        sourceType: 'module',
        plugins: [
            'decorators'
        ]
    })
    let configMap = {};
    // 遍历AST语法树
    traverse(ast, {
        Decorator(path) {
            let node = path.node;
            let decoratorName = node.expression.callee.name;
            if(decoratorName === 'subscribe') {
                let componentName = path.parentPath.parentPath.parent.id.name;
                let messageName = node.expression.arguments[0].value;
                let componentNames = configMap[messageName] = configMap[messageName] || [];
                componentNames.push(componentName);
            }
        }
    })
    console.log(configMap) // {messageName: ['componentName']}
    fs.writeFileSync(path.join(__dirname, 'message_component_config.js'), configMap)
}

/*
流程: 将消息派发给对应组件，内部方法通过装饰器监听自己组件上的消息
1. 服务端推送消息
2. 调用 `messageHandler(messageName)` 处理该消息
3. 查询`configMap`中该消息对应的组件，并加载该组件
4. 组件加载完毕后会执行`@subscirbe`装饰器，将需要执行的`function`推送到`eventQueue`队列中
5. 通过`dispatch(messageName, component)`将消息派发给组件，执行`eventQueue`对象的任务

*/

