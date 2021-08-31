//      
function sum(a        ,b        ){
  return a + b
}
console.log(sum(1,2))
// console.log(sum('1','2'))



function foo(x         )        {
  if(x) {
    return x + '';
  }
  return 'default string'
}
foo(123)
// foo('123')
// foo()

// Type Annotations
function concat(a       , b       )        {
  return a + b
}
concat('1','2')
// concat(1,2)


