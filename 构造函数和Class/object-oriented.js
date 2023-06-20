// ----------------------- 面向对象编程 ---------------------------------
/**
 * 1. 封装性  程序以某种方式将实现的细节包装起来
 * 2. 继承性  基于原型的对象编程
 * 3. 多态性  一段代码应用于不同类型的对象时 可以有不一样的行为
*/

class Person {
  constructor(name){
    this.name = name
    this.mileage = 0
  }
}
class Walker extends Person {
  move_four_hour () {
    this.mileage += 4
  }
}
class Biker extends Person {
  move_four_hour() {
    this.mileage += 10
  }
}
class Driver extends Person {
  move_four_hour() {
    this.mileage += 50
  }
}

const log = (person) => {
  person.move_four_hour()
  console.log(person)
  /**
   *  Walker { name: 'walker', mileage: 4 }
      Biker { name: 'biker', mileage: 10 }
      Driver { name: 'driver', mileage: 50 }
  */
}
const walker = new Walker('walker')
const biker = new Biker('biker')
const driver = new Driver('driver')

log(walker)
log(biker)
log(driver)