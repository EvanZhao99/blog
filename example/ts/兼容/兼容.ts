// 函数兼容
namespace a {
    type logFn = (a: number | string) => void;
let log: logFn;
let log2 = function(a: number | string | boolean): void {

}
log = log2;
}

// 类的兼容
namespace b{
    class Animal{
        name!:string
    }
    class Bird extends Animal{
       swing!:number
    }
    
    let a:Animal;
    a = new Bird();
    
    let b:Bird;
    //并不是父类兼容子类，子类不兼容父类
    b = new Animal();
}