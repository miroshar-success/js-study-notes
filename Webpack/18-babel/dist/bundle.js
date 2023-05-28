/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./18-babel/src/index.js ***!
  \*******************************/
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var sum = function sum(a, b) {
  return a + b;
};
console.log(sum(1, 5));
console.log([1, 2, 3].map(function (n) {
  return n + 1;
}));
var Player = /*#__PURE__*/function () {
  function Player(firstName, lastName) {
    _classCallCheck(this, Player);
    this.firstName = firstName;
    this.lastName = lastName;
  }
  _createClass(Player, [{
    key: "fullName",
    value: function fullName() {
      return this.firstName + this.lastName;
    }
  }]);
  return Player;
}();
var player = new Player('kyrie', 'irving');
console.log(player);
var singer = ['周杰伦', '王力宏'];
var a = singer[0],
  b = singer[1];
console.log(a, b);
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vMTgtYmFiZWwvc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHN1bSA9IChhLCBiKSA9PiBhICsgYlxuXG5jb25zb2xlLmxvZyhzdW0oMSwgNSkpXG5cbmNvbnNvbGUubG9nKFsxLDIsM10ubWFwKG4gPT4gbiArIDEpKVxuXG5jbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihmaXJzdE5hbWUsIGxhc3ROYW1lKSB7XG4gICAgdGhpcy5maXJzdE5hbWUgPSBmaXJzdE5hbWVcbiAgICB0aGlzLmxhc3ROYW1lID0gbGFzdE5hbWVcbiAgfVxuICBmdWxsTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5maXJzdE5hbWUgKyB0aGlzLmxhc3ROYW1lXG4gIH1cbn1cbmNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoJ2t5cmllJywgJ2lydmluZycpXG5jb25zb2xlLmxvZyhwbGF5ZXIpXG5cbmNvbnN0IHNpbmdlciA9IFsn5ZGo5p2w5LymJywgJ+eOi+WKm+WujyddXG5jb25zdCBbYSwgYl0gPSBzaW5nZXI7XG5jb25zb2xlLmxvZyhhLCBiKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==