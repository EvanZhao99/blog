let db = connect('school')

let startTimer = Date.now()
let arr = []
// for(let i = 0; i < 1000000; i++) {
//     arr.push({name: 'yikaoyan' + i, age: i + 10, adress: '中关村'})
// }
// db.user.insert(arr)
let cursor = db.user.find({age: 999999})
cursor.forEach(item => {
    printjson(item)
})
print(Date.now() - startTimer)