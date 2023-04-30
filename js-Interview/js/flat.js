const flat = (array) => {
  const is_flat = array.some(item => Array.isArray(item))
  if (!is_flat) return [...array]
  const a = Array.prototype.concat.apply([], array)
  return flat(a)
}

console.log(flat([1, [2, 3, [4, 5], 6], 7]))
console.log(flat([1, 2, 3, [9, [8,[8,[5,7]]]]]))

const flat_number = (array, d = 1) => {
  if (d <= 0) return array.slice()
  const t = []
  for (const item of array) {
    if (Array.isArray(item)) {
      t.push(flat_number(item, d-1))
    } else {
      t.push(item)
    }
  }
  return t
}
console.log(flat_number([[[1, 2], 3], 4], 1))