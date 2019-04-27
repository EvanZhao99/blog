### 数据库权限
默认情况下mongodb数据库是没有权限验证的，任何人都可以通过地址访问该数据库。需要在admin数据库中添加用户及角色
- db.createUser();创建用户
- db.anth(); 鉴权，登陆
```
// 启动数据库
mongod
mongo

// 在admin数据库添加用户权限
use admin
db.createUser({user: 'zjc',pwd: '666666', roles: [{role: 'readWrite', db: 'school'}]})
// 输出结果
/*
Successfully added user: {
	"user" : "zjc",
	"roles" : [
		{
			"role" : "readWrite",
			"db" : "school"
		}
	]
}
*/

// 重启mongo服务
mongod --auth; // 启动带验证的服务
mongo
show dbs; // 此时没有权限
// 输出结果：
/**
2019-04-27T14:07:50.240+0800 E QUERY    [js] Error: listDatabases failed:{
	"ok" : 0,
	"errmsg" : "command listDatabases requires authentication",
	"code" : 13,
	"codeName" : "Unauthorized"
} :
*/
// 13代表没有权限

// 在admin数据库登陆
use admin
db.auth('zjc','666666'); // 1; (1代表登陆成功)
show dbs;
// 输出结果：
/*
school  0.045GB
*/
// 因为此用户下只用`school`数据库的权限
```
### mongoose框架
- npm install mongoose
- 
mongoose.js文件
```
const mongoose = require('mongoose')

// 链接数据库
console.log(1)
mongoose.connect('mongodb://localhost/school', {
    useNewUrlParser: true
})
let db = mongoose.connection
console.log(db)
db.on('open', function() {
    console.log('开启成功')
})
db.on('error', function(error) {
    console.log(error)
})

// schema 定义集合中的字段 校验的功能
let UserSchema = new mongoose.Schema({
    // 定义好需要的属性 否则后期增加的还 无法增加
    username: String,
    password: String,
    data: Date,
    meta: {type: String, default: '备注'},
    hobby: []
})
let User = db.model('User', UserSchema)
console.log(User === db.model('User'))

User.create({username: 'zjc', password: 666666, data: new Date()}, function(err, data) {

})
```
```
// 执行mongoose文件
node mongoose.js
// 执行结果：
/*
...
true
开启成功

*/
db.users.find()
// 输出结果：
/*
{ "_id" : ObjectId("5cc45f7e8d9d468736d02e04"), "meta" : "备注", "hobby" : [ ], "username" : "zjc", "password" : "666666", "data" : ISODate("2019-04-27T13:56:14.247Z"), "__v" : 0 }
*/
```
成功添加一条数据

##### 修改
- update更新操作默认自带合并功能， 不会覆盖掉原来掉数据。 --updateOne,updateMane
- 
```
const mongoose = require('mongoose')

// 链接数据库
console.log(1)
mongoose.connect('mongodb://localhost/school', {
    useNewUrlParser: true
})
let db = mongoose.connection
console.log(db)
db.on('open', function() {
    console.log('开启成功')
})
db.on('error', function(error) {
    console.log(error)
})

// schema 定义集合中的字段 校验的功能
let UserSchema = new mongoose.Schema({
    // 定义好需要的属性 否则后期增加的还 无法增加
    username: String,
    password: String,
    data: Date,
    meta: {type: String, default: '备注'},
    hobby: []
})
let User = db.model('User', UserSchema)
console.log(User === db.model('User'))

// 增加
// User.create({username: 'zjc', password: 666666, data: new Date()}, function(err, data) {
//     console.log(data)
// })

// update更新操作默认自带合并功能， 不会覆盖掉原来掉数据。 --updateOne,updateMane
User.updateOne({username: 'zjc', password: '666666'}, {meta: '123', $addToSet:{hobby: {$each: ['吃', '喝']}}}).then(doc => {
    console.log(doc)
})

// 输出结果：
/*
...
true
开启成功
{ n: 1, nModified: 0, ok: 1 }
*/
```
```
db.user.find()
// 输出结果：
/*
{ "_id" : ObjectId("5cc45f7e8d9d468736d02e04"), "meta" : "123", "hobby" : [ "吃", "喝" ], "username" : "zjc", "password" : "666666", "data" : ISODate("2019-04-27T13:56:14.247Z"), "__v" : 0 }
*/
```
##### 删除
- 删除 deleteOne  deleteMany

```
User.deleteMany({username: 'zjc', password: '666666'}).then(res => {
    console.log(res)
})
// 输出结果：
/*
...
true
开启成功
{ n: 4, ok: 1, deletedCount: 4 }
*/
db.users.find()
```

##### 查询
- find findOne findById
- 
```
// 插入10条数据用于查找
let arr = []
for(let i=0; i < 10; i++) {
    arr.push({username: 'zjc', password: '666666'})
}
User.create(arr).then(data => {
    console.log(data)
})

```
```
// 执行
node mongoose.js

```
```
User.findOne({}).then(data => {
    console.log(data)
})
// 输出结果：
/*
{ meta: '备注',
  hobby: [],
  _id: 5cc479d23e6dbb8ad1f8605b,
  username: 'zjc',
  password: '666666',
  __v: 0 }
*/
```