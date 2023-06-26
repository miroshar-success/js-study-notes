// --------------------- 函子 ---------------------
// --------------- MayBe ---------------
class MaybeContainer {
  constructor(value) {
    this._value = value
  }
  map(fn) {
    return new MaybeContainer(fn(this._value))
  }
  get () {
    return this._value
  }
}
const maybe = new MaybeContainer(10)

console.log(maybe.map(x => x + 1).map(x => Math.pow(x, 2)).map(x => x / 2).get())
// 60.5

const double = x => Math.pow(x, 2)

console.log(maybe.map(double).map(double).map(double).get())

// ---------------- 另一种 ---------------------
function MayBe (value) {
  this.value = value
}
MayBe.of = function(value) {
  return new MayBe(value)
}
MayBe.prototype.isNothing = function() {
  return this.value === null || this.value === undefined
}
MayBe.prototype.map = function(fn) {
  return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.value))
}

// ---------------- 处理所有 undefined 或者 null 错误 -------------------------
console.log(MayBe.of('string').map(x => x.toUpperCase())) // {value: 'STRING' }
console.log(MayBe.of(null).map(x => x.toUpperCase()))     // {value: null}
console.log(MayBe.of(2).map(double).map(double).map(double))  // {value: 256}
console.log(MayBe.of('George').map(x => undefined).map(x => `Mr. ${x}`))  // { value: null}