# react入门
## 一、搭建环境
1. 初始化npm
2. 安装依赖
3. 生成ts配置文件
4. webpack配置文件
5. package.json配置命令
6. `src`目录下编写代码

## 二、入口文件
```js
--project
  |-src
    |-index.html
    |-index.tsx

```
index.html文件内容：
```html
<div id="root"></div>
```
index.tsx文件内容：
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render((
    <h1>hello</h>
), document.getElementById('root'))
```
## 三、路由
```jsx
import {Switch, Route, Redirect} from 'react-route-dom';
<Switch>
  <Route path="/" component={Home}/>
  <Route path="/profile" component={Profile}/>
  <Redirect to="/"/>
</Switch>
```
触发history,改变路由信息
```js
history.push(path)
```
`Switch`组件通过location匹配路径返回对应的`Route`子组件
```jsx
class Switch extends React.Component{
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          let location = this.props.location || context.location;
          let element;
          React.Children.forEach(this.props.children, child => {
            if(child.props.path === location.paht) {
              element = child
            }
          });
          return React.clone(element)
        }}
      </RouterContext.Consumer>
    )
  }
}
```

`Route`组件返回的是传入的组件实例`props.component`
```jsx
class Route extends React.Component{
  render() {
    return (
      React.createElement(this.props.component, this.props)
    )
  }
}
```
## 四、状态管理

## 五、业务开发
### 1. 组件
### 2. 样式

