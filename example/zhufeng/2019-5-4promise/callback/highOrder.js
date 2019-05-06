// 判断类型 Object.prototype.toString.call()
function isType(type) {
    return function(obj) {
        return Object.prototype.toString.call(obj).includes(type)
    }
}
// 包装成一个高阶函数之后 批量生成函数
let fns = []
let types = ['String', 'Array', 'Object', 'Null', 'Undefined', 'Boolean','Number' ]
types.forEach(type => {
    fns['is' + type] = isType(type)
})

// 测试
console.log(fns.isString('sf')) // true

// 批量测试
let checkList = [true, 0, '1', [], {}, null, undefined]
checkList.forEach(item => {
    for(key in fns){
        if(fns[key](item)){
            console.log(key.substring(2))
        }
    }
})
/*输出结果：
Boolean
Number
String
Array
Object
Null
Undefined
*/
