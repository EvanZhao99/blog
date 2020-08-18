# ts
## temporary
- 如果文件中用export import 之类的代码，这个文件就会变成一个模块，变量会变成私有变量
- 123
- 枚举类型
  ```ts
    enum Gender {
        BOY,
        GIRL
    }
    console.log(Gender.BOY) // 0

    // js
    var Gender;
    (function(Gender) {
        Gender[Gender['BOY'] = 0] = 'BOY'; // 相互引用
        Gender[Gender['GIRL] = 1] = 'GIRl';
    })(Gender || Gender = {});
  ```
  ```ts
    enum Week{
        MONDY = 1,
        TUESDY = 2
    }
  ```
- 断言
    ```ts
    let root = document.getElementById('root');
    root!.style.color = 'red';
    ```
- null 空； undefined 未定义； 都是其他类型的子类型
- 声明 & 定义
  - 声明：向编译器介绍名称（通过标识符），告诉编译器“这个变量在哪、长什么样”
  - 定义：分配存储空间，将名称和存储空间绑定
  > 所以没有申明的变量 浏览器会拨错，因为不认识。没有定义的变量会返回`undefined`，因为没有分配存储空间，找不到对应的值。
- null & undefined
  - null 表示一个值被定义了，定义为空值。即分配的存储空间是空的，没有存放数据
  - undefined 表示一个值没有定义。即该值不存在，没有为它分配存储空间
  ```js
    let a;
    console.log(a) // undefied
    // 声明但为定义，所以是undefined

    let b = {};
    console.log(b.a) // undefied
    // a属性根本不存在 没有定义过

  ```
    设置一个值是undefined是不合理的，如；
    b.a = undefined ，应该：
    delete b.a
    这也是为什么 jQuery的深拷贝为什么会忽略undefined而不会会略null

    java没有`undefined`是合理的，因为Java是静态类型语言，不可能存在一个`不存在的成员`，否则编译时会报错。但是JavaScript是动态类型语言，只要运行时才知道是否存在。
  [undefined和null的区别](http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html?utm_source=tuicool&utm_medium=referral)

- 子类并不能继承父类的静态方法


### 函数
- 重载：
  - 函数声明必须和声明放在一起
  - 函数声明会覆盖函数实现时的类型声明


### 类
- namespace 命名空间
- public 将参数放到实例上
- 访问修饰符：
  - public： 子类和其他类可以访问
  - protected: 子类可以访问，其他类不行
  - private： 只有自己可以访问，子类也不行

### 装饰器
#### 类装饰器
- 参数：target 目标class
- 返回值：替代目标

#### 属性&方法 装饰器
- target: 
  - 类：如果修饰的是静态属性或方法
  - prototype: 如果修饰的是动态属性或方法
  ```ts
    function upperCase(target: any, properName: string) {
        let value = target[properName];
        const getter = () => value;
        const setter = (newVal: string) => {
            value = newValue.upperCase();
        }
        delete target[properName];
        Object.defineProperty(target, properName, {
            get: getter,
            set: setter,
            enumerable: true,
            confiurable: true
        })
    }
    class Person{
        @upperCase
        name: string = ''
    }
  ```
#### 执行顺序
- 不同属性或方法按顺序执行
- 同一属性、方法、类的多个装饰器 倒序执行
- 先执行属性或方法，再执行类

#### 编译结果
  ```ts
    @myDecorator
    @myDecorator2
    class Model{
        @myDecorator
        @myDecorator2
        show() {};
        @myDecorator
        @myDecorator2
        names = 'zhufeng';
    }

    function myDecorator(target) {
        console.log('=========1',target)
    }
    function myDecorator2(target) {
        console.log('===========2', target)
    }

    // 编译结果：================================

      "use strict";

      var _class, _class2, _descriptor, _temp;

      function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

      function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

      function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

      function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

      function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

      function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

      function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

      var _temp = function () {
        function Model() {
          _classCallCheck(this, Model);

          _initializerDefineProperty(this, "names", _descriptor, this);
        }

        _createClass(Model, [{
          key: "show",
          value: function show() {}
        }]);

        return Model;
      }();


      function myDecorator(target) {
        console.log('=========1', target);
      }

      function myDecorator2(target) {
        console.log('===========2', target);
      }

      // 主体内容
      var Model = myDecorator(
        _class = myDecorator2(
          _class = (
            _class2 = (_temp, _temp), 
            (
              _applyDecoratedDescriptor(
                _class2.prototype, 
                "show", 
                [myDecorator, myDecorator2], 
                Object.getOwnPropertyDescriptor(_class2.prototype, "show"), 
                _class2.prototype
              ), 
              _descriptor = _applyDecoratedDescriptor(
                _class2.prototype, 
                "names", 
                [myDecorator, myDecorator2], 
                {
                  configurable: true,
                  enumerable: true,
                  writable: true,
                  initializer: function initializer() {
                    return 'zhufeng'; 
                  }
                }
              )
            ), 
            _class2
          )
        )
        || _class
      )
      || _class;

  ```
### 抽象类
- 抽象类与接口的区别：可以实现多个接口，但只能继承一个抽象类
- 抽象类的本质是一个无法被实例化的基类，但可以实现方法和初始化属性；接口仅用于描述，不能实现方法和初始化属性；
  
#### 重写vs重载
- 重写是指重写继承父类的方法
- 重载是指为同一个函数提供多个类型定义
  
### 接口
- 任意属性
  ```ts
  namespace a {
    interface PlainObject{
      [properName: string]: number;
    }
    let obj: PlainObject = {
      x: 1,
      y: 2,
      z: 3
    }
  }
  ```
#### 接口继承
```ts
interface Speakable {
  speak(): void;
}
interface SpeakChinese extends Speakable{
  speakChinese(): void;
}
class Person implements SpeakChinese{
  speak() {};
  speakChinese() {};
}
```
#### 接口的readonly
```ts
interface Circle = {
  readonly PI: number;
  radius: number;
}
let circle: Circle = {
  PI: 3.14,
  readius: 3
}
```
#### 接口约束函数
```ts
interface Discount {
  (price: number): number
}
let cost: Discount = function(price: number): number {
  return Price * 0.8
}
```
#### 接口约束对象和数组
```ts
interface UserInterface {
    [index: number]: string;
}
let arr: UserInterface = ['1', '2'];
let obj: UserInterface = {
  0: 'a',
  1: 'b
}
```
#### 用接口约束类
```ts
class Animal{
  construtor(public name: string) {

  }
}
interface WithNameClass {
  new(name: string): Animal
}
function createAnimal
```

### 泛型
- 声明时不指定类型，执行时指定

#### 函数
#### 类的泛型
```ts
class MyArray<T>{
    private list: T[] = [];
    add(val: T) {
        this.list.push(val);
    }
    getMax(): T {
        let result: T = this.list[0];
        for(let i = 1; i < this.list.length; i++) {
            if(result < this.list[i]) {
                result = this.list[i];
            }
        }
        return result;
    }
}
let arr = new MyArray<number>();
arr.add(1); arr.add(2); arr.add(3);
let result: number = arr.getMax();
console.log(result)
```
#### 接口泛型
```ts
interface Calculate{
    <T>(a: T, b: T): T
}
let add: Calculate = function <T>(a: T, b: T) {
    return a;
}
add(1, 2)
```
### 结构类型系统
duck-check
#### 接口兼容性
- 参数可以少不能多

#### 函数参数的协变
参数类型的限制可以变得更严、范围更窄，不能更宽松
```ts
type logFn = (a: number | string) => void;
let log: logFn;
let log2 = function(a: number | string | boolean): void {

}
log = log2;
```


