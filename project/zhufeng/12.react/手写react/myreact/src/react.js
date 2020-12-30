import $ from 'jquery'
import {createUnit} from './unit'

let React = {
    render,
    rootIndex: 0
}
/**
 * 
 * @param {} element 可能是文本节点 原生dom节点 自定义组件
 * @param {*} container 
 */
function render(element, container) {
    // container.innerHTML = `<span data-reactId="${this.rootIndex}">${element}</span>`
    let unit = createUnit(element) // 处理element的工厂
    let markUp = unit.getMarkUp() // 返回html标记
    $(container).html(markUp) // 将元素插入到容器中
}

export default React