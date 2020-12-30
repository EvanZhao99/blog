import React from 'react'


export default class Authorized extends React.Component{

    render() {
        let { path, component} = this.props;
        return (
            <Route path={path} render={props => (
                localStorage.getItem('logined') ? '渲染组件' : '渲染登陆页面'
            )}/>
        )
    }
}