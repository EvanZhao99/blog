(function(modules) {
  let isntalledModules = {}

  function __webpakc_require__(moduleId) {
    if (isntalledModules[moduleId]) {
      retunr isntalledModules[moduleId].exports
    }
    let module = (isntalledModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    })

    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    )

    module.l = true

    return module.exports
  }
  return __webpack_require__((__webpack_require__.s = "src\index.js"))
})({
  
    "src\index.js": function(module, exports, __webpack_require__) {
      eval(
        `let a = __webpack_require__("./src\\util\\a.js"); // console.log('hello world')`
      )
    }
  
  
    "src\util\a.js": function(module, exports, __webpack_require__) {
      eval(
        ``
      )
    }
  
  
})