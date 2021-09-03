// @flow
/*Object type syntax*/
const obj1: {foo:boolean} = {foo:false}
const obj2: {
  foo:number,
  bar:boolean,
  baz:string
} = {
  foo:123,
  bar:false,
  baz:'123'
}

// Optional object type properties  undefined or their set value
var obj:{baz?: boolean } = {baz: false}

function acceptObject(value:{foo?: string}){
}
acceptObject({foo:'foo'})
acceptObject({foo:undefined})
// acceptObject({foo:null})
acceptObject({})

// --------------------------- Object methods
/*
1. In particular,object properties written with method syntax are read-only;
2. object methods do not allow the use of this in their bodies.
*/
const a = {
  x:3,
  foo:function() { return 3},
  get_name:function() {
    return a.x
  }
}
let b = {
  foo() {return 3},
  x:5,
  get_x:function(){
    return this.x
  }
}
b.get_x()

// -------------------------------seal objects
/*
1. These sealed objects will know all of the properties you declared then with and the types of their values
2. Flow will not allow you to add new properties to them
*/
var obj3 = {
  foo: 1,
  bar: true,
  baz: 'three'
}
const x1 :number = obj3.foo;
const x2 :boolean = obj3.bar;
const x3 :string = obj3.baz;
// obj.firstName = 'kyrie'  // error

// ---------------------------- Unsealed objects
/*
create an object without any properties, These unsealed objects will not know all of their properties and will
allow you to add new ones
*/
const player = {}
player.firstName = 'kyrie'
player.lastName = 'irving'
player.age = 30


// -------------------Reassigning unsealed object properties
const number_object = {}
if(Math.random() > 0.5){
  number_object.prop = true
}else{
  number_object.prop = 'hello'
}
const value3: boolean | string = number_object.prop;

const singer = {}
singer.age = 30
singer.name = 'jay'

const name:string = singer.name
const age:number = singer.age

//------------------------------------ Exact object types
function method(obj:{foo:string}){
}
method({
  foo:'test',
  bar:42
})

// --------------------------- optional properties
function foo1(value:{foo?: string}){
}
foo1({foo:'string'})
foo1({foo:undefined})
// foo1({foo:null})   // error

// --------------------------- maybe type
function foo2(value:{foo:?string}){
}
foo2({foo:'123'})
foo2({foo:undefined})
foo2({foo:null})

// ------------------------- Exact object property
/*
Sometimes it is useful to disable this behavior and only allow a specific set of properties.
*/
const baz: {|foo:string, bar:number|} = {foo:'hello', bar:123}

type FooT = {|foo:string|}
type BarT = {|bar:number|}

type FooBar = {|...FooT, ...BarT|}
type BarFoo = FooT & BarT

const xyz:FooBar = {foo:'123', bar:123}
// const mn:BarFoo = {foo:'123', bar:123}   // error


// --------------------------------- Objects as maps    an indexer property
const o: {[string]: number} = {};
o['foo'] = 123
o['baz'] = 456
o['1'] = 123

// const indexer_obj:{
//   size:number,
//   [id:number]: string
// } = {
//   size: 0
// }

// function add(id:number, name:string){
//   obj[id] = name;
//   obj.size++;
// }

