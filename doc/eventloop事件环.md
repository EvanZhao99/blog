

## tep
- node11之后与浏览器一致
- 代码在栈中执行，引用类型放在堆中
- 清空执行栈-》清空微任务队列-》callback队列第一个-》清空微任务队列-》callback队列第二个
### 浏览器执行顺序：
1. 当前执行栈执行完毕
2. 清空微任务队列
3. 从宏任务队列中取第一个，放到执行栈中执行
4. 清空微任务队列
5. 重复 3、4步骤

### 宏任务、微任务
宏任务：
1. setTimeout
2. setImmediate
3. MessageChannel
4. UI渲染
5. script


微任务
1. promise
2. mutationObserver: 监听dom变化
```js
let observer = new MutationObserver(() => {
    console.log(node.children.length)
})
observer.observe(node, {childList: true})
```
