console.log(typeof NaN) // number

console.log(NaN === NaN)  // false
console.log(Object.getOwnPropertyDescriptor(window, 'NaN'))
/*
{
  configurable: false
  enumerable: false
  value: NaN
  writable: false
}
*/
console.log(Object.getOwnPropertyDescriptor(Number, 'NaN'))
/*
{
  configurable: false
  enumerable: false
  value: NaN
  writable: false
}
*/
