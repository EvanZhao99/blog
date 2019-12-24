

- provideplugin 
- expose

```js
module: {
    rules: {
        // 只要引用一次，就会暴露的全局上，不需要再次引入
        // 当用户引用了jQuery的时候，会触发此loader
        test: require.resolve('jquery'),
        use: {
            loader: 'expose-loader',
            options: '$' // 别名
        }
    }
}
```