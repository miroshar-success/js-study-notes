//      
/*
Booleans
Strings
Numbers
null
undefined
Symbols
*/

function method(x       , y       , z        ){
  console.log(x,y,z)
}
method(3.14, 'hello', true)

//-------------------------------------- boolean check
function acceptBoolean(value        ){
  console.log(value)
}
acceptBoolean(false)
// acceptBoolean('false')
acceptBoolean(1 === 1)  // 隐式类型转换
acceptBoolean(!!'')

//--------------------------------------  number check
function acceptNumber(value       ){
  console.log(value)
}
const value = Math.PI
acceptNumber(1)
acceptNumber(3.14)
acceptNumber(NaN)
acceptNumber(Infinity)
acceptNumber(value)

// -------------------------------------- string check
function acceptsString(value        ){
  console.log(value)
}
// 隐士类型转换的时候 只允许字符串和数字  或者字符串和字符串的拼接
acceptsString('foo')
acceptsString('foo' + 123)
acceptsString('foo' + 'foo')
// acceptsString('foo' + {})
// acceptsString('foo' + [])

console.log([].toString())  // ''
console.log({}.toString())  // [object Object]


//-------------------------------------- null and void
function acceptsNull(value     ) {
}

acceptsNull(null)
// acceptsNull(undefined)

function acceptUndefined(value     ){
}
acceptUndefined(undefined)
// acceptUndefined(undefined)

// --------------Maybe Types ?number ?string
function acceptMaybeString(value         ){
}
acceptMaybeString()
acceptMaybeString('bar')
acceptMaybeString(undefined)
acceptMaybeString(null)

// ----------------Optional object properties
function acceptObject(value               ){

}
acceptObject({foo:'string'})
// acceptObject({foo:123})
acceptObject({foo:undefined})
// acceptObject({foo:null})

// ------------------------ Optional function parameters
function baz(value         ){
}
baz('bar')
baz(undefined)
// method(null)
baz()

//------------------------ function parameters with defaults
function bar(value         = 'default'){
}
bar()
bar('123')
// bar(null)

// ------------------------ symbol
function acceptSymbol(value       ){
}
acceptSymbol(Symbol('hello'))


// ---------------- 移除注解
/*
flow-remove-types
*/