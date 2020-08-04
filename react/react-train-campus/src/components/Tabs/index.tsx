import React from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import {HomeOutlined, ShoppingCartOutlined, UserOutlined} from '@ant-design/icons';
import './index.less';
function Tabs() {
    return (
        <footer>
            <NavLink exact to="/"><HomeOutlined/><span>首页</span></NavLink>
            <NavLink exact to="/mine"><ShoppingCartOutlined/><span>购物车</span></NavLink>
            <NavLink exact to="/"><UserOutlined/><span>我的</span></NavLink>
        </footer>
    )
}
export default withRouter(Tabs);