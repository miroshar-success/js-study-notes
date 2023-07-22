// ----- 将数字转化为字符串再转化为数组然后反转之后变成字符串进行比较 ---------------
const reverse_number = (max: number): number[] => {
  const array: number[] = []
  for (let i = 1; i <= max; i++) {
    const str = i.toString()
    if (str == str.split('').reverse().join('')) {
      array.push(i)
    }
  }
  return array
}
console.time('array')
console.log(reverse_number(200000))
console.timeEnd('array')

// -----------将数字变成字符串,对字符串头尾比较 ----------
const reverse_string = (max: number): number[] => {
  const array: number[] = []
  for (let i = 1; i <= max; i++) {
    const s_str = i.toString()
    let s_idx = 0
    let e_idx = s_str.length - 1
    let flag = true
    while (s_idx < e_idx) {
      if (s_str[s_idx] === s_str[e_idx]) {
        s_idx += 1
        e_idx -= 1
      } else {
        flag = false
        break
      }
    }
    flag && array.push(i)
  }
  return array
}
console.time('string')
console.log(reverse_string(200000))
console.timeEnd('string')

// ------------ 数字直接反转比较 --------------
const reverse_by_number = (max: number): number[] => {
  const list: number[] = []
  for (let i = 1; i <= max; i++) {
    let n = i
    let m = 0
    while (n) {
      m = m * 10 + n % 10
      n = Math.floor(n / 10)
    }
    if (i === m) {
      list.push(i)
    }
  }
  return list
}
console.time('number')
console.log(reverse_by_number(200000))
console.timeEnd('number')