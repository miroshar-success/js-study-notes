// import { is_string } from './app/utils'
// console.log(is_string('123'))

// ------- 联合类型 和 类型保护 ---------
interface Counter {
  count: number
}

function sum(a: Object | Counter, b: Object | Counter) {
  if('count' in a && 'count' in b) {
    return a.count + b.count
  }
}


interface Bird {
  fly: boolean
  sing: () => void
}

interface Dog {
  fly: boolean
  bark: () => void
}
function trainAnimal(animal: Bird | Dog) {
  // 类型保护
  if(animal.fly)  {
    (animal as Bird).sing()
  } else {
    (animal as Dog).bark()
  }

  if('sing' in animal) {
    animal.sing()
  }else{
    animal.bark()
  }
}

// import { is_string } from '@/app/utils'

// console.log(is_string('hello world'))

/**
 * @description sayHello
 * @param {string} name
*/
const sayHello = (name: string): void => {
  console.log(`Hello, ${name}`)
}

/**
 * @description 将数值转化为千分位
 * @param {string|number} number
 * @returns {number}
*/
const translate_number = (number: string | number): number => {
  if (typeof number === 'string') return Number(number)
  return number
}

/**
 * @typedef {(number | string)} NumberLike
*/

/**
 * @type {number}
*/
const a = 123

/**
 * @type {string}
*/
const c = '123'
export {

}