// @flow 
/*  Mixed types */
function square(n:number){
  return n * n
}
square(123)
// square('123')

// --------------------------- a group of different possible types
function stringifyBasicValue(value: string | number){
  return '' + value
}
stringifyBasicValue('123')
stringifyBasicValue(123)
// stringifyBasicValue(false)
// stringifyBasicValue(true)

// ------ return type will be the same as the type of whatever value is passed into the function
function identity<T>(value:T): T {
  return value
}
identity(123)
identity('123')
identity(false)
identity(null)
identity(undefined)
identity(NaN)
identity(Infinity)

// ------------- mixed
function acceptMix(value:mixed){
  if(typeof value === 'string'){
    return '' + value
  }
  return ''
}
acceptMix(123)
acceptMix('123')
acceptMix(undefined)
acceptMix(null)
acceptMix(Symbol('hello'))
acceptMix(false)