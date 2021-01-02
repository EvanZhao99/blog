// @isParent(true)
// @isChildren(false)
// class Parent{

// }
// @isParent(false)
// @isChildren(true)
// class Sub{

// }

// function isParent(value) {
//     return function(constructor) {
//         constructor.isParent = value
//     }
// }

// function isChildren(value) {
//     return function(constructor) {
//         constructor.isChildren = value
//     }
// }

// console.log(Parent.isParent)
// console.log(Sub.isParent)

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
