# react入门
## 一、基础教程
> 井格三连棋游戏

## 二、react哲学
### 1. 确定组件层级
### 2. 根据已有数据模型渲染不包含交互功能的UI
   > 静态应用需要编写大量代码，不需要考虑太多交互细节；交互功能需要考虑大量细节，而不需要编写大量代码。所以讲这两个过程分开比较合适
### 3. 确定 `UI state` 的最小表示
   > UI 通过改变 state 实现交互功能

   如何确定相应数据是否属于state?
   - 通过父组件的`props`传递的数据不属于state
   - 随着时间推移保持不变的不属于state
   - 可以根据其他state或者props计算的不属于state
### 4. 确定state放置的位置
- 找到根据这个state渲染的所有组件
- 找到他们的公共所有者组件
- 公共所有者组件或者层级更高的组件应该拥有该state
- 如果没有找到合适的组件，就可以新建一个组件存放该state，并将该组件置于所有组件之上

### 5. 反向数据传递
通过`callback`显示地实现反向数据传递有助于理解程序的运作方式，比较程序更多是给别人看的

## 三、Hook
### 1. 用法示例
```js
import {useState} from 'react'
function Component() {
   let [number, setNumber] = useState(10)
}
```
使用数组结构可以`不限制变量名`以及`保证调用顺序`

### 2. 什么是Hook
- Hook是一个函数，可以在函数组件中实现`state``声明周期`等特性
- Hook 有内置的，也可以自定义

### 3. Effect Hook
1. 副作用：不是纯函数的行为都被称作副作用（数据获取、订阅、手动修改DOM），简称作用
2. useEffect: 可以看出promise.then, 其实就是异步加回调
3. 清除副作用：return 一个函数
4. useEffect可以多次使用
5. 示例：
   ```jsx
   import React, {useState, useEffect} from 'react';
   function Example() {
      const [count, setCount] = useState(0);
      // 相当于 componentDidMount 和 componentDidUpdate
      // 在组件更新后 修改
      useEffect(function() {
         document.title = `You click ${count} times`;
      });
      // 取消副作用
      useEffect(() => {
         subscribe();
         return () => {
            unsubscribe()
         }
      });
      return (
         <div>
            <button onClick={() => setCount(count++)}>click me</button>
         </div>
      );
   }
   ```

### 4. 自定义Hook
本质上是封装了一个函数，返回的是内置的Hook，通过添加一些逻辑除了，实现自定义Hook
```js
import React, {useState, useEffect} from 'react';
function useFriendStatus(friendId) {
   const [isOnline, setIsOnline] = useState(null);

   function handleStatusChange(status) {
      setIsOnline(status.isOnline);
   }

   useEffect(() => {
      subscribe(friendId, handleStatusChange);
      return () => unsubscribe(friendId, handleStatusChange);
   })

   return isOnline;
}

function FriendStatus(propers) {
   const isOnline = useFrendStatus(proper.frend.id);
   return (
      <li style={{color: isOnline ? 'green': 'black'}}>123</li>
   )
}
```