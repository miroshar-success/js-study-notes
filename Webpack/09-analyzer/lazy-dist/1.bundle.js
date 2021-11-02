"use strict";
(self["webpackChunkwebpack_demo"] =
  self["webpackChunkwebpack_demo"] || []).push([
  [1],
  [
    (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__.d(__webpack_exports__, {
        print: () => /* binding */ print,
        hello: () => /* binding */ hello,
        hi: () => /* binding */ hi,
        default: () => __WEBPACK_DEFAULT_EXPORT__,
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

      const __WEBPACK_DEFAULT_EXPORT__ = say;
    },
  ],
]);
