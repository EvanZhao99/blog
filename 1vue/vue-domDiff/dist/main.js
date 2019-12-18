/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _vdom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vdom */ \"./src/vdom/index.js\");\n\r\n// h 用来创建虚拟DOM， 虚拟DOM就是一个普通的js对象，包含类型、属性、children等。作用是用js描述真实DOM，存放真实DOM的信息\r\n\r\nconst root = document.getElementById('root')\r\n\r\nconst oldVnode = Object(_vdom__WEBPACK_IMPORTED_MODULE_0__[\"h\"])('ul', {id: 'container'}, \r\n  Object(_vdom__WEBPACK_IMPORTED_MODULE_0__[\"h\"])('li', { style:{ backgroundColor: '#000000'}}, 'A'), \r\n  Object(_vdom__WEBPACK_IMPORTED_MODULE_0__[\"h\"])('li', { style:{ backgroundColor: '#300000'}}, 'B'), \r\n  Object(_vdom__WEBPACK_IMPORTED_MODULE_0__[\"h\"])('li', { style:{ backgroundColor: '#600000'}}, 'C'), \r\n  Object(_vdom__WEBPACK_IMPORTED_MODULE_0__[\"h\"])('li', { style:{ backgroundColor: '#900000'}}, 'D'),\r\n)\r\n\r\nObject(_vdom__WEBPACK_IMPORTED_MODULE_0__[\"mount\"])(oldVnode, root)\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/vdom/h.js":
/*!***********************!*\
  !*** ./src/vdom/h.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _vnode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vnode.js */ \"./src/vdom/vnode.js\");\n\r\n\r\nconst hasOwnProperty = Object.prototype.hasOwnProperty\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(type, config, ...children) {\r\n  const props = {} \r\n  let key;\r\n  if(config && config.key) {\r\n    key = config.key\r\n  }\r\n\r\n  // 迭代config中的每一个属性\r\n  for(let propName in config) {\r\n    if(hasOwnProperty.call(config, propName) && propName != 'key') {\r\n      props[propName] = config[propName]\r\n    }\r\n  }\r\n  return Object(_vnode_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(type, key, props, children.map((child, index) => {\r\n    typeof child == 'string' || typeof child == 'number' ? Object(_vnode_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\r\n      undefined, undefined, undefined, child\r\n    ) : child\r\n  }))\r\n});\n\n//# sourceURL=webpack:///./src/vdom/h.js?");

/***/ }),

/***/ "./src/vdom/index.js":
/*!***************************!*\
  !*** ./src/vdom/index.js ***!
  \***************************/
/*! exports provided: h, mount, patch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./h */ \"./src/vdom/h.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"h\", function() { return _h__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _patch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./patch */ \"./src/vdom/patch.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"mount\", function() { return _patch__WEBPACK_IMPORTED_MODULE_1__[\"mount\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"patch\", function() { return _patch__WEBPACK_IMPORTED_MODULE_1__[\"patch\"]; });\n\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/vdom/index.js?");

/***/ }),

/***/ "./src/vdom/patch.js":
/*!***************************!*\
  !*** ./src/vdom/patch.js ***!
  \***************************/
/*! exports provided: mount, patch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mount\", function() { return mount; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"patch\", function() { return patch; });\n\r\nfunction createDOMElementFromVnode(vnode) {\r\n  let { type, children} = vnode\r\n  if(type) {\r\n    let domElement = vnode.domElement = document.createElement(type)\r\n\r\n  } else {\r\n    vnode.domElement = document.createTextNode(vnode.text)\r\n  }\r\n  return vnode.domElement\r\n\r\n}\r\n\r\nfunction mount(vnode, container) {\r\n  let newDOMElement = createDOMElementFromVnode(vnode)\r\n  container.appendChild(newDOMElement) \r\n}\r\n\r\nfunction patch() {\r\n\r\n}\n\n//# sourceURL=webpack:///./src/vdom/patch.js?");

/***/ }),

/***/ "./src/vdom/vnode.js":
/*!***************************!*\
  !*** ./src/vdom/vnode.js ***!
  \***************************/
/*! exports provided: isSameNode, isVnode, vnode, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isSameNode\", function() { return isSameNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isVnode\", function() { return isVnode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"vnode\", function() { return vnode; });\nconst VNODE_TYPE = 'VNODE_TYPE'\r\n// domElement是此虚拟DOM节点对应的真实DOM节点\r\n// _type=NODE_TYPE type=标签类型div p span\r\n\r\n\r\nfunction isSameNode(oldVnode, newVnode) {\r\n\r\n}\r\n\r\nfunction isVnode(vnode) {\r\n\r\n}\r\n\r\nfunction vnode(type, key, props = {}, children = [], text, domElement) {\r\n  return {\r\n      _type: VNODE_TYPE,//表示这是一个虚拟DOM节点\r\n      type, key, props, children, text, domElement\r\n  }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (vnode);\n\n//# sourceURL=webpack:///./src/vdom/vnode.js?");

/***/ })

/******/ });