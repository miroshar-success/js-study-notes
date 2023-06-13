var name = 'the window';
var object = {
  name: 'my object',
  getName: function() {
    return this.name;
  }
}
object.getName();  // 'my object'

(object.getName)();  // 'my object'
// -------- 隐式丢失 -------
(object.getName = object.getName)(); // the window
(object.getName, object.getName)();  // the window



// ---------- demo2 ---------
var x = 3;
const obj1 = {
  x: 1,
  getX: function() {
    var x = 5;
    return function() {
      return this.x;
    }()
  }
}
console.log(obj1.getX())  // 3



// ------ demo3 --------
function a(x) {
  this.x = x;
  return this;
}
var x = a(5)
var y = a(6)
console.log(x.x)  // undefined
console.log(y.x)  // 6


// -------- demo4 ---------
function b(z) {
  this.z = z;
  return this;
}
let z = b(5)
let m = b(6)
console.log(z.z, m.z) //
/*
window.z = 5
z = window;
window.z = 6;
m = window
// 6 6
*/
