"use strict";
// 1. 为什么是 number | string
// interface StringIndexArray {
//     [index: string]: string;
// }
// type K = keyof StringIndexArray;
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
// 2. keyof 获取类型的所以键
var B;
(function (B) {
    var Person = /** @class */ (function () {
        function Person() {
            this.name = 'name';
        }
        return Person;
    }());
    var sname;
    sname = 'name';
    console.log(sname);
})(B || (B = {}));
// import voice from './module/voice';
// voice.open();
Promise.resolve().then(function () { return __importStar(require('./module/voice')); }).then(function () {
});
