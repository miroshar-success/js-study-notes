// --------------- this -------------
// ----------- noImplicitThis -----------
function this_fn (this: { name: string }) {
  console.log(this.name)
}
// this_fn()


// --------------- 定义一个纯函数 不想让函数代码依赖于 this的值 ---------------
function this_void(this:void, x: number, y: number) {
  console.log(this)
  return x + y
}
console.log(this_void(1, 3))  // 4
console.log(this_void(3, 5))  // 8