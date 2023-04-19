// ----------------------------------
/* function create () {
  const a = 100
  return function() {
    console.log(a)
  }
}

const fn = create()
const a = 200
fn()  */ // 100

// ----------------------------------
const closure = () => {
  let a = 100
  return () => {
    console.log('a', a)
    a+=1
    console.log(a)
  }
}
const c1 = closure()
c1()  // 101
c1()  // 102
c1()  // 103

// -------------------------------------
function print(fn) {
  const a = 200
  fn()
}
const a = 100
function fn() {
  // 函数定义的地方查找
  console.log(a)  // 100
}

print(fn)