// --------------- 快速排序 ------------------
const quick_sort = (list: number[]) : number[] => {
  const length = list.length
  if (length === 0) return list
  const mid_idx = Math.floor(list.length / 2)
  const mid_val = list.slice(mid_idx, mid_idx + 1)[0]
  const left: number[] = []
  const right: number[] = []
  for (let i = 0; i < length; i++) {
    if (i === mid_idx) continue
    const val = list[i]
    if (val > mid_val) {
      right.push(val)
    } else {
      left.push(val)
    }
  }
  return quick_sort(left).concat(mid_val).concat(quick_sort(right))
}

console.log(quick_sort([3, 7, 19, 0, 5, 7, 2]))

const c:number[] = []
for (let i = 1000000; i > 0; i--) {
  c.push(i)
}
// console.time('quick')
// console.log(quick_sort(c))
// console.timeEnd('quick')

console.time('sort')
console.log(c.sort((a, b) => a - b))
console.timeEnd('sort')