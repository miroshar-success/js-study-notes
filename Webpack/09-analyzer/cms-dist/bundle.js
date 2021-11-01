(() => {
  // webpackBootstrap
  "use strict";
  var __webpack_modules__ = [
    ,
    /* 0 */ /* 1 */
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ print: () => /* binding */ print,
        /* harmony export */ hello: () => /* binding */ hello,
        /* harmony export */ hi: () => /* binding */ hi,
        /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      function hello(message) {
        console.log("hello", message);
      }

      function hi(message) {
        console.log("hi", message);
      }

      function print(message) {
        console.log(message);
      }

      function say(message) {
        console.log("say:", message);
      }

      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = say;

      /***/
    },
  ];
  // The module cache
  var __webpack_module_cache__ = {};
  /******/
  // The require function
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
    __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
  })();
  (() => {
    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
      }
      Object.defineProperty(exports, "__esModule", { value: true });
    };
  })();
  var __webpack_exports__ = {};
  (() => {
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _print__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(1);
    const button = document.createElement("button");
    button.textContent = "click me";
    button.addEventListener(
      "click",
      function () {
        const name = "my name is kyrie";
        (0, _print__WEBPACK_IMPORTED_MODULE_0__.print)(name);
        (0, _print__WEBPACK_IMPORTED_MODULE_0__.hi)(name);
        (0, _print__WEBPACK_IMPORTED_MODULE_0__.hello)(name);
        (0, _print__WEBPACK_IMPORTED_MODULE_0__["default"])(name);
      },
      false
    );
    document.body.appendChild(button);
    console.log("index.js代码执行了");
  })();
})();
