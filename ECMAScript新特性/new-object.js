let o1 = +0;
let o2 = -0;
console.log(o1 === o2)  // true

console.log(Object.is(o1,o2)) // false

console.log(NaN === NaN)
console.log(Object.is(NaN,NaN)) // true

// --------------- Object.is(x,y)
function equal(x,y) {
  if(x === y) {
    // 如果a为真,则返回A, 否则返回B
    return x !== 0 || 1/x === 1/y
  }else{
    // 对NaN的判断,两个值都不等于自身
    return x !== x && y !== y;
  }
}
console.log(equal(1,1)) // true
console.log(equal('foo','foo')) //true
console.log(equal(true,true)) // true
console.log(equal({},{})) // false
console.log(equal(+0,-0)) // false

// ---------------- Object.assign()
const target = {a:1}
const source1 = {b:2}
const source2 = {c:3}
console.log(Object.assign(target,source1,source2))

console.log(Object.assign({b:'c'},Object.defineProperty({},'visible',{
  enumerable:false,
  value:'hello'
})))


// ----------------- setPrototypeOf()
const obj1 = Object.setPrototypeOf({},null)
const obj2 = Object.create(null)
console.log(obj1,obj2)

let proto = {}
let player = {x:10}
Object.setPrototypeOf(player,proto)
proto.y = 20;
proto.z = 40;
console.log(player,player.x,player.y,player.z)

// --------------- getPrototypeOf()
function Rectangle() {

}
const rec = new Rectangle()
console.log(Object.getPrototypeOf(rec) === Rectangle.prototype) // true
console.log(Object.getPrototypeOf(1) === Number.prototype)  // true
console.log(Object.getPrototypeOf('foo') === String.prototype)  // true
console.log(Object.getPrototypeOf(true) === Boolean.prototype)  // true


