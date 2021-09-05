// @flow
/*
When you have complicated types that you want do reuse in multiple places,you can alias them in Flow using a type alias.
*/
type TypeObject = {
  foo:number,
  bar:boolean,
  baz:string
}

const value:TypeObject = {
  foo:123,
  bar:false,
  baz:'123'
}
function m1(value:TypeObject){
}
m1({foo:1,bar:true,baz:'false'})

class Foo {
  constructor(value:TypeObject){}
}

// ------------------------------------------- Type Alias Generics
type MyObject<A,B,C> = {
  foo:A,
  bar:B,
  baz:C
}
const val:MyObject<number,boolean,string> = {
  foo:1,
  bar:false,
  baz:'123'
}

// ------------------------------------------ opaque type aliases
opaque type ID = string;
function identity(x:ID):ID{
  return x
}

opaque type Player<A,B,C>: {foo:A,bar:B} = {
  foo:A,
  bar:B,
  baz:C
}