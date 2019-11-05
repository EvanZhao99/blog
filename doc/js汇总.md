# js汇总
## 深入理解原型
### 概念  
[ES2019规范](https://www.ecma-international.org/ecma-262/10.0/)对prototype的描述：
  > object that provides shared properties for other objects  

![](./img/prototype_es2019.png)

### 理解： 
  
prototype本身就是一个普通的js对象   

类似pubsub pattern 发布/订阅模式，发布者publisher与订阅者subscriber，与其他的普通js对象并没有本质的区别，只是一个约定而已 

类比生活中的海军和空军，退役后都是普通人  

### 相关方法

- Object.create 
将指定对象设为原型去实例化一个新的对象
- Object.setPrototypeOf
为一个已有的对象指定原型


### 参考：  
  [深入理解 JavaScript 原型](https://mp.weixin.qq.com/s/qg9LNm3awHBao1Du5n6KMQ)


## hasOwnProperty ??

## 函数式编程(FP)
### Monad/Monoid ??