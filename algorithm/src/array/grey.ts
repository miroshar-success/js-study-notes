// ------ 格雷编码 ---------
/*
1: 0 1
2: 00 01 11 10
3  000 001 011 010 110 111 101 100
返回数组长度为 2^n, 第一位数字 按数组长度/2, 前半部分为0, 后半部分为1。后面的数字为 n-1时的结果并首位对应
*/
function grey_code(n: number): string [] {
  if(n === 1) return ['0', '1']
  const prev = grey_code(n - 1)
  const result = []
  const max = Math.pow(2, n) - 1;
  for(let i = 0; i < prev.length; i++) {
    result[i] = `0${prev[i]}`
    result[max-i] = `1${prev[i]}`
  }
  return result
}

/* console.log(grey_code(2))
console.log(grey_code(3))
console.log(grey_code(4)) */


module.exports = {
  grey_code
}
export {

}
