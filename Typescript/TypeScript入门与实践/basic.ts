const bigint: bigint = 10n
const otc: bigint = 0o20n
const hex: bigint = 0xfffn


// symbol
const key: symbol = Symbol()
const s1: symbol = Symbol.for('hello')


const unique_symbol: unique symbol = Symbol.for('world')

const x: unique symbol = Symbol.for('hello')
const y: symbol = Symbol('world')
const z: symbol = Symbol('hello world')

/* type SymbolPlayer = {
  [x]: string,
  [y]: string,
  [z]: string
} */

type SymbolSinger = {
  [x]: string
}


const symbol_value: unique symbol = Symbol.for('hello')
interface WithUniqueSymbol {
  readonly b: unique symbol
}
class ClassWithSymbol {
  static readonly b: unique symbol = Symbol()
}

// unique symbol 通过Symbol.for() 定义 是不同的值
const symbol_a: unique symbol = Symbol.for('hello')
const symbol_b: unique symbol = Symbol.for('hello')

/* if ( symbol_a === symbol_b) {

} */

const foo_null: null = null
const foo_undefined: undefined = undefined

// strictNullChecks
// const string_or_null: string = null
// console.log(string_or_null.length)


function log(name: string):void {
  console.log(name)
}
// 没有启用 strictNullChecks 可以将null/undefined赋值给void类型
const log_message = (name: string):void => {
  console.log(name)
  return undefined
}

const log_name = (name: string):void => {
  return undefined
}

export {

}