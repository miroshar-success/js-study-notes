// export default function foo() {
//   console.log('foo')
// }

function add(a,b) {
  return a + b;
}

// export default add;


function hello() {
  console.log('hello,我是需要被默认导出的')
}

export {
  add,
  hello
}
