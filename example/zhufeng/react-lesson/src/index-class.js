import React from 'react';
import ReactDOM from 'react-dom';

class Welcome extends React.Component {
    constructor(props) {
        super(props)
        console.log(super.props) // 这里的this指的是父组件，只有super中传了propers参数，这里才能打印出来
    }
    render() {
        console.log(this)
        return <h1>{this.props.name} {this.props.age}</h1>
    }
}
let person = {
    name: 'name',
    age: '13'
}
ReactDOM.render(React.createElement('div', {}, React.createElement(Welcome, person)), window.root)
// ReactDOM.render(<App />, document.getElementById('root'));
