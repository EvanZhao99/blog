@log
class Animal {
    @readOnly
    aa = 1;

    @readOnly
    eat() { // 该方法添加到实例上 而不是类的原型上
        console.log('吃饭')
        console.log('this',this) // this指向永远是animal实例
    }
}

// 修饰属性或方法， 第一个参数是当前类的原型
function readOnly(prototype, property, descriptor) {
    // descriptor提供了initializer 返回值是value
    descriptor.writable = false
    console.log(prototype, property, descriptor.value)

}

// 修饰类 参数是当前类
function log(fn) {
    console.log(fn)
}

// new Animal().eat()

