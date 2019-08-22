// 入口文件 react react-dom
import React from 'react' // react 基于jsx 语法的默认就需要全局的react变量
import ReactDOM from 'react-dom'

// jsx语法可以帮助我们创建 jsx元素 react元素
// js + xml javascript html (基于HTML可以写js语法)
// class => className

// let ele = <h1>我很帅</h1>

let ele = React.createElement(
    'h1',
    {className: 'aaa'},
    '我很帅',
    React.createElement('span', null, '很帅')
)

console.log(ele)

ReactDOM.render(ele, window.root)
