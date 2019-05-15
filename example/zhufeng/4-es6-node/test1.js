"use strict";

var _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var Animal = log(_class = (_class2 = (_temp =
/*#__PURE__*/
function () {
  function Animal() {
    _classCallCheck(this, Animal);

    _initializerDefineProperty(this, "aa", _descriptor, this);
  }

  _createClass(Animal, [{
    key: "eat",
    value: function eat() {
      // 该方法添加到实例上 而不是类的原型上
      console.log('吃饭');
      console.log('this', this); // this指向永远是animal实例
    }
  }]);

  return Animal;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "aa", [readOnly], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "eat", [readOnly], Object.getOwnPropertyDescriptor(_class2.prototype, "eat"), _class2.prototype)), _class2)) || _class; // 修饰属性或方法， 第一个参数是当前类的原型


function readOnly(prototype, property, descriptor) {
  // descriptor提供了initializer 返回值是value
  descriptor.writable = false;
  console.log(prototype, property, descriptor.value);
} // 修饰类 参数是当前类


function log(fn) {
  console.log(fn);
} // new Animal().eat()
