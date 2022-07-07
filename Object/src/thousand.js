console.log('----------------- thousand -------------')
function thousand_1(number) {
  const arr = (number+'').split('.')
  const int = arr[0]
  const decimal = arr[1] || ''
  let number_string = ''
  int.split('').reverse().forEach((n, i) => {
    if(i !== 0 && i % 3 === 0) {
      number_string = n + ',' + number_string
    } else {
      number_string = n + number_string
    }
  })
  return decimal ? (number_string + '.' + decimal) : number_string
}
console.log(thousand_1(1234.5)) // 1,234.5
console.log(thousand_1(1234567)) // 1,234,567
console.log(thousand_1(12345.1235)) // 12,345.1235

// 1234567
// [7654321]
function thousand_2(number) {
  const arr = (number+'').split('.')
  const int = arr[0]
  const decimal = arr[1] || ''
  const number_string = int.split('').reverse().reduce((prev, next, i) => {
    if(i !== 0 && i % 3 === 0) {
      return next + ',' + prev
    } else {
      return next + prev
    }
  }, '')
  return decimal ? (number_string + '.' + decimal) : number_string
}
console.log(thousand_2(1234.5)) // 1,234.5
console.log(thousand_2(1234567)) // 1,234,567
console.log(thousand_2(12345.1235)) // 12,345.1235


function thousand_3(money) {
  const arr = (money+'').split('.')
  const int = arr[0]
  const decimal = arr[1] || ''
  let number_string = ''
  for(let i = int.length-1; i >= 0; i--) {
    const j = int.length - i - 1
    if(j !== 0 && j % 3 == 0) {
      number_string = int[i] + ',' + number_string
    } else {
      number_string = int[i] + number_string
    }
  }
  return decimal ? (number_string + '.' + decimal) : number_string
}
console.log(thousand_3(1234.5)) // 1,234.5
console.log(thousand_3(1234567)) // 1,234,567
console.log(thousand_3(12345.1235)) // 12,345.1235
