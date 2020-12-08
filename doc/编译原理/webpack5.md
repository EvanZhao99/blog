## temp
1. resolveLoader: [loaderPath, 'node_modules'], 定义loader的路径
2. hard-source-webpack-plugin: 缓存
3. module.noParse: /正则/， 不去查找文件内部的依赖，文件内不能出现‘require’，‘import’
4. bundle-analyze-webpack-plugin
5. ignore-webpack-plugin: 忽略的可以单独引用`improt "./zh.js"`
6. thread-loader: 开线程池
7. 缓存：cache-loader
8. terser-webpack-plugin: 压缩js
9. optimize-css-assets-webpack-plugin: css压缩
10. purege-css-webpack-plugin
11. glob: 文件匹配模式
12. `**`匹配任意字段，`*`匹配任意字符，不包括路径分隔符
13. mode: 根据环境启用相应的插件，process.env.NODE_ENV
14. --env: 
    ```js
    module.exports = (env) => {
        // 命令行的env 只能在这里使用
        return {

        }
    }
    ```

15. definePlugin: 编译阶段替换变量
16. cross-env NODE_ENV: 给`process.env.NODE_ENV` ,跨操作系统