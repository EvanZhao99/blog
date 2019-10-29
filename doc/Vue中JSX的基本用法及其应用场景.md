# Vue中JSX的基本用法及其应用场景

## 什么是JSX？
JSX是React出的一种对JavaScript的语法扩展。

在Vue中大多数情况推荐使用模板语法，通过template中的Vue指令进行快速开发。但是template也是存在一些缺陷的，扩展难度大，造成逻辑冗余。这时候我们就需要`JavaScript`的完全编程能力，结合`render函数`与`JSX`进行功能扩展。 

## 基础用法
##### 1. 嵌入表达式  

在JSX中，我们可以在大括号中使用任何有效的JS表达式
  ```JavaScript
  // 动态渲染内容
  let name = "Josh Perez"
  let element = <h1>Hello {name}</h1>

  // 动态绑定属性
  let imgUrl = 'http://xxx.jpg'
  let img = <img src={imgUrl} />
  ```
  > 在`<>`中写HTML标签，在`{}`中写js代码  
  
  
JSX代码本身也是js表达式，它表示的是一个js对象。
```javascript
// 在vue的render函数中，以下两种写法是等价的
render: function(createElement) {
  let name = "Josh Perez"
  let element = <h1 class="title">Hello {name}</h1>
  return element
}
// ===》》
render: function(createElement) {
  let name = "Josh Perez"
  let element = createElement(
    'h1',
    {class: title},
    `Hello ${name}`
  )
  return element
}
```
> 事实上， Babel会把JSX语法转义成JS对象，也就是上述代码的后一种写法。

##### 2. 绑定事件 & v-on
在JSX中事件的命名采用小驼峰式（camelCase），而不是纯小写。
```javascript
methods: {
  deleteRow(id) {
    // todo
  }
},
render: (h) => {
  return <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
}

```
##### 3. 条件渲染 & v-if
在JSX中无法使用Vue中的`v-if-else`指令，可以使用Javascript中的运算符`if`或者`三元运算符`代替
```javascript
// if运算符
let isEnable = props.isEnable
render(h) {
  if(isEnable) {
    return <button>禁用</button>
  } else {
    return <button>启用</button>
  }
}
```
```javascript
// 三元运算符
let isEnable = props.isEnable
render(h) {
  return <button>{isEnable ? '禁用' : '启用'}</button>
}
```

##### 4. 列表 & v-for
在JSX中可以通过`map`实现`v-for`
```javascript
render: (h) => {
  const numbers = [1, 2, 3, 4, 5]
  let listItems = numbers.map(number => 
    <li>{number}</li>
  )
  return (
    <ul>{listItems}</ul>
  )
}
```
实现`key`属性的绑定
```javascript
render: (h) => {
  const numbers = [1, 2, 3, 4, 5]
  let listItems = numbers.map(number => 
    <li key={number.toString()}>{number}</li>
  )
  return (
    <ul>{listItems}</ul>
  )
}

```
在JSX中嵌入map
```javascript
render: (h) => {
  const numbers = [1, 2, 3, 4, 5]
  let listItems = 
  return (
    <ul>
      {
        numbers.map(number => 
          <li key={number.toString()}>{number}</li>
        )
      }
    </ul>
  )
}

```

## 使用场景 & 实践
Vue 推荐在绝大多数情况下使用模板来创建你的 HTML。但是在开发过程中`template`并不能满足我们的所有需求，在一些组件开发中比较常见

> 下面是我在工作中根据业务场景对Element UI中的table组件进行的扩展，或许可以加深一些对JSX的理解


在开发后台管理系统时，所有不可避免的要进行大量数据列表的展示。目前比较流行的第三方组件库 Element UI，其列表渲染的代码如下：
```javascript
<el-table :data="list">
  <el-table-column prop="name" lable="姓名" width="150" align="center"></el-table-column>
  <el-table-column prop="age" lable="年龄" width="150" align="center"></el-table-column>
  .
  .
  .
</el-table>
```
每一列都需要写一次`el-table-column`标签，尤其在处理财务报表这种展示大批量相似数据时，一种很糟糕的体验。

我们期待的效果是这样的：
```
<table :data="list" :columns="columns">
```
```
data() {
  return {
    list: []
    columns: []
  }
}
```
将列的描述信息放到js中，这样可以省去不少代码，代码结构也会清晰很多。具体实现过程如下：

### table组件的封装  


基于Element UI 对table组件进行二次封装
```html
<template>
  <el-table :data="data" v-bind="$attrs">
    <template v-for="(column, index) of columns">
      <!-- render -->
      <el-table-column v-if="column.render" v-bind="Object.assign({}, defaultColumnConfig, column)" :key="index">
        <template slot-scope="scope">
          <extend :render="column.render" :params="scope"></extend>
        </template>
      </el-table-column>
      <!-- no render -->
      <el-table-column v-else v-bind="Object.assign({}, defaultColumnConfig, column)" :key="index"></el-table-column>
    </template>
  </el-table>
</template>
<script>
import extend from './extend.js'
export default {
  components: { extend },
  props: {
    data: {
      type: Array
    },
    columns: {
      type: Array
    },
    defaultColumnConfig: {
      type: Object
    }
  }
}
</script>
```
通过`extend`组件实现`render`函数
```javascript
export default {
  props: {
    params: {
      type: Object
    },
    render: {
      type: Function
    }
  },
  render(h) {
    return this.render(h, this.params)
  }
}
```
##### 具体用法 & demo

```javascript
<template>
  <y-table :data="list" :columns="columns" :defaultColumnConfig="defaultColumnConfig" border></y-table>
</template>
<script>
import YTable from "./index"
export default {
  components: {
    YTable
  },
  data() {
    return {
      list: [
        {name: '张三', age: 12, sex: 0},
        {name: '李四', age: 11, sex: 1},
      ],
      defaultColumnConfig: {
        width: 100,
        align: 'center'
      },
      columns:[
        {
          prop: 'name',
          label: '姓名',
          width: 200
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          label: '性别',
          render(h,scope) {
            return h(
              'span', 
              {
                style: {color: 'red'}
              }, 
              scope.row.sex === 0 ? '男' : '女'
            )
          }
        },
        {
          label: '性别',
          render(h,scope) {
            return (
              <span style="color: red">{scope.row.sex === 0 ? '男' : '女'}</span>
            )
          }
        }
      ]
    }
  }
}
</script>
```
渲染效果：
![](https://github.com/pluckychuang/blog/blob/master/doc/img/jsx_demo.png?raw=true)

## 参考
- [react API](https://zh-hans.reactjs.org/docs/introducing-jsx.html)
- [Vue API](https://cn.vuejs.org/v2/guide/render-function.html)
- [iview table组件源码](https://github.com/iview/iview/tree/2.0/src/components/table)




