## temp
1. 执行编译：`tsc filepath`
2. 生成配置文件: `tsc --init`
3. keyof: 获取类型的key值
4. typeof：获取实例的类型

### Omit<T, K> 
the Omit<T, K> helper

```ts
// Construct a type with the properties of T except for those in type K
type Omit<T, K extends keyof any> = type Pick<T, Exclude<keyof T, K>>
```
```ts
type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
}
```