# 前端入门mongodb(Mac版)
### 为什么选择mongo
随着大前端时代的到来，`全栈`已经默认成为前端的必备技能。大部分的前端er选择了相同的技术栈（Node.js + mongodb + Vue）,原因很简单，对，就是`简单`,它们采用了相同对编程语言`Javascript`，所以对前端来说入门要相对简单很多。mongodb采用的是`json`存储，兼容ES6语法（新版本），对于前端来说一点违和感都没有。



### 安装并启动
* 安装homebrew
> Homebrew 是一款Mac OS平台下的软件包管理工具，类似Node的npm，用起来很爽，而且用它安装mongo不需要配置环境变量
```
// 下载地址
http://brew/sh/
```
* brew install mongodb； 安装mongodb
* which mongo； /usr/local/bin/mongo 找到mongodb安装位置
* cd /usr/local/bin; 进入该文件夹
* sudo mongod --dbpach=/data/db; 启动mongodb服务端，并指定数据存储路径
    > sudo 越过安全权限限制  
  mongod 启动服务端时 默认寻找根目录下的`/data/db`,所以不用每次都指定dbpath  

此时启动的是服务端，所以我们还需要启动客户端来操作数据库。此时mongod服务正在启动无法输入命令，在不创建新终端窗口的情况下可以采用以下命令解决该问题：
- sudo mongod$
    > `sudo mongod& `,后台启动进程,我们可以继续其他操作而不影响该服务  
    > 如何关掉进入后台的进行？`sudo lsof -i:27017`  找到进程号;  `sudo kill -9 <进程代号> ` 杀死该进程
* mongo 链接客户端


### 创建数据库
- show dbs; 查看数据库
- use shool; 切换到school数据库（并不需要显式创建）
    > 此时使用 `show dbs` 并不会打印出 school，因为目前school是空的
- db.createCollection('user')； 创建`user`集合
- show dbs； 此时可以打印出school

### 操作数据库

##### 增
- db.user.insert({_id: 1, name: '易考生', address: '中关村'});   不指定id时，系统自动生成objectId
- db.user.insert({_id: 1, name: '易考研2', address: '中关村'}); 报错，id不能重复
- db.user.save({_id: 1, name: '易考研', address: '中关村'}); id存在是修改该条数据的值
- 
##### 删
- db.user.remove({_id: 1})

##### 改
- db.user.update(<条件>,<值>)
- db.user.update({address: '中关村'})；只修改匹配到的第一条
- db.user.update({address: '中关村'}, {$set: {age: 25}}, {multi: true}); 修改匹配到的所有数据
- 
##### 查
- db.user.find(<条件>)
- 
以下是部分API的测试及打印结果：
```
// 创建school数据库
use school  // switched to db school
db  // school
show dbs // 并不会打印出 school，因为目前school是空的
db.createCollection('user')
show dbs // 可以打印出school
show collections // user
school.user.find() // 
school.user.drop() // true
show collections //
db.user.insert({name: 'zjc'})
db.user.find() // { "_id" : ObjectId("5caf5f22de28c0848f62168b"), "name" : "zjc" }
db.user.insert({_id: 1, name: 'z2'}) // id可以指定
db.user.insert({_id: 1, name: 'z2'}) // 报错，id不能重复
db.user.save({_id:1, name:'z2'})  // WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 0 })
db.user.find() // { "_id" : ObjectId("5caf5f22de28c0848f62168b"), "name" : "zjc" }
                // { "_id" : 1, "name" : "z2" }
                
for(let i = 1; i < 10; i++) {
    db.user.insert({_id: i, name: 'zjc'})
}
db.user.update({name: 'zjc'}, {age: 25})  // 只改第一条
db.user.update({name: 'zjc'},{$set: {age: 25}}, {multi: true})  // 全改
db.user.update({name: 'zjc'},{$unset: {age: 25}}, {multi: true}) // 删除属性
db.user.update({}, {$inc:{age:5}}, {multi: true}) // 每一条的age都加五

//  数组
db.user.update({_id:1},{$set:{hobby:['writing', 'eat', 'drinking']}})
db.user.update({_id:1},{$set:{hobby.0:'playing'}}) // 更改数组中都元素
db.user.update({_id:1},{$push:{'hobby':'codding'}}) // 添加
db.user.update({_id: 1},{$pop:{'hobby':-1}}) // 删除，1--最后一个；-1--第一个

db.user.update({_id: 1, hobby: {$ne: 1234}}, {$push: {hobby: 1234}}) // $ne 不等于
db.user.update({_id: 1}, {$addToSet: {hobby: 123}}) // 去重，如果没有就插入

db.user.remove({name: 'zjc'}) // 删除所以匹配文档
db.user.remove({name: ''zjc}, {justOne: true}) // 仅删一项 
db.user.find({_id: {$in: [10, 15]}}) // id为10 或 15 的数据
db.user.find({_id: {$not: {$in: [10, 15]}}}) // 不等于
db.user.find({_id: {$lte: 17, $gt: 13}})
db.user.find({_id: {$lte: 17, $gt: 13}}, {name: 1, _id: 0}) // 1-只要改属性；0-除了该属性都要；0和1不能同时出现，_id除外
db.user.find({hobby: 1}) // 数组包含1的
db.user.find({hobby: {$all: [1,2,3]}}) // 数组包含1 2 3的
db.user.find({$where:"this.age>12 $$ this.age<17"})  // 符合js语法，但是效率低

```

### mongo命令总结
#### mongod
- show dbs; 显示数据库
- show collectons; 显示集合
- db; 当前数据库
- db.dropDatebase(); 删除数据库
- db.user.drop(); 删除集合（user为集合名称）
- 在集合中插入内容 db.user.insert() / save() 更新
- 在集合中读取内容 db.user.find()
#### 改
- update $set $unset $inc $push $pop 'hobby.0' $ne $addToSet

#### 删除
- remove()   justone: true
#### 查询
- $in $nin $not+$in $lt $gt $lte $all

## 链接数据库
- mongodb文件夹下创建mongo.js文件
- pwd; 打开终端 terminal, 输入`pwd`，查看文件所在路径
- mongo mongo.js； 进入该地址，使用mongo命令执行js文件
```
let db = connect('school')

let startTimer = Date.now()
for(let i = 0; i < 10000; i++) {
    db.user.insert({name: 'yikaoyan' + i, age: i + 10, adress: '中关村'})
}

print(Date.now() - startTimer)
// 输出内容：
/*
MongoDB shell version v4.0.3
connecting to: mongodb://127.0.0.1:27017
Implicit session: session { "id" : UUID("ab110e3f-c7e6-4fa6-88a7-ed3b6de1f7cf") }
MongoDB server version: 4.0.3
connecting to: mongodb://127.0.0.1:27017/school
Implicit session: session { "id" : UUID("9b59e6a1-b2e8-4160-9f6a-2f2dad5698ef") }
MongoDB server version: 4.0.3
4715

*/
```


> 可以看到插入共耗费4.7秒，因为每次都会调用 insert 方法，特别耗费资源，可以通过以下方式进行优化：
```
db.user.count() // 10000
db.user.dorp() // 清空user集合数据

// 优化后js代码
let db = connect('school')

let startTimer = Date.now()
let arr = []
for(let i = 0; i < 10000; i++) {
    arr.push({name: 'yikaoyan' + i, age: i + 10, adress: '中关村'})
}
db.user.insert(arr)
print(Date.now() - startTimer)

mongo mongo.js // 执行js代码

// 输出结果
/*
MongoDB shell version v4.0.3
connecting to: mongodb://127.0.0.1:27017
Implicit session: session { "id" : UUID("e191da4e-38a6-4164-b38d-b648092d90eb") }
MongoDB server version: 4.0.3
connecting to: mongodb://127.0.0.1:27017/school
Implicit session: session { "id" : UUID("8dc22b18-a7d6-4181-84ed-2b81147e3171") }
MongoDB server version: 4.0.3
287
*/
```
> 共耗费287ms, 大概缩短200倍



### 索引
- 保证这个字段的内容是唯一， 二分查找（不适合频繁更新的数据)
- ensureIndex({age: -1}); 设置索引,-1代表从后往前
```
...// 采用上述方式插入1000000条，耗时30963ms

// 查询最后一条
let db = connect('school')

let startTimer = Date.now()
let cursor = db.user.find({age: 999999})
cursor.forEach(item => {
    printjson(item)
})
print(Date.now() - startTimer)
// 449ms
```
```

db.user.ensureIndex({age: -1}) // 建索引,耗时2714ms

// 执行查询代码
let db = connect('school')

let startTimer = Date.now()
let cursor = db.user.find({age: 999999})
cursor.forEach(item => {
    printjson(item)
})
print(Date.now() - startTimer)
// 3ms
```
> 时间缩短140多倍


### 数据库备份
- sudo mongodump --db school --collection user --out ./backup
- 生成.bson文件，存放备份的数据
- cat backup/school/user.bson
- 
### 恢复数据库
- sudo mongorestore ./backup
- 
### 分页
- db.user.find().limit(pageSize).skip((currentPage - 1) * pageSize)
```
// 分页， 限制数量
db.user.find().limit(5)
let pageSize = 10
let currentPage = 3
db.user.find().limit(pageSize).skip((currentPage - 1) * pageSize)

```