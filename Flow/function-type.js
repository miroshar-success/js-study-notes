// @flow
/*
Functions have two places where types are applied: Parameters and the return value
*/
function concat(a:string,b:string): string {
  return a + b;
}
concat('foo','bar')


function f1(a:string , b:string): number{
  let c = a + b
  return Number(c)
}

// --------------------------- using inference
function m1(a, b){
  let sum = a + b
  return a + b
}
m1('foo', 'bar')
m1(1,2)

// ------------------------- function declaration
function method(str: string, bool:?boolean, number: Array<number>):void{

}
method('123',false,[1,2,3])
// -------------------------- Arrow Function
const foo1 = (str:string, bool?:boolean, number:Array<number>):void => {
}
foo1('123', false, [1,2,3])

// ----------- function types
// (str:string,bool:? boolean,number:Array<number>) => void

// ----------------------- function parameters and optional parameters
function moon(param1: string, param2:boolean){
}

function sum(optionalValue?: string){
}
/*
optional parameters will accept missing, undefined, or matching types, But they will not accept null
*/
sum('123')
sum(undefined)
// sum(null)  // error


// ------------------------ Rest Parameters
function baz(...args: Array<number>){
}
baz(1,2,3)
baz()

// ------------------------- Function returns
function small():void {
}

function bar():boolean {
  if(Math.random() > 0.6){
    return true
  }
  return false
}
async function boo(): Promise<number> {
  return 123
}

// -------------------------- predicate function
function c(a: ?string, b:?string) : string{
  if(a && b) {
    return a + b
  }
  return ''
}

function truthy(a,b):boolean %checks{
  return !!a && !!b 
}
function mazing(a:?string, b:?string) :string{
  if(truthy(a,b)){
    return a + b
  }
  return ''
}