// @ flow
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

// Optional object type properties
var obj:{baz?: boolean } = {baz: false}
