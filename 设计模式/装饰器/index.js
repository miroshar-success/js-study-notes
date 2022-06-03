class Circle {
  draw() {
    console.log('画一个圆形')
  }
}

class Decorator {
  constructor(circle) {
    this.circle = circle
  }
  draw() {
    this.circle.draw()
    this.set_red_border()
  }
  set_red_border() {
    console.log('画一个红色边框')
  }
}

const circle = new Circle()
circle.draw() // 画一个圆形


const decorator = new Decorator(circle)
decorator.draw()
/*
画一个圆形
画一个红色边框
*/


class Player {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
  fullName() {
    return this.firstName + '-' + this.lastName
  }
}

class PlayerDecorator {
  constructor(player) {
    this.player = player
  }
  fullName() {
    const fullName = this.player.fullName();
    return `Hello, ${fullName}`;
  }
}
const player = new Player('kyrie', 'irving')
console.log(player.fullName())  // kyrie-irving

const player_decorator = new PlayerDecorator(player)
console.log(player_decorator.fullName())  // Hello, kyrie-irving
