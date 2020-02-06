"use strict";

var _dec, _dec2, _class, _dec3, _dec4, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parent = (_dec = isParent(true), _dec2 = isChildren(false), _dec(_class = _dec2(_class = function Parent() {
  _classCallCheck(this, Parent);
}) || _class) || _class);
var Sub = (_dec3 = isParent(false), _dec4 = isChildren(true), _dec3(_class2 = _dec4(_class2 = function Sub() {
  _classCallCheck(this, Sub);
}) || _class2) || _class2);

function isParent(value) {
  return function (constructor) {
    constructor.isParent = value;
  };
}

function isChildren(value) {
  return function (constructor) {
    constructor.isChildren = value;
  };
}

console.log(Parent.isParent);
console.log(Sub.isParent);
