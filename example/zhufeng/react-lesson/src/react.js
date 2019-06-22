class Component{
    static isRectComponent = true
    constructor(props) {
        this.props = props
    } 
}

function ReactElement(type, props) {
    return {type, props}
}

function createElement(type, config={}, children) {
    let props = {}
    let propName;
    for(propName in config) {
        props[propName] = config[propName]
    }
    let chidrenLength = arguments.length - 2
    if(childrenLength === 1) {
        props.children = children
    } else if(props.childrenLength > 1) {
        props.children = arguments.slice(2)
    }
    return ReactElement(type, props)
}

export default {
    createElement,
    Component
}