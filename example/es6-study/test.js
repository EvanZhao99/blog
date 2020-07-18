"use strict";

var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

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
var Model = (_class =
/*#__PURE__*/
function () {
  function Model() {
    _classCallCheck(this, Model);
  }

  _createClass(Model, [{
    key: "show",
    value: function show() {}
  }]);

  return Model;
}(), (_applyDecoratedDescriptor(_class.prototype, "show", [classDecorator], Object.getOwnPropertyDescriptor(_class.prototype, "show"), _class.prototype)), _class);

function classDecorator(target, a, b, c) {
  console.log('===', a, b, c);
}
