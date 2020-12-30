/**
 * super本身并不代表对象，不能直接访问super本身
 * 访问super的属性时,babel会将其转换成ParentClass.prototype
 */

class Animal{
    getName() {
        return '我是动物'
    }
}
class Cat extends Animal{
    getName() {
        // babel在编译时会将super转换成'Animal.prototype'
        return super.getName() + '我的名字';
    }
}
