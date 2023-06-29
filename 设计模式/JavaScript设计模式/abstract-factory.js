// ------------------- 抽象工厂 ---------------------
const Car = function() {}
// 只定义功能, 不定义具体实现
Car.prototype.getPrice = function() {
  return new Error('抽象方法不能调用')
}
Car.prototype.getSpeed = function() {
  return new Error('抽象方法不能调用')
}

// 将构造函数挂载在Factory的属性下
const VehicleFactory = function(subType, superType) {
  if (typeof VehicleFactory[superType] === 'function') {
    const F = function() {}
    F.prototype = new VehicleFactory[superType]()
    subType.prototype = new F()
    subType.constructor = subType
    /**
     * Object.prototype.setPrototype(subType.prototype, superType.prototype) 只能继承父类原型上的方法
    */
  //  subType.prototype = new VehicleFactory[superType]()
  //  subType.constructor = subType
  }
}
// car
VehicleFactory.Car = function() {
  this.type = 'car'
}
const throwError = function() {
  return new Error('抽象类方法不可调用')
}
VehicleFactory.Car.prototype.getPrice = function() {
  return throwError
}
VehicleFactory.Car.prototype.getSpeed = function() {
  return throwError
}
// bus
VehicleFactory.Bus = function() {
  this.type = 'bus'
}
VehicleFactory.Bus.prototype.getPrice = function() {
  return throwError
}
VehicleFactory.Bus.prototype.getSpeed = function() {
  return throwError
}
// car
const BMW = function(price, speed) {
  this.price = price
  this.speed = speed
}
VehicleFactory(BMW, 'Car')
BMW.prototype.getPrice = function() {
  return this.price
}
BMW.prototype.getSpeed = function() {
  return this.speed
}
const bmw = new BMW(1000000, 160)
console.log(bmw, bmw.getPrice(), bmw.getSpeed(), bmw.type)
// { price: 1000000, speed: 160 } 1000000 160 car

// bus
const BYD = function(price, speed) {
  this.price = price
  this.speed = speed
}
VehicleFactory(BYD, 'Bus')
BYD.prototype.getPrice = function() {
  return this.price
}
BYD.prototype.getSpeed = function() {
  return this.speed
}
const byd = new BYD(100000, 90)
console.log(byd, byd.getPrice(), byd.getSpeed(), byd.type)
// { price: 100000, speed: 90 }
