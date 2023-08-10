// ----------------- 装饰器模式 -------------------
// 给对象动态添加职责的方式  称为装饰器(decrator) 模式 (装饰器能够在不改变对象自身的基础上, 在程序运行期间给对象动态地添加职责)

const Plane = function() {}
Plane.prototype.fire = function () {
  console.log('发送普通子弹')
}
// 装饰
const MissileDecorator = function (plane) {
  this.plane = plane
}
MissileDecorator.prototype.fire = function() {
  this.plane.fire()
  console.log('发射导弹')
}
// 装饰
const AtomDecorator = function (plane) {
  this.plane = plane
}
AtomDecorator.prototype.fire = function() {
  this.plane.fire()
  console.log('发射原子弹')
}

let plane = new Plane()
plane = new MissileDecorator(plane)
plane = new AtomDecorator(plane)

plane.fire()