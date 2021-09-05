// @flow

let tuple1:[number] = [1]
let tuple2:[number,boolean] = [1,true]
let tuple3:[number,boolean,string] = [1,false,'1']

const value1:number = tuple1[0]
const value2:boolean = tuple2[1]
const value3:string = tuple3[2]

// ----------------------------------- Trying to access an index that does not exist results in an index-out-of-bounds error
// const none = tuple3[3] // Error
let tuple:[number,boolean,string] = [1,false,'1']
function getItem(n:number){
  let val: number | boolean | string = tuple[n]
}
getItem(0)
getItem(1)
getItem(2)
getItem(3)

// ---------------------------------- setting a new value inside a tuple
let t:[number, boolean, string] = [1,true,'123']
t[0] = 2
t[1] = false
t[2] = '234'

// -------------------------- Tuples do not match array types
let array:Array<number> = [1,2]
// let t1:[number,number] = array;  // an Array<T> type can not be passed into a tuple


// ------------------- Can not mutating array methods on tuples
const tuple4: [number,number] = [1,2]
tuple4.join(',')
// tuple4.push(123)