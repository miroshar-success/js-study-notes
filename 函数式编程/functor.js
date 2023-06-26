// ------------------ 函子 -------------------
class Container {
  constructor(value){
    this._value = value;
  }
  map(fn) {
    return new Container(fn(this._value))
  }
}
const obj = new Container(5).map(x => x + 1)
  .map(x => x * x)
console.log(obj) // {_value:36}


// 判断传入 null 和 undefined
class MayBe {
  constructor(value) {
    this._value = value
  }
  isNothing () {
    return this._value === null || this._value === undefined
  }
  map(fn) {
    return this.isNothing() ? new MayBe(null) : new MayBe(fn(this._value))
  }
}
const may = new MayBe('hello world')
  .map(str => str.toUpperCase())
  .map(str => str.split(' '))
  .map(str => str.join(" "))
console.log('may:', may);

const may_null = new MayBe(null)
console.log(may_null)

const may_undefined = new MayBe(undefined)
console.log(may_undefined)


// 中间参数传递了null,虽然不会报错,但是不知道在哪里传递了null
const h = new MayBe(['kyrie','durant','james','wade'])
.map(arr => arr.reverse())
.map(arr => arr.map(item => item.toUpperCase()))
.map(() => null)
console.log('h:',h)



class Functor {
  constructor(value) {
    this._value = value
  }
  map(func) {
    return new Functor(func(this._value))
  }
  value(f) {
    return f(this._value)
  }
}

const my_functor = new Functor('kyrie irving')
console.log(my_functor.map(item => item.split('')))

my_functor.map(item => item.split('')).value(console.log)