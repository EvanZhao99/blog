"use strict";

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var Animal = (_class = (_temp =
/*#__PURE__*/
function () {
  function Animal() {
    _classCallCheck(this, Animal);

    this.aa = 1;
  }

  _createClass(Animal, [{
    key: "eat",
    value: function eat() {
      console.log('吃饭');
    }
  }]);

  return Animal;
}(), _temp), (_applyDecoratedDescriptor(_class.prototype, "eat", [readOnly], Object.getOwnPropertyDescriptor(_class.prototype, "eat"), _class.prototype)), _class);

function readOnly(prototype, property, descriptor) {
  console.log(prototype == Animal.prototype, property, descriptor);
}
