
function render(element, container) {
    if(typeof element === 'string' || typeof element === 'number') {
        return container.appendChild(document.createTextNode(element))
    }
    let (type, props) = element
    let ele = document.createElement(type)
    for(let key in props) {
        if(/on[A-Z][a-z]/.test(key)) {
            // 事件
        } else if(key == 'style') {
            // 样式
        } else if(key === 'children') {
            // 子组件
        } else {
            els.setAttribute(key, props[key])
        }
    }
    container.appendChild(ele)
}
export default {
    render
}