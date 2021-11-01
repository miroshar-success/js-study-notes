(() => {
  const __webpack_modules__ = [
    ,
    (unused_webpack_module,__webpack_exports__,__webpack_require__)=> {
      __webpack_require__.r(__webpack_exports__)
      __webpack_require__.d(__webpack_exports__,{
        print:() => print
      })
      function print(message){
        console.log(message)
      }
    }
  ]

  // 缓存webpack module
  const cachedModule = {}

  function __webpack__require__(moduleId) {
    if(cachedModule[moduleId]){
      return cachedModule[moduleId].exports;
    }
    const module = cachedModule[moduleId] = {
      exports:{}
    }
    __webpack_modules__[moduleId](module,module.exports,__webpack_require__)
    return module.exports;
  }

  // 定义o方法,判断是否包含某个属性
  (() => {
    __webpack_require__.o = function(object,prop) {
      return Object.prototype.hasOwnProperty.call(object,prop)
    }
  })()
  // 给exports对象 添加一个get方法
  (() => {
    __webpack_require.d = function(exports,definition) {
      for(let key in definition) {
        if(__webpack_require_.o(definition,key) && !__webpack_require.o(exports,key)){
          Object.defineProperty(exports,key,{
            enumerable:true,
            get:definition[key]
          })
        }
      }
    }
  })()
  // r方法 给exports对象做一个标记
  (() => {
    __webpack_require.r = function(exports) {
      if(typeof Symbol !== undefined && Symbol.toStringTag) {
        Object.defineProperty(exports,Symbol.toStringTag, {
          value:'Module'
        })
      }
      Object.defineProperty(exports,'__esModule',{
        value:true
      })
    }
  })()
})()
