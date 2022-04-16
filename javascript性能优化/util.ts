//  千分位转化数字 (只考虑正整数)
function format1(money: number): number | string {
  if(money >= 0 && money <= 999) return money
  const array = money.toString().split('').reverse()
  // [7,6,5,4,3,2,1]
  return array.reduce((prev,next,i) => {
    if(i % 3 === 0 && i !== 0) {
      return next + ',' + prev
    }else{
      return next + prev
    }
  }, '')
}

const number1 = 1234567;
console.log(format1(number1))


// ----- 字符串方法 ------
function format2(money: number): number | string {
  if(money >= 0 && money <= 999) return money
  const string = money.toString()
  const length = string.length
  // 1234567
  let str = '';
  //i 6 / j 1
  for(let i = length - 1; i >= 0; i--) {
    const j = length - i - 1
    if(j % 3 === 0 && j !== 0) {
      str = string[i] + ',' + str
    }else{
      str = string[i] + str
    }
  }
  return str
}
const number2 = 1234567678
console.log(format2(number2))


// --------- 字符串大小写转换 ----------
function letterSwitch(str: string): string {
  const length = str.length;
  if(length === 0) return ''
  let result = '';
  const reg1 = /[a-z]/,
        reg2 = /[A-Z]/;
  for(const item of str) {
    if(reg1.test(item)) {
      result += item.toUpperCase()
    }else if(reg2.test(item)) {
      result += item.toLowerCase()
    }else{
      result += item
    }
  }
  return result
}

const string = 'AccxD2@xYz'
console.log(letterSwitch(string)) // aCCXd2@XyZ



// ------ 利用ASCII 编码 -----
function letterSwitch2(str: string): string {
  const length = str.length;
  if(length === 0) return ''
  let result = '';
  for(const item of str) {
    const code = item.charCodeAt(0)
    if(code >= 65 && code <= 90) {
      result += item.toLowerCase()
    }else if(code >= 97 && code <= 122) {
      result += item.toUpperCase()
    }else{
      result += item
    }
  }
  return result
}

console.log(letterSwitch2(string)) // aCCXd2@XyZ
