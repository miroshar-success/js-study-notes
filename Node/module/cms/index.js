/* onst math = require('./math.js')
console.log('math', math)

console.log(math.decrease(1, 3))  // -2
console.log(math.increase(1, 3))  // 4 */

const { increase, decrease } = require('./math.js')
console.log(increase(1, 3)) // 4
console.log(decrease(1, 3)) // -2