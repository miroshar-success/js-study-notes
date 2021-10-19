// CommonJs 是运行时加载,同步加载, ES6是编译时加载
// const firstName = 'kyrie'
// const lastName = 'irving'
// const age = 30

// function multiple(x) {
//   return x * x
// }

// export {
//   firstName,
//   lastName,
//   age,
//   multiple
// }


// const name = 'jack'
// const age = 30

// export default {name,age}


// export default 1;

// const m = 1;
// export default m;

// export const m = 1;

// function area(radius){
//   return Math.PI * radius * radius;
// }

// function length(radius){
//   return 2 * Math.PI * radius;
// }

// export {area, length}

// --------------------------------------- 默认导出一个变量
// const player = 'kyrie'
// const singer = 'jay'

// export default singer

// ------------------------------- import 和 default 复合写法
// import {foo} from './foo.js'
// import {bar} from './bar.js'
// import {default as baz} from './baz.js'

// export {
//   foo,
//   bar,
//   baz
// }

export {foo} from './foo.js'
export {bar} from './bar.js'
export {default as baz} from './baz.js'
