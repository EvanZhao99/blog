
let isBatching = {
    isBatchingUpdate: false,
    dirtyComponents: [],
    batchingUpdate() {
        this.dirtyComponents.forEach(component => {
            component.updateComponent() // 依次让组件更新
        })
    }
}

// 更新器 存储当前的需要更新的组件 和需要更新的状态
class Updater{
    constructor(component) {
        this.component = component
        this.pendingStates = []
    }
    addState(newState) {
        this.pendingStates.push(newState)
        if(isBatching.isBatchingUpdate) {
            isBatching.dirtyComponents.push(this.component)
        } else {
            this.component.updateComponent()
        }
    }
}
class Transaction {
    constructor(wrappers) {
        this.wrappers = wrappers
    }
    perfom(anyfunc) {
        this.wrappers.forEach(wrapper => {
            wrapper.initailize()
        })
        anyfunc()
        this.wrappers.forEach(wrapper => {
            wrapper.close()
        })
    }
}

let transaction = new Transaction([
    {
        initailize() {
            isBatching.isBatchingUpdate = true
        },
        close() {
            isBatching.isBatchingUpdate = false
            isBatching.batchingUpdate() // 更新视图
        }
    }
])
window.fn= function(e, eventName) {
    transaction.perfom(e.target.componet[eventName].bind(e.target.componet))
}

class Component {
    constructor() {
        this.$updater = new Updater(this)
    }
    createDOMFromStr() {
        let str = this.render()
        let div = document.createElement('div')
        div.innerHTML = str
        this.ele = div.firstElementChild
        this.ele.componet = this
        return this.ele
    }
    updateComponent() {
        this.$updater.pendingStates.forEach(newState => {
            this.state = {...this.state, ...newState}
        })
        this.$updater.pendingStates.length = 0
        let oldElement = this.ele
        let newElement = this.createDOMFromStr()
        oldElement.parentElement.replaceChild(newElement, oldElement)
    }
    setState(partial) {
        this.$updater.addState(partial)
    }
    mount(container) {
        container.appendChild(this.createDOMFromStr())
    }
}

class Button extends Component {
    constructor(props) {
        super()
        this.props = props
        this.state = {number: 0, age: 10}
    }
    handleClick() {
        this.setState({ number: this.state.number +1 });
    console.log(this.state.number)
    this.setState({ number: this.state.number +1 });
    console.log(this.state.number)
    setTimeout(()=>{ // 非批量更新
        this.setState({ number: this.state.number +1 });
        console.log(this.state.number)
        this.setState({ number: this.state.number +1 });
        console.log(this.state.number)
    },3000)
    }
    render() {
        return `<button onclick="fn(event, 'handleClick')">${this.props.name} <span>${this.state.age}</span></button>`
    }
}