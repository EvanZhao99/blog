import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux'; // 负责把属性中的store传递给子组件
import store from './store';
import {ConfigProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import './assets/css/common.less';
import Tabs from './components/Tabs';
import Home from './routes/Home';
import Mine from './routes/Mine';
import Profile from './routes/Profile';
import {ConnectedRouter} from 'connected-react-router'; // redux绑定路由
import history from './store/history';

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ConfigProvider locale={zh_CN}>
                <main className="main-container">
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/mine" exact component={Mine}/>
                        <Route path="/profile" component={Profile}/>
                        <Redirect to="/"/>
                    </Switch>
                </main>
                <Tabs/>
            </ConfigProvider>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));