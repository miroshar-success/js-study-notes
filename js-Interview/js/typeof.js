const type_array = [
  123, '123', true, null, undefined,
  NaN, Infinity, [], {}, new Set(), new Map(), () => {},
  /\d+/, new Date(),
]

for (const type of type_array) {
  console.log(typeof type)
  /***
   * number
   * string
   * boolean
   * object
   * undefined
   * number
   * number
   * object
   * object
   * object
   * object
   * function
   * object
   * object
   */
}

const toString = Object.prototype.toString
console.log( toString.call(new Date) )