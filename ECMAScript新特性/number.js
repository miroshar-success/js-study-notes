const second = '0b111'
const eight = '0o10'

console.log(second,eight, Number(second), Number(eight))  // 7  8


const n1 = 1_000
const n2 = 1000;
console.log(n1 === n2)  // true

console.log(1_2_345 === 12345)  // true

// 其他进制
const n3 = 0b1_10
const n4 = 0o012
console.log(n3 === 6)  // true
console.log(n4 === 10)


// ----------------- Number.isFinite() Number.isNaN()
console.log(Number.isFinite(13))  // true
console.log(Number.isFinite(NaN)) // false
console.log(Number.isFinite('123')) // false
console.log(Number.isFinite(true))  // false
console.log(Number.isFinite(Infinity))  // false
console.log(Number.isFinite(-Infinity)) // false

// -------- isNaN()
console.log(Number.isNaN(NaN))  // true
console.log(Number.isNaN(13)) // false
console.log(Number.isNaN('13')) // false
console.log(Number.isNaN(true)) // false
console.log(Number.isNaN(Infinity)) // false
console.log(Number.isNaN(1/Infinity)) // false
console.log(Number.isNaN('true'/0)) // true

// ----------------- isFinite 和  Number.isFinite 区别
console.log(Number.isFinite('13'))  // false
console.log(isFinite('13')) // true

console.log(isNaN(NaN)) // true
console.log(isNaN('NaN')) // true

console.log(Number.isNaN(NaN))  // false
console.log(Number.isNaN('NaN'))  // false


// ------------ Number.parseInt()  Number.parseFloat()
console.log(parseInt('123%')) // 123
console.log(Number.parseInt('123%'))  // 123
console.log(parseInt('12.345')) // 12
console.log(Number.parseInt('12.345'))  // 12

console.log(Number.parseFloat('123.45%')) // 123.45
console.log(Number.parseFloat('123.45'))  // 123.45
console.log(parseFloat('123.45')) // 123.45


console.log(Number.parseInt(true))  // NaN
console.log(Number.parseInt(false));  // NaN
console.log(Number.parseInt('true'))  // NaN
console.log(Number.parseInt(NaN)) // NaN
console.log(Number.parseInt(Infinity))  // NaN
console.log(Number.parseInt(-Infinity)) // NaN
console.log(Number.parseInt('123')) // 123
console.log(Number.parseInt('%123'))  // NaN
console.log(Number.parseInt('123%'))  // 123
console.log(Number.parseInt(123)) // 123

const str1 = Number.parseInt('123%')
const str2 = Number.parseInt(123)
console.log(str1 === str2, typeof str1, typeof str2)  // true number number


console.log(Number.parseFloat(true))  // NaN
console.log(Number.parseFloat(false));  // NaN
console.log(Number.parseFloat('true'))  // NaN
console.log(Number.parseFloat(NaN)) // NaN
console.log(Number.parseFloat(Infinity))  // Infinity
console.log(Number.parseFloat(-Infinity)) // -Infinity
console.log(Number.parseFloat('123.342')) // 123.342
console.log(Number.parseFloat('%123.234'))  // NaN
console.log(Number.parseFloat('123%.234'))  // 123
console.log(Number.parseFloat(123.345)) // 123.345
console.log(Number.parseFloat('123.342%12')) // 123.342
console.log(Number.parseFloat(1/0)) // Infinity
console.log(Number.parseInt(1/0)) // NaN


const str3 = Number.parseFloat('123.45%');
const str4 = Number.parseFloat('123.45');
console.log(str3,str4, typeof str3, typeof str4)  // 123.45 123.45  number number