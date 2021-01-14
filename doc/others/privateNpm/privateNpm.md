# 搭建私用npm

## nrm

用于`npm`官方源在国内非常不稳定，有时候我们需要切换成淘宝源：
```
npm set registry https://registry.npm.taobao.org/
```
遇到淘宝源没有的包，需要再切回官方源
```
npm set registry https://registry.npmjs.org
```
这时，使用`nrm`切换就比较方便了。

### 安装nrm

```
npm install nrm -g
// 或
yarn global add nrm
```
```
nrm ls // 查看本地所有可选源
```
输出结果：
```
npm -------- https://registry.npmjs.org/
yarn ------- https://registry.yarnpkg.com/
cnpm ------- http://r.cnpmjs.org/
taobao ----- https://registry.npm.taobao.org/
nj --------- https://registry.nodejitsu.com/
npmMirror -- https://skimdb.npmjs.com/registry/
edunpm ----- http://registry.enpmjs.org/
```
切换成淘宝源
```
nrm use taobao
```
> 其实无论`nrm use <registry>` 还是 `npm set registry <registryPath>`都是修改本地`npmrc`配置文件的内容  
> 也可以通过`vi ~/.npmrc`直接修改配置信息

### 常用命令

添加可选源
```
nrm add <registry> <url>
```
删除可选源
```
nrm del <registry>
```
测试相应时间
```
nrm test <registry>
```
更多命令可以通过‘帮助’查看
```
nrm --help
// 或
nrm
```

## npm

### npm init

`npm init`会调用`shell`脚本，输出一个初始化的`package.json`文件。

- 自定义 npm init 行为  
  本地创建一个`.npm-init.js`文件，该文件的`module.exports`即为`package.json`配置的内容。通过`prompt()`获取用户输入信息。然后再执行`npm config set init-module ./npm-init.js`
  ```js
    const desc = prompt('description?', 'A new package...')
    const bar = prompt('bar?', '')
    const count = prompt('count?', '42')

    module.exports = {
    key: 'value',
    foo: {
        bar: bar,
        count: count
    },
    name: prompt('name?', process.cwd().split('/').pop()),
    version: prompt('version?', '0.1.0'),
    description: desc,
    main: 'index.js',
    }

  ```

### 依赖

- dependencise  
  通过`npm i packagename@version -S`安装，如果没有指定版本，默认安装最新的。  
  从`npm 5.x`开始不需要指定`--save`，会默认添加到`dependencise`中

- devDependencise  
  通过`npm i packagename -D`安装，用于本地开发，不会被打包到线上。

### main

```
{
  "main": “lib/index.js”
}
```
`main`属性指定程序的主入口，其他项目在引入这个`npm`包时，实际引入的是`lin/index`中暴露出去的模块。

### bin
用来指定内部命令对应的可执行文件的位置。如果是全局安装的模块，`npm`会使用符号链接把可执行文件链接到`/usr/local/bin`，如果项目中安装，会链接到`./node_modules/.bin`
```
"bin" {
  "vm": "./bin/vm"
}
```

### scripts

#### usage

npm允许使用`scripts`字段定义脚本命令
```
"scripts": {
  "test": "test.js",
  "build": "tsc"
}
```
`scripts`的每个属性都对应一个可执行脚本。通过`npm run xx`执行对应的脚本文件。  
通过`npm run`查看当前项目所有的脚本命令。

#### 原理

我们每次运行`scripts`中的属性时，系统都会自动新建一个shell,在这个shell中执行指定的脚本。因此，凡是能在shell中执行的脚本都能写在npm scripts中。 

> 新建的shell会在当前目录下的`node_modules/.bin`子目录加入PATH变量，执行结束后，再将PATH变量恢复原样。也就是说，当前项目目录`node_modules/.bin`子目录中所有的脚本，都可以直接用脚本名称调用，不需要增加路径。  

`npm install`安装摸个模块时，如果该模块的`package.json`中配置了`bin`属性，在安装时会自动软连接到`node_modules/.bin`中。

#### hook

`package.json`中的`scripts`也是有声明周期的。`npm`
脚本有两个钩子`pre`和`post.`

#### env环境变量

在我们执行`npm run`脚本时候，npm会设置一些特殊的env环境变量。其中`package.json`中所有的字段，都被设置为以`npm_package_`开头的环境变量。

```
{
  "name": "npm-demo", // npm_package_name
  "version": "1.0.0", // npm_package_version
  "script": {
    "build": "webpack --mode=production", // npm_package_script_build
  },
  "files": ["src"] // npm_package_files_0
}
```

同时，npm相关的所有配置也会被设置为以`npm_config_`开头的环境变量。  

此外，还会有一个比较特殊的环境变量`npm_lifecycle_event`，表示正在运行的脚本名称。比如执行`npm run serve`的时候，`process.env.npm_lifecycle_event`的值为`serve`。

##### 常用技巧

```
// env 命令可以列出所有环境变量
npm run env
```

```
// 在shell脚本中输出环境变量
echo PATH
```

```
// 在shell脚本中设置环境变量
echo PATH = /usr/local/lib
```

#### 脚本传入参数

通过脚本传入的参数都可以通过`process.argv`属性访问。

> `process.argv`返回一个数组，第一个元素为启动node进程的可执行文件的绝对路径名，第二个元素为当前执行的js文件路径，剩余元素为其他命令行参数。  

```
"scripts":{
  "serve": "vue-cli-service serve --mode=dev --mobile -config build/example.js"
}
```
执行`npm run server`命令的时候，`process.argv`的具体内容为：
```
[ 
  '/usr/local/Cellar/node/12.14.1/bin/node',
  '/Users/mac/Vue-projects/hao-cli/node_modules/.bin/vue-cli-service',
  'serve',
  '--mode=dev',
  '--mobile',
  '-config',
  'build/example.js'
]
```

#### 执行顺序

- 并行执行
  ```
  npm run script1 & npm run script2 
  ```
- 串行执行
  ```
  npm run script1 && npm run script2 
  ```

#### 任意脚本

可以执行`python`等其他语言

#### npm 配置

#### npmrc文件

### npm包发布