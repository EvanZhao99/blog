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
UserSchema.virtual('userpass').get(function() {
    return this.username + this.password
})
let User = db.model('User', UserSchema)

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
// 增加
// User.create({username: 'zjc', password: 666666, data: new Date()}, function(err, data) {
//     console.log(data)
// })

// update更新操作默认自带合并功能， 不会覆盖掉原来掉数据。 --updateOne,updateMane
// User.updateOne({username: 'zjc', password: '666666'}, {meta: '123', $addToSet:{hobby: {$each: ['吃', '喝']}}}).then(doc => {
//     console.log(doc)
// })

// 删除 deleteOne  deleteMany
// User.deleteMany({username: 'zjc', password: '666666'}).then(res => {
//     console.log(res)
// })
// let arr = []
// for(let i=0; i < 10; i++) {
//     arr.push({username: 'zjc', password: '666666'})
// }
// User.create(arr).then(data => {
//     console.log(data)
// })
// User.findOne({}).then(data => {
//     console.log(data)
// })
// 查询
// let pageSize = 3
// let pageNum = 2
// // 先查找 再排序 再跳过 再limit
// User.find({}).sort({password: -1}).limit(pageSize).skip((pageNum-1)*pageSize).exec((err, data) => {
//     console.log(data)
// })
// Cart.findOne({productName: 'iphone'}).then(data => {
//     User.findById(data.user).then(data => {
//         console.log(data)
//     })
// })


User.findOne().then(data => {
    console.log(data)
    console.log(data.userpass)
})