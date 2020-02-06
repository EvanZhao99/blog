@isParent(true)
@isChildren(false)
class Parent{

}
@isParent(false)
@isChildren(true)
class Sub{

}

function isParent(value) {
    return function(constructor) {
        constructor.isParent = value
    }
}

function isChildren(value) {
    return function(constructor) {
        constructor.isChildren = value
    }
}

console.log(Parent.isParent)
console.log(Sub.isParent)