// @flow
/*
Array Type  Array<Type> 
*/
const array:Array<number> = [1,2,3,NaN,Infinity]
const arr1:Array<boolean> = [false,true,false]
// const arr2:Array<string> = ['1',2,3]
const arr3:Array<mixed> = [1,false,'1',undefined,null]
const arr4:Array<any> = [1,2,3,false,'1',undefined,null]

// -------------------------- Array type shorthand syntax
let arr:number[] = [0,1,2,3]

// ------------------------------- Accessing an element that is out of the bounds of the way
let a1:Array<number> = [0,1,2]
const value:number = a1[3]

const a2:Array<number> = []
a2[0] = 0
a2[2] = 2
let v:number = a2[1]


// ------------------------------- $readOnlyArray<T>
const readonlyArray:$ReadOnlyArray <number> = [1,2,3]
const first:number = readonlyArray[0]
// readonlyArray.push(1)

/* Note that an array of type $ReadOnlyArray<T> can still have mutable elements */
const array1:$ReadOnlyArray<{[string]:number}> = [{x:1},{x:2},{y:1},{z:1}]
array1[0].x = 5

const array2:[string,number,boolean] = ['1',1,false]


// ----------------------------------------- $ReadOnlyArray Array
const someOperation = (arr:Array<number | string>):void =>{
}
const param1:Array<number> = [1,2,3]
// someOperation(param1)

const foo = (arr:$ReadOnlyArray<number|string>):void => {
}
foo(param1)