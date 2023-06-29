// ----------------------- 单例模式 -------------------------
const LazySingle = (function() {
  let _instance = null
  const Single = function() {
    return {
      publicMethod: function() {},
      publicProperty: function() {}
    }
  }
  return function() {
    if (!_instance) _instance = new Single()
    return _instance
  }
})();

const single_1 = LazySingle()
const single_2 = LazySingle()

console.log(single_1, single_2, single_1 === single_2)  // true