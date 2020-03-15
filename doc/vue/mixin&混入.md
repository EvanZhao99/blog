# mixin
给每个组件的生命周期、data、methods等混入一些公共逻辑。
- 值为对象的选项合并： 进行递归合并为同一个对象，发生冲突时以组件数据优先
- 同名钩子：被合并成数组

### 使用方式
- 1 组件混入：
```js
// 组件mixins
let mixin = {methods, data, mounted}
let vm = new Vue({
  mixins: [mixin],
  data,
  methods
})
```
- 2 全局混入
```js
// 全局mixin
Vue.mixin({
  data: function() {return {}}
  methods: {},
  created: function(){}
})

```
- 3 自定义混入策略
  通过配置`Vue.config.optionMergeStrategies`，返回合并后的值
```js
Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // 默认合并策略
  if(fromVal === undefined) {
    return toVal
  }
  return toVal
}
```
### 源码
- 如果是`组件的minxins`，遍历数组，递归调用`mergeOptions`进行合并
- 通过`config.optionMergeStrategies`获取对应属性的合并策略，没有就使用默认的策略（组件优先）
```js
// core/util/options.js

export function mergeOptions (
  parent: Object,
  child: Object,
  vm?: Component
): Object {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child)
  }

  if (typeof child === 'function') {
    child = child.options
  }

  normalizeProps(child, vm)
  normalizeInject(child, vm)
  normalizeDirectives(child)

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm)
    }
    if (child.mixins) {
      for (let i = 0, l = child.mixins.length; i < l; i++) {
        // 递归合并mixin
        parent = mergeOptions(parent, child.mixins[i], vm)
      }
    }
  }

  const options = {}
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField (key) {
    // 获取对应属性的合并策略，没有就使用默认的策略（组件优先）
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}
```



