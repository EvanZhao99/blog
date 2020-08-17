"use strict";
var a;
(function (a) {
    var arr = ['1', '2'];
})(a || (a = {}));
var b;
(function (b) {
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        Animal.prototype.construtor = function (name) {
        };
        return Animal;
    }());
    function createAnimal(clazz, name) {
        return new clazz(name);
    }
    var a = createAnimal(Animal, 'name');
})(b || (b = {}));
var c;
(function (c) {
    var MyArray = /** @class */ (function () {
        function MyArray() {
            this.list = [];
        }
        MyArray.prototype.add = function (val) {
            this.list.push(val);
        };
        MyArray.prototype.getMax = function () {
            var result = this.list[0];
            for (var i = 1; i < this.list.length; i++) {
                if (result < this.list[i]) {
                    result = this.list[i];
                }
            }
            return result;
        };
        return MyArray;
    }());
    var arr = new MyArray();
    arr.add(1);
    arr.add(2);
    arr.add(3);
    var result = arr.getMax();
    console.log(result);
})(c || (c = {}));
