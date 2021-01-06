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

### scripts

### bin
用来指定内部命令对应的可执行文件的位置。执行内部命令时，