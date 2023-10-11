const {
  plainToInstance, instanceToPlain, instanceToInstance
} = require('class-transformer')

// ------------ plainToInstance --------------
class User {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
  getFullName() {
    return this.firstName + ' ' + this.lastName
  }
}

const userList = [
  { firstName: 'kyrie', lastName: 'irving' },
  { firstName: 'lebron', lastName: 'james' }
]

const transformUsers = plainToInstance(User, userList)
console.log(transformUsers, transformUsers[0].getFullName())
/**
 * [
    User { firstName: 'kyrie', lastName: 'irving' },
    User { firstName: 'lebron', lastName: 'james' }
  ] kyrie irving
*/

// ---------------- classToPlain ------------------
class Player {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
}
const kyrie = new Player('kyrie', 'irving')

const plain_kyrie = instanceToPlain(kyrie)
console.log(plain_kyrie instanceof Player) // false


// --------------- classToClass -----------------
// 相当于深拷贝
function Singer(name, age) {
  this.name = name
  this.age = age
  this.info = {
    name: name,
    age: age,
    message: 'hello world'
  }
}
const jay = new Singer('周杰伦', 48)
const clone_singer = instanceToInstance(jay)

console.log(jay, clone_singer)
/**
 *Singer {
  name: '周杰伦',
  age: 48,
  info: { name: '周杰伦', age: 48, message: 'hello world' }
} Singer {
  name: '周杰伦',
  age: 48,
  info: { name: '周杰伦', age: 48, message: 'hello world' }
} 
*/
clone_singer.info.message = '你好世界'
console.log(jay, clone_singer)
/**
 * Singer {
  name: '周杰伦',
  age: 48,
  info: { name: '周杰伦', age: 48, message: 'hello world' }
} Singer {
  name: '周杰伦',
  age: 48,
  info: { name: '周杰伦', age: 48, message: '你好世界' }
}
*/


// enforcing type-safe instance
class Phone {
  constructor(color, price, description = '') {
    this.color = color
    this.price = price
    this.description = description
  }
}

const phone = {
  color: 'red',
  price: '5999',
  generation: 15
}

const transform_phone = plainToInstance(Phone, phone)
console.log(transform_phone)
/**
 * Phone { color: 'red', price: '5999', description: '', generation: 15 }
*/
