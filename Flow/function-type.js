// @flow
/*
Functions have two places where types are applied: Parameters and the return value
*/
function concat(a:string,b:string): string {
  return a + b;
}
concat('foo','bar')


function f1(a:string, b:string): number{
  let c = a + b
  return Number(c)
}