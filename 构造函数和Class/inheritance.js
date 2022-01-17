// ---------- 继承 (原型链继承) ------------
function Parent(name){
  this.name = name;
  this.colors = ['red','blue','green']
}
Parent.prototype.say = function(){
  console.log(`I am ${this.name}`)
}

/* const parent = new Parent('parent')
console.log(parent) // {name:'parent'}
parent.say()  // I am parent
 */

function Child(){
}

Child.prototype = new Parent('child')
Child.prototype.constructor = Child;
const child = new Child()
console.log('child', child, child.__proto__.name) // {}  child
child.say() // I am child

// ---------------- 缺点 ---------------
/*
1. 如果有属性是引用类型,如果其中一个属性改变了,所有属性都会被修改
2. Child无法传递参数
*/
const p1 = new Parent('p1')
const p2 = new Parent('p2')
console.log(p1, p2)
/*
{ name: 'p1', colors: [ 'red', 'blue', 'green' ] }
{ name: 'p2', colors: [ 'red', 'blue', 'green' ] }
*/
// p1.colors.push('white')


const c1 = new Child()
const c2 = new Child()
console.log(c1.colors, c2.colors) // [ 'red', 'blue', 'green' ] [ 'red', 'blue', 'green' ]
c1.colors.pop()
console.log(c1.colors, c2.colors) // [ 'red', 'blue' ] [ 'red', 'blue' ]
c1.colors.push('white')
console.log(c1.colors, c2.colors) // [ 'red', 'blue', 'white' ] [ 'red', 'blue', 'white' ]



p1.colors.unshift('black')
console.log(p1.colors, p2.colors, c1.colors, c2.colors)
// p1.colors和p2.colors是独立的
// [ 'black', 'red', 'blue', 'green' ] [ 'red', 'blue', 'green' ] [ 'red', 'blue', 'white' ] [ 'red', 'blue', 'white' ]

console.log(Child.prototype.__proto__ === Parent.prototype) // true
