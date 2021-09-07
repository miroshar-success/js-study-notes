// @flow
function add(one:any, two:any):number{
  return one + two
}
add(1,2)
add('1',2)
add(1,2)
add(false,1)
add({},[])

// -------------------- 获取对象属性
function getNestedProperty(obj:any) {
  return obj.foo.bar.baz;
}
getNestedProperty({})


function acceptAny(value:any){
  return value + ''
}
// ----------- mixed any  // mixed you must first figure out what actual type is 
// function acceptMixed(value:mixed){
//   return value + ''
// }

function fn(obj:any){
  let foo = obj.foo
  let bar = foo * 2
  let baz = bar + 'baz'
  let f1:number = obj.f1
}

/*
Mixed 强类型  any:弱类型
*/

const oBody:HTMLElement | null = document.querySelector('body')
