# js基础知识扫盲
## 一、目录
1. 栈
2. 队列
3. 数据类型
4. 执行上下文

## 二、内容
### 执行栈
- 一种数据结构，先进后出
- 代码的运行方式，表示函数的一层层调用`call stack`
- 内存中的一块区域
  - 栈(stack):有结构，每个区块的大小是确定的
  - 堆(heap):没有结构，数据可以任意存放，寻址速度小于stack
  - 局部的、占用空间确定的放到栈中；否则放到堆中，对象放到堆中

### 队列
- 先进先出
- 实现：
  ```js
    class Queue{
        constructor() {
            this._itmes = []
        }
        enqueeue(item) {
            this._items.push(itme)
        }
        dequeue() {
            this._items.shift()
        }
    }
  ```

### 数据类型
- 基本类型(6)：string/number/boolean/null/undefined/symbol
- 引用类型(1):object,其中包括一些常见类型：Array/Function/Date

### 执行上下文
执行上下文是一个对象`object`，包含三个属性：`变量对象(AO)，this, 作用域链`  
示例：
```js
function task(m, n) {
    let a= 1
    let b = {}
    let c = []
}
task(10, 20)

// task的执行上下文
let taskExecutionContext = {
    this: window,
    scopeChain: [],
    // VariableObject 变量对象 存放当前函数 要使用的变量
    VO: {
        m: 10,
        n: 20,
        a: 1,
        b: 'xo1',
        c: 'xa1'
    }
}
```
- 栈是一个数据结构，里面放着很多执行上下文
- 每次函数执行 都会产生一个执行上下文
- 全局上下文的VO，也被称为GO（global object） 全局对象
- 在浏览器端 GO就是window
- 
