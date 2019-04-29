### 数据库权限
默认情况下mongodb数据库是没有权限验证的，任何人都可以通过地址访问该数据库。可以通过以下方式添加权限
1. 在`admin`数据库中通过`db.createUser()`添加用户
2. 在启动mongo服务时通过`mongod --auth`方式启动带验证带服务
3. 启动后通过`db.anth()`进行权限验证
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
- 通过npm安装`npm install mongoose`

##### 1. 添加
- create
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

##### 2.修改

- 更新操作默认自带合并功能， 不会覆盖掉原来掉数据。 
- updateOne
- updateMany
- 
```
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
##### 3.删除
- deleteOne  
- deleteMany

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

##### 4.查询
- find
- findOne
- findById
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
##### 模糊查询 
- 支持正则表达式

```
User.find({username: /zjc/})
```
##### 分页
```
let pageSize = 3
let pageNum = 2
// 先查找 再排序 再跳过 再limit
User.find({}).sort({password: -1}).limit(pageSize).skip((pageNum-1)*pageSize).exec((err, data) => {
    console.log(data)
})
// 输出结果：
/*
true
开启成功
[ { meta: '备注',
    hobby: [],
    _id: 5cc479d23e6dbb8ad1f8605e,
    username: 'zjc',
    password: '666666',
    __v: 0 },
  { meta: '备注',
    hobby: [],
    _id: 5cc479d23e6dbb8ad1f8605f,
    username: 'zjc',
    password: '666666',
    __v: 0 },
  { meta: '备注',
    hobby: [],
    _id: 5cc479d23e6dbb8ad1f86060,
    username: 'zjc',
    password: '666666',
    __v: 0 } ]
*/
```
##### 多表查询
某些业务场景需要查询多个相关联的表的数据，比如购物车  

```
const mongoose = require('mongoose')
let ObjectId = mongoose.SchemaTypes.ObjectId; // mongoose内置提供的类型
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

// 创建购物车表，user属性指向用户表 用户的id
let CartSchema = new mongoose.Schema({
    productName: String,
    productPrice: Number,
    user: {
        type: ObjectId,
        ref: User
    }
})
let Cart = db.model('Cart', CartSchema)
User.create({username: 'zjc'}).then(data => {
    Cart.create({productName: 'iphone', productPrice: 300, user: data._id}).then(data => {
        console.log(data)
    })
})

// 输出结果： 
/*
开启成功
{ _id: 5cc7231d2311f1091f37e010,
  productName: 'iphone',
  productPrice: 300,
  user: 5cc7231d2311f1091f37e00f,
  __v: 0 }
*/

```
通过商品查询购买用户
```
Cart.findOne({productName: 'iphone'}).then(data => {
    User.findById(data.user).then(data => {
        console.log(data)
    })
})
// 输出结果：
/*
开启成功
{ meta: '备注',
  hobby: [],
  _id: 5cc7151c4642dc05d07bb209,
  username: 'zjc',
  __v: 0 
}
*/
```
##### mongoose 静态方法 static
- 通过`static`可以封装表的公共方法
```
// 语义化
UserSchema.statics.findByName = function(username) {
    return this.findOne({username})
}
let user = db.model('User', UserSchema)
user.findByName('zjc')
```
##### 虚拟属性
- 类型 Vue的computed 计算属性
```
UserSchema.virtual('userpass').get(function() {
    return this.username + this.password
})

User.findOne().then(data => {
    console.log(data)
    console.log(data.userpass)
})
// 输出结果：
/*
开启成功
{ meta: '备注',
  hobby: [],
  _id: 5cc479d23e6dbb8ad1f8605b,
  username: 'zjc',
  password: '666666',
  __v: 0 }
zjc666666
*/
// 原数据中并没有userpass属性，但是可以拿到该数据
```