# Webpack打包后的文件

```js
(() => {
  "use strict";
  var __webpack_modules__ = [
    ,
    (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__.d(__webpack_exports__, {
        print: () => /* binding */ print,
      });
      function print(message) {
        console.log(message);
      }
    },
  ];

  var __webpack_module_cache__ = {};  // 缓存webpack module, 通过moduleId
  /*
  获取webpack module,如果 __webpack_module_cache__ 对象里有,则从缓存里获取,返回找到的对象的exports属性,如果没有
  则以moduleId为键名, 键值为一个包含exports属性的对象 添加到 __webpack_module_cache__, 返回导出的 exports属性。
  */ 
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = (__webpack_module_cache__[moduleId] = {
      exports: {},
    });
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    return module.exports;
  }

  // 判断某个对象自身 是否有 指定的属性, 有则返回true, 没有返回false
  (() => {
    __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
  })();


  // 如果exports 没有某个指定的属性, 则给exports添加该属性, 并且定义一个get方法, definition 传入的为一个对象.
  (() => {
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
        }
      }
    };
  })();

  (() => {
    __webpack_require__.r = (exports) => {
      // 如果是一个esModule 则添加一个属性, 通过Object.prototype.toString.call(exports) 会返回 Module.
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
      }// 给exports 添加一个 _esModule属性 值为true
      Object.defineProperty(exports, "__esModule", { value: true });
    };
  })();

  var __webpack_exports__ = {};
  (() => {
    __webpack_require__.r(__webpack_exports__); // 给__webpack_exports__ 对象添加定义属性
    var _print_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);  // 通过模块id 1 module.exports 方法

    function createButton(){
      const button = document.createElement('button')
      button.textContent = 'click me';
      return button;
    }
    const button = createButton()
    document.body.appendChild(button);

    button.addEventListener('click', function(event) {
      (0,_print_js__WEBPACK_IMPORTED_MODULE_0__.print)('hello world');
    },false)
  })();
})();
```
